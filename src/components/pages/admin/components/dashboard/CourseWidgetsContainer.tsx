'use client';

import { cn } from '@/lib/utils/cn';
import { useCourseStats } from '@/hooks/useCourseStats';
import { TOP_PERFORMING_COURSES, REVENUE_BY_CATEGORY } from '@/constants/admin';
import { TopCoursesCard } from './TopCoursesCard';
import { RevenueByCategoryCard } from './RevenueByCategoryCard';

interface CourseWidgetsContainerProps {
  firstVisit?: boolean;
  className?: string;
}

function TopCoursesSkeleton({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'border-border bg-card overflow-hidden rounded-2xl border-[0.5px]',
        className,
      )}
    >
      <header className="border-border flex items-center justify-between border-b px-6 py-4">
        <div className="bg-muted h-3.5 w-40 animate-pulse rounded" />
        <div className="bg-muted h-3 w-16 animate-pulse rounded" />
      </header>
      <ul className="divide-border divide-y">
        {Array.from({ length: 5 }).map((_, i) => (
          <li
            key={i}
            className="flex animate-pulse items-center gap-4 px-6 py-3.5"
          >
            <div className="bg-muted h-4 w-4 shrink-0 rounded" />
            <div className="bg-muted h-9 w-9 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="bg-muted h-3 w-48 rounded" />
              <div className="bg-muted h-2.5 w-28 rounded" />
              <div className="bg-muted h-0.5 w-full rounded-full" />
            </div>
            <div className="hidden shrink-0 space-y-1 text-right sm:block">
              <div className="bg-muted h-3 w-16 rounded" />
              <div className="bg-muted h-2.5 w-12 rounded" />
            </div>
            <div className="bg-muted h-6 w-11 shrink-0 rounded-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}

function RevenueCategorySkeleton({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'border-border bg-card flex h-full flex-col rounded-2xl border-[0.5px] p-6',
        className,
      )}
    >
      <div className="mb-6 flex items-start justify-between gap-2">
        <div className="space-y-1.5">
          <div className="bg-muted h-3.5 w-36 animate-pulse rounded" />
          <div className="bg-muted h-2.5 w-28 animate-pulse rounded" />
        </div>
        <div className="bg-muted h-5 w-6 animate-pulse rounded-full" />
      </div>
      <ul className="flex flex-1 flex-col justify-between">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="animate-pulse">
            <div className="mb-2 flex items-center gap-2">
              <div className="bg-muted h-3 w-4 rounded" />
              <div className="bg-muted h-3 flex-1 rounded" />
              <div className="bg-muted h-3 w-12 rounded" />
            </div>
            <div className="flex items-center gap-2 pl-6">
              <div className="bg-muted h-2 flex-1 rounded-full" />
              <div className="bg-muted h-2.5 w-8 rounded" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CourseWidgetsContainer({
  firstVisit = false,
  className,
}: CourseWidgetsContainerProps) {
  const { data, loading } = useCourseStats();

  const topCourses = data?.topCourses.length
    ? data.topCourses
    : TOP_PERFORMING_COURSES.map((c) => ({
        title: c.title,
        instructor: c.instructor,
        students: c.students,
        progress: c.progress,
      }));

  const revenueByCategory = data?.revenueByCategory.length
    ? data.revenueByCategory
    : REVENUE_BY_CATEGORY;

  if (loading) {
    return (
      <div
        className={cn(
          'grid gap-6 md:grid-cols-[1fr_280px] lg:grid-cols-3',
          className,
        )}
      >
        <TopCoursesSkeleton className="lg:col-span-2" />
        <RevenueCategorySkeleton />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid gap-6 md:grid-cols-[1fr_280px] lg:grid-cols-3',
        !firstVisit && 'animate-in fade-in slide-in-from-bottom-2 duration-500',
        className,
      )}
    >
      <TopCoursesCard data={topCourses} className="lg:col-span-2" />
      <RevenueByCategoryCard data={revenueByCategory} />
    </div>
  );
}
