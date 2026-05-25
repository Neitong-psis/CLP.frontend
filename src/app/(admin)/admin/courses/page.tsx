'use client';

import { useState } from 'react';
import { Search, Plus, Star, Check, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import {
  ADMIN_COURSES,
  APPROVAL_QUEUE,
  type CourseStatus,
} from '@/constants/admin';
import AdminTopBar from '@/components/pages/admin/AdminTopBar';

const STATUS_STYLE: Record<CourseStatus, string> = {
  Public: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  Pending: 'border border-amber-200 bg-amber-50 text-amber-600',
  Archive: 'border border-slate-200 bg-slate-50 text-slate-500',
};

const CATEGORY_STYLE: Record<string, string> = {
  'Web Development': 'border border-blue-200 bg-blue-50 text-blue-600',
  'Data Science': 'border border-teal-200 bg-teal-50 text-teal-600',
  'Cloud Computing': 'border border-slate-200 bg-slate-100 text-slate-600',
  Programming: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  DevOps: 'border border-orange-200 bg-orange-50 text-orange-600',
  Design: 'border border-violet-200 bg-violet-50 text-violet-600',
};

const APPROVAL_CATEGORY_STYLE: Record<string, string> = {
  DevOps: 'bg-orange-100 text-orange-600',
  'Web Development': 'bg-blue-100 text-blue-600',
  'Data Science': 'bg-teal-100 text-teal-600',
};

function formatEnrolled(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(0) + 'k';
  return String(n);
}

export default function AdminCoursesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CourseStatus | 'All'>('All');
  const [approvalSearch, setApprovalSearch] = useState('');

  const filtered = ADMIN_COURSES.filter((c) => {
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const filteredQueue = APPROVAL_QUEUE.filter((q) => {
    if (!approvalSearch) return true;
    const s = approvalSearch.toLowerCase();
    return q.title.toLowerCase().includes(s) || q.instructor.toLowerCase().includes(s);
  });

  return (
    <div className="flex min-h-full flex-col">
      <AdminTopBar
        title="Course Management"
        subtitle="Live workspace synced for admin@clp.com"
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Filter bar */}
        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative min-w-[200px] flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="focus:border-brand-gold/50 focus:ring-brand-gold/10 h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2"
              />
            </div>

            {/* Category filter pill */}
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100">
              <span>Category</span>
              <Plus className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* Educator filter pill */}
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100">
              <span>Educator</span>
              <Plus className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* Status filter pills */}
            <div className="flex items-center gap-1.5">
              {(['All', 'Public', 'Pending', 'Archive'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                    statusFilter === s
                      ? 'bg-brand-gold text-white'
                      : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Enrollment filter */}
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100">
              <span>Enrollment</span>
              <Plus className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* Rating filter */}
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100">
              <Star className="h-3.5 w-3.5 text-slate-400" />
              <span>Rating</span>
              <Plus className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {/* Created date filter */}
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100">
              <span>Created date</span>
              <Plus className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {(
                    [
                      ['COURSE', 'left'],
                      ['EDUCATOR', 'left'],
                      ['CATEGORY', 'left'],
                      ['ENROLLMENTS', 'left'],
                      ['RATING', 'left'],
                      ['CREATED', 'left'],
                      ['STATUS', 'left'],
                      ['ACTIONS', 'right'],
                    ] as const
                  ).map(([label, align]) => (
                    <th
                      key={label}
                      className={cn(
                        'px-5 py-3.5 text-[11px] font-semibold tracking-wide text-slate-400 uppercase',
                        align === 'right' ? 'text-right' : 'text-left',
                      )}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((course) => (
                  <tr
                    key={course.id}
                    className="transition-colors hover:bg-slate-50"
                  >
                    {/* Course title + level */}
                    <td className="max-w-[220px] px-5 py-4">
                      <p className="truncate text-sm font-semibold text-teal-600">
                        {course.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {course.level}
                      </p>
                    </td>

                    {/* Educator */}
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {course.instructor}
                    </td>

                    {/* Category badge */}
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                          CATEGORY_STYLE[course.category] ??
                            'border border-slate-200 bg-slate-50 text-slate-600',
                        )}
                      >
                        {course.category}
                      </span>
                    </td>

                    {/* Enrollments */}
                    <td className="px-5 py-4 text-sm text-slate-700">
                      {course.enrolled.toLocaleString()}
                    </td>

                    {/* Rating */}
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        {course.rating.toFixed(1)}
                      </span>
                    </td>

                    {/* Created */}
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {course.createdAt}
                    </td>

                    {/* Status badge */}
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                          STATUS_STYLE[course.status],
                        )}
                      >
                        {course.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1.5">
                        <button
                          aria-label="Approve course"
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-emerald-50 hover:text-emerald-500"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button
                          aria-label="Reject course"
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-rose-50 hover:text-rose-500"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
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

        {/* Approval Queue */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Approval Queue
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                {APPROVAL_QUEUE.length} courses pending review
              </p>
            </div>
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search queue..."
                value={approvalSearch}
                onChange={(e) => setApprovalSearch(e.target.value)}
                className="focus:border-brand-gold/50 focus:ring-brand-gold/10 h-9 w-52 rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredQueue.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                {/* Category chip */}
                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                    APPROVAL_CATEGORY_STYLE[item.category] ??
                      'bg-slate-100 text-slate-600',
                  )}
                >
                  {item.category}
                </span>

                {/* Title */}
                <p className="mt-3 text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </p>

                {/* Meta */}
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Educator:</span>{' '}
                    {item.instructor}
                  </p>
                  <p className="text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Lessons:</span>{' '}
                    {item.lessons}
                  </p>
                  <p className="text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Submitted:</span>{' '}
                    {item.submittedAt}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-50 py-2 text-xs font-bold text-emerald-600 transition-colors hover:bg-emerald-100">
                    <Check className="h-3.5 w-3.5" />
                    Approve
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-rose-50 py-2 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-100">
                    <X className="h-3.5 w-3.5" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredQueue.length === 0 && (
            <p className="py-8 text-center text-sm text-slate-400">
              No items in the approval queue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
