'use client';

import {
  createResourceStore,
  useResourceStore,
} from '@/lib/cache/createResourceStore';
import {
  fetchRevenueStats,
  fetchRevenueMonthly,
  type RevenueStats,
  type RevenueMonthly,
} from '@/services/revenue';

interface RevenueData {
  stats: RevenueStats;
  monthly: RevenueMonthly;
}

interface UseRevenueStatsResult {
  stats: RevenueStats | null;
  monthly: RevenueMonthly | null;
  loading: boolean;
}

const revenueStatsStore = createResourceStore<RevenueData>(() =>
  Promise.all([fetchRevenueStats(), fetchRevenueMonthly()]).then(
    ([stats, monthly]) => ({ stats, monthly }),
  ),
);

export function useRevenueStats(): UseRevenueStatsResult {
  const { data, loading } = useResourceStore(revenueStatsStore);
  return {
    stats: data?.stats ?? null,
    monthly: data?.monthly ?? null,
    loading,
  };
}
