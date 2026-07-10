'use client';

import { memo, useCallback, useMemo, useRef } from 'react';
import { VIRTUAL_VIEWPORT_HEIGHT, VIRTUALIZE_THRESHOLD } from './constants';
import { LessonGroup } from './LessonGroup';
import { useVirtualRows } from './hooks/useVirtualRows';
import { lessonRowHeight } from './selectors';
import type {
  ContentItem,
  CourseModule,
  CourseSidebarLabels,
  Lesson,
} from './types';

interface LessonListProps {
  readonly module: CourseModule;
  readonly currentItemId: string | null;
  readonly labels: CourseSidebarLabels;
  readonly onSelectItem: (
    item: ContentItem,
    lesson: Lesson,
    module: CourseModule,
  ) => void;
  readonly onLockedItem: (
    item: ContentItem,
    lesson: Lesson,
    module: CourseModule,
  ) => void;
}

/**
 * The lessons of one expanded module.
 *
 * Mounted only while its module is open (`AnimatePresence` in `ModuleItem`
 * unmounts it on close), which is the lazy-render half of the performance
 * story. Past `VIRTUALIZE_THRESHOLD` lessons it also switches to its own
 * scroll viewport and windows the rows — the accordion animating a 200-row
 * column to `height: auto` is what actually janks, not the row count itself.
 */
function LessonListImpl({
  module,
  currentItemId,
  labels,
  onSelectItem,
  onLockedItem,
}: LessonListProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const lessons = module.lessons;
  const isVirtual = lessons.length > VIRTUALIZE_THRESHOLD;

  const heights = useMemo(() => lessons.map(lessonRowHeight), [lessons]);

  const { start, end, totalHeight, offsetY } = useVirtualRows({
    heights,
    viewportRef,
    enabled: isVirtual,
  });

  // Bound to the module so `LessonGroup` keeps a stable callback identity and
  // its `memo` actually holds.
  const handleSelect = useCallback(
    (item: ContentItem, lesson: Lesson) => onSelectItem(item, lesson, module),
    [onSelectItem, module],
  );
  const handleLocked = useCallback(
    (item: ContentItem, lesson: Lesson) => onLockedItem(item, lesson, module),
    [onLockedItem, module],
  );

  const visible = isVirtual ? lessons.slice(start, end) : lessons;

  const rows = visible.map((lesson) => (
    <LessonGroup
      key={lesson.id}
      lesson={lesson}
      currentItemId={currentItemId}
      labels={labels}
      onSelectItem={handleSelect}
      onLockedItem={handleLocked}
    />
  ));

  if (!isVirtual) {
    return (
      <ul className="border-border/60 divide-border/60 divide-y border-t">
        {rows}
      </ul>
    );
  }

  return (
    <div
      ref={viewportRef}
      // `overscroll-contain` stops a flick at the end of this list from
      // scrolling the sidebar behind it.
      className="border-border/60 scrollbar-none overflow-y-auto overscroll-contain border-t [&::-webkit-scrollbar]:hidden"
      style={{ height: VIRTUAL_VIEWPORT_HEIGHT }}
    >
      {/* Spacer carries the full scroll height; the slice is translated into view. */}
      <div style={{ height: totalHeight }} className="relative">
        <ul
          className="divide-border/60 absolute inset-x-0 top-0 divide-y"
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          {rows}
        </ul>
      </div>
    </div>
  );
}

export const LessonList = memo(LessonListImpl);
