'use client';

import { useMemo } from 'react';
import { useAuth } from './use-auth';
import { userInitials } from '@/lib/utils/user';

export interface CurrentUser {
  fullName: string;
  firstName: string;
  email: string;
  initials: string;
}

const FALLBACK_NAME = 'User';

export function useCurrentUser(): CurrentUser {
  const { user } = useAuth();

  return useMemo(() => {
    const email = user?.email ?? '';
    const fullName =
      [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
      email.split('@')[0] ||
      FALLBACK_NAME;

    return {
      fullName,
      firstName: fullName.split(' ')[0],
      email,
      initials: userInitials(fullName),
    };
  }, [user]);
}
