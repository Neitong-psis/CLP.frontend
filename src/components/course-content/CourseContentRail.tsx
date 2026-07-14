'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, Lock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import {
  computeLocks,
  flattenLessons,
  isModuleDone,
  lessonItems,
} from '@/lib/course-progress';
import { DURATION, EASE } from '@/components/course-sidebar/constants';
import { useHoverPreview } from '@/components/course-sidebar/hooks/useHoverPreview';
import { CourseContentModulePreview } from './CourseContentModulePreview';
import { CourseContentLessonPreview } from './CourseContentLessonPreview';
import type { CourseTreeProps } from './types';
import type {
  ReviewLesson,
  ReviewModule,
} from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';

/** Finds a lesson by id across every module, along with its 1-based index
 *  within that module (the number its rail node shows). */
function findLessonById(
  modules: readonly ReviewModule[],
  id: string | undefined,
): { lesson: ReviewLesson; lessonIndex: number } | null {
  if (!id) return null;
  for (const mod of modules) {
    const lessonIndex = mod.lessons.findIndex((l) => l.id === id);
    if (lessonIndex >= 0)
      return { lesson: mod.lessons[lessonIndex], lessonIndex };
  }
  return null;
}

/**
 * Collapsed icon rail. Shapes carry the hierarchy so a glance is enough:
 *   module = rounded SQUARE numbered badge · lesson = round numbered node.
 * Only that much is visible inline — content items no longer render here.
 * Hovering (or focusing) a module opens a floating preview of every lesson
 * and item; hovering a lesson narrows that to just its own items.
 */
export function CourseContentRail({
  modules,
  activeId,
  isItemDone,
  onSelect,
  getItemBadge,
  lockingEnabled,
  labels,
}: Pick<
  CourseTreeProps,
  | 'modules'
  | 'activeId'
  | 'isItemDone'
  | 'onSelect'
  | 'getItemBadge'
  | 'lockingEnabled'
  | 'labels'
>) {
  const reduceMotion = useReducedMotion();
  const locks = useMemo(
    () => computeLocks(modules, isItemDone, lockingEnabled),
    [modules, isItemDone, lockingEnabled],
  );

  const modulePreview = useHoverPreview();
  const previewModuleIndex = modules.findIndex(
    (m) => m.id === modulePreview.target?.id,
  );
  const previewModule =
    previewModuleIndex >= 0 ? modules[previewModuleIndex] : undefined;

  const lessonPreview = useHoverPreview();
  const previewLesson = findLessonById(modules, lessonPreview.target?.id);

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

  // Auto-reveal the module holding the active item whenever it *changes*
  // (e.g. selecting an item in another module via a hover preview) — but only
  // that once, adjusted during render rather than re-unioned on every render
  // (the old approach), which meant the active item's module could never be
  // manually collapsed at all.
  const [lastActiveModuleId, setLastActiveModuleId] = useState(activeModuleId);
  if (activeModuleId !== lastActiveModuleId) {
    setLastActiveModuleId(activeModuleId);
    if (activeModuleId && !manualExpanded.has(activeModuleId)) {
      setManualExpanded(new Set(manualExpanded).add(activeModuleId));
    }
  }

  const expanded = manualExpanded;

  function toggle(id: string) {
    setManualExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
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
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: DURATION.hover }
                    }
                    className="bg-border absolute top-8 bottom-0 left-1/2 w-px -translate-x-1/2"
                  />
                )}
              </AnimatePresence>

              {/* Module badge — SQUARE. Hovering (or focusing) opens a floating
                preview of its lessons, mirroring the learner sidebar's mini
                rail — a native `title=` tooltip can't hold a lesson list. */}
              <button
                type="button"
                onClick={() => toggle(mod.id)}
                onPointerEnter={(e) =>
                  modulePreview.open(mod.id, e.currentTarget)
                }
                onPointerLeave={modulePreview.scheduleClose}
                onFocus={(e) => modulePreview.open(mod.id, e.currentTarget)}
                onBlur={modulePreview.scheduleClose}
                aria-label={mod.title}
                className="relative z-10 mx-auto flex w-full items-center justify-center rounded-lg py-0.5 transition-colors"
              >
                <span
                  className={cn(
                    'flex size-8 items-center justify-center rounded-md border text-xs font-bold tabular-nums transition-colors duration-150',
                    complete
                      ? 'bg-course-done border-course-done text-white'
                      : locked
                        ? 'bg-muted text-muted-foreground/70 border-transparent'
                        : hasActive
                          ? 'bg-course-accent border-course-accent text-course-accent-foreground'
                          : 'border-border text-muted-foreground bg-transparent',
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

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="lessons"
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
                    <div className="relative mt-1 space-y-1">
                      {mod.lessons.map((lesson, lIdx) => {
                        const lessonLocked = locks.lockedLessonIds.has(
                          lesson.id,
                        );
                        const lessonActive = lessonItems(lesson).some(
                          (i) => i.id === activeId,
                        );

                        return (
                          <div
                            key={lesson.id}
                            className="relative z-10 mx-auto flex w-full items-center justify-center py-0.5"
                          >
                            {/* Lesson node — ROUND, numbered like the expanded
                            tree. Plain lesson order, not a completion check.
                            Hovering (or focusing) opens a floating preview of
                            just its own items — content no longer renders
                            inline in the collapsed rail. */}
                            <button
                              type="button"
                              onPointerEnter={(e) =>
                                lessonPreview.open(lesson.id, e.currentTarget)
                              }
                              onPointerLeave={lessonPreview.scheduleClose}
                              onFocus={(e) =>
                                lessonPreview.open(lesson.id, e.currentTarget)
                              }
                              onBlur={lessonPreview.scheduleClose}
                              aria-label={lesson.title}
                              className={cn(
                                'flex size-6 items-center justify-center rounded-full border text-[10px] font-bold tabular-nums transition-colors',
                                lessonLocked
                                  ? 'bg-muted text-muted-foreground border-transparent'
                                  : lessonActive
                                    ? 'bg-course-accent border-course-accent text-course-accent-foreground'
                                    : 'border-border text-muted-foreground bg-transparent',
                              )}
                            >
                              {lessonLocked ? (
                                <Lock className="size-2.5" />
                              ) : (
                                lIdx + 1
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {previewModule && modulePreview.target && (
          <CourseContentModulePreview
            key={previewModule.id}
            module={previewModule}
            moduleIndex={previewModuleIndex}
            anchorRect={modulePreview.target.rect}
            activeId={activeId}
            locks={locks}
            getItemBadge={getItemBadge}
            labels={labels}
            panelRef={modulePreview.panelRef}
            onSelectItem={(itemId) => {
              modulePreview.closeNow();
              onSelect(itemId);
            }}
            onRetain={modulePreview.cancelClose}
            onRelease={modulePreview.scheduleClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {previewLesson && lessonPreview.target && (
          <CourseContentLessonPreview
            key={previewLesson.lesson.id}
            lesson={previewLesson.lesson}
            lessonIndex={previewLesson.lessonIndex}
            anchorRect={lessonPreview.target.rect}
            activeId={activeId}
            locked={locks.lockedLessonIds.has(previewLesson.lesson.id)}
            getItemBadge={getItemBadge}
            labels={labels}
            panelRef={lessonPreview.panelRef}
            onSelectItem={(itemId) => {
              lessonPreview.closeNow();
              onSelect(itemId);
            }}
            onRetain={lessonPreview.cancelClose}
            onRelease={lessonPreview.scheduleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}
