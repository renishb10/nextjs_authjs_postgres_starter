'use server';

import * as auth from '@/auth';

export async function signIn(provider: string) {
  return auth.signIn(provider);
}

export async function signOut() {
  await auth.signOut();
}
