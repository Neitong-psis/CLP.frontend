'use client';

import { useAdminDashboardT } from '@/i18n';
import TopBar from '@/components/common/TopBar';
import { DashboardStatGrid } from '@/components/pages/admin/components/dashboard/DashboardStatGrid';
import { UserDistributionContainer } from '@/components/pages/admin/components/dashboard/UserDistributionContainer';
import { MonthlyRevenueCard } from '@/components/pages/admin/components/dashboard/MonthlyRevenueCard';
import { CourseWidgetsContainer } from '@/components/pages/admin/components/dashboard/CourseWidgetsContainer';
import { AdminDashboardSkeleton } from '@/components/pages/admin/components/dashboard/AdminDashboardSkeleton';
import { useFirstVisit } from '@/hooks/useFirstVisit';
import { useUserStats } from '@/hooks/useUserStats';
import { useCourseStats } from '@/hooks/useCourseStats';
import { useRevenueStats } from '@/hooks/useRevenueStats';
import { cn } from '@/lib/utils/cn';

export function AdminDashboardContent() {
  const t = useAdminDashboardT();
  const isFirstVisit = useFirstVisit('admin-overview');
  const { loading: usersLoading } = useUserStats();
  const { loading: coursesLoading } = useCourseStats();
  const { monthly, loading: revenueLoading } = useRevenueStats();

  const showPageSkeleton =
    isFirstVisit && (usersLoading || coursesLoading || revenueLoading);

  const monthlyRevenueData = monthly
    ? monthly.months.map((month, i) => ({
        month,
        amount: monthly.amounts[i] ?? 0,
      }))
    : undefined;

  return (
    <div className="bg-background relative flex min-h-full flex-col">
      {isFirstVisit && (
        <div
          className={cn(
            'absolute inset-0 z-10 transition-opacity duration-500',
            showPageSkeleton ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <AdminDashboardSkeleton />
        </div>
      )}

      {/* Real content */}
      <div
        className={cn(
          'flex min-h-full flex-col',
          isFirstVisit && 'transition-opacity duration-500',
          showPageSkeleton && 'opacity-0',
        )}
      >
        <TopBar role="admin" title={t('platformOverview')} />

        <div className="flex-1 space-y-8 px-4 py-6 sm:px-6 lg:px-8">
          <DashboardStatGrid firstVisit={isFirstVisit} />

          <div className="grid gap-6 md:grid-cols-[1fr_260px] lg:grid-cols-3">
            <MonthlyRevenueCard
              data={monthlyRevenueData}
              className="lg:col-span-2"
            />
            <UserDistributionContainer firstVisit={isFirstVisit} />
          </div>

          <CourseWidgetsContainer firstVisit={isFirstVisit} />
        </div>
      </div>
    </div>
  );
}
