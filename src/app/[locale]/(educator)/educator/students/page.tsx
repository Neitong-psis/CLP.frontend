'use client';

import { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Users,
} from 'lucide-react';
import { useEducatorStudentsT } from '@/i18n';
import { cn } from '@/lib/utils/cn';
import TopBar from '@/components/common/TopBar';
import { useStudentFilter, type SortKey } from './_lib/useStudentFilter';
import { StatsStrip } from './_components/StatsStrip';
import { StudentsToolbar } from './_components/StudentsToolbar';
import { StudentRow } from './_components/StudentRow';
import { AddStudentModal } from './_components/AddStudentModal';
import { StudentViewModal } from './_components/StudentViewModal';

const PAGE_SIZE = 8;

export default function EducatorStudentsPage() {
  const t = useEducatorStudentsT();

  const TABLE_COLS: {
    label: string;
    sort?: Exclude<SortKey, null>;
    align?: 'right';
  }[] = [
    { label: t('colStudent'), sort: 'name' },
    { label: t('colCourse') },
    { label: t('colProgress'), sort: 'progress' },
    { label: t('colActivity') },
    { label: t('colStatus') },
    { label: t('colLastActive') },
    { label: t('colEarnings'), align: 'right' },
    { label: '' },
  ];
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
  const [viewStudent, setViewStudent] = useState<
    import('@/constants/educator').StudentRow | null
  >(null);
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page],
  );

  function resetPage() {
    setPage(1);
  }

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
    <div className="bg-background flex min-h-full flex-col">
      <TopBar role="educator" title={t('title')} subtitle={t('subtitle')} />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <StatsStrip
          counts={counts}
          statusFilter={statusFilter}
          riskOnly={riskOnly}
          onAll={() => {
            clearFilters();
            resetPage();
          }}
          onActive={() => {
            setRiskOnly(false);
            setStatusFilter('Active');
            resetPage();
          }}
          onAchieved={() => {
            setRiskOnly(false);
            setStatusFilter('Completed');
            resetPage();
          }}
          onAtRisk={() => {
            setStatusFilter('All');
            setRiskOnly(true);
            resetPage();
          }}
        />

        <StudentsToolbar
          search={search}
          onSearchChange={(v) => {
            setSearch(v);
            resetPage();
          }}
          statusFilter={statusFilter}
          onStatusChange={(s) => {
            setRiskOnly(false);
            setStatusFilter(s);
            resetPage();
          }}
          resultCount={filtered.length}
          onAddStudent={() => setAddOpen(true)}
        />

        {/* Table */}
        <div className="animate-fade-in-up border-border bg-card overflow-hidden rounded-2xl border delay-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-border bg-muted/30 border-b">
                  {TABLE_COLS.map(({ label, sort, align }) => (
                    <th
                      key={label || 'actions'}
                      className={cn(
                        'text-muted-foreground px-5 py-3.5 text-[11px] font-semibold tracking-wide uppercase',
                        align === 'right' ? 'text-right' : 'text-left',
                      )}
                    >
                      {sort ? (
                        <button
                          type="button"
                          onClick={() => toggleSort(sort)}
                          className={cn(
                            'group/th hover:text-foreground inline-flex items-center gap-1 uppercase transition-colors',
                            sortKey === sort && 'text-foreground',
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
              <tbody className="divide-border/50 divide-y">
                {paginated.map((student, i) => (
                  <StudentRow
                    key={student.id}
                    student={student}
                    index={i}
                    onView={() => setViewStudent(student)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="animate-fade-in flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-muted mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                <Users className="text-muted-foreground/50 h-6 w-6" />
              </div>
              <p className="text-foreground text-sm font-semibold">
                {t('noFound')}
              </p>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {t('trySearch')}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => {
                    clearFilters();
                    resetPage();
                  }}
                  className="bg-brand-navy hover:bg-brand-navy-tint mt-4 rounded-lg px-4 py-2 text-xs font-semibold text-white transition-colors"
                >
                  {t('clearFilters')}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer: count + pagination */}
        <div className="mt-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-xs">
            {filtered.length === 0
              ? t('zeroOf', { total })
              : t('showing', {
                  from: (page - 1) * PAGE_SIZE + 1,
                  to: Math.min(page * PAGE_SIZE, filtered.length),
                  count: filtered.length,
                }) +
                (hasFilters && filtered.length < total
                  ? t('filteredFrom', { total })
                  : '')}
          </p>

          {pageCount > 1 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="border-border bg-card text-muted-foreground hover:bg-muted inline-flex h-8 w-8 items-center justify-center rounded-lg border transition disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={cn(
                    'h-8 w-8 rounded-lg border text-xs font-semibold transition',
                    n === page
                      ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted',
                  )}
                >
                  {n}
                </button>
              ))}

              <button
                type="button"
                disabled={page === pageCount}
                onClick={() => setPage((p) => p + 1)}
                className="border-border bg-card text-muted-foreground hover:bg-muted inline-flex h-8 w-8 items-center justify-center rounded-lg border transition disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <AddStudentModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={addStudent}
      />

      {viewStudent && (
        <StudentViewModal
          student={viewStudent}
          onClose={() => setViewStudent(null)}
        />
      )}
    </div>
  );
}
