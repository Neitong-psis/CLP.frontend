'use client';

import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

/**
 * Move-up / move-down / delete cluster shared by module and lesson headers.
 * Stops propagation so clicks don't toggle the collapsible parent.
 */
export function RowControls({
  index,
  total,
  onMove,
  onDelete,
}: {
  index: number;
  total: number;
  onMove: (dir: 'up' | 'down') => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        aria-label="Move up"
        onClick={(e) => {
          e.stopPropagation();
          onMove('up');
        }}
        disabled={index === 0}
        className="flex h-6 w-6 items-center justify-center rounded text-zinc-300 transition hover:text-zinc-500 disabled:opacity-30"
      >
        <ChevronUp className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        aria-label="Move down"
        onClick={(e) => {
          e.stopPropagation();
          onMove('down');
        }}
        disabled={index === total - 1}
        className="flex h-6 w-6 items-center justify-center rounded text-zinc-300 transition hover:text-zinc-500 disabled:opacity-30"
      >
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        aria-label="Delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="flex h-6 w-6 items-center justify-center rounded text-zinc-300 transition hover:text-red-400"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
