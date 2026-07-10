'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils/cn';
import { ITEM_ROW_HEIGHT } from './constants';
import { ItemStatus } from './ItemStatus';
import { FOCUSABLE_ATTR } from './hooks/useRovingFocus';
import {
  formatItemProgress,
  itemMeta,
  itemProgressFraction,
} from './selectors';
import type {
  ContentItem,
  CourseSidebarLabels,
  ItemState,
  Lesson,
} from './types';

interface ContentItemRowProps {
  readonly item: ContentItem;
  readonly lesson: Lesson;
  readonly state: ItemState;
  readonly labels: CourseSidebarLabels;
  readonly onSelect: (item: ContentItem) => void;
  readonly onLocked: (item: ContentItem) => void;
  /**
   * Only the current item is a Tab stop; the rest are reached with the arrow
   * keys. Keeps a 200-row course from becoming 200 Tab presses.
   */
  readonly tabbable: boolean;
}

const TITLE_CLASS: Record<ItemState, string> = {
  completed: 'text-muted-foreground',
  current: 'text-course-accent font-semibold',
  'in-progress': 'text-foreground',
  'not-started': 'text-foreground',
  locked: 'text-muted-foreground/70',
};

function ContentItemRowImpl({
  item,
  lesson,
  state,
  labels,
  onSelect,
  onLocked,
  tabbable,
}: ContentItemRowProps) {
  const isLocked = state === 'locked';
  const isCurrent = state === 'current';
  const progressText = formatItemProgress(item, isLocked);
  const fraction = itemProgressFraction(item);
  const showBar = state === 'in-progress' || (isCurrent && fraction > 0);

  const meta = itemMeta(item, lesson, labels);

  return (
    <li>
      <button
        type="button"
        {...{ [FOCUSABLE_ATTR]: '' }}
        tabIndex={tabbable ? 0 : -1}
        onClick={() => (isLocked ? onLocked(item) : onSelect(item))}
        aria-current={isCurrent ? 'true' : undefined}
        // Locked rows stay focusable and announced — a learner must be able to
        // discover *that* something is locked. `aria-disabled` says it is inert
        // without removing it from the tab order the way `disabled` would.
        aria-disabled={isLocked || undefined}
        aria-label={`${item.title}. ${meta}${progressText ? `. ${progressText}` : ''}`}
        style={{ height: ITEM_ROW_HEIGHT }}
        className={cn(
          // Flush, edge-to-edge row — separation comes from the parent
          // list's `divide-y`, not from a rounded pill per row.
          'group relative flex w-full items-center gap-2.5 px-3 py-2 text-left',
          'transition-colors duration-150 outline-none',
          // Inset ring: the row has no margin for an offset ring to sit in.
          'focus-visible:ring-course-accent focus-visible:ring-2 focus-visible:ring-inset',
          isCurrent ? 'bg-course-accent/8' : 'hover:bg-muted/50',
          isLocked && 'cursor-not-allowed hover:bg-transparent',
        )}
      >
        {/* You-are-here rail. Rendered always, scaled to nothing when inactive,
            so the row's box never shifts between states. */}
        <span
          aria-hidden
          className={cn(
            'bg-course-accent absolute top-1/2 left-0 h-6 w-0.5 -translate-y-1/2 rounded-full',
            'origin-center transition-transform duration-150',
            isCurrent ? 'scale-y-100' : 'scale-y-0',
          )}
        />

        <ItemStatus
          state={state}
          type={item.type}
          className="group-hover:border-course-accent/40"
        />

        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span
            className={cn(
              'truncate text-[13px] leading-tight',
              TITLE_CLASS[state],
            )}
          >
            {item.title}
          </span>
          <span className="text-muted-foreground/80 truncate text-[11px] leading-tight">
            {meta}
          </span>
          {showBar && <ProgressHairline percent={Math.round(fraction * 100)} />}
        </span>

        {progressText && (
          <span className="text-muted-foreground shrink-0 text-[11px] font-medium tabular-nums">
            {progressText}
          </span>
        )}
      </button>
    </li>
  );
}

/** Inline 2px bar under an in-progress title — narrower than the shared one. */
function ProgressHairline({ percent }: { readonly percent: number }) {
  return (
    <span
      aria-hidden
      className="bg-border/70 mt-0.5 h-px w-full overflow-hidden"
    >
      <span
        className="bg-course-accent block h-full"
        style={{ width: `${percent}%` }}
      />
    </span>
  );
}

/**
 * Memoised: a module can hold hundreds of these, and toggling a sibling module
 * must not re-render rows whose props are unchanged.
 */
export const ContentItemRow = memo(ContentItemRowImpl);
