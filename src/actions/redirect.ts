'use server';

import { currentUser } from '@/lib/auth';

export const redirectToRepo = async () => {
  const user = await currentUser();

  if (!user) {
    return {
      error: 'Unauthorized',
    };
  }

  return {
    success: process.env.GITHUB_REPO_URL,
  };
};
