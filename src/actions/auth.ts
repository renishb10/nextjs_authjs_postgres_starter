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
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from '@/lib/tokens';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail';
import { getTwoFactorTokenByEmail } from '@/data/twoFactorToken';
import { getTwoFactorConfirmationByUserId } from '@/data/twoFactorConfirmation';

export async function signIn(
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Sorry! Invalid fields, Please fix it!' };
  }

  const { email, password, code } = validateFields.data;

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

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: 'Invalid Code!' };
      }

      if (twoFactorToken.token !== code) {
        return { error: 'Invalid Code!' };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: 'Code expired!' };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await auth.signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
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
