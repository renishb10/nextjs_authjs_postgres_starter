'use server';
import * as z from 'zod';

import { NewPasswordSchema } from '@/schemas';
import { getResetPasswordTokenByToken } from '@/data/resetPasswordToken';
import { findUserByEmail } from '@/data/user';
import { hashPassword } from '@/lib/hash';
import db from '@/lib/db';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: 'Missing token!' };
  }

  const validateFields = NewPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const { password } = validateFields.data;

  const existingToken = await getResetPasswordTokenByToken(token);

  if (!existingToken) {
    return { error: 'Invalid Token!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token has Expired!' };
  }

  const existingUser = await findUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Email does not exist!' };
  }

  const hashedPassword = await hashPassword(password);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({ where: { id: existingToken.id } });

  return { success: 'Password updated!' };
};
