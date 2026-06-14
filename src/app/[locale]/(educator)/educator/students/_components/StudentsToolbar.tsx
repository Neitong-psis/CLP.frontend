'use client';

import { Search, UserPlus, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { STATUS_OPTIONS, type StatusFilter } from '../_lib/constants';

export function StudentsToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  resultCount,
  onAddStudent,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  resultCount: number;
  onAddStudent: () => void;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {/* Status chips — always visible, one click to filter */}
      <div className="flex flex-wrap items-center gap-1.5">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onStatusChange(opt)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-150',
              statusFilter === opt
                ? 'border-brand-navy bg-brand-navy text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700',
            )}
          >
            {opt === 'Completed' ? 'Achieved' : opt}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <p className="hidden text-xs whitespace-nowrap text-slate-400 sm:block">
          {resultCount} result{resultCount === 1 ? '' : 's'}
        </p>
        <div className="relative w-full lg:w-72">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search name, email, or course…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="focus:border-brand-gold focus:ring-brand-gold/10 h-10 w-full rounded-xl border border-slate-200 bg-white pr-8 pl-9 text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none focus:ring-2 [&::-webkit-search-cancel-button]:hidden"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onAddStudent}
          className="bg-brand-gold flex h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-bold text-white shadow-sm transition-all hover:opacity-90 hover:shadow-md"
        >
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Student</span>
        </button>
      </div>
    </div>
  );
}
