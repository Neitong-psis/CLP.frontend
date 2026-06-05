'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Check, Users } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import {
  EDUCATOR_STUDENTS,
  type StudentRow,
  type StudentStatus,
  type StudentActivity,
} from '@/constants/educator';
import EducatorTopBar from '@/components/common/TopBar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const STATUS_LABEL: Record<StudentStatus, string> = {
  Active: 'Active',
  Inactive: 'Inactive',
  Completed: 'Achieved',
};

const STATUS_STYLE: Record<StudentStatus, string> = {
  Active: 'border-blue-200 bg-blue-50 text-blue-600',
  Inactive: 'border-slate-200 bg-slate-100 text-slate-500',
  Completed: 'border-emerald-200 bg-emerald-50 text-emerald-600',
};

const ACTIVITY_STYLE: Record<StudentActivity, string> = {
  'Highly active': 'border-emerald-200 bg-emerald-50 text-emerald-600',
  Active: 'border-blue-200 bg-blue-50 text-blue-600',
  'At risk': 'border-rose-200 bg-rose-50 text-rose-600',
};

type StatusFilter = StudentStatus | 'All';

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function EducatorStudentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return EDUCATOR_STUDENTS.filter((s) => {
      if (statusFilter !== 'All' && s.status !== statusFilter) return false;
      if (
        q &&
        !s.name.toLowerCase().includes(q) &&
        !s.email.toLowerCase().includes(q) &&
        !s.course.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [search, statusFilter]);

  const statusOptions: StatusFilter[] = [
    'All',
    'Active',
    'Inactive',
    'Completed',
  ];

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <EducatorTopBar
        role="educator"
        title="Learners Dashboard"
        subtitle="Live workspace synced from your account"
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Toolbar */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search students, course, or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:border-brand-gold focus:ring-brand-gold/10 h-10 w-full rounded-xl border border-slate-200 bg-white pr-3 pl-9 text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none focus:ring-2"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
                {statusFilter !== 'All' && (
                  <span className="bg-brand-gold/15 text-brand-gold rounded-full px-1.5 py-0.5 text-[10px] font-bold">
                    1
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border border-slate-200 bg-white shadow-lg"
            >
              <DropdownMenuLabel className="text-slate-400">
                Filter by status
              </DropdownMenuLabel>
              {statusOptions.map((opt) => (
                <DropdownMenuItem
                  key={opt}
                  onClick={() => setStatusFilter(opt)}
                  className="justify-between text-slate-600 focus:bg-slate-50 focus:text-slate-900"
                >
                  {opt === 'Completed' ? 'Achieved' : opt}
                  {statusFilter === opt && (
                    <Check className="text-brand-gold h-3.5 w-3.5" />
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem
                onClick={() => setStatusFilter('All')}
                className="text-slate-500 focus:bg-slate-50"
              >
                Clear filter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/60">
                  {[
                    'Student',
                    'Course',
                    'Progress',
                    'Activity',
                    'Status',
                    'Last Active',
                    'Earnings',
                  ].map((h) => (
                    <th
                      key={h}
                      className={cn(
                        'px-5 py-3.5 text-[11px] font-semibold tracking-wide text-slate-400 uppercase',
                        h === 'Earnings' ? 'text-right' : 'text-left',
                      )}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((student) => (
                  <StudentRowItem key={student.id} student={student} />
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <Users className="mb-2 h-7 w-7 text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">
                No learners found
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                Adjust your search or filter to see more.
              </p>
            </div>
          )}
        </div>

        <p className="mt-3 text-xs text-slate-400">
          Showing {filtered.length} of {EDUCATOR_STUDENTS.length} learners
        </p>
      </div>
    </div>
  );
}

function StudentRowItem({ student }: { student: StudentRow }) {
  return (
    <tr className="transition-colors hover:bg-slate-50/70">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
            {initials(student.name)}
          </div>
          <div className="min-w-0">
            <p className="text-brand-navy truncate font-semibold">
              {student.name}
            </p>
            <p className="truncate text-[11px] text-slate-400">
              {student.email}
            </p>
          </div>
        </div>
      </td>

      <td className="max-w-52 px-5 py-4">
        <p className="text-brand-navy truncate text-[13px] font-medium">
          {student.course}
        </p>
        <p className="text-[11px] text-slate-400">
          {student.progress}% learning progress
        </p>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
            <div
              className="bg-brand-gold h-full rounded-full transition-[width] duration-500"
              style={{ width: `${student.progress}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-slate-600 tabular-nums">
            {student.progress}%
          </span>
        </div>
      </td>

      <td className="px-5 py-4">
        <span
          className={cn(
            'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
            ACTIVITY_STYLE[student.activity],
          )}
        >
          {student.activity}
        </span>
      </td>

      <td className="px-5 py-4">
        <span
          className={cn(
            'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
            STATUS_STYLE[student.status],
          )}
        >
          {STATUS_LABEL[student.status]}
        </span>
      </td>

      <td className="px-5 py-4 text-[13px] text-slate-500">
        {student.lastSeen}
      </td>

      <td className="text-brand-navy px-5 py-4 text-right text-[13px] font-bold tabular-nums">
        {student.earnings}
      </td>
    </tr>
  );
}
