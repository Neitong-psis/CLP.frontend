'use client';

import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface SortableThProps {
  label: string;
  active: boolean;
  /** Only meaningful when `active` is true. */
  direction: 'asc' | 'desc';
  onClick: () => void;
  align?: 'left' | 'right';
  className?: string;
}

/**
 * A `<th>` whose label doubles as a sort toggle: hovering reveals a faint
 * `ArrowUpDown` icon, clicking cycles asc → desc → off (see the column's
 * owning hook), and the active column shows a solid colored arrow instead.
 * Same visual language across every table so the affordance is unambiguous.
 */
export function SortableTh({
  label,
  active,
  direction,
  onClick,
  align = 'left',
  className,
}: SortableThProps) {
  return (
    <th
      scope="col"
      className={cn(
        'text-muted-foreground px-5 py-3.5 text-[11px] font-semibold tracking-wide whitespace-nowrap uppercase',
        align === 'right' ? 'text-right' : 'text-left',
        className,
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'group/th hover:text-foreground inline-flex items-center gap-1 uppercase transition-colors',
          active && 'text-foreground',
        )}
      >
        {label}
        {!active ? (
          <ArrowUpDown className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover/th:opacity-60" />
        ) : direction === 'asc' ? (
          <ArrowUp className="text-brand-gold h-3.5 w-3.5 shrink-0" />
        ) : (
          <ArrowDown className="text-brand-gold h-3.5 w-3.5 shrink-0" />
        )}
      </button>
    </th>
  );
}
