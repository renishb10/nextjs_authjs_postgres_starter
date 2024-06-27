'use server';

import * as z from 'zod';
import * as auth from '@/auth';
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

  return { success: 'Email sent, Please check your inbox!' };
}

export async function signOut() {
  await auth.signOut();
}
