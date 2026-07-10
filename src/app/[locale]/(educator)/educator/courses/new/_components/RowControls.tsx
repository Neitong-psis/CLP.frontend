'use client';

import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

/**
 * Move-up / move-down / delete cluster shared by module and lesson headers.
 * Stops propagation so clicks don't toggle the collapsible parent.
 *
 * `className` lets the parent drive a hover-reveal (e.g. fade in on header
 * hover); `focus-within` keeps the cluster visible for keyboard users.
 */
export function RowControls({
  index,
  total,
  onMove,
  onDelete,
  className,
}: {
  index: number;
  total: number;
  onMove: (dir: 'up' | 'down') => void;
  onDelete: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'border-border bg-card flex items-center gap-0.5 rounded-lg border p-0.5',
        className,
      )}
    >
      <button
        type="button"
        aria-label="Move up"
        onClick={(e) => {
          e.stopPropagation();
          onMove('up');
        }}
        disabled={index === 0}
        className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-6 w-6 items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-30"
      >
        <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.5} />
      </button>
      <button
        type="button"
        aria-label="Move down"
        onClick={(e) => {
          e.stopPropagation();
          onMove('down');
        }}
        disabled={index === total - 1}
        className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-6 w-6 items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-30"
      >
        <ArrowDown className="h-3.5 w-3.5" strokeWidth={2.5} />
      </button>
      <div className="bg-border mx-0.5 h-4 w-px" />
      <button
        type="button"
        aria-label="Delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="text-muted-foreground flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-rose-500/10 hover:text-rose-500"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
