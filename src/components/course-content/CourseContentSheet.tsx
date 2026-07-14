'use client';

import { useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { flattenLessons } from '@/lib/course-progress';
import { CourseContentTree } from './CourseContentTree';
import type { CourseTreeProps } from './types';

export interface CourseContentSheetProps extends CourseTreeProps {
  onClose: () => void;
}

/** Mobile bottom sheet wrapping the shared tree — replaces the per-surface
 *  `MobileContentsSheet` copies. */
export function CourseContentSheet(props: CourseContentSheetProps) {
  const { onClose, labels, modules, isItemDone } = props;

  const { done, total } = useMemo(() => {
    const items = flattenLessons(modules).flatMap((f) => f.items);
    return { done: items.filter(isItemDone).length, total: items.length };
  }, [modules, isItemDone]);
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const isComplete = total > 0 && done === total;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-60 lg:hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div className="bg-background absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-2xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
        {/* Drag handle */}
        <div className="flex shrink-0 justify-center pt-3 pb-1">
          <div className="bg-muted-foreground/25 h-1 w-10 rounded-full" />
        </div>

        {/* Header */}
        <div className="border-border/60 flex shrink-0 items-center justify-between border-b px-4 pt-1 pb-3">
          <p className="text-muted-foreground/70 text-[10px] font-medium tracking-wider uppercase">
            {labels.courseContent}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground hover:bg-muted/60 flex size-8 items-center justify-center rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="shrink-0 px-4 py-3">
          <div className="mb-1.5 flex items-baseline justify-between gap-2">
            <span className="text-muted-foreground text-[11px]">
              {labels.formatProgress(done, total)}
            </span>
            <span className="text-foreground text-[11px] font-semibold tabular-nums">
              {pct}%
            </span>
          </div>
          <div
            aria-hidden
            className="bg-border/70 h-0.5 w-full overflow-hidden rounded-full"
          >
            <div
              className={cn(
                'h-full rounded-full transition-[width] duration-300 ease-out',
                isComplete ? 'bg-course-done' : 'bg-course-accent',
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Tree */}
        <div className="scrollbar-none flex-1 overflow-y-auto px-2.5 pb-8 [&::-webkit-scrollbar]:hidden">
          <CourseContentTree {...props} />
        </div>
      </div>
    </div>
  );
}
