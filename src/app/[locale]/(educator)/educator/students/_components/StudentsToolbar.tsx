'use client';

import { Search, UserPlus, X } from 'lucide-react';
import { useEducatorStudentsT } from '@/i18n';
import { PillTabs, type PillTab } from '@/components/common/list/PillTabs';
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
  const t = useEducatorStudentsT();

  const STATUS_TABS: PillTab<StatusFilter>[] = STATUS_OPTIONS.map((opt) => ({
    value: opt,
    label: opt === 'Completed' ? t('achievedLabel') : opt,
  }));

  return (
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {/* Status tabs */}
      <PillTabs
        tabs={STATUS_TABS}
        value={statusFilter}
        onChange={onStatusChange}
        ariaLabel={t('title')}
      />

      <div className="flex items-center gap-3">
        <p className="text-muted-foreground hidden text-xs whitespace-nowrap sm:block">
          {resultCount === 1
            ? t('result', { count: resultCount })
            : t('results', { count: resultCount })}
        </p>
        <div className="relative w-full lg:w-72">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <input
            type="search"
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="focus:border-brand-gold focus:ring-brand-gold/10 border-border bg-card text-foreground placeholder:text-muted-foreground h-10 w-full rounded-xl border pr-8 pl-9 text-sm transition-colors outline-none focus:ring-2 [&::-webkit-search-cancel-button]:hidden"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="text-muted-foreground hover:bg-muted hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-0.5 transition-colors"
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
          <span className="hidden sm:inline">{t('addStudent')}</span>
        </button>
      </div>
    </div>
  );
}
