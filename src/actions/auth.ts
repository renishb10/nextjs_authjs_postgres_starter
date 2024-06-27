'use server';

import * as z from 'zod';
import * as auth from '@/auth';
import db from '@/lib/db';
import { hashPassword } from '@/lib/hash';
import { findUserByEmail } from '@/data/user';
import { LoginSchema, SignupSchema } from '@/schemas';

export async function signIn(values: z.infer<typeof LoginSchema>) {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Sorry! Invalid fields, Please fix it!' };
  }

  return { success: 'Email sent, Please check your inbox!' };
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

  return { success: "Fantastic! You're now registered." };
}

export async function signOut() {
  await auth.signOut();
}
