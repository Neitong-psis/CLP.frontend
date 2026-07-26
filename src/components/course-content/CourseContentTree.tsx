'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, ChevronDown, Lock, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type {
  ReviewItem,
  ReviewItemKind,
  ReviewLesson,
  ReviewModule,
} from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import {
  computeLocks,
  isModuleDone,
  lessonDoneCount,
  lessonItems,
  moduleDoneLessonCount,
  type CourseLocks,
} from '@/lib/course-progress';
import { DURATION, EASE } from '@/components/course-sidebar/constants';
import { KIND_ICON, type CourseTreeProps, type ItemBadge } from './types';

// ── Tree root ─────────────────────────────────────────────────────────────────

/** Module → Lesson → Content accordion, shared by the desktop sidebar and the
 *  mobile sheet. Completion rolls up at every level and locked branches are
 *  visible but non-interactive. Visual language mirrors the learner's
 *  `CourseSidebar` tree (bordered module cards, flush divided rows, a
 *  you-are-here accent rail) so the pattern reads the same across roles. */
export function CourseContentTree(props: CourseTreeProps) {
  const { modules, isItemDone, lockingEnabled } = props;
  const locks = useMemo(
    () => computeLocks(modules, isItemDone, lockingEnabled),
    [modules, isItemDone, lockingEnabled],
  );

  return (
    <div className="flex flex-col gap-1.5 px-0.5 pb-2">
      {modules.map((mod, index) => (
        <ModuleRow
          key={mod.id}
          mod={mod}
          index={index}
          locks={locks}
          {...props}
        />
      ))}
    </div>
  );
}

// ── Module ────────────────────────────────────────────────────────────────────

