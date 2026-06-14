'use client';

import { useState, useEffect } from 'react';
import { fetchUserStats, type UserStats } from '@/features/users';

interface UseUserStatsResult {
  data: UserStats | null;
  loading: boolean;
  error: string | null;
}

export function useUserStats(): UseUserStatsResult {
  const [data, setData] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchUserStats()
      .then((stats) => {
        if (!cancelled) setData(stats);
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setError(
            err instanceof Error ? err.message : 'Failed to load user stats',
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
