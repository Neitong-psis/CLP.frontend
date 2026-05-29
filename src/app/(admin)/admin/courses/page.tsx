'use client';

import { useState } from 'react';
import {
  Search,
  Star,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Eye,
  Trash2,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import {
  ADMIN_COURSES,
  APPROVAL_QUEUE,
  type CourseStatus,
} from '@/constants/admin';
import { Button } from '@/components/ui/button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TopBar from '@/components/common/TopBar';

const PAGE_SIZE = 8;

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

const STATUS_FILTERS: Array<CourseStatus | 'All'> = [
  'All',
  'Public',
  'Pending',
  'Archive',
];

export default function AdminCoursesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CourseStatus | 'All'>('All');
  const [page, setPage] = useState(1);
  const [approvalSearch, setApprovalSearch] = useState('');

  const filtered = ADMIN_COURSES.filter((c) => {
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const pageStart =
    filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const pageEnd = Math.min(currentPage * PAGE_SIZE, filtered.length);

  function handleSearch(val: string) {
    setSearch(val);
    setPage(1);
  }

  function handleStatusFilter(val: CourseStatus | 'All') {
    setStatusFilter(val);
    setPage(1);
  }

  const filteredQueue = APPROVAL_QUEUE.filter((q) => {
    if (!approvalSearch) return true;
    const s = approvalSearch.toLowerCase();
    return (
      q.title.toLowerCase().includes(s) ||
      q.instructor.toLowerCase().includes(s)
    );
  });

  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        role="admin"
        title="Course Management"
        subtitle="Live workspace synced for admin@clp.com"
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Toolbar */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div className="relative min-w-48 flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="focus:border-brand-gold/50 focus:ring-brand-gold/10 h-9 w-full rounded-lg border border-slate-200 bg-white pr-3 pl-9 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2"
            />
          </div>
          <div className="flex gap-0.5 rounded-full border border-slate-200 bg-white p-1">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => handleStatusFilter(s)}
                className={cn(
                  'rounded-full px-3.5 py-1 text-xs font-semibold transition-colors',
                  statusFilter === s
                    ? 'bg-brand-gold text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="w-10 px-4 py-3.5 text-left text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                    #
                  </th>
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
                {paginated.map((course, idx) => (
                  <tr
                    key={course.id}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <td className="px-4 py-4 text-xs text-slate-400">
                      {pageStart + idx}
                    </td>
                    <td className="max-w-55 px-5 py-4">
                      <p className="truncate text-sm font-semibold text-teal-600">
                        {course.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {course.level}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {course.instructor}
                    </td>
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
                    <td className="px-5 py-4 text-sm text-slate-700">
                      {course.enrolled.toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        {course.rating.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {course.createdAt}
                    </td>
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
                    <td className="px-5 py-4">
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              aria-label="Course actions"
                              className="rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 [&_svg]:size-4"
                            >
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="border border-slate-200 bg-white shadow-md"
                          >
                            <DropdownMenuLabel className="text-slate-400">
                              Actions
                            </DropdownMenuLabel>
                            <DropdownMenuItem className="text-slate-700 focus:bg-slate-50 focus:text-slate-900">
                              <Eye className="h-3.5 w-3.5" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-700 focus:bg-slate-50 focus:text-slate-900">
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700">
                              <Check className="h-3.5 w-3.5" />
                              Publish
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-100" />
                            <DropdownMenuItem className="text-rose-500 focus:bg-rose-50 focus:text-rose-600">
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
            <p className="text-xs text-slate-400">
              Showing {pageStart}–{pageEnd} of {filtered.length} courses
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
              >
                <ChevronLeft />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setPage(p)}
                  className={cn(
                    'rounded-lg text-xs',
                    p === currentPage
                      ? 'bg-slate-900 text-white hover:bg-slate-800 hover:text-white'
                      : 'text-slate-500 hover:bg-slate-100',
                  )}
                >
                  {p}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
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
                className="focus:border-brand-gold/50 focus:ring-brand-gold/10 h-9 w-52 rounded-lg border border-slate-200 bg-white pr-3 pl-9 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredQueue.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                    APPROVAL_CATEGORY_STYLE[item.category] ??
                      'bg-slate-100 text-slate-600',
                  )}
                >
                  {item.category}
                </span>
                <p className="mt-3 text-sm leading-snug font-bold text-slate-900">
                  {item.title}
                </p>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-slate-500">
                    <span className="font-medium text-slate-700">
                      Educator:
                    </span>{' '}
                    {item.instructor}
                  </p>
                  <p className="text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Lessons:</span>{' '}
                    {item.lessons}
                  </p>
                  <p className="text-xs text-slate-500">
                    <span className="font-medium text-slate-700">
                      Submitted:
                    </span>{' '}
                    {item.submittedAt}
                  </p>
                </div>
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
