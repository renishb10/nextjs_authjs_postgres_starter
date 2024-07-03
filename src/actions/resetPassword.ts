'use server';
import { findUserByEmail } from '@/data/user';
import { sendResetPasswordEmail } from '@/lib/mail';
import { generateResetPasswordToken } from '@/lib/tokens';
import { ResetPasswordSchema } from '@/schemas';
import * as z from 'zod';

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const validateFields = ResetPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid Email' };
  }

  const { email } = validateFields.data;

  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    return { error: 'Email not found!' };
  }

  const passwordResetToken = await generateResetPasswordToken(email);
  await sendResetPasswordEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: 'Reset email sent!' };
};
