'use client';

import { useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { Check, Lock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { FloatingModulePreview } from './FloatingModulePreview';
import { ProgressRing } from './ProgressRing';
import { useHoverPreview } from './hooks/useHoverPreview';
import { isModuleExpandable, isModuleUnlocked } from './selectors';
import type { ModuleMeta } from './selectors';
import type {
  ContentItem,
  CourseModule,
  CourseSidebarLabels,
  Lesson,
} from './types';

interface MiniRailProps {
  readonly modules: readonly CourseModule[];
  readonly moduleMeta: ReadonlyMap<string, ModuleMeta>;
  readonly currentItemId: string | null;
  readonly labels: CourseSidebarLabels;
  readonly onSelectItem: (
    item: ContentItem,
    lesson: Lesson,
    module: CourseModule,
  ) => void;
  /** Clicking a rail button leaves mini mode with that module opened. */
  readonly onOpenModule: (moduleId: string) => void;
}

/**
 * The 72px rail: module number, completion ring, lock indicator. No titles.
 *
 * Hovering *or* focusing a module opens `FloatingModulePreview` beside the
 * rail — focus matters, because a keyboard user in mini mode would otherwise
 * have no way to learn what any of these numbers stand for.
 */
export function MiniRail({
  modules,
  moduleMeta,
  currentItemId,
  labels,
  onSelectItem,
  onOpenModule,
}: MiniRailProps) {
  const preview = useHoverPreview();
  const { closeNow } = preview;

  const activeModule = modules.find(
    (module) => module.id === preview.target?.moduleId,
  );
  const activeMeta = activeModule ? moduleMeta.get(activeModule.id) : undefined;

  const selectAndClose = useCallback(
    (item: ContentItem, lesson: Lesson, module: CourseModule) => {
      closeNow();
      onSelectItem(item, lesson, module);
    },
    [closeNow, onSelectItem],
  );

  return (
    <>
      <ul className="flex flex-col items-center gap-1.5 px-2 py-2.5">
        {modules.map((module) => {
          const meta = moduleMeta.get(module.id);
          if (!meta) return null;

          const { state, progress, index } = meta;
          const expandable = isModuleExpandable(state);
          const unlocked = isModuleUnlocked(state);
          const isDone = state === 'completed';
          const isActive = state === 'active';

          return (
            <li key={module.id}>
              <button
                type="button"
                onPointerEnter={(event) =>
                  preview.open(module.id, event.currentTarget)
                }
                onPointerLeave={preview.scheduleClose}
                onFocus={(event) =>
                  preview.open(module.id, event.currentTarget)
                }
                onBlur={preview.scheduleClose}
                onClick={() => {
                  if (!expandable) return;
                  closeNow();
                  onOpenModule(module.id);
                }}
                aria-disabled={!expandable || undefined}
                aria-label={`${labels.moduleLabel(index)}: ${module.title}. ${
                  unlocked
                    ? labels.moduleCompleted(progress.completed, progress.total)
                    : state === 'locked'
                      ? labels.lockedModule
                      : labels.disabledModule
                }`}
                className={cn(
                  'flex size-12 items-center justify-center rounded-lg',
                  'transition-colors duration-150 outline-none',
                  'focus-visible:ring-course-accent focus-visible:ring-2',
                  isActive
                    ? 'bg-course-accent/12 ring-course-accent/25 ring-1'
                    : 'hover:bg-muted/60',
                  !expandable && 'cursor-not-allowed opacity-60',
                )}
              >
                <ProgressRing
                  size={40}
                  percent={unlocked ? progress.percent : 0}
                  tone={isDone ? 'done' : isActive ? 'accent' : 'muted'}
                >
                  <span
                    className={cn(
                      'text-xs font-bold tabular-nums',
                      isDone
                        ? 'text-course-done'
                        : isActive
                          ? 'text-course-accent'
                          : unlocked
                            ? 'text-muted-foreground'
                            : 'text-muted-foreground/50',
                    )}
                  >
                    {isDone ? (
                      <Check aria-hidden className="size-3.5" strokeWidth={3} />
                    ) : unlocked ? (
                      index + 1
                    ) : (
                      <Lock aria-hidden className="size-3" />
                    )}
                  </span>
                </ProgressRing>
              </button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {activeModule && activeMeta && preview.target && (
          <FloatingModulePreview
            key={activeModule.id}
            module={activeModule}
            meta={activeMeta}
            anchorRect={preview.target.rect}
            currentItemId={currentItemId}
            labels={labels}
            onSelectItem={selectAndClose}
            onRetain={preview.cancelClose}
            onRelease={preview.scheduleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}
