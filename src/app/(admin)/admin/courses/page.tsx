'use client';

import { useState } from 'react';
import { Search, PlusCircle, MoreHorizontal } from 'lucide-react';
import { cn } from '@/utils/cn';
import { ADMIN_COURSES, type CourseStatus } from '@/constants/admin';
import AdminTopBar from '@/components/pages/admin/AdminTopBar';

const STATUS_STYLE: Record<CourseStatus, string> = {
  Published: 'bg-emerald-500/15 text-emerald-400',
  Draft: 'bg-brand-gold/15 text-brand-gold',
  Archived: 'bg-white/[0.07] text-white/40',
};

const LEVEL_STYLE: Record<string, string> = {
  Beginner: 'text-brand-gold',
  Intermediate: 'text-white/70',
  Advanced: 'text-white/45',
};

export default function AdminCoursesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CourseStatus | 'All'>('All');

  const filtered = ADMIN_COURSES.filter((c) => {
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="flex min-h-full flex-col">
      <AdminTopBar
        title="Courses"
        subtitle={`${ADMIN_COURSES.length} total courses`}
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
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              type="search"
              placeholder="Search courses…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:border-brand-gold/50 h-10 w-full rounded-xl border border-white/[0.10] bg-white/[0.04] pr-3 pl-9 text-sm text-white placeholder-white/25 outline-none"
            />
          </div>
          <div className="flex gap-2">
            {(['All', 'Published', 'Draft', 'Archived'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors',
                  statusFilter === s
                    ? 'bg-brand-gold text-white'
                    : 'bg-white/[0.05] text-white/50 hover:bg-white/[0.10] hover:text-white',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  {[
                    'Course',
                    'Category',
                    'Level',
                    'Instructor',
                    'Enrolled',
                    'Completion',
                    'Status',
                    '',
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left text-[11px] font-semibold tracking-wide text-white/40 uppercase"
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
                    className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="max-w-[200px] px-5 py-3.5">
                      <p className="truncate font-medium text-white">
                        {course.title}
                      </p>
                      <p className="text-[11px] text-white/40">
                        {course.createdAt}
                      </p>
                    </td>
                    <td className="px-5 py-3.5 text-white/60">
                      {course.category}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          'text-xs font-semibold',
                          LEVEL_STYLE[course.level] ?? 'text-white/60',
                        )}
                      >
                        {course.level}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-white/60">
                      {course.instructor}
                    </td>
                    <td className="px-5 py-3.5 text-white/60">
                      {course.enrolled}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/[0.08]">
                          <div
                            className="bg-brand-gold h-full rounded-full"
                            style={{ width: `${course.completionRate}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-white/40">
                          {course.completionRate}%
                        </span>
                      </div>
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
                      <button className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/[0.07] hover:text-white/70">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-white/30">
              No courses match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
