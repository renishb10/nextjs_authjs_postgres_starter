'use server';

import * as z from 'zod';

import db from '@/lib/db';
import { findUserByEmail, findUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { DeleteAccountSchema, UserSchema } from '@/schemas';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';
import { comparePassword, hashPassword } from '@/lib/hash';

export const userSettings = async (values: z.infer<typeof UserSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const existingUser = await findUserById(user.id || '');
  if (!existingUser) {
    return { error: 'Unauthorized' };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const userWithSameEmail = await findUserByEmail(values.email);

    if (userWithSameEmail && userWithSameEmail.id !== user.id) {
      return { error: 'Email already in use!' };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: 'Verification email sent!' };
  }

  if (values.password && values.newPassword && existingUser.password) {
    const passwordsMatch = await comparePassword(
      values.password,
      existingUser.password
    );

    if (!passwordsMatch) {
      return { error: 'Incorrect current password!' };
    }

    const hashedPassword = await hashPassword(values.newPassword);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      ...values,
    },
  });

  return { success: 'Settings updated!' };
};

export const deleteUserAccount = async (
  values: z.infer<typeof DeleteAccountSchema>
) => {
  const user = await currentUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const existingUser = await findUserById(user.id || '');
  if (!existingUser) {
    return { error: 'Unauthorized' };
  }

  const validateFields = DeleteAccountSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  await db.user.delete({
    where: { id: existingUser.id },
  });

  return { success: 'Account deleted - We miss you!' };
};
