import React from 'react';
import { cn } from '@/lib/utils/cn';
import {
  StudentRow,
  FILTER_PROGRESS_OPTIONS,
  FILTER_ACTIVITY_OPTIONS,
  FILTER_STATUS_OPTIONS,
  FILTER_LAST_ACTIVE_OPTIONS,
} from '@/constants/educator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StudentFiltersState } from './useStudentFilters';

interface StudentFiltersProps {
  filters: StudentFiltersState;
  onFilterChange: (key: keyof StudentFiltersState, value: string) => void;
  students: StudentRow[];
  className?: string;
}

export function StudentFilters({
  filters,
  onFilterChange,
  students,
  className,
}: StudentFiltersProps) {
  // Extract unique values dynamically
  const uniqueLearnerNames = React.useMemo(() => {
    return Array.from(new Set(students.map((s) => s.name)));
  }, [students]);

  const uniqueCourseNames = React.useMemo(() => {
    return Array.from(new Set(students.map((s) => s.course)));
  }, [students]);

  return (
    <div
      className={cn(
        'animate-in fade-in slide-in-from-top-2 grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm duration-150 md:grid-cols-6',
        className,
      )}
    >
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">
          Learner
        </label>
        <Select
          value={filters.filterLearner}
          onValueChange={(val) => onFilterChange('filterLearner', val ?? '')}
        >
          <SelectTrigger className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm transition-colors hover:bg-slate-50/50">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="">All</SelectItem>
            {uniqueLearnerNames.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">
          Course
        </label>
        <Select
          value={filters.filterCourse}
          onValueChange={(val) => onFilterChange('filterCourse', val ?? '')}
        >
          <SelectTrigger className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm transition-colors hover:bg-slate-50/50">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="">All</SelectItem>
            {uniqueCourseNames.map((course) => (
              <SelectItem key={course} value={course}>
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">
          Progress
        </label>
        <Select
          value={filters.filterProgress}
          onValueChange={(val) => onFilterChange('filterProgress', val ?? '')}
        >
          <SelectTrigger className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm transition-colors hover:bg-slate-50/50">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="">All</SelectItem>
            {FILTER_PROGRESS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">
          Activity
        </label>
        <Select
          value={filters.filterActivity}
          onValueChange={(val) => onFilterChange('filterActivity', val ?? '')}
        >
          <SelectTrigger className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm transition-colors hover:bg-slate-50/50">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="">All</SelectItem>
            {FILTER_ACTIVITY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">
          Status
        </label>
        <Select
          value={filters.filterStatus}
          onValueChange={(val) => onFilterChange('filterStatus', val ?? '')}
        >
          <SelectTrigger className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm transition-colors hover:bg-slate-50/50">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="">All</SelectItem>
            {FILTER_STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-500">
          Last Active
        </label>
        <Select
          value={filters.filterLastActive}
          onValueChange={(val) => onFilterChange('filterLastActive', val ?? '')}
        >
          <SelectTrigger className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm transition-colors hover:bg-slate-50/50">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="">All</SelectItem>
            {FILTER_LAST_ACTIVE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
