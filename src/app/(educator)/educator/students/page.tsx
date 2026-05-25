'use client';

import { useState } from 'react';
import { Search, MoreHorizontal } from 'lucide-react';
import { cn } from '@/utils/cn';
import { EDUCATOR_STUDENTS, type StudentRow } from '@/constants/educator';
import EducatorTopBar from '@/components/pages/educator/EducatorTopBar';

type StudentStatus = StudentRow['status'];

const STATUS_STYLE: Record<StudentStatus, string> = {
  Active: 'bg-brand-gold/15 text-brand-gold',
  Inactive: 'bg-slate-100 text-slate-400',
  Completed: 'bg-green-500 text-white',
};

export default function EducatorStudentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StudentStatus | 'All'>(
    'All',
  );

  const filtered = EDUCATOR_STUDENTS.filter((s) => {
    if (statusFilter !== 'All' && s.status !== statusFilter) return false;
    if (
      search &&
      !s.name.toLowerCase().includes(search.toLowerCase()) &&
      !s.email.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <EducatorTopBar
        title="Students"
        subtitle={`${EDUCATOR_STUDENTS.length} enrolled across all courses`}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:border-brand-gold focus:ring-brand-gold/10 h-10 w-full rounded-lg border border-slate-200 bg-white pr-3 pl-9 text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none focus:ring-2"
            />
          </div>
          <div className="flex gap-2">
            {(['All', 'Active', 'Completed', 'Inactive'] as const).map((s) => (
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
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  {[
                    'Student',
                    'Course',
                    'Progress',
                    'Status',
                    'Enrolled',
                    'Last Seen',
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
                {filtered.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="bg-brand-gold/20 text-brand-gold flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                          {student.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-brand-navy font-medium">
                            {student.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="max-w-[180px] px-5 py-3.5">
                      <p className="truncate text-slate-500">
                        {student.course}
                      </p>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="bg-brand-gold h-full rounded-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {student.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-[11px] font-bold',
                          STATUS_STYLE[student.status],
                        )}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">
                      {student.enrolled}
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">
                      {student.lastSeen}
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
              No students match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
