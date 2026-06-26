'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAdminUsersT } from '@/i18n';
import { Button } from '@/components/ui/button/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
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

/** Shared section label inside the filter dropdown. */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-muted-foreground mb-2 text-[10px] font-semibold tracking-widest uppercase">
      {children}
    </p>
  );
}

/**
 * One faceted pill group (role / status / invitation). "All" renders as a solid
 * chip; concrete options carry their semantic color + a live count.
 */
function PillSection<T extends string>({
  label,
  allLabel,
  options,
  value,
  onSelect,
  dot,
  activeStyle,
  count,
}: {
  label: string;
  allLabel: string;
  options: readonly T[];
  value: T | 'All';
  onSelect: (value: T | 'All') => void;
  dot: Record<T, string>;
  activeStyle: Record<T, string>;
  count: (value: T | 'All') => number;
}) {
  const items: (T | 'All')[] = ['All', ...options];
  return (
    <div className="px-4 pt-3.5 pb-3">
      <SectionLabel>{label}</SectionLabel>
      <div className="flex flex-wrap gap-1.5">
        {items.map((opt) => {
          const isAll = opt === 'All';
          const isActive = value === opt;
          const c = count(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              className={cn(
                'inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium transition-all',
                isActive
                  ? isAll
                    ? 'border-foreground bg-foreground text-background'
                    : cn(activeStyle[opt as T], 'border-current')
                  : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground',
              )}
            >
              {!isAll && (
                <span
                  className={cn('h-1.5 w-1.5 rounded-full', dot[opt as T])}
                />
              )}
              {isAll ? allLabel : opt}
              <span
                className={cn(
                  'text-[10px] tabular-nums',
                  isActive ? 'opacity-70' : 'opacity-50',
                )}
              >
                {c}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Filter trigger + faceted dropdown for the user table. */
export function UsersFilter({ filter }: { filter: UserFilter }) {
  const t = useAdminUsersT();
  const [open, setOpen] = useState(false);
  const { activeFilterCount, filtered } = filter;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="border-border hover:bg-muted text-foreground inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border px-3 text-sm font-medium transition-colors sm:px-4">
        <SlidersHorizontal className="h-4 w-4" />
        <span className="hidden sm:inline">{t('filterBtn')}</span>
        {activeFilterCount > 0 && (
          <span className="bg-brand-accent text-brand-accent-foreground flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
            {activeFilterCount}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex max-h-[min(34rem,calc(100vh-5rem))] w-[calc(100vw-16px)] flex-col gap-0 overflow-hidden p-0 sm:w-80"
      >
        {/* Header */}
        <div className="border-border flex shrink-0 items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="bg-brand-accent/10 text-brand-accent flex h-6 w-6 items-center justify-center rounded-md">
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </span>
            <span className="text-foreground text-sm font-semibold">
              {t('filterBtn')}
            </span>
            {activeFilterCount > 0 && (
              <span className="bg-brand-accent text-brand-accent-foreground flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={filter.clearFilters}
              className="text-muted-foreground inline-flex items-center gap-1 text-xs transition-colors hover:text-rose-500"
            >
              <X className="h-3 w-3" />
              {t('filterClearAll')}
            </button>
          )}
        </div>

        {/* Scrollable body */}
        <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin]">
          <PillSection
            label={t('filterRole')}
            allLabel={t('filterAll')}
            options={ROLES}
            value={filter.roleFilter}
            onSelect={filter.setRoleFilter}
            dot={ROLE_DOT}
            activeStyle={ROLE_COLOR}
            count={filter.roleCount}
          />

          <div className="bg-border mx-4 h-px" />

          <PillSection
            label={t('filterStatus')}
            allLabel={t('filterAll')}
            options={STATUSES}
            value={filter.statusFilter}
            onSelect={filter.setStatusFilter}
            dot={STATUS_DOT}
            activeStyle={STATUS_COLOR}
            count={filter.statusCount}
          />

          <div className="bg-border mx-4 h-px" />

          <PillSection
            label={t('filterInvitation')}
            allLabel={t('filterAll')}
            options={INVITE_STATUSES}
            value={filter.inviteFilter}
            onSelect={filter.setInviteFilter}
            dot={INVITE_DOT}
            activeStyle={INVITE_COLOR}
            count={filter.inviteCount}
          />
        </div>

        {/* Footer — live result preview */}
        <div className="border-border bg-surface/60 shrink-0 border-t p-3">
          <Button
            type="button"
            onClick={() => setOpen(false)}
            disabled={filtered.length === 0}
            className="bg-brand-accent hover:bg-brand-accent-hover text-brand-accent-foreground h-9 w-full rounded-lg text-sm font-semibold disabled:opacity-50"
          >
            {filtered.length === 0
              ? t('filterNoResults')
              : filtered.length === 1
                ? t('filterShowResult')
                : t('filterShowResults', { count: filtered.length })}
          </Button>
        </div>
      </PopoverContent>
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
