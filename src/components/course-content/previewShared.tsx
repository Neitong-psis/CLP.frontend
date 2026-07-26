'use client';

import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { ReviewItem } from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import { KIND_ICON, type ItemBadge } from './types';

/** Shared geometry for every floating rail preview (module- and lesson-scoped). */
export const PREVIEW_PANEL_WIDTH = 288;
export const PREVIEW_GAP = 8;
export const PREVIEW_VIEWPORT_MARGIN = 12;
/** Beyond this the item list scrolls internally instead of running off-screen. */
export const PREVIEW_MAX_ITEM_LIST_HEIGHT = 240;

/** Keeps a panel fully on screen when its anchor sits near the bottom edge. */
export function clampPreviewTop(
  anchorTop: number,
  maxPanelHeight: number,
): number {
  const maxTop = window.innerHeight - maxPanelHeight - PREVIEW_VIEWPORT_MARGIN;
  // On a short viewport `maxTop` can fall below the margin; the margin wins.
  return Math.max(PREVIEW_VIEWPORT_MARGIN, Math.min(anchorTop, maxTop));
}

/** One selectable content row inside a floating preview panel. Same badge
 *  language as the expanded tree/rail: empty until the admin decides, green
 *  check on approve, red X on reject. */
export function PreviewItemRow({
  item,
  isActive,
  badge,
  showTypeIcon,
  done,
  onSelect,
}: {
  item: ReviewItem;
  isActive: boolean;
  badge: ItemBadge;
  showTypeIcon?: boolean;
  done?: boolean;
  onSelect: () => void;
}) {
  const TypeIcon = KIND_ICON[item.kind];
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-current={isActive ? 'true' : undefined}
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left',
          'transition-colors duration-150 outline-none',
          'focus-visible:ring-course-accent focus-visible:ring-2 focus-visible:ring-inset',
          isActive ? 'bg-course-accent/8' : 'hover:bg-muted/60',
        )}
      >
        <span
          className={cn(
            'flex size-4 shrink-0 items-center justify-center rounded-full border',
            badge === 'approved'
              ? 'border-transparent bg-emerald-500 text-white'
              : badge === 'rejected'
                ? 'border-transparent bg-rose-500 text-white'
                : showTypeIcon && done
                  ? 'border-transparent bg-emerald-500 text-white'
                  : 'border-border bg-transparent',
          )}
        >
          {badge === 'approved' ? (
            <Check className="size-2.5" strokeWidth={3} />
          ) : badge === 'rejected' ? (
            <X className="size-2.5" strokeWidth={3} />
          ) : showTypeIcon && done ? (
            <Check className="size-2.5" strokeWidth={3} />
          ) : showTypeIcon ? (
            <TypeIcon className="size-2.5" strokeWidth={2.25} />
          ) : null}
        </span>
        <span
          className={cn(
            'min-w-0 flex-1 truncate text-[12px]',
            isActive ? 'text-course-accent font-semibold' : 'text-foreground',
          )}
        >
          {item.title}
        </span>
      </button>
    </li>
  );
}
