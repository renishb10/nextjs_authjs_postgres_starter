import { UserRole } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';

// Add your custom field here, which you would like to attach/extend to the user session object.
export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
