'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, Layers, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
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
}

/**
 * Reusable desktop content sidebar for the learner player and the educator/
 * admin previews. Crossfades between a full Module→Lesson→Content tree and a
 * compact icon rail; both convey completion + locking at every level.
 */
export function CourseContentSidebar(props: CourseContentSidebarProps) {
  const { courseTitle, collapsed, onCollapse, backHref, labels } = props;
  const { modules, isItemDone } = props;

  const { done, total } = useMemo(() => {
    const items = flattenLessons(modules).flatMap((f) => f.items);
    return { done: items.filter(isItemDone).length, total: items.length };
  }, [modules, isItemDone]);
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <aside
      className={cn(
        'border-border bg-background relative hidden shrink-0 overflow-hidden border-r transition-[width] duration-300 ease-in-out lg:flex',
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
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-black/10 bg-white px-4 sm:h-16 dark:border-white/10 dark:bg-transparent">
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
            className="ml-3 flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white/70"
          >
            <PanelLeftClose className="size-4" />
          </button>
        </div>

        {/* Course info + progress */}
        <div className="border-border/60 shrink-0 border-b px-4 py-4">
          <p className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">
            {labels.courseContent}
          </p>
          <h2 className="text-foreground mt-1.5 text-sm leading-snug font-bold">
            {courseTitle}
          </h2>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className="border-border bg-muted/40 text-foreground/70 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold">
              <Layers className="h-3 w-3" />
              {labels.moduleCount}
            </span>
            <span className="border-border bg-muted/40 text-foreground/70 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold">
              <BookOpen className="h-3 w-3" />
              {labels.lessonCount}
            </span>
          </div>
          <div className="mt-3">
            <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
              <div
                className="bg-brand-gold h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-muted-foreground text-[11px]">
                {labels.formatProgress(done, total)}
              </p>
              <span className="text-brand-gold text-[11px] font-bold">
                {pct}%
              </span>
            </div>
          </div>
        </div>

        {/* Tree */}
        <div className="scrollbar-none flex-1 overflow-y-auto px-2.5 py-2 [&::-webkit-scrollbar]:hidden">
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
        <div className="group/mini relative flex h-14 shrink-0 items-center justify-center border-b border-black/10 bg-white sm:h-16 dark:border-white/10 dark:bg-transparent">
          <button
            type="button"
            onClick={onCollapse}
            aria-label={labels.expandAria}
            className="relative flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-white/10"
          >
            <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover/mini:opacity-0">
              <Logo size="sm" variant="default" />
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-slate-400 opacity-0 transition-opacity duration-200 group-hover/mini:opacity-100 dark:text-white/40">
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
