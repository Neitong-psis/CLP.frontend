'use client';

import { useState } from 'react';
import CreateCourseWizard from '@/components/pages/educator/CreateCourseWizard';
import {
  Search,
  MoreHorizontal,
  Star,
  Plus,
  LayoutList,
  LayoutGrid,
  Users,
  DollarSign,
  BookOpen,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import {
  EDUCATOR_COURSES,
  type CourseStatus,
  type EducatorCourse,
} from '@/constants/educator';
import EducatorTopBar from '@/components/pages/educator/EducatorTopBar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

// ─── Styles ──────────────────────────────────────────────────────────────────

const STATUS_STYLE: Record<
  CourseStatus,
  { dot: string; text: string; bg: string }
> = {
  Published: {
    dot: 'bg-emerald-400',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
  },
  Draft: { dot: 'bg-slate-400', text: 'text-slate-500', bg: 'bg-slate-100' },
  'Under Review': {
    dot: 'bg-amber-400',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
  },
};

const CATEGORY_COLOR: Record<string, string> = {
  'Web Development': 'bg-blue-500',
  Programming: 'bg-violet-500',
  'Data Science': 'bg-emerald-500',
  'Cloud Computing': 'bg-cyan-500',
  DevOps: 'bg-orange-500',
  Design: 'bg-pink-500',
};

// ─── Shared sub-components ───────────────────────────────────────────────────

function StatusBadge({ status }: { status: CourseStatus }) {
  const s = STATUS_STYLE[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold',
        s.bg,
        s.text,
      )}
    >
      <span className={cn('size-1.5 rounded-full', s.dot)} />
      {status}
    </span>
  );
}