function ModuleRow({
  mod,
  index,
  locks,
  activeId,
  expanded,
  onToggleModule,
  isItemDone,
  onSelect,
  onLockedSelect,
  getItemBadge,
  showTypeIcon,
  labels,
}: CourseTreeProps & {
  mod: ReviewModule;
  index: number;
  locks: CourseLocks;
}) {
  const reduceMotion = useReducedMotion();
  const isOpen = expanded.has(mod.id);
  const total = mod.lessons.length;
  const done = moduleDoneLessonCount(mod, isItemDone);
  const locked = locks.lockedModuleIds.has(mod.id);
  const complete = total > 0 && isModuleDone(mod, isItemDone);
  const hasActive = mod.lessons.some((lesson) =>
    lessonItems(lesson).some((item) => item.id === activeId),
  );
  const isActive = hasActive && !complete;

  return (
    <div
      className={cn(
        'border-border/60 overflow-hidden rounded-lg border transition-colors duration-150',
        isActive ? 'border-course-accent/30 bg-course-accent/4' : 'bg-card',
        !locked && !isActive && 'hover:border-border',
      )}
    >
      <button
        type="button"
        onClick={() => onToggleModule(mod.id)}
        aria-expanded={isOpen}
        className="group hover:bg-muted/40 flex w-full items-center gap-3 px-2.5 py-2.5 text-left transition-colors duration-150"
      >
        {/* Numbered square badge — the square shape marks this as a MODULE */}
        <span
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-md border text-xs font-bold tabular-nums transition-colors duration-150',
            complete
              ? 'bg-course-done border-course-done text-white'
              : locked
                ? 'bg-muted text-muted-foreground/70 border-transparent'
                : isActive
                  ? 'bg-course-accent border-course-accent text-course-accent-foreground'
                  : 'border-border text-muted-foreground bg-transparent',
          )}
        >
          {complete ? (
            <Check className="size-4" strokeWidth={3} />
          ) : locked ? (
            <Lock className="size-3.5" />
          ) : (
            index + 1
          )}
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span
            className={cn(
              'truncate text-[13px] leading-tight font-semibold',
              locked ? 'text-muted-foreground' : 'text-foreground',
            )}
          >
            {mod.title}
          </span>

          {locked ? (
            <span className="text-muted-foreground/80 truncate text-[11px] leading-tight">
              {labels.lockedShort}
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <span className="bg-course-accent/15 text-course-accent rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums">
                {done}/{total}
              </span>
            </span>
          )}
        </span>

        <ChevronDown
          aria-hidden
          className={cn(
            'text-muted-foreground/60 size-4 shrink-0 transition-transform duration-150',
            'group-hover:text-foreground',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
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
            <div className="border-border/60 divide-border/60 divide-y border-t">
              {mod.lessons.map((lesson, index) => (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                  locks={locks}
                  activeId={activeId}
                  isItemDone={isItemDone}
                  onSelect={onSelect}
                  onLockedSelect={onLockedSelect}
                  getItemBadge={getItemBadge}
                  showTypeIcon={showTypeIcon}
                  labels={labels}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Lesson ────────────────────────────────────────────────────────────────────

function LessonRow({
  lesson,
  index,
  locks,
  activeId,
  isItemDone,
  onSelect,
  onLockedSelect,
  getItemBadge,
  showTypeIcon,
  labels,
}: {
  lesson: ReviewLesson;
  index: number;
  locks: CourseLocks;
  activeId: string;
  isItemDone: CourseTreeProps['isItemDone'];
  onSelect: CourseTreeProps['onSelect'];
  onLockedSelect: CourseTreeProps['onLockedSelect'];
  getItemBadge: CourseTreeProps['getItemBadge'];
  showTypeIcon: CourseTreeProps['showTypeIcon'];
  labels: CourseTreeProps['labels'];
}) {
  const reduceMotion = useReducedMotion();
  const items = lessonItems(lesson);
  const hasActive = items.some((i) => i.id === activeId);
  const [open, setOpen] = useState(!locks.lockedLessonIds.has(lesson.id));
  const total = items.length;
  const done = lessonDoneCount(lesson, isItemDone);
  const locked = locks.lockedLessonIds.has(lesson.id);
  const blockingTitle = locks.blockedBy.get(lesson.id);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        title={
          locked && blockingTitle ? labels.lockedHint(blockingTitle) : undefined
        }
        className="group hover:bg-muted/50 flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors duration-150"
      >
        {/* Numbered round badge — the round shape marks this as a LESSON.
            Plain lesson order, not a completion check: viewing a lesson
            isn't a verdict, so it never gets colored in like the item's
            approve/reject status does. */}
        <span
          className={cn(
            'flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold tabular-nums',
            locked
              ? 'bg-muted text-muted-foreground/60 border-transparent'
              : hasActive
                ? 'bg-course-accent border-course-accent text-course-accent-foreground'
                : 'border-border text-muted-foreground bg-transparent',
          )}
        >
          {locked ? <Lock className="size-2.5" /> : index + 1}
        </span>

        <span
          className={cn(
            'min-w-0 flex-1 truncate text-[13px] font-medium',
            locked ? 'text-muted-foreground' : 'text-foreground',
          )}
        >
          {lesson.title}
        </span>

        {locked ? (
          <Lock className="text-muted-foreground/70 size-3 shrink-0" />
        ) : (
          total > 0 && (
            <span className="text-muted-foreground shrink-0 text-[11px] font-medium tabular-nums">
              {done}/{total}
            </span>
          )
        )}

        <ChevronDown
          aria-hidden
          className={cn(
            'text-muted-foreground/60 size-3.5 shrink-0 transition-transform duration-150',
            'group-hover:text-foreground',
            open && 'rotate-180',
          )}
        />
      </button>

      {total > 0 && (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="panel"
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
                {items.map((item) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    isActive={item.id === activeId}
                    locked={locks.lockedItemIds.has(item.id)}
                    badge={getItemBadge?.(item) ?? null}
                    showTypeIcon={showTypeIcon}
                    done={isItemDone(item)}
                    onSelect={onSelect}
                    onLocked={() =>
                      onLockedSelect?.(blockingTitle ?? lesson.title)
                    }
                  />
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

// ── Item ──────────────────────────────────────────────────────────────────────

const TYPE_LABEL: Record<ReviewItemKind, string> = {
  document: 'Document',
  video: 'Video',
  quiz: 'Quiz',
  assignment: 'Assignment',
};

function itemMetaDetail(item: ReviewItem): string {
  switch (item.kind) {
    case 'document':
      return item.readTime;
    case 'video':
      return item.duration;
    case 'quiz':
      return `${item.totalQuestions} question${item.totalQuestions === 1 ? '' : 's'}`;
    case 'assignment':
      return `Due ${item.dueDate}`;
  }
}

function ItemRow({
  item,
  isActive,
  locked,
  badge,
  showTypeIcon,
  done,
  onSelect,
  onLocked,
}: {
  item: ReviewItem;
  isActive: boolean;
  locked: boolean;
  badge: ItemBadge;
  showTypeIcon?: boolean;
  /** Only meaningful alongside `showTypeIcon` — a completed item gets the
   *  same filled check the learner sidebar shows, instead of its type icon. */
  done?: boolean;
  onSelect: (id: string) => void;
  onLocked: () => void;
}) {
  const meta = `${TYPE_LABEL[item.kind]} · ${itemMetaDetail(item)}`;
  const TypeIcon = KIND_ICON[item.kind];

  return (
    <li>
      <button
        type="button"
        onClick={() => (locked ? onLocked() : onSelect(item.id))}
        aria-current={isActive ? 'true' : undefined}
        aria-disabled={locked || undefined}
        className={cn(
          // Flush, edge-to-edge row — separation comes from the parent
          // list's `divide-y`, not from a rounded pill per row.
          'group relative flex w-full items-center gap-2.5 px-3 py-2 text-left',
          'transition-colors duration-150',
          isActive ? 'bg-course-accent/8' : 'hover:bg-muted/50',
          locked && 'cursor-not-allowed hover:bg-transparent',
        )}
      >
        {/* You-are-here rail. Rendered always, scaled to nothing when
            inactive, so the row's box never shifts between states. */}
        <span
          aria-hidden
          className={cn(
            'bg-course-accent absolute top-1/2 left-0 h-6 w-0.5 -translate-y-1/2 rounded-full',
            'origin-center transition-transform duration-150',
            isActive ? 'scale-y-100' : 'scale-y-0',
          )}
        />

        {/* Status token. With an admin verdict it's purely that verdict —
            opening an item to review it isn't a decision, so there's nothing
            to show until admin actually approves or rejects it. With no
            verdict to show (e.g. previewing a published course as a
            learner would experience it), a completed item gets the same
            filled check the learner sidebar uses instead. */}
        <span
          className={cn(
            'flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-150',
            locked
              ? 'bg-muted text-muted-foreground/60 border-transparent'
              : badge === 'approved'
                ? 'border-transparent bg-emerald-500 text-white'
                : badge === 'rejected'
                  ? 'border-transparent bg-rose-500 text-white'
                  : showTypeIcon && done
                    ? 'border-transparent bg-emerald-500 text-white'
                    : isActive
                      ? 'border-course-accent bg-course-accent/10 text-course-accent'
                      : 'border-border bg-transparent',
          )}
        >
          {locked ? (
            <Lock className="size-2.5" />
          ) : badge === 'approved' ? (
            <Check className="size-3" strokeWidth={3} />
          ) : badge === 'rejected' ? (
            <X className="size-3" strokeWidth={3} />
          ) : showTypeIcon && done ? (
            <Check className="size-3" strokeWidth={3} />
          ) : showTypeIcon ? (
            <TypeIcon className="size-3" strokeWidth={2.25} />
          ) : null}
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span
            className={cn(
              'truncate text-[13px] leading-tight',
              isActive
                ? 'text-course-accent font-semibold'
                : locked
                  ? 'text-muted-foreground/70'
                  : 'text-foreground',
            )}
          >
            {item.title}
          </span>
          <span className="text-muted-foreground/80 truncate text-[11px] leading-tight">
            {meta}
          </span>
        </span>
      </button>
    </li>
  );
}
