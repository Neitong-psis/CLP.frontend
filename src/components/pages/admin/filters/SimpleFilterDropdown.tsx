'use client';

import { ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils/cn';

export interface SimpleFilterDropdownProps<T extends string> {
  /** Facet name shown on the trigger when nothing is selected, e.g. "Status". */
  label: string;
  allLabel: string;
  options: readonly T[];
  value: T | 'All';
  onSelect: (value: T | 'All') => void;
  /** Semantic dot color per concrete option — omit for a plain text list. */
  dot?: Record<T, string>;
}

/**
 * A single-facet dropdown: click to open a plain list of options, click one
 * to apply and close. No counts, no separate apply step — the trigger label
 * itself doubles as the current selection.
 */
export function SimpleFilterDropdown<T extends string>({
  label,
  allLabel,
  options,
  value,
  onSelect,
  dot,
}: SimpleFilterDropdownProps<T>) {
  const isActive = value !== 'All';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="border-border bg-card text-foreground hover:bg-muted inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition-colors"
        >
          {isActive && dot?.[value] && (
            <span className={cn('h-2 w-2 shrink-0 rounded-full', dot[value])} />
          )}
          <span>{isActive ? value : label}</span>
          <ChevronDown className="text-muted-foreground/70 h-3.5 w-3.5 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        theme="light"
        className="border-border bg-card min-w-40 border shadow-md"
      >
        <DropdownMenuItem
          onSelect={() => onSelect('All')}
          className={cn(
            'text-foreground focus:bg-muted focus:text-foreground justify-between gap-6',
            !isActive && 'text-brand-gold focus:text-brand-gold font-semibold',
          )}
        >
          {allLabel}
          {!isActive && <Check className="text-brand-gold size-4" />}
        </DropdownMenuItem>
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <DropdownMenuItem
              key={opt}
              onSelect={() => onSelect(opt)}
              className={cn(
                'text-foreground focus:bg-muted focus:text-foreground justify-between gap-6',
                selected &&
                  'text-brand-gold focus:text-brand-gold font-semibold',
              )}
            >
              <span className="inline-flex items-center gap-1.5">
                {dot?.[opt] && (
                  <span
                    className={cn('h-2 w-2 shrink-0 rounded-full', dot[opt])}
                  />
                )}
                {opt}
              </span>
              {selected && <Check className="text-brand-gold size-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
