'use client';

import { cn } from '@/lib/utils/cn';

export interface PillTab<T extends string> {
  value: T;
  label: string;
  count?: number;
}

interface PillTabsProps<T extends string> {
  tabs: readonly PillTab<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
  className?: string;
  /** Stretches the row to 100% width with each tab sharing it equally,
   *  instead of the default content-hugging row. */
  fullWidth?: boolean;
}

export function PillTabs<T extends string>({
  tabs,
  value,
  onChange,
  ariaLabel,
  className,
  fullWidth = false,
}: PillTabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'scrollbar-none flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden',
        fullWidth ? 'w-full' : 'w-fit max-w-full',
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
              'group flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold whitespace-nowrap transition-all duration-150',
              fullWidth ? 'flex-1 justify-center' : 'shrink-0',
              active
                ? 'border-brand-gold bg-brand-gold/10 text-brand-gold shadow-sm'
                : 'border-border text-muted-foreground hover:border-brand-gold/40 hover:bg-brand-gold/5 hover:text-foreground',
            )}
          >
            {label}
            {count !== undefined && (
              <span
                className={cn(
                  'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular-nums transition-colors duration-150',
                  active
                    ? 'bg-brand-gold text-brand-navy'
                    : 'bg-muted-foreground/12 text-muted-foreground group-hover:bg-brand-gold/15 dark:bg-white/10 dark:text-white/70',
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
