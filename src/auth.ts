import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from '@/auth.config';
import db from '@/lib/db';
import { UserRole } from '@prisma/client';
import { findUserById } from './data/user';
import { getTwoFactorConfirmationByUserId } from './data/twoFactorConfirmation';

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
    signIn: async ({ user, account }) => {
      if (account?.provider !== 'credentials') return true;

      let existingUser;
      if (user.id) {
        existingUser = await findUserById(user.id);
      }

      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }

      if (existingUser && existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
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
