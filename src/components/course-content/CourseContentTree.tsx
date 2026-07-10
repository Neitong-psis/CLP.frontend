'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronDown, Clock, Lock, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type {
  ReviewItem,
  ReviewLesson,
  ReviewModule,
} from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import {
  computeLocks,
  isLessonDone,
  isModuleDone,
  lessonDoneCount,
  lessonItems,
  moduleDoneLessonCount,
  type CourseLocks,
} from '@/lib/course-progress';
import { KIND_ICON, type CourseTreeProps } from './types';

// ── Tree root ─────────────────────────────────────────────────────────────────

/** Module → Lesson → Content accordion, shared by the desktop sidebar and the
 *  mobile sheet. Completion rolls up at every level and locked branches are
 *  visible but non-interactive. */
export function CourseContentTree(props: CourseTreeProps) {
  const { modules, isItemDone, lockingEnabled } = props;
  const locks = useMemo(
    () => computeLocks(modules, isItemDone, lockingEnabled),
    [modules, isItemDone, lockingEnabled],
  );

  return (
    <div className="space-y-1">
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
  labels,
}: CourseTreeProps & {
  mod: ReviewModule;
  index: number;
  locks: CourseLocks;
}) {
  const isOpen = expanded.has(mod.id);
  const total = mod.lessons.length;
  const done = moduleDoneLessonCount(mod, isItemDone);
  const locked = locks.lockedModuleIds.has(mod.id);
  const complete = total > 0 && isModuleDone(mod, isItemDone);

  return (
    <div>
      <button
        type="button"
        onClick={() => onToggleModule(mod.id)}
        aria-expanded={isOpen}
        className={cn(
          'group flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors',
          'hover:bg-muted/50',
        )}
      >
        {/* Numbered square badge — the square shape marks this as a MODULE */}
        <span
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors',
            complete
              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
              : locked
                ? 'bg-muted text-muted-foreground'
                : 'bg-brand-gold/15 text-brand-gold',
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

        <span
          className={cn(
            'min-w-0 flex-1 truncate text-sm font-bold',
            locked ? 'text-muted-foreground' : 'text-foreground',
          )}
        >
          {mod.title}
        </span>

        {/* Completion pill */}
        <span
          className={cn(
            'shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums',
            complete
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-muted text-muted-foreground',
          )}
        >
          {done}/{total}
        </span>
        <ChevronDown
          className={cn(
            'text-muted-foreground size-4 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-in-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="mt-0.5 space-y-0.5 pl-3.5">
            {mod.lessons.map((lesson) => (
              <LessonRow
                key={lesson.id}
                lesson={lesson}
                locks={locks}
                activeId={activeId}
                isItemDone={isItemDone}
                onSelect={onSelect}
                onLockedSelect={onLockedSelect}
                getItemBadge={getItemBadge}
                labels={labels}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Lesson ────────────────────────────────────────────────────────────────────

function LessonRow({
  lesson,
  locks,
  activeId,
  isItemDone,
  onSelect,
  onLockedSelect,
  getItemBadge,
  labels,
}: {
  lesson: ReviewLesson;
  locks: CourseLocks;
  activeId: string;
  isItemDone: CourseTreeProps['isItemDone'];
  onSelect: CourseTreeProps['onSelect'];
  onLockedSelect: CourseTreeProps['onLockedSelect'];
  getItemBadge: CourseTreeProps['getItemBadge'];
  labels: CourseTreeProps['labels'];
}) {
  const items = lessonItems(lesson);
  const hasActive = items.some((i) => i.id === activeId);
  const [open, setOpen] = useState(true);
  const total = items.length;
  const done = lessonDoneCount(lesson, isItemDone);
  const locked = locks.lockedLessonIds.has(lesson.id);
  const complete = isLessonDone(lesson, isItemDone);
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
        className="group hover:bg-muted/50 flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors"
      >
        {/* Circular node — the round shape marks this as a LESSON */}
        <span
          className={cn(
            'flex size-6 shrink-0 items-center justify-center rounded-full',
            complete
              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
              : locked
                ? 'bg-muted text-muted-foreground'
                : hasActive
                  ? 'bg-brand-gold/20 text-brand-gold'
                  : 'bg-muted text-muted-foreground',
          )}
        >
          {complete ? (
            <Check className="size-3" strokeWidth={3} />
          ) : locked ? (
            <Lock className="size-3" />
          ) : (
            <span className="size-1.5 rounded-full bg-current" />
          )}
        </span>

        <span
          className={cn(
            'min-w-0 flex-1 truncate text-xs font-semibold',
            locked ? 'text-muted-foreground' : 'text-foreground',
          )}
        >
          {lesson.title}
        </span>

        {locked ? (
          <Lock className="text-muted-foreground/70 size-3 shrink-0" />
        ) : complete ? (
          <Check
            className="size-3.5 shrink-0 text-emerald-500"
            strokeWidth={3}
          />
        ) : (
          <span className="text-muted-foreground shrink-0 text-[10px] font-bold tabular-nums">
            {done}/{total}
          </span>
        )}
        <ChevronDown
          className={cn(
            'text-muted-foreground size-3.5 shrink-0 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {total > 0 && (
        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-200 ease-in-out',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="overflow-hidden">
            {/* Rail-connected item list */}
            <div className="border-border/70 mt-0.5 ml-[11px] space-y-0.5 border-l pl-3">
              {items.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  isActive={item.id === activeId}
                  done={isItemDone(item)}
                  locked={locks.lockedItemIds.has(item.id)}
                  badge={getItemBadge?.(item) ?? null}
                  onSelect={onSelect}
                  onLocked={() =>
                    onLockedSelect?.(blockingTitle ?? lesson.title)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Item ──────────────────────────────────────────────────────────────────────

function ItemRow({
  item,
  isActive,
  done,
  locked,
  badge,
  onSelect,
  onLocked,
}: {
  item: ReviewItem;
  isActive: boolean;
  done: boolean;
  locked: boolean;
  badge: 'failed' | 'submitted' | null;
  onSelect: (id: string) => void;
  onLocked: () => void;
}) {
  const Icon = KIND_ICON[item.kind];

  return (
    <button
      type="button"
      onClick={() => (locked ? onLocked() : onSelect(item.id))}
      aria-current={isActive ? 'true' : undefined}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors',
        locked
          ? 'cursor-not-allowed'
          : isActive
            ? 'bg-brand-gold/10'
            : 'hover:bg-muted/50',
      )}
    >
      {/* Status token */}
      <span className="relative shrink-0">
        <span
          className={cn(
            'flex size-5 items-center justify-center rounded-full',
            done
              ? 'bg-emerald-500 text-white'
              : locked
                ? 'bg-muted text-muted-foreground/70'
                : isActive
                  ? 'bg-brand-gold/20 text-brand-gold ring-brand-gold/40 ring-1'
                  : 'text-muted-foreground border-border border',
          )}
        >
          {done ? (
            <Check className="size-3" strokeWidth={3} />
          ) : locked ? (
            <Lock className="size-2.5" />
          ) : (
            <Icon className="size-3" />
          )}
        </span>

        {/* Learner overlay badge (only meaningful when not done/locked) */}
        {!done && !locked && badge && (
          <span className="absolute -top-1 -right-1">
            {badge === 'failed' && (
              <XCircle className="bg-background size-3 rounded-full text-rose-500" />
            )}
            {badge === 'submitted' && (
              <Clock className="bg-background text-brand-gold size-3 rounded-full" />
            )}
          </span>
        )}
      </span>

      <span
        className={cn(
          'min-w-0 flex-1 truncate text-xs',
          done
            ? 'text-foreground/70'
            : locked
              ? 'text-muted-foreground/60'
              : isActive
                ? 'text-foreground font-semibold'
                : 'text-muted-foreground',
        )}
      >
        {item.title}
      </span>
    </button>
  );
}
