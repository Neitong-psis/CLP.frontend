'use client';

import { useEffect, useMemo, useState, type RefObject } from 'react';
import { VIRTUAL_OVERSCAN } from '../constants';

interface UseVirtualRowsOptions {
  /** Height of each row, in order. A lesson's height varies with its item count. */
  readonly heights: readonly number[];
  readonly viewportRef: RefObject<HTMLElement | null>;
  readonly enabled: boolean;
  readonly overscan?: number;
}

interface VirtualWindow {
  /** First rendered index (inclusive). */
  readonly start: number;
  /** Last rendered index (exclusive). */
  readonly end: number;
  /** Height of the full list, so the scrollbar reflects all rows. */
  readonly totalHeight: number;
  /** Pixel offset to translate the rendered slice into place. */
  readonly offsetY: number;
}

/**
 * Row windowing over *known, variable* heights.
 *
 * Each row's height is supplied up front (a lesson's height is deterministic
 * from its item count — see `lessonRowHeight` in `selectors.ts`), so this
 * needs no ResizeObserver-per-row measurement pass: a prefix-sum of `heights`
 * turns "which rows are in view" into a binary search over `scrollTop`. That
 * is the trick that keeps this simple; if a row's height ever depended on
 * something unknowable ahead of render (wrapped text, images), swap this for
 * `@tanstack/react-virtual` rather than growing it further.
 *
 * When `enabled` is false it returns the full range, so a caller can render
 * the same list virtualized or not without branching on its shape.
 */
export function useVirtualRows({
  heights,
  viewportRef,
  enabled,
  overscan = VIRTUAL_OVERSCAN,
}: UseVirtualRowsOptions): VirtualWindow {
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!enabled || !viewport) return;

    const sync = () => setScrollTop(viewport.scrollTop);
    // Passive: we never preventDefault, so let the browser scroll uninterrupted.
    viewport.addEventListener('scroll', sync, { passive: true });

    const observer = new ResizeObserver(([entry]) => {
      setViewportHeight(entry.contentRect.height);
    });
    observer.observe(viewport);

    // The list can mount already scrolled (module reopened at its old offset).
    sync();

    return () => {
      viewport.removeEventListener('scroll', sync);
      observer.disconnect();
    };
  }, [enabled, viewportRef]);

  // offsets[i] = distance from the top to the start of row i; offsets[n] = total.
  const offsets = useMemo(() => {
    const result = new Array<number>(heights.length + 1);
    result[0] = 0;
    for (let i = 0; i < heights.length; i++) {
      result[i + 1] = result[i]! + heights[i]!;
    }
    return result;
  }, [heights]);

  return useMemo(() => {
    const totalHeight = offsets[offsets.length - 1] ?? 0;
    const count = heights.length;

    if (!enabled || viewportHeight === 0) {
      return { start: 0, end: count, totalHeight, offsetY: 0 };
    }

    const start = Math.max(0, indexAtOffset(offsets, scrollTop) - overscan);
    const end = Math.min(
      count,
      indexAtOffset(offsets, scrollTop + viewportHeight) + 1 + overscan,
    );

    return { start, end, totalHeight, offsetY: offsets[start] ?? 0 };
  }, [offsets, heights.length, enabled, scrollTop, viewportHeight, overscan]);
}

/** Binary search: the row whose span [offsets[i], offsets[i+1]) contains `target`. */
function indexAtOffset(offsets: readonly number[], target: number): number {
  let lo = 0;
  let hi = offsets.length - 2; // last valid row index
  if (hi < 0) return 0;

  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (offsets[mid]! <= target) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}
