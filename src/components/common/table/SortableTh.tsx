'use client';

import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { TableHead } from '@/components/ui/table';

export interface SortableThProps {
  label: string;
  active: boolean;
  /** Only meaningful when `active` is true. */
  direction: 'asc' | 'desc';
  onClick: () => void;
  align?: 'left' | 'right';
  className?: string;
}

/** Table header cell whose label toggles sorting for its column. */
export function SortableTh({
  label,
  active,
  direction,
  onClick,
  align = 'left',
  className,
}: SortableThProps) {
  const icon = !active ? (
    <ArrowUpDown className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover/th:opacity-60" />
  ) : direction === 'asc' ? (
    <ArrowUp className="text-brand-gold h-3.5 w-3.5 shrink-0" />
  ) : (
    <ArrowDown className="text-brand-gold h-3.5 w-3.5 shrink-0" />
  );

  return (
    <TableHead
      className={cn(align === 'right' ? 'text-right' : 'text-left', className)}
    >
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'group/th hover:text-foreground inline-flex items-center gap-1 uppercase transition-colors',
          active && 'text-foreground',
        )}
      >
        {/* Icon leads on right-aligned columns so the label stays flush right. */}
        {align === 'right' && icon}
        {label}
        {align !== 'right' && icon}
      </button>
    </TableHead>
  );
}
