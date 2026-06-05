'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, Award } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Course } from '@/constants/learner';

type Tab = 'in-progress' | 'completed' | 'all';

interface TabDef {
  value: Tab;
  label: string;
  count: number;
}

export default function MyLearningTabs({ courses }: { courses: Course[] }) {
  const [tab, setTab] = useState<Tab>('in-progress');

  const inProgress = courses.filter((c) => !c.completed);
  const completed = courses.filter((c) => c.completed);

  const TABS: TabDef[] = [
    { value: 'in-progress', label: 'In Progress', count: inProgress.length },
    { value: 'completed', label: 'Completed', count: completed.length },
    { value: 'all', label: 'All', count: courses.length },
  ];

  const shown =
    tab === 'in-progress'
      ? inProgress
      : tab === 'completed'
        ? completed
        : courses;

  return (
    <div>
      {/* Tab pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map(({ value, label, count }) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors',
              tab === value
                ? 'border-brand-gold text-brand-gold'
                : 'hover:text-brand-navy border-slate-200 text-slate-500 hover:border-slate-300',
            )}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="py-16 text-center text-sm text-slate-400">
          {tab === 'in-progress'
            ? 'No courses in progress.'
            : 'No completed courses yet.'}
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      {/* Thumbnail */}
      <div className="flex h-52 items-center justify-center bg-slate-100">
        {course.completed ? (
          <Award className="h-12 w-12 text-slate-300" />
        ) : (
          <Play className="h-12 w-12 text-slate-300" />
        )}
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <p className="mb-1 text-xs font-medium text-slate-400">
          {course.category}
        </p>
        <p className="text-brand-navy mb-0.5 text-base leading-snug font-bold">
          {course.title}
        </p>
        <p className="mb-5 text-xs text-slate-400">
          by {course.author} &mdash; {course.level}
        </p>

        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-slate-500">Progress</span>
          <span className="text-brand-navy font-bold">{course.progress}%</span>
        </div>
        <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              course.completed ? 'bg-brand-navy' : 'bg-brand-gold',
            )}
            style={{ width: `${course.progress}%` }}
          />
        </div>

        {course.completed ? (
          <Link
            href="/certificates"
            className="bg-brand-navy hover:bg-brand-navy-tint flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold text-white transition-colors"
          >
            <Award className="h-4 w-4" />
            View Certificate
          </Link>
        ) : (
          <Link
            href={`/learn/${course.id}`}
            className="bg-brand-gold hover:bg-brand-gold-dark flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold text-white transition-colors"
          >
            <Play className="h-4 w-4" />
            Continue
          </Link>
        )}
      </div>
    </div>
  );
}
