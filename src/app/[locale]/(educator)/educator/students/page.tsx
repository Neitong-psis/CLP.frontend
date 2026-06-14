'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Users } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import EducatorTopBar from '@/components/common/TopBar';
import { useStudentFilter, type SortKey } from './_lib/useStudentFilter';
import { StatsStrip } from './_components/StatsStrip';
import { StudentsToolbar } from './_components/StudentsToolbar';
import { StudentRow } from './_components/StudentRow';
import { AddStudentModal } from './_components/AddStudentModal';

const TABLE_COLS: {
  label: string;
  sort?: Exclude<SortKey, null>;
  align?: 'right';
}[] = [
  { label: 'Student', sort: 'name' },
  { label: 'Course' },
  { label: 'Progress', sort: 'progress' },
  { label: 'Activity' },
  { label: 'Status' },
  { label: 'Last Active' },
  { label: 'Earnings', align: 'right' },
  { label: '' },
];

export default function EducatorStudentsPage() {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    riskOnly,
    setRiskOnly,
    sortKey,
    sortDir,
    toggleSort,
    clearFilters,
    hasFilters,
    counts,
    filtered,
    addStudent,
    total,
  } = useStudentFilter();
  const [addOpen, setAddOpen] = useState(false);

  function sortIcon(key: Exclude<SortKey, null>) {
    if (sortKey !== key)
      return (
        <ArrowUpDown className="h-3 w-3 opacity-0 transition-opacity group-hover/th:opacity-60" />
      );
    return sortDir === 'asc' ? (
      <ArrowUp className="text-brand-gold h-3 w-3" />
    ) : (
      <ArrowDown className="text-brand-gold h-3 w-3" />
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <EducatorTopBar
        role="educator"
        title="Student Management"
        subtitle="Track progress and engagement across your courses"
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <StatsStrip
          counts={counts}
          statusFilter={statusFilter}
          riskOnly={riskOnly}
          onAll={clearFilters}
          onActive={() => {
            setRiskOnly(false);
            setStatusFilter('Active');
          }}
          onAchieved={() => {
            setRiskOnly(false);
            setStatusFilter('Completed');
          }}
          onAtRisk={() => {
            setStatusFilter('All');
            setRiskOnly(true);
          }}
        />

        <StudentsToolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={(s) => {
            setRiskOnly(false);
            setStatusFilter(s);
          }}
          resultCount={filtered.length}
          onAddStudent={() => setAddOpen(true)}
        />

        {/* Table */}
        <div className="animate-fade-in-up overflow-hidden rounded-2xl border border-slate-200 bg-white delay-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/60">
                  {TABLE_COLS.map(({ label, sort, align }) => (
                    <th
                      key={label || 'actions'}
                      className={cn(
                        'px-5 py-3.5 text-[11px] font-semibold tracking-wide text-slate-400 uppercase',
                        align === 'right' ? 'text-right' : 'text-left',
                      )}
                    >
                      {sort ? (
                        <button
                          type="button"
                          onClick={() => toggleSort(sort)}
                          className={cn(
                            'group/th hover:text-brand-navy inline-flex items-center gap-1 uppercase transition-colors',
                            sortKey === sort && 'text-brand-navy',
                          )}
                        >
                          {label}
                          {sortIcon(sort)}
                        </button>
                      ) : (
                        label
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((student, i) => (
                  <StudentRow key={student.id} student={student} index={i} />
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="animate-fade-in flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <Users className="h-6 w-6 text-slate-300" />
              </div>
              <p className="text-sm font-semibold text-slate-600">
                No learners found
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                Try a different search or filter combination.
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="bg-brand-navy hover:bg-brand-navy-tint mt-4 rounded-lg px-4 py-2 text-xs font-semibold text-white transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        <p className="mt-3 text-xs text-slate-400">
          Showing {filtered.length} of {total} learners
        </p>
      </div>

      <AddStudentModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={addStudent}
      />
    </div>
  );
}
