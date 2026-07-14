'use client';

import { memo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, ChevronDown, Lock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { ContentItemRow } from './ContentItemRow';
import { DURATION, EASE } from './constants';
import { FOCUSABLE_ATTR } from './hooks/useRovingFocus';
import { itemState, lessonProgress } from './selectors';
import type { ContentItem, CourseSidebarLabels, Lesson } from './types';

interface LessonGroupProps {
  readonly lesson: Lesson;
  readonly currentItemId: string | null;
  readonly labels: CourseSidebarLabels;
  readonly onSelectItem: (item: ContentItem, lesson: Lesson) => void;
  readonly onLockedItem: (item: ContentItem, lesson: Lesson) => void;
}

/**
 * Renders one lesson's content.
 *
 * A lesson with a single item (the common case — a reading, a video) renders
 * as exactly that one row: the lesson and the item are the same thing from
 * the learner's point of view, so a second layer of chrome would only add
 * noise. A lesson that bundles several items (a video plus its quiz) gets its
 * own small collapsible header — the same disclosure pattern a module uses,
 * one level down, so "expand to see what's inside" behaves identically at
 * every depth of the tree.
 */
function LessonGroupImpl({
  lesson,
  currentItemId,
  labels,
  onSelectItem,
  onLockedItem,
}: LessonGroupProps) {
  const handleSelect = (item: ContentItem) => onSelectItem(item, lesson);
  const handleLocked = (item: ContentItem) => onLockedItem(item, lesson);

  if (lesson.items.length <= 1) {
    const item = lesson.items[0];
    if (!item) return null;
    // ContentItemRow already renders its own <li> — this IS the row, not a
    // wrapper around one.
    return (
      <ContentItemRow
        item={item}
        lesson={lesson}
        state={itemState(item, Boolean(lesson.locked), currentItemId)}
        labels={labels}
        onSelect={handleSelect}
        onLocked={handleLocked}
        tabbable={item.id === currentItemId}
      />
    );
  }

  return (
    <MultiItemLesson
      lesson={lesson}
      currentItemId={currentItemId}
      labels={labels}
      onSelect={handleSelect}
      onLocked={handleLocked}
    />
  );
}

/**
 * Memoised: a module can hold hundreds of these, and toggling a sibling
 * module must not re-render lessons whose props are unchanged.
 */
export const LessonGroup = memo(LessonGroupImpl);

function MultiItemLesson({
  lesson,
  currentItemId,
  labels,
  onSelect,
  onLocked,
}: {
  readonly lesson: Lesson;
  readonly currentItemId: string | null;
  readonly labels: CourseSidebarLabels;
  readonly onSelect: (item: ContentItem) => void;
  readonly onLocked: (item: ContentItem) => void;
}) {
  // Unlocked lessons open by default — a learner shouldn't need an extra
  // click to see the content they can already start. A locked one starts
  // closed; it stays expandable (a learner can still preview what's coming)
  // but there's nothing worth showing until they get there.
  const [isOpen, setIsOpen] = useState(!lesson.locked);
  const reduceMotion = useReducedMotion();
  const progress = lessonProgress(lesson);
  const isDone = progress.total > 0 && progress.completed === progress.total;

  const panelId = `lesson-panel-${lesson.id}`;
  const headerId = `lesson-header-${lesson.id}`;

  return (
    <li>
      {/* h4: one level under the module's h3 heading. */}
      <h4>
        <button
          type="button"
          id={headerId}
          {...{ [FOCUSABLE_ATTR]: '' }}
          aria-expanded={isOpen}
          aria-controls={isOpen ? panelId : undefined}
          onClick={() => setIsOpen((open) => !open)}
          className={cn(
            'group flex w-full items-center gap-2.5 px-3 py-2 text-left',
            'transition-colors duration-150 outline-none',
            'focus-visible:ring-course-accent focus-visible:ring-2 focus-visible:ring-inset',
            'hover:bg-muted/50',
          )}
        >
          {/* Round badge — the round shape marks this as a LESSON, the
              module's badge above is square. */}
          <span
            className={cn(
              'flex size-5 shrink-0 items-center justify-center rounded-full border',
              isDone
                ? 'bg-course-done border-course-done text-white'
                : lesson.locked
                  ? 'bg-muted text-muted-foreground/60 border-transparent'
                  : 'border-border bg-transparent',
            )}
          >
            {isDone ? (
              <Check className="size-3" strokeWidth={3} />
            ) : lesson.locked ? (
              <Lock className="size-2.5" />
            ) : null}
          </span>

          <span className="text-foreground min-w-0 flex-1 truncate text-[13px] font-medium">
            {lesson.title}
          </span>

          {!lesson.locked && progress.total > 0 && (
            <span className="text-muted-foreground shrink-0 text-[11px] font-medium tabular-nums">
              {progress.completed}/{progress.total}
            </span>
          )}

          <ChevronDown
            aria-hidden
            className={cn(
              'text-muted-foreground/60 size-3.5 shrink-0 transition-transform duration-150',
              'group-hover:text-foreground',
              isOpen && 'rotate-180',
            )}
          />
        </button>
      </h4>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: DURATION.accordion, ease: EASE }
            }
            className="overflow-hidden"
          >
            <ul className="border-border/60 divide-border/60 divide-y border-t">
              {lesson.items.map((item) => (
                <ContentItemRow
                  key={item.id}
                  item={item}
                  lesson={lesson}
                  state={itemState(item, Boolean(lesson.locked), currentItemId)}
                  labels={labels}
                  onSelect={onSelect}
                  onLocked={onLocked}
                  tabbable={item.id === currentItemId}
                />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
