import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from '@/schemas';
import { findUserByEmail } from '@/data/user';
import { comparePassword } from '@/lib/hash';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await findUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await comparePassword(password, user.password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
