'use client';

import { useState, useEffect } from 'react';
import {
  fetchEnrollmentStats,
  type EnrollmentStats,
} from '@/services/enrollments';

interface UseEnrollmentStatsResult {
  data: EnrollmentStats | null;
  loading: boolean;
  error: string | null;
}

export function useEnrollmentStats(): UseEnrollmentStatsResult {
  const [data, setData] = useState<EnrollmentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchEnrollmentStats()
      .then((stats) => {
        if (!cancelled) setData(stats);
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to load enrollment stats',
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
