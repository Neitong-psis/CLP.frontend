'use client';

import { useMemo, type ReactNode } from 'react';
import Link from 'next/link';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Logo from '@/components/common/Logo';
import { flattenLessons } from '@/lib/course-progress';
import { CourseContentTree } from './CourseContentTree';
import { CourseContentRail } from './CourseContentRail';
import type { CourseTreeProps } from './types';

export interface CourseContentSidebarProps extends CourseTreeProps {
  courseTitle: string;
  collapsed: boolean;
  onCollapse: () => void;
  backHref: string;
  /** An export/download action or similar — scoped to this course, so it
   *  sits directly beside the course title (matches the learner sidebar). */
  titleAction?: ReactNode;
}

/**
 * Reusable desktop content sidebar for the educator/admin course review
 * surfaces. Crossfades between a full Module→Lesson→Content tree and a
 * compact icon rail; both convey completion + locking at every level. Visual
 * language (colors, progress bar, header layout) mirrors the learner's
 * `CourseSidebar` so the pattern reads the same across all three roles.
 */
export function CourseContentSidebar(props: CourseContentSidebarProps) {
  const { courseTitle, collapsed, onCollapse, backHref, titleAction, labels } =
    props;
  const { modules, isItemDone } = props;

  const { done, total } = useMemo(() => {
    const items = flattenLessons(modules).flatMap((f) => f.items);
    return { done: items.filter(isItemDone).length, total: items.length };
  }, [modules, isItemDone]);
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const isComplete = total > 0 && done === total;

  return (
    <aside
      className={cn(
        'border-border/60 bg-card relative hidden shrink-0 overflow-hidden border-r transition-[width] duration-300 ease-in-out lg:flex',
        collapsed ? 'lg:w-18' : 'lg:w-72 xl:w-80',
      )}
    >
      {/* ── EXPANDED ─────────────────────────────────────────────────────────── */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col transition-opacity duration-200',
          collapsed ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
      >
        {/* Brand header */}
        <div className="border-border/60 flex h-14 shrink-0 items-center justify-between border-b px-3 sm:h-16">
          <Link
            href={backHref}
            aria-label={labels.backAria}
            className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
          >
            <Logo size="md" variant="default" showText />
          </Link>
          <button
            type="button"
            onClick={onCollapse}
            aria-label={labels.collapseAria}
            className="text-muted-foreground hover:bg-muted hover:text-foreground ml-3 flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors"
          >
            <PanelLeftClose className="size-4" />
          </button>
        </div>

        {/* Course info + progress */}
        <div className="border-border/60 shrink-0 border-b px-3 pt-3 pb-3">
          <p className="text-muted-foreground/70 mb-0.5 text-[10px] font-medium tracking-wider uppercase">
            {labels.courseContent}
          </p>
          <div className="mb-2.5 flex items-start gap-2">
            <h2
              className="text-foreground min-w-0 flex-1 truncate text-sm leading-snug font-semibold"
              title={courseTitle}
            >
              {courseTitle}
            </h2>
            {titleAction && (
              <div className="-my-0.5 shrink-0">{titleAction}</div>
            )}
          </div>

          <div
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={labels.courseContent}
            aria-valuetext={labels.formatProgress(done, total)}
          >
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
        </div>

        {/* Tree */}
        <div className="scrollbar-none flex-1 overflow-y-auto px-2 py-2 [&::-webkit-scrollbar]:hidden">
          <CourseContentTree {...props} />
        </div>
      </div>

      {/* ── COLLAPSED ────────────────────────────────────────────────────────── */}
      <div
        className={cn(
          'absolute inset-0 flex w-18 flex-col transition-opacity duration-200',
          collapsed ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div className="group/mini border-border/60 relative flex h-14 shrink-0 items-center justify-center border-b sm:h-16">
          <button
            type="button"
            onClick={onCollapse}
            aria-label={labels.expandAria}
            className="hover:bg-muted relative flex size-10 items-center justify-center rounded-lg transition-colors"
          >
            <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover/mini:opacity-0">
              <Logo size="sm" variant="default" />
            </span>
            <span className="text-muted-foreground absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover/mini:opacity-100">
              <PanelLeftOpen className="size-4" />
            </span>
          </button>
        </div>

        <div className="scrollbar-none flex-1 overflow-y-auto px-1.5 py-3 [&::-webkit-scrollbar]:hidden">
          <CourseContentRail {...props} />
        </div>
      </div>
    </aside>
  );
}
