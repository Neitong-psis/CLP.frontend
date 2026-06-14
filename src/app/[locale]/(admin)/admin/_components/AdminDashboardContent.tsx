'use client';

import { QUIZ_ANALYTICS } from '@/constants/admin';
import TopBar from '@/components/common/TopBar';
import { DashboardStatGrid } from '@/components/pages/admin/components/dashboard/DashboardStatGrid';
import { UserDistributionContainer } from '@/components/pages/admin/components/dashboard/UserDistributionContainer';
import { MonthlyRevenueCard } from '@/components/pages/admin/components/dashboard/MonthlyRevenueCard';
import { QuizAnalyticsCard } from '@/components/pages/admin/components/dashboard/QuizAnalyticsCard';
import { CourseWidgetsContainer } from '@/components/pages/admin/components/dashboard/CourseWidgetsContainer';
import { AdminDashboardSkeleton } from '@/components/pages/admin/components/dashboard/AdminDashboardSkeleton';
import { useFirstVisit } from '@/hooks/useFirstVisit';
import { useUserStats } from '@/hooks/useUserStats';
import { useCourseStats } from '@/hooks/useCourseStats';
import { cn } from '@/lib/utils/cn';

export function AdminDashboardContent() {
  const isFirstVisit = useFirstVisit('admin-overview');

  // Track page-level loading only on first visit so the skeleton knows when to exit.
  // On return visits the hooks still run but isFirstVisit is false, so the results
  // are irrelevant to the overlay and the individual components handle their own state.
  const { loading: usersLoading } = useUserStats();
  const { loading: coursesLoading } = useCourseStats();

  const showPageSkeleton = isFirstVisit && (usersLoading || coursesLoading);

  return (
    <div className="bg-background relative flex min-h-full flex-col">
      {/* Full-page skeleton overlay — visible only during the very first load */}
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

      {/* Real content — opacity-0 while skeleton is covering it on first visit */}
      <div
        className={cn(
          'flex min-h-full flex-col',
          isFirstVisit && 'transition-opacity duration-500',
          showPageSkeleton && 'opacity-0',
        )}
      >
        <TopBar role="admin" title="Platform Overview" />

        <div className="flex-1 space-y-8 px-6 py-8 lg:px-8">
          <DashboardStatGrid firstVisit={isFirstVisit} />

          <div className="grid gap-6 lg:grid-cols-3">
            <MonthlyRevenueCard className="lg:col-span-2" />
            <UserDistributionContainer firstVisit={isFirstVisit} />
          </div>

          <CourseWidgetsContainer firstVisit={isFirstVisit} />

          <QuizAnalyticsCard data={QUIZ_ANALYTICS} />
        </div>
      </div>
    </div>
  );
}
