'use client';

import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { CONTENT_TYPE_ICON, DURATION, EASE } from './constants';
import {
  isModuleExpandable,
  isModuleUnlocked,
  itemDetail,
  itemState,
  lessonProgress,
} from './selectors';
import type { ModuleMeta } from './selectors';
import type {
  ContentItem,
  CourseModule,
  CourseSidebarLabels,
  ItemState,
  Lesson,
} from './types';

const PANEL_WIDTH = 288;
const GAP = 8;
const VIEWPORT_MARGIN = 12;
/** Beyond this the item list scrolls internally instead of running off-screen. */
const MAX_ITEM_LIST_HEIGHT = 240;
/** Item list + header, worst case. Used to clamp the anchor. */
const MAX_PANEL_HEIGHT = MAX_ITEM_LIST_HEIGHT + 96;

interface FloatingModulePreviewProps {
  readonly module: CourseModule;
  readonly meta: ModuleMeta;
  readonly anchorRect: DOMRect;
  readonly currentItemId: string | null;
  readonly labels: CourseSidebarLabels;
  readonly onSelectItem: (
    item: ContentItem,
    lesson: Lesson,
    module: CourseModule,
  ) => void;
  /** Pointer or focus entered the panel — keep it open. */
  readonly onRetain: () => void;
  /** Pointer or focus left it — let it close. */
  readonly onRelease: () => void;
}

/**
 * The panel that stands in for a module's contents while the sidebar is a
 * 72px rail.
 *
 * A real element rather than `title=""` — a native tooltip cannot hold a
 * progress bar or an item list. Portalled to `document.body` so the rail's
 * `overflow-y: auto` cannot clip it. Every row is clickable and jumps straight
 * into that item, so there's no separate "Resume" affordance to maintain here.
 */
export function FloatingModulePreview({
  module,
  meta,
  anchorRect,
  currentItemId,
  labels,
  onSelectItem,
  onRetain,
  onRelease,
}: FloatingModulePreviewProps) {
  const reduceMotion = useReducedMotion();

  // Only ever rendered in response to hover or focus, so by definition the
  // document exists — but a portal must never be attempted during SSR.
  if (typeof document === 'undefined') return null;

  const { progress, index, state } = meta;
  const expandable = isModuleExpandable(state);
  const unlocked = isModuleUnlocked(state);

  const top = clampToViewport(anchorRect.top);

  return createPortal(
    <motion.div
      // Not `dialog`: it is non-modal and traps nothing. `group` labels the
      // subtree without promising focus management it doesn't do.
      role="group"
      aria-label={module.title}
      onPointerEnter={onRetain}
      onPointerLeave={onRelease}
      // Tabbing from the rail button into this panel blurs the trigger, which
      // schedules a close. React's onFocus is focusin (it bubbles), so it lands
      // here right after and cancels that close.
      onFocus={onRetain}
      onBlur={onRelease}
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -6 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: DURATION.preview, ease: EASE }
      }
      style={{
        top,
        // Anchored off the trigger, not off the rail's nominal width — the
        // sidebar is not always flush with the viewport's left edge.
        left: anchorRect.right + GAP,
        width: PANEL_WIDTH,
      }}
      className={cn(
        'border-border bg-popover fixed z-50 rounded-lg border',
        'text-popover-foreground overflow-hidden',
      )}
    >
      <div className="border-border/60 border-b px-3 py-2.5">
        <p className="text-foreground truncate text-[13px] font-semibold">
          {/* Announced for screen readers only — many course titles already
              embed their own numbering ("Module 1: Foundations…"), so a
              visible "Module 1 · " prefix would read as a duplicate. The
              numbered rail badge is the sighted equivalent. */}
          <span className="sr-only">{labels.moduleLabel(index)}: </span>
          {module.title}
        </p>

        {unlocked ? (
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="bg-course-accent/15 text-course-accent rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums">
              {labels.moduleCompleted(progress.completed, progress.total)}
            </span>
            <span className="text-muted-foreground text-[11px]">
              {labels.modulePercent(progress.percent)}
            </span>
          </div>
        ) : (
          <p className="text-muted-foreground/80 mt-1.5 flex items-center gap-1.5 text-[11px]">
            <Lock aria-hidden className="size-3" />
            {state === 'locked' ? labels.lockedModule : labels.disabledModule}
          </p>
        )}
      </div>

      {expandable && (
        <div
          className="scrollbar-none overflow-y-auto overscroll-contain p-1.5 [&::-webkit-scrollbar]:hidden"
          style={{ maxHeight: MAX_ITEM_LIST_HEIGHT }}
        >
          {module.lessons.map((lesson) => (
            <PreviewLesson
              key={lesson.id}
              lesson={lesson}
              currentItemId={currentItemId}
              labels={labels}
              onSelect={(item) => onSelectItem(item, lesson, module)}
            />
          ))}
        </div>
      )}
    </motion.div>,
    document.body,
  );
}

