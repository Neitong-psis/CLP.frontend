'use client';

import { memo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, ChevronDown, Lock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { DURATION, EASE } from './constants';
import { LessonList } from './LessonList';
import { FOCUSABLE_ATTR } from './hooks/useRovingFocus';
import { isModuleExpandable, isModuleUnlocked } from './selectors';
import type {
  ContentItem,
  CourseModule,
  CourseSidebarLabels,
  Lesson,
  ModuleState,
  ProgressSummary,
} from './types';

interface ModuleItemProps {
  readonly module: CourseModule;
  readonly index: number;
  readonly state: ModuleState;
  readonly progress: ProgressSummary;
  readonly isExpanded: boolean;
  readonly onToggle: (moduleId: string) => void;
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

/** Solid fills for the number badge — active/completed read as filled chips,
 *  matching the reference; available stays an outline so only one state per
 *  module ever reads as "loud". */
const BADGE_CLASS: Record<ModuleState, string> = {
  completed: 'bg-course-done border-course-done text-white',
  active: 'bg-course-accent border-course-accent text-course-accent-foreground',
  available: 'bg-transparent border-border text-muted-foreground',
  locked: 'bg-muted border-transparent text-muted-foreground/70',
  disabled: 'bg-muted border-transparent text-muted-foreground/50',
};

function ModuleItemImpl({
  module,
  index,
  state,
  progress,
  isExpanded,
  onToggle,
  currentItemId,
  labels,
  onSelectItem,
  onLockedItem,
}: ModuleItemProps) {
  const reduceMotion = useReducedMotion();
  const expandable = isModuleExpandable(state);
  const unlocked = isModuleUnlocked(state);
  const isDone = state === 'completed';
  const isActive = state === 'active';

  const panelId = `module-panel-${module.id}`;
  const headerId = `module-header-${module.id}`;

  return (
    <li
      className={cn(
        'border-border/60 overflow-hidden rounded-lg border',
        'transition-colors duration-150',
        isActive ? 'border-course-accent/30 bg-course-accent/4' : 'bg-card',
        expandable && !isActive && 'hover:border-border',
      )}
    >
      {/* h3 + button is the disclosure pattern: the heading gives screen-reader
          users a navigable outline, the button owns the expanded state. */}
      <h3>
        <button
          type="button"
          id={headerId}
          {...{ [FOCUSABLE_ATTR]: '' }}
          data-module-id={module.id}
          aria-expanded={expandable ? isExpanded : undefined}
          aria-controls={expandable && isExpanded ? panelId : undefined}
          // Only an unpublished module is inert. A locked one opens for reading.
          aria-disabled={!expandable || undefined}
          onClick={() => expandable && onToggle(module.id)}
          className={cn(
            'group flex w-full items-center gap-3 px-2.5 py-2.5 text-left',
            'transition-colors duration-150 outline-none',
            // Inset ring: an offset ring would be clipped by the module's border.
            'focus-visible:ring-course-accent focus-visible:ring-2 focus-visible:ring-inset',
            expandable ? 'hover:bg-muted/40' : 'cursor-not-allowed',
          )}
        >
          <span
            className={cn(
              'flex size-8 shrink-0 items-center justify-center rounded-md border',
              'text-xs font-bold tabular-nums transition-colors duration-150',
              BADGE_CLASS[state],
            )}
          >
            {isDone ? (
              <Check className="size-4" strokeWidth={3} />
            ) : state === 'locked' ? (
              <Lock className="size-3.5" />
            ) : (
              index + 1
            )}
          </span>

          <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span
              className={cn(
                'truncate text-[13px] leading-tight font-semibold',
                unlocked ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {/* Announced for screen readers only — course titles often
                  already embed their own numbering ("Module 1: …"), so a
                  visible "Module 1 · " prefix would read as a duplicate. The
                  numbered badge to the left is the sighted equivalent. */}
              <span className="sr-only">{labels.moduleLabel(index)}: </span>
              {module.title}
            </span>

            {unlocked ? (
              <span className="flex items-center gap-1.5">
                <span className="bg-course-accent/15 text-course-accent rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums">
                  {labels.moduleCompleted(progress.completed, progress.total)}
                </span>
                <span className="text-muted-foreground text-[11px]">
                  {labels.modulePercent(progress.percent)}
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground/80 truncate text-[11px] leading-tight">
                {state === 'locked'
                  ? labels.lockedModule
                  : labels.disabledModule}
              </span>
            )}
          </span>

          {expandable && (
            <ChevronDown
              aria-hidden
              className={cn(
                'text-muted-foreground/60 size-4 shrink-0 transition-transform duration-150',
                'group-hover:text-foreground',
                isExpanded && 'rotate-180',
              )}
            />
          )}
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {expandable && isExpanded && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
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
            <LessonList
              module={module}
              currentItemId={currentItemId}
              labels={labels}
              onSelectItem={onSelectItem}
              onLockedItem={onLockedItem}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export const ModuleItem = memo(ModuleItemImpl);
