'use client';

import { useState, useEffect } from 'react';
import {
  fetchRevenueStats,
  fetchRevenueMonthly,
  type RevenueStats,
  type RevenueMonthly,
} from '@/services/revenue';

interface UseRevenueStatsResult {
  stats: RevenueStats | null;
  monthly: RevenueMonthly | null;
  loading: boolean;
}

export function useRevenueStats(): UseRevenueStatsResult {
  const [stats, setStats] = useState<RevenueStats | null>(null);
  const [monthly, setMonthly] = useState<RevenueMonthly | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchRevenueStats(), fetchRevenueMonthly()])
      .then(([statsRes, monthlyRes]) => {
        if (cancelled) return;
        setStats(statsRes);
        setMonthly(monthlyRes);
      })
      .catch(() => {
        // Leave null — components fall back to static constants
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, monthly, loading };
}
