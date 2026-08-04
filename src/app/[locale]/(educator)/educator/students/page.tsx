'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { useEducatorStudentsT } from '@/i18n';
import { cn } from '@/lib/utils/cn';
import TopBar from '@/components/common/TopBar';
import { SortableTh } from '@/components/common/table/SortableTh';
import { FilterableTh } from '@/components/common/table/FilterableTh';
import { useStudentFilter } from './_lib/useStudentFilter';
import {
  ACTIVITY_DOT,
  CONCRETE_ACTIVITIES,
  CONCRETE_STATUSES,
  STATUS_DOT,
  STATUS_LABEL,
} from './_lib/constants';
import { StudentsToolbar } from './_components/StudentsToolbar';
import { StudentRow } from './_components/StudentRow';
import { StudentProfileModal } from '@/components/pages/educator/students/StudentProfileModal';

const PAGE_SIZE = 10;

export default function EducatorStudentsPage() {
  const t = useEducatorStudentsT();

  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    activityFilter,
    setActivityFilter,
    sortKey,
    sortDir,
    toggleSort,
    clearFilters,
    hasFilters,
    counts,
    filtered,
    total,
  } = useStudentFilter();
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

  return (
    <div className="bg-background flex min-h-full flex-col">
      <TopBar role="educator" title={t('title')} subtitle={t('subtitle')} />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <StudentsToolbar
          search={search}
          onSearchChange={(v) => {
            setSearch(v);
            resetPage();
          }}
          statusFilter={statusFilter}
          onStatusChange={(s) => {
            setStatusFilter(s);
            resetPage();
          }}
          counts={counts}
          resultCount={filtered.length}
        />

        {/* Table */}
        <div className="animate-fade-in-up border-border bg-card overflow-hidden rounded-2xl border delay-200">
          <div className="scrollbar-none overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-border bg-muted/30 border-b">
                  <SortableTh
                    label={t('colStudent')}
                    active={sortKey === 'name'}
                    direction={sortDir}
                    onClick={() => toggleSort('name')}
                  />
                  <SortableTh
                    label={t('colCourse')}
                    active={sortKey === 'course'}
                    direction={sortDir}
                    onClick={() => toggleSort('course')}
                  />
                  <SortableTh
                    label={t('colProgress')}
                    active={sortKey === 'progress'}
                    direction={sortDir}
                    onClick={() => toggleSort('progress')}
                  />
                  <FilterableTh
                    label={t('colActivity')}
                    options={CONCRETE_ACTIVITIES}
                    value={activityFilter}
                    onSelect={(v) => {
                      setActivityFilter(v);
                      resetPage();
                    }}
                    dot={ACTIVITY_DOT}
                  />
                  <FilterableTh
                    label={t('colStatus')}
                    options={CONCRETE_STATUSES}
                    value={statusFilter}
                    onSelect={(v) => {
                      setStatusFilter(v);
                      resetPage();
                    }}
                    dot={STATUS_DOT}
                    labels={STATUS_LABEL}
                  />
                  <SortableTh
                    label={t('colLastActive')}
                    active={sortKey === 'lastSeen'}
                    direction={sortDir}
                    onClick={() => toggleSort('lastSeen')}
                  />
                  <SortableTh
                    label={t('colEarnings')}
                    active={sortKey === 'earnings'}
                    direction={sortDir}
                    onClick={() => toggleSort('earnings')}
                    align="right"
                  />
                  <th className="px-3 py-3.5" />
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

      <StudentProfileModal
        student={viewStudent}
        onClose={() => setViewStudent(null)}
      />
    </div>
  );
}
