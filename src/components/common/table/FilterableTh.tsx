'use client';

import { Check, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils/cn';

export interface FilterableThProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T | 'All';
  onSelect: (value: T | 'All') => void;
  allLabel?: string;
  /** Optional colored dot per option, matching `SimpleFilterDropdown`. */
  dot?: Record<T, string>;
  /** Optional display text per option, when it differs from the raw value. */
  labels?: Partial<Record<T, string>>;
  align?: 'left' | 'right';
  className?: string;
}

/**
 * A `<th>` whose label sits next to a filter toggle: hovering reveals a faint
 * `Filter` icon, clicking opens a dropdown of this column's values directly
 * under the header. Once a specific value is selected the icon stays fully
 * visible and colored — same active-state language as `SortableTh`'s arrow,
 * so both affordances read as one consistent system.
 */
export function FilterableTh<T extends string>({
  label,
  options,
  value,
  onSelect,
  allLabel = 'All',
  dot,
  labels,
  align = 'left',
  className,
}: FilterableThProps<T>) {
  const isActive = value !== 'All';

  return (
    <th
      scope="col"
      className={cn(
        'text-muted-foreground px-5 py-3.5 text-[11px] font-semibold tracking-wide whitespace-nowrap uppercase',
        align === 'right' ? 'text-right' : 'text-left',
        className,
      )}
    >
      <div className="group/th inline-flex items-center gap-1 uppercase">
        <span className={cn(isActive && 'text-foreground')}>{label}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label={`Filter by ${label}`}
              className={cn(
                'hover:text-foreground inline-flex shrink-0 items-center justify-center transition-colors',
                isActive ? 'text-brand-gold' : 'text-muted-foreground',
              )}
            >
              <Filter
                className={cn(
                  'h-3.5 w-3.5 shrink-0 transition-opacity',
                  isActive
                    ? 'opacity-100'
                    : 'opacity-0 group-hover/th:opacity-60',
                )}
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            theme="light"
            className="border-border bg-card min-w-40 border normal-case shadow-md"
          >
            <DropdownMenuItem
              onSelect={() => onSelect('All')}
              className={cn(
                'text-foreground focus:bg-muted focus:text-foreground justify-between gap-6',
                !isActive &&
                  'text-brand-gold focus:text-brand-gold font-semibold',
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
                        className={cn(
                          'h-2 w-2 shrink-0 rounded-full',
                          dot[opt],
                        )}
                      />
                    )}
                    {labels?.[opt] ?? opt}
                  </span>
                  {selected && <Check className="text-brand-gold size-4" />}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </th>
  );
}
