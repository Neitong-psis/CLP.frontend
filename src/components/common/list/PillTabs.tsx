'use client';

import { cn } from '@/lib/utils/cn';

export interface PillTab<T extends string> {
  value: T;
  label: string;
  /** Optional count badge rendered inline after the label. */
  count?: number;
}

interface PillTabsProps<T extends string> {
  tabs: readonly PillTab<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
  className?: string;
}

/**
 * Platform-wide segment / status tab switcher — the rounded "pill" bar first
 * used on the learner Certificates page. The active tab is gold-tinted with a
 * ring; optional count badges sit inline. Scrolls horizontally when the tabs
 * overflow their container so it stays usable on narrow screens.
 */
export function PillTabs<T extends string>({
  tabs,
  value,
  onChange,
  ariaLabel,
  className,
}: PillTabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'border-border bg-card flex w-fit max-w-full items-center gap-1.5 overflow-x-auto rounded-full border p-1.5 shadow-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {tabs.map(({ value: tabValue, label, count }) => {
        const active = tabValue === value;
        return (
          <button
            key={tabValue}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tabValue)}
            className={cn(
              'flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold whitespace-nowrap transition-all duration-150',
              active
                ? 'bg-brand-gold/10 text-brand-gold ring-brand-gold/40 ring-1'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
            )}
          >
            {label}
            {count !== undefined && (
              <span
                className={cn(
                  'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular-nums transition-colors duration-150',
                  active
                    ? 'bg-brand-gold text-brand-navy'
                    : 'bg-muted-foreground/12 text-muted-foreground dark:bg-white/10 dark:text-white/70',
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
