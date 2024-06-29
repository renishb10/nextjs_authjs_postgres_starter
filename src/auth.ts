import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from '@/auth.config';
import db from '@/lib/db';
import { UserRole } from '@prisma/client';
import { findUserById } from './data/user';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/login',
    error: '/error',
  },
  events: {
    linkAccount: async ({ user }) => {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // signIn: async ({ user }) => {
    //   let existingUser;

    //   if (user.id) {
    //     existingUser = await findUserById(user.id);
    //   }

    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }
    //   return true;
    // },
    session: async ({ token, session }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // To add custom fields like role, add a type first to next-auth.d.ts
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;

      const existingUser = await findUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
});