function CourseActions({ course: _course }: { course: EducatorCourse }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 outline-none transition-colors hover:bg-slate-100 hover:text-slate-600"
          aria-label="Course actions"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit course</DropdownMenuItem>
        <DropdownMenuItem>View analytics</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="focus:text-red-300 text-red-400">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Table view ──────────────────────────────────────────────────────────────

function TableView({ courses }: { courses: EducatorCourse[] }) {
  if (courses.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white py-16 text-center">
        <BookOpen className="mx-auto mb-3 h-8 w-8 text-slate-200" />
        <p className="text-sm text-slate-400">No courses match your search.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              
              {[
                'Course',
                'Status',
                'Level',
                'Enrolled',
                'Completion',
                'Rating',
                'Revenue',
                '',
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[10px] font-bold tracking-widest text-slate-400 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {courses.map((course) => (
              <tr
                key={course.id}
                className="group transition-colors hover:bg-slate-50/70"
              >
                {/* <td className="px-4 py-3.5">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded accent-brand-gold opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </td> */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'h-8 w-1 shrink-0 rounded-full',
                        CATEGORY_COLOR[course.category] ?? 'bg-slate-300',
                      )}
                    />
                    <div>
                      <p className="text-brand-navy text-[13px] font-semibold leading-tight">
                        {course.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {course.category} · Updated {course.updatedAt}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={course.status} />
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-[11px] font-medium text-slate-500">
                    {course.level}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-[13px] tabular-nums text-slate-600">
                  {course.enrolled.toLocaleString()}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-16 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="bg-brand-gold h-full rounded-full"
                        style={{ width: `${course.completionRate}%` }}
                      />
                    </div>
                    <span className="text-[11px] tabular-nums text-slate-400">
                      {course.completionRate}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  {course.rating > 0 ? (
                    <span className="text-brand-gold flex items-center gap-1 text-[13px] font-semibold">
                      <Star className="h-3 w-3 fill-current" />
                      {course.rating.toFixed(1)}
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-300">—</span>
                  )}
                </td>
                <td className="text-brand-gold px-4 py-3.5 text-[13px] font-semibold tabular-nums">
                  {course.revenue}
                </td>
                <td className="px-4 py-3.5">
                  <CourseActions course={course} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Card view ───────────────────────────────────────────────────────────────

function CardView({ courses }: { courses: EducatorCourse[] }) {
  if (courses.length === 0) {
    return (
      <div className="py-16 text-center">
        <BookOpen className="mx-auto mb-3 h-8 w-8 text-slate-200" />
        <p className="text-sm text-slate-400">No courses match your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <div
          key={course.id}
          className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md hover:shadow-slate-100"
        >
          {/* Category stripe */}
          <div
            className={cn(
              'h-1 w-full',
              CATEGORY_COLOR[course.category] ?? 'bg-slate-300',
            )}
          />

          <div className="flex flex-1 flex-col p-5">
            {/* Header row */}
            <div className="flex items-start justify-between gap-2">
              <StatusBadge status={course.status} />
              <CourseActions course={course} />
            </div>

            {/* Title */}
            <h3 className="text-brand-navy mt-3 line-clamp-2 text-[13px] font-bold leading-snug">
              {course.title}
            </h3>
            <p className="mt-1 text-[11px] text-slate-400">
              {course.category} · {course.level}
            </p>

            {/* Completion bar */}
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  Completion
                </span>
                <span className="text-[11px] tabular-nums text-slate-400">
                  {course.completionRate}%
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="bg-brand-gold h-full rounded-full transition-[width] duration-500"
                  style={{ width: `${course.completionRate}%` }}
                />
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-4 grid grid-cols-3 divide-x divide-slate-100 rounded-lg bg-slate-50 py-2.5">
              <div className="flex flex-col items-center gap-0.5 px-2">
                <Users className="h-3 w-3 text-slate-400" />
                <span className="text-brand-navy text-[13px] font-bold tabular-nums">
                  {course.enrolled}
                </span>
                <span className="text-[10px] text-slate-400">Enrolled</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 px-2">
                <Star className="text-brand-gold h-3 w-3 fill-current" />
                <span className="text-brand-navy text-[13px] font-bold">
                  {course.rating > 0 ? course.rating.toFixed(1) : '—'}
                </span>
                <span className="text-[10px] text-slate-400">Rating</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 px-2">
                <DollarSign className="h-3 w-3 text-slate-400" />
                <span className="text-brand-navy text-[13px] font-bold tabular-nums">
                  {course.revenue}
                </span>
                <span className="text-[10px] text-slate-400">Revenue</span>
              </div>
            </div>

            <p className="mt-3 text-[10px] text-slate-300">
              Updated {course.updatedAt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EducatorCoursesPage() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CourseStatus | 'All'>('All');
  const [view, setView] = useState<'table' | 'card'>('table');

  const filtered = EDUCATOR_COURSES.filter((c) => {
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <EducatorTopBar
        role="educator"
        title="My Courses"
        subtitle={`${EDUCATOR_COURSES.length} courses`}
      />

      <div className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
        {/* Toolbar */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search courses…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:border-brand-gold focus:ring-brand-gold/20 h-8 w-52 rounded-md border border-slate-200 bg-white pl-8 pr-3 text-xs text-slate-700 placeholder-slate-400 outline-none transition focus:ring-1"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as CourseStatus | 'All')
              }
              className="focus:border-brand-gold focus:ring-brand-gold/20 h-8 cursor-pointer appearance-none rounded-md border border-slate-200 bg-white py-0 pl-3 pr-7 text-xs text-slate-700 outline-none transition focus:ring-1"
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Under Review">Under Review</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-3 w-3 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* View toggle */}
            <div className="flex items-center rounded-md border border-slate-200 bg-white p-0.5">
              <button
                onClick={() => setView('table')}
                aria-label="Table view"
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded transition-colors',
                  view === 'table'
                    ? 'bg-brand-navy text-white'
                    : 'text-slate-400 hover:text-slate-600',
                )}
              >
                <LayoutList className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setView('card')}
                aria-label="Card view"
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded transition-colors',
                  view === 'card'
                    ? 'bg-brand-navy text-white'
                    : 'text-slate-400 hover:text-slate-600',
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
            </div>

            <Button
              variant="secondary"
              size="sm"
              className="gap-1.5 text-xs"
              onClick={() => setWizardOpen(true)}
            >
              <Plus className="h-3.5 w-3.5" />
              Create Course
            </Button>
          </div>
        </div>

        {/* Results summary */}
        <p className="mb-3 text-xs text-slate-400">
          {filtered.length}{' '}
          {filtered.length === 1 ? 'course' : 'courses'}
          {statusFilter !== 'All' && ` · ${statusFilter}`}
          {search && ` matching "${search}"`}
        </p>

        {view === 'table' ? (
          <TableView courses={filtered} />
        ) : (
          <CardView courses={filtered} />
        )}
      </div>

      {wizardOpen && <CreateCourseWizard onClose={() => setWizardOpen(false)} />}
    </div>
  );
}
