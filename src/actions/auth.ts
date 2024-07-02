'use server';

import * as z from 'zod';
import * as auth from '@/auth';
import db from '@/lib/db';
import { AuthError } from 'next-auth';
import { hashPassword } from '@/lib/hash';
import { findUserByEmail } from '@/data/user';
import { LoginSchema, SignupSchema } from '@/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export async function signIn(values: z.infer<typeof LoginSchema>) {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Sorry! Invalid fields, Please fix it!' };
  }

  const { email, password } = validateFields.data;

  const existingUser = await findUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: 'Email does not exist!',
    };
  }

  if (!existingUser.emailVerified) {
    // TODO: Stop generating if the verification token already active.
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success: 'Confirmation email sent!',
    };
  }

  try {
    await auth.signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    // Hack to handle Redirect Error
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CallbackRouteError':
          return {
            error: "Hmm... Those details don't seem to match. Try again?",
          };
        default:
          return {
            error: 'Sorry! We encountered an error. Please try again shortly.',
          };
      }
    }

    throw error;
  }

  return { success: '' };
}

export async function signUp(values: z.infer<typeof SignupSchema>) {
  const validateFields = SignupSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Sorry! Invalid fields, Please fix it!' };
  }

  const { name, email, password } = validateFields.data;
  const hashedPassword = await hashPassword(password);

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already is already in use.' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Fantastic! Confirmation email sent!' };
}

export async function signOut() {
  await auth.signOut();
}
