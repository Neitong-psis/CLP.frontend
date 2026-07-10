'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAdminUsersT } from '@/i18n';
import { Popover, PopoverTrigger } from '@/components/ui/Popover';
import {
  FilterPanel,
  FilterTrigger,
  FilterDivider,
} from '@/components/pages/admin/filters/FilterPanelShell';
import {
  FilterSectionLabel,
  FilterOptionList,
} from '@/components/pages/admin/filters/FilterOptionList';
import {
  INVITE_COLOR,
  INVITE_DOT,
  INVITE_STATUSES,
  ROLE_COLOR,
  ROLE_DOT,
  ROLES,
  STATUS_COLOR,
  STATUS_DOT,
  STATUSES,
} from '@/constants/admin/users';
import type { UserFilter } from '../_hook/useUserFilter';

/** Filter trigger + faceted dropdown for the user table. */
export function UsersFilter({ filter }: { filter: UserFilter }) {
  const t = useAdminUsersT();
  const [open, setOpen] = useState(false);
  const { activeFilterCount, filtered } = filter;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="border-border hover:bg-muted text-foreground inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border px-3 text-sm font-medium transition-colors sm:px-4">
        <FilterTrigger
          label={t('filterBtn')}
          activeFilterCount={activeFilterCount}
        />
      </PopoverTrigger>
      <FilterPanel
        title={t('filterBtn')}
        activeFilterCount={activeFilterCount}
        clearLabel={t('filterClearAll')}
        onClear={filter.clearFilters}
        resultCount={filtered.length}
        noResultsLabel={t('filterNoResults')}
        oneResultLabel={t('filterShowResult')}
        manyResultsLabel={(count) => t('filterShowResults', { count })}
        onApply={() => setOpen(false)}
      >
        <div className="px-4 pt-3.5 pb-3">
          <FilterSectionLabel>{t('filterRole')}</FilterSectionLabel>
          <FilterOptionList
            allLabel={t('filterAll')}
            options={ROLES}
            value={filter.roleFilter}
            onSelect={filter.setRoleFilter}
            dot={ROLE_DOT}
            count={filter.roleCount}
          />
        </div>

        <FilterDivider />

        <div className="px-4 pt-3 pb-3">
          <FilterSectionLabel>{t('filterStatus')}</FilterSectionLabel>
          <FilterOptionList
            allLabel={t('filterAll')}
            options={STATUSES}
            value={filter.statusFilter}
            onSelect={filter.setStatusFilter}
            dot={STATUS_DOT}
            count={filter.statusCount}
          />
        </div>

        <FilterDivider />

        <div className="px-4 pt-3 pb-4">
          <FilterSectionLabel>{t('filterInvitation')}</FilterSectionLabel>
          <FilterOptionList
            allLabel={t('filterAll')}
            options={INVITE_STATUSES}
            value={filter.inviteFilter}
            onSelect={filter.setInviteFilter}
            dot={INVITE_DOT}
            count={filter.inviteCount}
          />
        </div>
      </FilterPanel>
    </Popover>
  );
}

/** Dismissible chips reflecting the currently applied facets. */
export function UsersActiveChips({ filter }: { filter: UserFilter }) {
  const t = useAdminUsersT();
  const {
    roleFilter,
    statusFilter,
    inviteFilter,
    activeFilterCount,
    setRoleFilter,
    setStatusFilter,
    setInviteFilter,
    clearFilters,
  } = filter;

  if (activeFilterCount === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-1.5">
      {roleFilter !== 'All' && (
        <Chip
          colorClass={ROLE_COLOR[roleFilter]}
          dotClass={ROLE_DOT[roleFilter]}
          label={roleFilter}
          onClear={() => setRoleFilter('All')}
        />
      )}
      {statusFilter !== 'All' && (
        <Chip
          colorClass={STATUS_COLOR[statusFilter]}
          dotClass={STATUS_DOT[statusFilter]}
          label={statusFilter}
          onClear={() => setStatusFilter('All')}
        />
      )}
      {inviteFilter !== 'All' && (
        <Chip
          colorClass={INVITE_COLOR[inviteFilter]}
          dotClass={INVITE_DOT[inviteFilter]}
          label={inviteFilter}
          onClear={() => setInviteFilter('All')}
        />
      )}
      <button
        type="button"
        onClick={clearFilters}
        className="text-muted-foreground ml-0.5 text-xs transition-colors hover:text-rose-500"
      >
        {t('filterClearAll')}
      </button>
    </div>
  );
}

function Chip({
  colorClass,
  dotClass,
  label,
  onClear,
}: {
  colorClass: string;
  dotClass: string;
  label: string;
  onClear: () => void;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        colorClass,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dotClass)} />
      {label}
      <button
        type="button"
        onClick={onClear}
        className="ml-0.5 opacity-60 transition-opacity hover:opacity-100"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}
