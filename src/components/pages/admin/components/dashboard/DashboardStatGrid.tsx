'use client';

import { TrendingUp, DollarSign, Users, BookOpen, Award } from 'lucide-react';
import { DASHBOARD_STATS, MONTHLY_REVENUE } from '@/constants/admin';
import { useAdminDashboardT } from '@/i18n';
import { useUserStats } from '@/hooks/useUserStats';
import { useCourseStats } from '@/hooks/useCourseStats';
import { useEnrollmentStats } from '@/hooks/useEnrollmentStats';
import { useCertificateStats } from '@/hooks/useCertificateStats';
import { formatCurrencyCompact } from '@/lib/utils/stats';
import { cn } from '@/lib/utils/cn';
import { StatCard } from './StatCard';

interface DashboardStatGridProps {
  /** True on the very first page load — suppresses per-card animate-in so the
   *  page-level fade-in handles the reveal instead. */
  firstVisit?: boolean;
}

const stat = (label: string) => DASHBOARD_STATS.find((s) => s.label === label)!;

function formatTrend(trend: number): string {
  if (trend === 0) return '0%';
  return trend > 0 ? `+${trend}%` : `${trend}%`;
}

function StatCardSkeleton() {
  return (
    <div className="border-border bg-card flex flex-col rounded-2xl border-[0.5px] p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="bg-muted h-3 w-28 animate-pulse rounded" />
        <div className="bg-muted size-7 animate-pulse rounded-full" />
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="bg-muted h-8 w-24 animate-pulse rounded" />
        <div className="bg-muted h-6 w-14 animate-pulse rounded-full" />
      </div>
      <div className="bg-muted mt-2 h-2.5 w-20 animate-pulse rounded" />
    </div>
  );
}

export function DashboardStatGrid({
  firstVisit = false,
}: DashboardStatGridProps) {
  const t = useAdminDashboardT();
  const enrollments = stat('Total Enrollments');
  const revenue = stat('Monthly Revenue');
  const users = stat('Total Users');
  const courses = stat('Active Courses');
  const certificates = stat('Total Issued Certificates');

  const { data: userStats, loading: usersLoading } = useUserStats();
  const { data: courseStats, loading: coursesLoading } = useCourseStats();
  const { data: enrollmentStats, loading: enrollmentsLoading } =
    useEnrollmentStats();
  const { data: certificateStats, loading: certificatesLoading } =
    useCertificateStats();

  const usersValue = userStats ? userStats.total.toLocaleString() : users.value;
  const usersChange = userStats ? formatTrend(userStats.trend) : users.change;
  const coursesValue = courseStats
    ? courseStats.activeCourses.toString()
    : courses.value;
  const enrollmentsValue = enrollmentStats
    ? enrollmentStats.total.toLocaleString()
    : enrollments.value;
  const enrollmentsChange = enrollmentStats
    ? formatTrend(enrollmentStats.trend)
    : enrollments.change;
  const revenueValue = enrollmentStats
    ? formatCurrencyCompact(enrollmentStats.monthlyRevenue.value)
    : revenue.value;
  const revenueChange = enrollmentStats
    ? formatTrend(enrollmentStats.monthlyRevenue.trend)
    : revenue.change;
  const certificatesValue = certificateStats
    ? certificateStats.total.toLocaleString()
    : certificates.value;
  const certificatesChange = certificateStats
    ? formatTrend(certificateStats.trend)
    : certificates.change;

  // Animate-in class only fires on return visits. On first visit the page-level
  // opacity transition handles the reveal, so we skip it here.
  const cardEntrance = !firstVisit
    ? 'animate-in fade-in slide-in-from-bottom-2 duration-500'
    : '';

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {/* Active Courses */}
      {coursesLoading ? (
        <StatCardSkeleton />
      ) : (
        <div className={cn(cardEntrance)}>
          <StatCard
            label={t('activeCourses')}
            value={coursesValue}
            change={courses.change}
            href="/admin/courses"
            icon={BookOpen}
          />
        </div>
      )}

      {/* Total Users */}
      {usersLoading ? (
        <StatCardSkeleton />
      ) : (
        <div className={cn(cardEntrance)}>
          <StatCard
            label={t('totalUsers')}
            value={usersValue}
            change={usersChange}
            href="/admin/users"
            icon={Users}
          />
        </div>
      )}

      {/* Monthly Revenue */}
      {enrollmentsLoading ? (
        <StatCardSkeleton />
      ) : (
        <div className={cn(cardEntrance)}>
          <StatCard
            label={t('monthlyRevenue')}
            value={revenueValue}
            change={revenueChange}
            href="/admin/revenue"
            icon={DollarSign}
            spark={MONTHLY_REVENUE.map((m) => m.amount)}
          />
        </div>
      )}

      {/* Total Enrollments */}
      {enrollmentsLoading ? (
        <StatCardSkeleton />
      ) : (
        <div className={cn(cardEntrance)}>
          <StatCard
            label={t('totalEnrollments')}
            value={enrollmentsValue}
            change={enrollmentsChange}
            href="/admin/courses"
            icon={TrendingUp}
          />
        </div>
      )}

      {/* Total Issued Certificates */}
      {certificatesLoading ? (
        <StatCardSkeleton />
      ) : (
        <div className={cn(cardEntrance)}>
          <StatCard
            label={t('totalCertificates')}
            value={certificatesValue}
            change={certificatesChange}
            href="/admin/certifications"
            icon={Award}
          />
        </div>
      )}
    </div>
  );
}
