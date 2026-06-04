'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  ArrowUpDown,
  Plus,
  MoreHorizontal,
  Star,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  CourseFilterPopover,
  EMPTY_FILTERS,
  CATEGORY_ITEMS,
  type CourseFilters,
} from './CourseFilterPopover';
import {
  EDUCATOR_COURSES,
  type CourseStatus,
  type EducatorCourse,
} from '@/constants/educator';

const PAGE_SIZE = 5;

// ─── Types ────────────────────────────────────────────────────────────────────

type SortKey = 'title' | 'enrolled' | 'rating' | 'completionRate' | 'revenue';
type SortDir = 'asc' | 'desc';

interface SortState {
  key: SortKey | null;
  dir: SortDir;
}

// ─── Constants ────────────────────────────────────────────────────────────────

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

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'title', label: 'Name (A–Z)' },
  { key: 'enrolled', label: 'Most Enrolled' },
  { key: 'rating', label: 'Highest Rated' },
  { key: 'completionRate', label: 'Completion Rate' },
  { key: 'revenue', label: 'Revenue' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORY_CODE_MAP: Record<string, string> = Object.fromEntries(
  CATEGORY_ITEMS.map((c) => [c.code, c.label]),
);

function parseRevenue(r: string): number {
  return parseFloat(r.replace(/[$,]/g, '')) || 0;
}

function compareRows(
  a: EducatorCourse,
  b: EducatorCourse,
  key: SortKey,
  dir: SortDir,
): number {
  let cmp = 0;
  if (key === 'revenue') {
    cmp = parseRevenue(a.revenue) - parseRevenue(b.revenue);
  } else if (key === 'title') {
    cmp = a.title.localeCompare(b.title);
  } else {
    cmp = (a[key] as number) - (b[key] as number);
  }
  return dir === 'asc' ? cmp : -cmp;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

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

function SortableHeader({
  label,
  sortKey,
  sort,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  sort: SortState;
  onSort: (key: SortKey) => void;
}) {
  const active = sort.key === sortKey;
  return (
    <th className="px-4 py-3 text-left">
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={cn(
          'inline-flex items-center gap-0.5 text-[10px] font-bold tracking-widest uppercase transition-colors',
          active ? 'text-brand-navy' : 'text-slate-400 hover:text-slate-600',
        )}
      >
        {label}
        {active ? (
          sort.dir === 'asc' ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )
        ) : (
          <ArrowUpDown className="h-3 w-3 opacity-40" />
        )}
      </button>
    </th>
  );
}

function StaticHeader({ label }: { label: string }) {
  return (
    <th className="px-4 py-3 text-left text-[10px] font-bold tracking-widest text-slate-400 uppercase">
      {label}
    </th>
  );
}

function RowActions({ course }: { course: EducatorCourse }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors outline-none hover:bg-slate-100 hover:text-slate-600"
          aria-label={`Actions for ${course.title}`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border border-slate-200 bg-white shadow-lg shadow-slate-200/50"
      >
        <DropdownMenuItem className="text-slate-600 focus:bg-slate-50 focus:text-slate-900">
          Edit course
        </DropdownMenuItem>
        <DropdownMenuItem className="text-slate-600 focus:bg-slate-50 focus:text-slate-900">
          View analytics
        </DropdownMenuItem>
        <DropdownMenuItem className="text-slate-600 focus:bg-slate-50 focus:text-slate-900">
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-100" />
        <DropdownMenuItem className="text-red-400 focus:bg-red-50 focus:text-red-600">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface CourseTableProps {
  onAddCourse: () => void;
}

export function CourseTable({ onAddCourse }: CourseTableProps) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortState>({ key: null, dir: 'asc' });
  const [filters, setFilters] = useState<CourseFilters>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);

  const handleSort = (key: SortKey) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc',
    }));
    setPage(1);
  };

  const courses = useMemo(() => {
    let result = [...EDUCATOR_COURSES];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((c) => c.title.toLowerCase().includes(q));
    }

    if (filters.category) {
      const label = CATEGORY_CODE_MAP[filters.category.code];
      if (label) result = result.filter((c) => c.category === label);
    }

    if (filters.statuses.length > 0) {
      result = result.filter((c) => filters.statuses.includes(c.status));
    }

    if (sort.key) {
      result.sort((a, b) => compareRows(a, b, sort.key!, sort.dir));
    }

    return result;
  }, [search, sort, filters]);

  const totalPages = Math.max(1, Math.ceil(courses.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = courses.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const pageStart =
    courses.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const pageEnd = Math.min(currentPage * PAGE_SIZE, courses.length);

  const activeSortLabel = SORT_OPTIONS.find((o) => o.key === sort.key)?.label;

  return (
    <div className="flex flex-col gap-4">
      {/* ── Toolbar ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Title + count badge */}
        <div className="flex items-center gap-2.5">
          <h2 className="text-brand-navy text-base font-bold">
            List of Course
          </h2>
          <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs font-semibold text-slate-500">
            +{EDUCATOR_COURSES.length} Course
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search courses…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="focus:border-brand-gold focus:ring-brand-gold/20 h-8 w-40 rounded-md border border-slate-200 bg-white pr-3 pl-8 text-xs text-slate-700 placeholder-slate-400 transition outline-none focus:ring-1 sm:w-48"
            />
          </div>

          {/* Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <ArrowUpDown className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">
                  {activeSortLabel ?? 'Sort'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border border-slate-200 bg-white shadow-lg shadow-slate-200/50"
            >
              {SORT_OPTIONS.map(({ key, label }) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => handleSort(key)}
                  className={cn(
                    'text-slate-600 focus:bg-slate-50 focus:text-slate-900',
                    sort.key === key && 'text-brand-navy font-semibold',
                  )}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter */}
          <CourseFilterPopover
            value={filters}
            onApply={(f) => {
              setFilters(f);
              setPage(1);
            }}
          />

          {/* Add */}
          <Button size="sm" className="gap-1.5 text-xs" onClick={onAddCourse}>
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Add Course</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {courses.length === 0 ? (
          <div className="py-16 text-center">
            <BookOpen className="mx-auto mb-3 h-8 w-8 text-slate-200" />
            <p className="text-sm text-slate-400">
              No courses match your filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <SortableHeader
                    label="Course"
                    sortKey="title"
                    sort={sort}
                    onSort={handleSort}
                  />
                  <StaticHeader label="Status" />
                  <StaticHeader label="Level" />
                  <SortableHeader
                    label="Enrolled"
                    sortKey="enrolled"
                    sort={sort}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    label="Completion"
                    sortKey="completionRate"
                    sort={sort}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    label="Rating"
                    sortKey="rating"
                    sort={sort}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    label="Revenue"
                    sortKey="revenue"
                    sort={sort}
                    onSort={handleSort}
                  />
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginated.map((course) => (
                  <tr
                    key={course.id}
                    className="transition-colors hover:bg-slate-50/70"
                  >
                    {/* Course title */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'h-8 w-1 shrink-0 rounded-full',
                            CATEGORY_COLOR[course.category] ?? 'bg-slate-300',
                          )}
                        />
                        <div>
                          <p className="text-brand-navy text-[13px] leading-tight font-semibold">
                            {course.title}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-400">
                            {course.category} · Updated {course.updatedAt}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <StatusBadge status={course.status} />
                    </td>

                    {/* Level */}
                    <td className="px-4 py-3.5">
                      <span className="text-[11px] font-medium text-slate-500">
                        {course.level}
                      </span>
                    </td>

                    {/* Enrolled */}
                    <td className="px-4 py-3.5 text-[13px] text-slate-600 tabular-nums">
                      {course.enrolled.toLocaleString()}
                    </td>

                    {/* Completion */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-16 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="bg-brand-gold h-full rounded-full transition-[width] duration-500"
                            style={{ width: `${course.completionRate}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-400 tabular-nums">
                          {course.completionRate}%
                        </span>
                      </div>
                    </td>

                    {/* Rating */}
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

                    {/* Revenue */}
                    <td className="text-brand-gold px-4 py-3.5 text-[13px] font-semibold tabular-nums">
                      {course.revenue}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <RowActions course={course} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {courses.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Showing {pageStart}–{pageEnd} of {courses.length} courses
            {filters.statuses.length > 0 && ` · ${filters.statuses.join(', ')}`}
            {search && ` matching "${search}"`}
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
                    ? 'bg-brand-navy hover:bg-brand-navy text-white hover:text-white'
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
      )}
    </div>
  );
}
