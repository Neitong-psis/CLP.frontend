'use client';

import { ArrowUpDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils/cn';

export interface SortOption<T extends string> {
  value: T;
  /** Already-translated label shown in the menu. */
  label: string;
}

interface SortMenuProps<T extends string> {
  options: readonly SortOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible label for the trigger, e.g. "Sort courses". */
  ariaLabel: string;
  /** When set and the current value differs, a dot marks the trigger as active. */
  defaultValue?: T;
}

/**
 * Compact sort control: an icon button that opens a menu of sort options.
 * The active option is checked; a gold dot on the trigger signals a
 * non-default sort is applied. Shared across learner list pages so sorting
 * looks identical platform-wide.
 */
export function SortMenu<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  defaultValue,
}: SortMenuProps<T>) {
  const isActive = defaultValue != null && value !== defaultValue;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={ariaLabel}
          className="border-border bg-card text-foreground hover:bg-muted focus-visible:border-brand-gold/50 focus-visible:ring-brand-gold/10 relative inline-flex h-10 shrink-0 items-center justify-center rounded-xl border px-3 transition-colors outline-none focus-visible:ring-2"
        >
          <ArrowUpDown className="size-4" />
          {isActive && (
            <span className="bg-brand-gold absolute -top-1 -right-1 size-2 rounded-full" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="border-border bg-card min-w-52 border shadow-md"
      >
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => onChange(option.value)}
              className={cn(
                'text-foreground focus:bg-muted focus:text-foreground justify-between gap-6',
                selected &&
                  'text-brand-gold focus:text-brand-gold font-semibold',
              )}
            >
              {option.label}
              {selected && <Check className="text-brand-gold size-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
