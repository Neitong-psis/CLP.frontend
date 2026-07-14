'use client';

import type { RefObject } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Lock } from 'lucide-react';
import type {
  ReviewItem,
  ReviewLesson,
} from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import { lessonItems } from '@/lib/course-progress';
import {
  clampPreviewTop,
  PREVIEW_GAP,
  PREVIEW_MAX_ITEM_LIST_HEIGHT,
  PREVIEW_PANEL_WIDTH,
  PreviewItemRow,
} from './previewShared';
import type { ItemBadge, SidebarLabels } from './types';

/** Item list + header, worst case. Used to clamp the anchor. */
const MAX_PANEL_HEIGHT = PREVIEW_MAX_ITEM_LIST_HEIGHT + 72;

interface CourseContentLessonPreviewProps {
  lesson: ReviewLesson;
  lessonIndex: number;
  anchorRect: DOMRect;
  activeId: string;
  locked: boolean;
  getItemBadge?: (item: ReviewItem) => ItemBadge;
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
 * The narrower panel that stands in for a single lesson's content — hovering
 * a lesson node in the collapsed rail shows only *its* items, distinct from
 * hovering the module (which shows every lesson). Same shell/badge language
 * as `CourseContentModulePreview`.
 */
export function CourseContentLessonPreview({
  lesson,
  lessonIndex,
  anchorRect,
  activeId,
  locked,
  getItemBadge,
  labels,
  panelRef,
  onSelectItem,
  onRetain,
  onRelease,
}: CourseContentLessonPreviewProps) {
  const reduceMotion = useReducedMotion();

  // Only ever rendered in response to hover or focus, so by definition the
  // document exists — but a portal must never be attempted during SSR.
  if (typeof document === 'undefined') return null;

  const items = lessonItems(lesson);
  const top = clampPreviewTop(anchorRect.top, MAX_PANEL_HEIGHT);

  return createPortal(
    <motion.div
      ref={panelRef}
      role="group"
      aria-label={lesson.title}
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
          <span className="sr-only">Lesson {lessonIndex + 1}: </span>
          {lesson.title}
        </p>

        {locked && (
          <p className="text-muted-foreground/80 mt-1.5 flex items-center gap-1.5 text-[11px]">
            <Lock aria-hidden className="size-3" />
            {labels.lockedShort}
          </p>
        )}
      </div>

      {!locked && (
        <div
          className="scrollbar-none overflow-y-auto overscroll-contain p-1.5 [&::-webkit-scrollbar]:hidden"
          style={{ maxHeight: PREVIEW_MAX_ITEM_LIST_HEIGHT }}
        >
          <ul>
            {items.map((item) => (
              <PreviewItemRow
                key={item.id}
                item={item}
                isActive={item.id === activeId}
                badge={getItemBadge?.(item) ?? null}
                onSelect={() => onSelectItem(item.id)}
              />
            ))}
          </ul>
        </div>
      )}
    </motion.div>,
    document.body,
  );
}
