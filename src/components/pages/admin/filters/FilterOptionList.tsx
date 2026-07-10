'use client';

import { cn } from '@/lib/utils/cn';

/** Shared eyebrow label above a filter section ("ROLE", "STATUS", ...). */
export function FilterSectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-muted-foreground mb-2 text-[10px] font-semibold tracking-widest uppercase">
      {children}
    </p>
  );
}

interface FilterOptionRowProps {
  active: boolean;
  disabled?: boolean;
  label: string;
  count: number;
  dotClassName?: string;
  className?: string;
  onClick: () => void;
}

/**
 * A single full-width selectable row: leading indicator, label, trailing
 * count. Rows never wrap or re-flow regardless of label length — the fix for
 * the ragged pill-wrap layout this replaces.
 */
function FilterOptionRow({
  active,
  disabled,
  label,
  count,
  dotClassName,
  className,
  onClick,
}: FilterOptionRowProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-colors',
        active
          ? 'bg-muted text-foreground'
          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
        disabled &&
          'hover:text-muted-foreground cursor-not-allowed opacity-40 hover:bg-transparent',
        className,
      )}
    >
      {dotClassName ? (
        <span className={cn('h-2 w-2 shrink-0 rounded-full', dotClassName)} />
      ) : (
        <span
          className={cn(
            'flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border transition-colors',
            active
              ? 'border-foreground bg-foreground'
              : 'border-muted-foreground/40',
          )}
        >
          {active && (
            <span className="bg-background h-1.5 w-1.5 rounded-full" />
          )}
        </span>
      )}
      <span className="truncate">{label}</span>
      <span className="text-muted-foreground/60 ml-auto shrink-0 text-[11px] tabular-nums">
        {count}
      </span>
    </button>
  );
}

export interface FilterOptionListProps<T extends string> {
  allLabel: string;
  options: readonly T[];
  value: T | 'All';
  onSelect: (value: T | 'All') => void;
  /** Semantic dot color per concrete option — omit for a plain radio row. */
  dot?: Record<T, string>;
  count: (value: T | 'All') => number;
  /** Lay options out in a 2-column grid instead of a single column. */
  columns?: 1 | 2;
}

/**
 * One faceted filter section (role / status / invitation / category — any
 * single-select facet with live counts). Replaces the old flex-wrap pill
 * group: rows stack in a clean grid instead of wrapping unevenly, and every
 * facet across Users and Courses now shares this one visual language.
 */
export function FilterOptionList<T extends string>({
  allLabel,
  options,
  value,
  onSelect,
  dot,
  count,
  columns = 1,
}: FilterOptionListProps<T>) {
  return (
    <div
      className={cn(
        'grid gap-1',
        columns === 2 ? 'grid-cols-2' : 'grid-cols-1',
      )}
    >
      <FilterOptionRow
        active={value === 'All'}
        label={allLabel}
        count={count('All')}
        className={columns === 2 ? 'col-span-2' : undefined}
        onClick={() => onSelect('All')}
      />
      {options.map((opt) => {
        const optionCount = count(opt);
        const disabled = optionCount === 0 && value !== opt;
        return (
          <FilterOptionRow
            key={opt}
            active={value === opt}
            disabled={disabled}
            label={opt}
            count={optionCount}
            dotClassName={dot?.[opt]}
            onClick={() => onSelect(opt)}
          />
        );
      })}
    </div>
  );
}
