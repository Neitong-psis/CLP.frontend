'use client';

import React from 'react';
import {
  ArrowUpDown,
  Star,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { type Column } from '@/components/shared/DataTable';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { type CourseStatus, type EducatorCourse } from '@/constants/educator';

export type SortKey =
  | 'title'
  | 'enrolled'
  | 'rating'
  | 'completionRate'
  | 'revenue';
export type SortDir = 'asc' | 'desc';

export interface SortState {
  key: SortKey | null;
  dir: SortDir;
}

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
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      className={cn(
        'inline-flex cursor-pointer items-center gap-0.5 text-[10px] font-bold tracking-widest uppercase transition-colors',
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
  );
}

function StaticHeader({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
      {label}
    </span>
  );
}

function RowActions({ course }: { course: EducatorCourse }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-slate-400 transition-colors outline-none hover:bg-slate-100 hover:text-slate-600"
          aria-label={`Actions for ${course.title}`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border border-slate-200 bg-white shadow-lg shadow-slate-200/50"
      >
        <DropdownMenuItem className="cursor-pointer text-slate-600 focus:bg-slate-50 focus:text-slate-900">
          Edit course
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-slate-600 focus:bg-slate-50 focus:text-slate-900">
          View analytics
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-slate-600 focus:bg-slate-50 focus:text-slate-900">
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-100" />
        <DropdownMenuItem className="cursor-pointer text-red-400 focus:bg-red-50 focus:text-red-600">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function getCourseTableColumns(
  sort: SortState,
  onSort: (key: SortKey) => void,
): Column<EducatorCourse>[] {
  return [
    {
      header: (
        <SortableHeader
          label="Course"
          sortKey="title"
          sort={sort}
          onSort={onSort}
        />
      ),
      accessor: (item) => item,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'h-8 w-1 shrink-0 rounded-full',
              CATEGORY_COLOR[row.category] ?? 'bg-slate-300',
            )}
          />
          <div className="text-left">
            <p className="text-brand-navy text-[13px] leading-tight font-semibold">
              {row.title}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              {row.category} · Updated {row.updatedAt}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: <StaticHeader label="Status" />,
      accessor: (item) => item.status,
      cell: ({ value }) => <StatusBadge status={value} />,
    },
    {
      header: <StaticHeader label="Level" />,
      accessor: (item) => item.level,
      cell: ({ value }) => (
        <span className="text-[11px] font-medium text-slate-500">{value}</span>
      ),
    },
    {
      header: (
        <SortableHeader
          label="Enrolled"
          sortKey="enrolled"
          sort={sort}
          onSort={onSort}
        />
      ),
      accessor: (item) => item.enrolled,
      cell: ({ value }) => (
        <span className="text-[13px] text-slate-600 tabular-nums">
          {value.toLocaleString()}
        </span>
      ),
    },
    {
      header: (
        <SortableHeader
          label="Completion"
          sortKey="completionRate"
          sort={sort}
          onSort={onSort}
        />
      ),
      accessor: (item) => item.completionRate,
      cell: ({ value }) => (
        <div className="flex items-center gap-2">
          <div className="h-1 w-16 overflow-hidden rounded-full bg-slate-100">
            <div
              className="bg-brand-gold h-full rounded-full transition-[width] duration-500"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-400 tabular-nums">
            {value}%
          </span>
        </div>
      ),
    },
    {
      header: (
        <SortableHeader
          label="Rating"
          sortKey="rating"
          sort={sort}
          onSort={onSort}
        />
      ),
      accessor: (item) => item.rating,
      cell: ({ value }) =>
        value > 0 ? (
          <span className="text-brand-gold flex items-center gap-1 text-[13px] font-semibold">
            <Star className="h-3 w-3 fill-current" />
            {value.toFixed(1)}
          </span>
        ) : (
          <span className="text-[11px] text-slate-300">—</span>
        ),
    },
    {
      header: (
        <SortableHeader
          label="Revenue"
          sortKey="revenue"
          sort={sort}
          onSort={onSort}
        />
      ),
      accessor: (item) => item.revenue,
      cell: ({ value }) => (
        <span className="text-brand-gold text-[13px] font-semibold tabular-nums">
          {value}
        </span>
      ),
    },
    {
      header: '',
      className: 'text-right',
      accessor: (item) => item,
      cell: ({ row }) => <RowActions course={row} />,
    },
  ];
}
