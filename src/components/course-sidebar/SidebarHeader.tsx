'use client';

import type { ReactNode } from 'react';
import { ProgressBar } from './ProgressBar';
import type { CourseSidebarLabels, ProgressSummary } from './types';

interface SidebarHeaderProps {
  readonly courseTitle: string;
  readonly progress: ProgressSummary;
  readonly labels: CourseSidebarLabels;
  /** An export/download action or similar — scoped to this course, not the sidebar chrome. */
  readonly titleAction?: ReactNode;
}

/**
 * Course title + overall progress. The collapse/close toggle lives one row up,
 * beside the brand slot (see `CourseSidebar`'s top row) rather than in here —
 * pairing it with the logo keeps a single, predictable spot for it whether or
 * not a course is even loaded yet. `titleAction` is different: it belongs to
 * *this course*, so it sits directly beside the course title.
 */
export function SidebarHeader({
  courseTitle,
  progress,
  labels,
  titleAction,
}: SidebarHeaderProps) {
  const isComplete =
    progress.total > 0 && progress.completed === progress.total;

  return (
    <header className="border-border/60 border-b px-3 pt-3 pb-3">
      <p className="text-muted-foreground/70 mb-0.5 text-[10px] font-medium tracking-wider uppercase">
        {labels.courseContent}
      </p>
      <div className="mb-2.5 flex items-start gap-2">
        {/* h2, not h1 — the lesson player owns the page's h1. */}
        <h2
          className="text-foreground min-w-0 flex-1 truncate text-sm leading-snug font-semibold"
          title={courseTitle}
        >
          {courseTitle}
        </h2>
        {titleAction && <div className="-my-0.5 shrink-0">{titleAction}</div>}
      </div>

      <div
        role="progressbar"
        aria-valuenow={progress.percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={labels.overallProgress}
        aria-valuetext={labels.moduleCompleted(
          progress.completed,
          progress.total,
        )}
      >
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          <span className="text-muted-foreground text-[11px]">
            {labels.moduleCompleted(progress.completed, progress.total)}
          </span>
          <span className="text-foreground text-[11px] font-semibold tabular-nums">
            {progress.percent}%
          </span>
        </div>
        <ProgressBar
          percent={progress.percent}
          tone={isComplete ? 'done' : 'accent'}
        />
      </div>
    </header>
  );
}