const DOT_CLASS: Record<ItemState, string> = {
  completed: 'text-course-done',
  current: 'text-course-accent',
  'in-progress': 'text-course-accent',
  'not-started': 'text-muted-foreground/60',
  locked: 'text-muted-foreground/40',
};

/**
 * One lesson's rows inside the preview. Not collapsible here — a hover panel
 * that requires a click to reveal its own content would be an awkward
 * interaction (the panel can disappear on blur mid-click) — but a lesson
 * bundling more than one item still gets its caption, so the preview doesn't
 * silently misrepresent the sidebar's real Module → Lesson → Item shape.
 */
function PreviewLesson({
  lesson,
  currentItemId,
  labels,
  onSelect,
}: {
  readonly lesson: Lesson;
  readonly currentItemId: string | null;
  readonly labels: CourseSidebarLabels;
  readonly onSelect: (item: ContentItem) => void;
}) {
  const showCaption = lesson.items.length > 1;
  const progress = showCaption ? lessonProgress(lesson) : null;

  return (
    <div>
      {showCaption && (
        <div className="text-muted-foreground/70 flex items-center gap-1.5 px-2 pt-1.5 pb-0.5 text-[10px] font-medium">
          <span className="min-w-0 flex-1 truncate">{lesson.title}</span>
          {!lesson.locked && progress && progress.total > 0 && (
            <span className="shrink-0 tabular-nums">
              {progress.completed}/{progress.total}
            </span>
          )}
        </div>
      )}
      <ul>
        {lesson.items.map((item) => (
          <PreviewItem
            key={item.id}
            item={item}
            state={itemState(item, Boolean(lesson.locked), currentItemId)}
            labels={labels}
            onSelect={() => onSelect(item)}
          />
        ))}
      </ul>
    </div>
  );
}

function PreviewItem({
  item,
  state,
  labels,
  onSelect,
}: {
  readonly item: ContentItem;
  readonly state: ItemState;
  readonly labels: CourseSidebarLabels;
  readonly onSelect: () => void;
}) {
  const Icon = state === 'locked' ? Lock : CONTENT_TYPE_ICON[item.type];
  const isCurrent = state === 'current';

  return (
    <li>
      <button
        type="button"
        disabled={state === 'locked'}
        onClick={onSelect}
        aria-current={isCurrent ? 'true' : undefined}
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left',
          'transition-colors duration-150 outline-none',
          'focus-visible:ring-course-accent focus-visible:ring-2 focus-visible:ring-inset',
          isCurrent ? 'bg-course-accent/8' : 'hover:bg-muted/60',
          state === 'locked' && 'cursor-not-allowed',
        )}
      >
        <Icon
          aria-hidden
          className={cn('size-3 shrink-0', DOT_CLASS[state])}
          strokeWidth={2.25}
        />
        <span
          className={cn(
            'min-w-0 flex-1 truncate text-[12px]',
            isCurrent
              ? 'text-course-accent font-semibold'
              : state === 'locked'
                ? 'text-muted-foreground/60'
                : 'text-foreground',
          )}
        >
          {item.title}
        </span>
        <span className="text-muted-foreground/70 shrink-0 text-[10px] tabular-nums">
          {itemDetail(item, labels)}
        </span>
      </button>
    </li>
  );
}

/** Keeps the panel fully on screen when its anchor sits near the bottom edge. */
function clampToViewport(anchorTop: number): number {
  const maxTop = window.innerHeight - MAX_PANEL_HEIGHT - VIEWPORT_MARGIN;
  // On a short viewport `maxTop` can fall below the margin; the margin wins.
  return Math.max(VIEWPORT_MARGIN, Math.min(anchorTop, maxTop));
}
