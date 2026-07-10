import React from 'react';
import { cn } from '@/lib/utils/cn';
import { StudentRow } from '@/constants/educator';

export const studentColumns = [
  {
    header: 'STUDENT',
    accessor: (student: StudentRow) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[13px] font-bold tracking-wider text-white">
          {student.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <div>
          <p className="text-brand-navy text-sm font-bold">{student.name}</p>
          <p className="text-xs text-slate-400">{student.email}</p>
        </div>
      </div>
    ),
  },
  {
    header: 'COURSE',
    accessor: (student: StudentRow) => (
      <div>
        <p className="text-brand-navy max-w-[240px] truncate text-sm font-bold">
          {student.course}
        </p>
        <p className="mt-0.5 text-xs text-slate-400">
          {student.progress === 100
            ? 'Completed course'
            : `${student.progress}% learning progress`}
        </p>
      </div>
    ),
  },
  {
    header: 'PROGRESS',
    accessor: (student: StudentRow) => (
      <div className="flex items-center gap-3">
        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
          <div
            className="bg-brand-gold h-full transition-all duration-500"
            style={{ width: `${student.progress}%` }}
          />
        </div>
        <span className="w-10 shrink-0 text-right text-xs font-bold text-[#00003e]">
          {student.progress}%
        </span>
      </div>
    ),
  },
  {
    header: 'ACTIVITY',
    accessor: (student: StudentRow) => (
      <span
        className={cn(
          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
          student.activity === 'Highly active'
            ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
            : student.activity === 'At risk'
              ? 'border-rose-100 bg-rose-50 text-rose-700'
              : 'border-blue-100 bg-blue-50 text-blue-700',
        )}
      >
        {student.activity}
      </span>
    ),
  },
  {
    header: 'STATUS',
    accessor: (student: StudentRow) => {
      const displayStatus =
        student.status === 'Completed' ? 'Achieved' : student.status;
      return (
        <span
          className={cn(
            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
            displayStatus === 'Achieved'
              ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
              : displayStatus === 'Inactive'
                ? 'border-slate-200 bg-slate-50 text-slate-500'
                : 'border-blue-100 bg-blue-50 text-blue-700',
          )}
        >
          {displayStatus}
        </span>
      );
    },
  },
  {
    header: 'LAST ACTIVE',
    accessor: (student: StudentRow) => (
      <span className="text-xs font-medium text-slate-500">
        {student.lastSeen}
      </span>
    ),
  },
  {
    header: 'EARNINGS',
    accessor: (student: StudentRow) => (
      <span className="text-brand-navy text-sm font-bold">
        {student.earnings}
      </span>
    ),
  },
];
