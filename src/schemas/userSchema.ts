import * as z from 'zod';

export const UserSchema = z
  .object({
    name: z.optional(
      z.string().min(6, { message: 'Minimum of 6 characters required' })
    ),
    email: z.optional(z.string().email()),
    password: z.optional(z.string()),
    newPassword: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: 'New password is required!',
      path: ['newPassword'],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: 'Password is required!',
      path: ['password'],
    }
  );

export const DeleteAccountSchema = z.object({
  deleteTxt: z.literal('delete', {
    message: "Type 'delete' to proceed deleting your account.",
  }),
});
