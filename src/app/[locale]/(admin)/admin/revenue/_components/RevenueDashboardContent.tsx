'use client';

import { RevenueStatsGrid } from '@/components/pages/admin/components/dashboard/RevenueStatsGrid';
import { MonthlyRevenueCard } from '@/components/pages/admin/components/dashboard/MonthlyRevenueCard';
import { RevenueByCategoryCard } from '@/components/pages/admin/components/dashboard/RevenueByCategoryCard';
import { REVENUE_BY_CATEGORY } from '@/constants/admin';
import { useRevenueStats } from '@/hooks/useRevenueStats';
import { useCourseStats } from '@/hooks/useCourseStats';
import { formatCurrencyCompact, formatTrend } from '@/lib/utils/stats';
import type { RevenueStatValue } from '@/components/pages/admin/components/dashboard/RevenueStatsGrid';

export function RevenueDashboardContent() {
  const { stats, monthly, loading: revenueLoading } = useRevenueStats();
  const { data: courseStats, loading: coursesLoading } = useCourseStats();

  const statValues: RevenueStatValue[] | undefined = stats
    ? [
        {
          value: formatCurrencyCompact(stats.annualRevenue),
          change: formatTrend(stats.annualRevenueTrend),
        },
        {
          value: formatCurrencyCompact(stats.thisMonth),
          change: formatTrend(stats.thisMonthTrend),
        },
        {
          value: formatCurrencyCompact(stats.monthlyRecurringRevenue),
          change: formatTrend(stats.monthlyRecurringRevenueTrend),
        },
        {
          value: formatCurrencyCompact(stats.averageOrderValue),
          change: formatTrend(stats.averageOrderValueTrend),
        },
      ]
    : undefined;

  const monthlyData = monthly
    ? monthly.months.map((month, i) => ({
        month,
        amount: monthly.amounts[i] ?? 0,
      }))
    : undefined;

  return (
    <>
      <RevenueStatsGrid stats={revenueLoading ? undefined : statValues} />
      <div className="grid gap-6 lg:grid-cols-2">
        <MonthlyRevenueCard data={monthlyData} />
        <RevenueByCategoryCard
          data={
            coursesLoading || !courseStats?.revenueByCategory.length
              ? REVENUE_BY_CATEGORY
              : courseStats.revenueByCategory
          }
        />
      </div>
    </>
  );
}
