'use client';

import { useState, useEffect } from 'react';
import { fetchUserAnalytics } from '@/services/users';
import { fetchEnrollmentAnalytics } from '@/services/enrollments';
import type { AnalyticsPoint } from '@/components/pages/admin/components/dashboard/PlatformAnalyticsCard';

interface UsePlatformAnalyticsResult {
  data: AnalyticsPoint[] | null;
  loading: boolean;
}

export function usePlatformAnalytics(): UsePlatformAnalyticsResult {
  const [data, setData] = useState<AnalyticsPoint[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchUserAnalytics(), fetchEnrollmentAnalytics()])
      .then(([users, enrollments]) => {
        if (cancelled) return;
        const merged: AnalyticsPoint[] = users.months.map((month, i) => ({
          month,
          users: users.growth[i] ?? 0,
          enrollments: enrollments.growth[i] ?? 0,
        }));
        setData(merged);
      })
      .catch(() => {
        // Leave data null — component falls back to static constants
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading };
}
