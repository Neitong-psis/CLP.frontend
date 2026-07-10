'use client';

import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import { PopoverContent } from '@/components/ui/Popover';

interface FilterPanelHeaderProps {
  title: string;
  activeFilterCount: number;
  clearLabel: string;
  onClear: () => void;
}

function FilterPanelHeader({
  title,
  activeFilterCount,
  clearLabel,
  onClear,
}: FilterPanelHeaderProps) {
  return (
    <div className="border-border flex shrink-0 items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="bg-brand-accent/10 text-brand-accent flex h-6 w-6 items-center justify-center rounded-md">
          <SlidersHorizontal className="h-3.5 w-3.5" />
        </span>
        <span className="text-foreground text-sm font-semibold">{title}</span>
        {activeFilterCount > 0 && (
          <span className="bg-brand-accent text-brand-accent-foreground flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold">
            {activeFilterCount}
          </span>
        )}
      </div>
      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="text-muted-foreground inline-flex items-center gap-1 text-xs transition-colors hover:text-rose-500"
        >
          <X className="h-3 w-3" />
          {clearLabel}
        </button>
      )}
    </div>
  );
}

interface FilterPanelFooterProps {
  resultCount: number;
  noResultsLabel: string;
  oneResultLabel: string;
  manyResultsLabel: (count: number) => string;
  onApply: () => void;
}

function FilterPanelFooter({
  resultCount,
  noResultsLabel,
  oneResultLabel,
  manyResultsLabel,
  onApply,
}: FilterPanelFooterProps) {
  return (
    <div className="border-border bg-surface/60 shrink-0 border-t p-3">
      <Button
        type="button"
        onClick={onApply}
        disabled={resultCount === 0}
        className="bg-brand-accent hover:bg-brand-accent-hover text-brand-accent-foreground h-9 w-full rounded-lg text-sm font-semibold disabled:opacity-50"
      >
        {resultCount === 0
          ? noResultsLabel
          : resultCount === 1
            ? oneResultLabel
            : manyResultsLabel(resultCount)}
      </Button>
    </div>
  );
}

export interface FilterPanelProps {
  title: string;
  activeFilterCount: number;
  clearLabel: string;
  onClear: () => void;
  resultCount: number;
  noResultsLabel: string;
  oneResultLabel: string;
  manyResultsLabel: (count: number) => string;
  onApply: () => void;
  children: React.ReactNode;
}

/**
 * The shared shell every admin list-page filter dropdown renders inside:
 * header (icon + title + active count + clear), a scrollable body of facet
 * sections, and a footer CTA that previews the live result count. Users and
 * Courses both mount this so any future tweak to the shell lands everywhere
 * at once instead of drifting between two hand-copied implementations.
 */
export function FilterPanel({
  title,
  activeFilterCount,
  clearLabel,
  onClear,
  resultCount,
  noResultsLabel,
  oneResultLabel,
  manyResultsLabel,
  onApply,
  children,
}: FilterPanelProps) {
  return (
    <PopoverContent
      align="end"
      className="flex max-h-[min(34rem,calc(100vh-5rem))] w-[calc(100vw-16px)] flex-col gap-0 overflow-hidden p-0 sm:w-80"
    >
      <FilterPanelHeader
        title={title}
        activeFilterCount={activeFilterCount}
        clearLabel={clearLabel}
        onClear={onClear}
      />

      <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin]">
        {children}
      </div>

      <FilterPanelFooter
        resultCount={resultCount}
        noResultsLabel={noResultsLabel}
        oneResultLabel={oneResultLabel}
        manyResultsLabel={manyResultsLabel}
        onApply={onApply}
      />
    </PopoverContent>
  );
}

/** Divider between facet sections inside the panel body. */
export function FilterDivider() {
  return <div className="bg-border mx-4 h-px" />;
}

/** The filter-trigger button that opens the popover, shared by both pages. */
export function FilterTrigger({
  label,
  activeFilterCount,
}: {
  label: string;
  activeFilterCount: number;
}) {
  return (
    <>
      <SlidersHorizontal className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
      {activeFilterCount > 0 && (
        <span className="bg-brand-accent text-brand-accent-foreground flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
          {activeFilterCount}
        </span>
      )}
    </>
  );
}
