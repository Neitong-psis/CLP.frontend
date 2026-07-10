'use client';

import { useMemo, useState } from 'react';
import { Check, Lock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import {
  computeLocks,
  flattenLessons,
  isLessonDone,
  isModuleDone,
  lessonItems,
} from '@/lib/course-progress';
import { KIND_ICON, type CourseTreeProps } from './types';

/**
 * Collapsed icon rail. Shapes carry the hierarchy so a glance is enough:
 *   module = rounded SQUARE numbered badge · lesson = round node · item = small dot.
 * Completion (emerald check) and locking (lock glyph) render at every level, and
 * `title=` tooltips name each node.
 */
export function CourseContentRail({
  modules,
  activeId,
  isItemDone,
  onSelect,
  onLockedSelect,
  getItemBadge,
  lockingEnabled,
  labels,
}: Pick<
  CourseTreeProps,
  | 'modules'
  | 'activeId'
  | 'isItemDone'
  | 'onSelect'
  | 'onLockedSelect'
  | 'getItemBadge'
  | 'lockingEnabled'
  | 'labels'
>) {
  const locks = useMemo(
    () => computeLocks(modules, isItemDone, lockingEnabled),
    [modules, isItemDone, lockingEnabled],
  );

  const activeModuleId = useMemo(
    () =>
      flattenLessons(modules).find((f) =>
        f.items.some((i) => i.id === activeId),
      )?.module.id,
    [modules, activeId],
  );

  // Modules collapsed by default except the one holding the active item.
  const [manualExpanded, setManualExpanded] = useState<Set<string>>(() =>
    activeModuleId ? new Set([activeModuleId]) : new Set(),
  );
  const expanded = useMemo(
    () =>
      activeModuleId
        ? new Set([...manualExpanded, activeModuleId])
        : manualExpanded,
    [manualExpanded, activeModuleId],
  );

  function toggle(id: string) {
    setManualExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-2">
      {modules.map((mod, mIdx) => {
        const isOpen = expanded.has(mod.id);
        const complete = isModuleDone(mod, isItemDone);
        const locked = locks.lockedModuleIds.has(mod.id);
        const hasActive = flattenLessons([mod]).some((f) =>
          f.items.some((i) => i.id === activeId),
        );

        return (
          <div key={mod.id} className="relative">
            {mIdx > 0 && <div className="bg-border mx-auto mb-2 h-px w-6" />}

            {/* Trunk from module badge down through open children */}
            {isOpen && (
              <div className="bg-border absolute top-8 bottom-0 left-1/2 w-px -translate-x-1/2" />
            )}

            {/* Module badge — SQUARE */}
            <button
              type="button"
              onClick={() => toggle(mod.id)}
              title={mod.title}
              className="relative z-10 mx-auto flex w-full items-center justify-center rounded-lg py-0.5 transition-colors"
            >
              <span
                className={cn(
                  'flex size-8 items-center justify-center rounded-lg text-xs font-bold transition-colors',
                  complete
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                    : locked
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-brand-gold/15 text-brand-gold',
                  hasActive && !complete && 'ring-brand-gold/50 ring-2',
                )}
              >
                {complete ? (
                  <Check className="size-4" strokeWidth={3} />
                ) : locked ? (
                  <Lock className="size-3.5" />
                ) : (
                  mIdx + 1
                )}
              </span>
            </button>

            {isOpen && (
              <div className="relative mt-1 space-y-1">
                {mod.lessons.map((lesson) => {
                  const items = lessonItems(lesson);
                  const lessonDone = isLessonDone(lesson, isItemDone);
                  const lessonLocked = locks.lockedLessonIds.has(lesson.id);
                  const lessonActive = items.some((i) => i.id === activeId);

                  return (
                    <div key={lesson.id}>
                      {/* Lesson node — ROUND */}
                      <div
                        title={lesson.title}
                        className="relative z-10 mx-auto flex w-full items-center justify-center py-0.5"
                      >
                        <span
                          className={cn(
                            'flex size-6 items-center justify-center rounded-full',
                            lessonDone
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                              : lessonLocked
                                ? 'bg-muted text-muted-foreground'
                                : lessonActive
                                  ? 'bg-brand-gold/20 text-brand-gold'
                                  : 'bg-muted text-muted-foreground',
                          )}
                        >
                          {lessonDone ? (
                            <Check className="size-3" strokeWidth={3} />
                          ) : lessonLocked ? (
                            <Lock className="size-2.5" />
                          ) : (
                            <span className="size-1.5 rounded-full bg-current" />
                          )}
                        </span>
                      </div>

                      {/* Items — tiny dots */}
                      <div className="flex flex-col items-center gap-1 py-0.5">
                        {items.map((item) => {
                          const Icon = KIND_ICON[item.kind];
                          const isActive = item.id === activeId;
                          const done = isItemDone(item);
                          const itemLocked = locks.lockedItemIds.has(item.id);
                          const badge = getItemBadge?.(item) ?? null;
                          const blockingTitle =
                            locks.blockedBy.get(lesson.id) ?? lesson.title;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() =>
                                itemLocked
                                  ? onLockedSelect?.(blockingTitle)
                                  : onSelect(item.id)
                              }
                              title={
                                itemLocked
                                  ? labels.lockedHint(blockingTitle)
                                  : item.title
                              }
                              className={cn(
                                'relative flex size-5 items-center justify-center rounded-full transition-colors',
                                itemLocked
                                  ? 'bg-muted text-muted-foreground/70 cursor-not-allowed'
                                  : done
                                    ? 'bg-emerald-500 text-white'
                                    : isActive
                                      ? 'bg-brand-gold/20 text-brand-gold ring-brand-gold/40 ring-1'
                                      : 'text-muted-foreground border-border hover:bg-muted border',
                              )}
                            >
                              {done ? (
                                <Check className="size-2.5" strokeWidth={3} />
                              ) : itemLocked ? (
                                <Lock className="size-2.5" />
                              ) : (
                                <Icon className="size-2.5" />
                              )}
                              {!done && !itemLocked && badge && (
                                <span
                                  className={cn(
                                    'absolute -top-0.5 -right-0.5 size-1.5 rounded-full',
                                    badge === 'failed'
                                      ? 'bg-rose-500'
                                      : 'bg-brand-gold',
                                  )}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
