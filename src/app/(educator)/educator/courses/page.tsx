'use client';

import { useState } from 'react';
import { Search, PlusCircle, MoreHorizontal, Star } from 'lucide-react';
import { cn } from '@/utils/cn';
import { EDUCATOR_COURSES, type CourseStatus } from '@/constants/educator';
import EducatorTopBar from '@/components/pages/educator/EducatorTopBar';

const STATUS_STYLE: Record<CourseStatus, string> = {
  Published: 'bg-brand-gold/15 text-brand-gold',
  Draft: 'bg-slate-100 text-slate-500',
  'Under Review': 'bg-slate-200 text-slate-600',
};

const LEVEL_STYLE: Record<string, string> = {
  Beginner: 'text-brand-gold',
  Intermediate: 'text-slate-600',
  Advanced: 'text-slate-400',
};

export default function EducatorCoursesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CourseStatus | 'All'>('All');

  const filtered = EDUCATOR_COURSES.filter((c) => {
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <EducatorTopBar
        title="My Courses"
        subtitle={`${EDUCATOR_COURSES.length} total courses`}
        actions={
          <button className="bg-brand-gold hover:bg-brand-gold-dark flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white transition-colors">
            <PlusCircle className="h-4 w-4" />
            New Course
          </button>
        }
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search courses…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:border-brand-gold focus:ring-brand-gold/10 h-10 w-full rounded-lg border border-slate-200 bg-white pr-3 pl-9 text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none focus:ring-2"
            />
          </div>
          <div className="flex gap-2">
            {(['All', 'Published', 'Draft', 'Under Review'] as const).map(
              (s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors',
                    statusFilter === s
                      ? 'bg-brand-gold text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700',
                  )}
                >
                  {s}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  {[
                    'Course',
                    'Level',
                    'Enrolled',
                    'Completion',
                    'Rating',
                    'Revenue',
                    'Status',
                    '',
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left text-[11px] font-semibold tracking-wide text-slate-400 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((course) => (
                  <tr
                    key={course.id}
                    className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                  >
                    <td className="max-w-[200px] px-5 py-3.5">
                      <p className="text-brand-navy truncate font-medium">
                        {course.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {course.category} · {course.updatedAt}
                      </p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          'text-xs font-semibold',
                          LEVEL_STYLE[course.level] ?? 'text-slate-500',
                        )}
                      >
                        {course.level}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">
                      {course.enrolled}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="bg-brand-gold h-full rounded-full"
                            style={{ width: `${course.completionRate}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {course.completionRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      {course.rating > 0 ? (
                        <span className="text-brand-gold flex items-center gap-1 text-xs font-semibold">
                          <Star className="h-3 w-3 fill-current" />
                          {course.rating.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-300">—</span>
                      )}
                    </td>
                    <td className="text-brand-gold px-5 py-3.5 text-sm font-semibold">
                      {course.revenue}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-[11px] font-bold',
                          STATUS_STYLE[course.status],
                        )}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-slate-100 hover:text-slate-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-slate-400">
              No courses match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
