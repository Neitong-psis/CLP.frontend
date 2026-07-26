'use client';

import type { RefObject } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Lock } from 'lucide-react';
import type {
  ReviewItem,
  ReviewLesson,
  ReviewModule,
} from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import {
  lessonItems,
  type CourseLocks,
  type ItemDone,
} from '@/lib/course-progress';
import {
  clampPreviewTop,
  PREVIEW_GAP,
  PREVIEW_MAX_ITEM_LIST_HEIGHT,
  PREVIEW_PANEL_WIDTH,
  PreviewItemRow,
} from './previewShared';
import type { ItemBadge, SidebarLabels } from './types';

/** Item list + header, worst case. Used to clamp the anchor. */
const MAX_PANEL_HEIGHT = PREVIEW_MAX_ITEM_LIST_HEIGHT + 96;

interface CourseContentModulePreviewProps {
  module: ReviewModule;
  moduleIndex: number;
  anchorRect: DOMRect;
  activeId: string;
  locks: CourseLocks;
  getItemBadge?: (item: ReviewItem) => ItemBadge;
  showTypeIcon?: boolean;
  isItemDone?: ItemDone;
  labels: SidebarLabels;
  /** Root node ref — lets `useHoverPreview` tell scrolling the panel's own
   *  content apart from the page scrolling behind it. */
  panelRef: RefObject<HTMLDivElement | null>;
  onSelectItem: (itemId: string) => void;
  /** Pointer or focus entered the panel — keep it open. */
  onRetain: () => void;
  /** Pointer or focus left it — let it close. */
  onRelease: () => void;
}

/**
 * The panel that stands in for a module's contents while the review sidebar
 * is collapsed to its icon rail — mirrors the learner sidebar's
 * `FloatingModulePreview` so hovering reads the same way across every role.
 *
 * A real element rather than `title=""` — a native tooltip cannot hold a
 * lesson/item list. Portalled to `document.body` so the rail's
 * `overflow-y: auto` cannot clip it.
 */
export function CourseContentModulePreview({
  module,
  moduleIndex,
  anchorRect,
  activeId,
  locks,
  getItemBadge,
  showTypeIcon,
  isItemDone,
  labels,
  panelRef,
  onSelectItem,
  onRetain,
  onRelease,
}: CourseContentModulePreviewProps) {
  const reduceMotion = useReducedMotion();

  // Only ever rendered in response to hover or focus, so by definition the
  // document exists — but a portal must never be attempted during SSR.
  if (typeof document === 'undefined') return null;

  const locked = locks.lockedModuleIds.has(module.id);
  const top = clampPreviewTop(anchorRect.top, MAX_PANEL_HEIGHT);

  return createPortal(
    <motion.div
      ref={panelRef}
      role="group"
      aria-label={module.title}
      onPointerEnter={onRetain}
      onPointerLeave={onRelease}
      onFocus={onRetain}
      onBlur={onRelease}
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -6 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.15, ease: [0.32, 0.72, 0, 1] }
      }
      style={{
        top,
        left: anchorRect.right + PREVIEW_GAP,
        width: PREVIEW_PANEL_WIDTH,
      }}
      className="border-border bg-popover text-popover-foreground fixed z-50 overflow-hidden rounded-lg border"
    >
      <div className="border-border/60 border-b px-3 py-2.5">
        <p className="text-foreground truncate text-[13px] font-semibold">
          <span className="sr-only">Module {moduleIndex + 1}: </span>
          {module.title}
        </p>

        {locked ? (
          <p className="text-muted-foreground/80 mt-1.5 flex items-center gap-1.5 text-[11px]">
            <Lock aria-hidden className="size-3" />
            {labels.lockedShort}
          </p>
        ) : (
          <p className="text-muted-foreground mt-1.5 text-[11px]">
            {module.lessons.length}{' '}
            {module.lessons.length === 1 ? 'lesson' : 'lessons'}
          </p>
        )}
      </div>

      {!locked && (
        <div
          className="scrollbar-none overflow-y-auto overscroll-contain p-1.5 [&::-webkit-scrollbar]:hidden"
          style={{ maxHeight: PREVIEW_MAX_ITEM_LIST_HEIGHT }}
        >
          {module.lessons.map((lesson, lessonIndex) => (
            <PreviewLesson
              key={lesson.id}
              lesson={lesson}
              lessonIndex={lessonIndex}
              activeId={activeId}
              getItemBadge={getItemBadge}
              showTypeIcon={showTypeIcon}
              isItemDone={isItemDone}
              onSelect={onSelectItem}
            />
          ))}
        </div>
      )}
    </motion.div>,
    document.body,
  );
}

function PreviewLesson({
  lesson,
  lessonIndex,
  activeId,
  getItemBadge,
  showTypeIcon,
  isItemDone,
  onSelect,
}: {
  lesson: ReviewLesson;
  lessonIndex: number;
  activeId: string;
  getItemBadge?: (item: ReviewItem) => ItemBadge;
  showTypeIcon?: boolean;
  isItemDone?: ItemDone;
  onSelect: (itemId: string) => void;
}) {
  const items = lessonItems(lesson);

  return (
    <div>
      <div className="text-muted-foreground/70 flex items-center gap-1.5 px-2 pt-1.5 pb-0.5 text-[10px] font-medium">
        <span className="shrink-0 tabular-nums">{lessonIndex + 1}.</span>
        <span className="min-w-0 flex-1 truncate">{lesson.title}</span>
      </div>
      <ul>
        {items.map((item) => (
          <PreviewItemRow
            key={item.id}
            item={item}
            isActive={item.id === activeId}
            badge={getItemBadge?.(item) ?? null}
            showTypeIcon={showTypeIcon}
            done={isItemDone?.(item)}
            onSelect={() => onSelect(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}
