'use client';

import { TrendingUp, DollarSign, Users, BookOpen } from 'lucide-react';
import { DASHBOARD_STATS, MONTHLY_REVENUE } from '@/constants/admin';
import { useUserStats } from '@/hooks/useUserStats';
import { useCourseStats } from '@/hooks/useCourseStats';
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
  const enrollments = stat('Total Enrollments');
  const revenue = stat('Monthly Revenue');
  const users = stat('Total Users');
  const courses = stat('Active Courses');

  const { data: userStats, loading: usersLoading } = useUserStats();
  const { data: courseStats, loading: coursesLoading } = useCourseStats();

  const usersValue = userStats ? userStats.total.toLocaleString() : users.value;
  const usersChange = userStats ? formatTrend(userStats.trend) : users.change;
  const coursesValue = courseStats
    ? courseStats.activeCourses.toString()
    : courses.value;

  // Animate-in class only fires on return visits. On first visit the page-level
  // opacity transition handles the reveal, so we skip it here.
  const cardEntrance = !firstVisit
    ? 'animate-in fade-in slide-in-from-bottom-2 duration-500'
    : '';

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Static cards — always visible immediately */}
      <StatCard
        label={enrollments.label}
        value={enrollments.value}
        change={enrollments.change}
        href="/admin/courses"
        icon={TrendingUp}
      />
      <StatCard
        label={revenue.label}
        value={revenue.value}
        change={revenue.change}
        href="/admin/revenue"
        icon={DollarSign}
        spark={MONTHLY_REVENUE.map((m) => m.amount)}
      />

      {/* Total Users — per-card skeleton on every data load */}
      {usersLoading ? (
        <StatCardSkeleton />
      ) : (
        <div className={cn(cardEntrance)}>
          <StatCard
            label={users.label}
            value={usersValue}
            change={usersChange}
            href="/admin/users"
            icon={Users}
          />
        </div>
      )}

      {/* Active Courses — per-card skeleton on every data load */}
      {coursesLoading ? (
        <StatCardSkeleton />
      ) : (
        <div className={cn(cardEntrance)}>
          <StatCard
            label={courses.label}
            value={coursesValue}
            change={courses.change}
            href="/admin/courses"
            icon={BookOpen}
          />
        </div>
      )}
    </div>
  );
}
