'use client';

import { cn } from '@/lib/utils/cn';
import { useCourseStats } from '@/hooks/useCourseStats';
import { TOP_PERFORMING_COURSES } from '@/constants/admin';
import { TopCoursesCard } from './TopCoursesCard';

interface TopCoursesContainerProps {
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

export function TopCoursesContainer({
  firstVisit = false,
  className,
}: TopCoursesContainerProps) {
  const { data, loading } = useCourseStats();

  if (loading) {
    return <TopCoursesSkeleton className={className} />;
  }

  const topCourses = data?.topCourses.length
    ? data.topCourses
    : TOP_PERFORMING_COURSES.map((c) => ({
        title: c.title,
        instructor: c.instructor,
        students: c.students,
        progress: c.progress,
      }));

  return (
    <TopCoursesCard
      data={topCourses}
      className={cn(
        !firstVisit && 'animate-in fade-in slide-in-from-bottom-2 duration-500',
        className,
      )}
    />
  );
}
