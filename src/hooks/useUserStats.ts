'use client';

import {
  createResourceStore,
  useResourceStore,
} from '@/lib/cache/createResourceStore';
import { fetchUserStats, type UserStats } from '@/services/users';

interface UseUserStatsResult {
  data: UserStats | null;
  loading: boolean;
  error: string | null;
}

const userStatsStore = createResourceStore<UserStats>(fetchUserStats);

export function useUserStats(): UseUserStatsResult {
  return useResourceStore(userStatsStore);
}
