import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        try {
          const user = {
            email: 'fakeuser@gmail.com',
            password: 'fakepassword',
          };
          if (
            credentials.email === user.email &&
            credentials.password === user.password
          ) {
            return user;
          } else {
            throw new Error('Email or Password is not correct');
          }
        } catch (e) {
          if (e instanceof Error) throw new Error(e.message);
          else throw new Error('Something went wrong, try again later!');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
});
