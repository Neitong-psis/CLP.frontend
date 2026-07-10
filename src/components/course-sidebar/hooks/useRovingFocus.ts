'use client';

import { useCallback, type KeyboardEvent, type RefObject } from 'react';

/** Rows opt into keyboard navigation by carrying this attribute. */
export const FOCUSABLE_ATTR = 'data-sidebar-row';

const SELECTOR = `[${FOCUSABLE_ATTR}]:not([aria-disabled='true'])`;

interface UseRovingFocusOptions {
  /** Expand the module that owns the focused row (ArrowRight). */
  readonly onExpand?: (moduleId: string) => void;
  /** Collapse it (ArrowLeft). */
  readonly onCollapse?: (moduleId: string) => void;
}

/**
 * Arrow-key navigation across the whole tree.
 *
 * Focus is moved by querying the DOM in document order rather than by tracking
 * indices in state. That is what keeps this correct while rows are virtualized,
 * filtered by search, or hidden inside a collapsed module — the DOM is already
 * the source of truth for "what is currently navigable".
 *
 * Enter and Space are left to the native <button> semantics of each row.
 */
export function useRovingFocus(
  containerRef: RefObject<HTMLElement | null>,
  { onExpand, onCollapse }: UseRovingFocusOptions = {},
) {
  const rows = useCallback((): HTMLElement[] => {
    const root = containerRef.current;
    if (!root) return [];
    return Array.from(root.querySelectorAll<HTMLElement>(SELECTOR));
  }, [containerRef]);

  return useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const { key } = event;
      if (
        key !== 'ArrowDown' &&
        key !== 'ArrowUp' &&
        key !== 'Home' &&
        key !== 'End' &&
        key !== 'ArrowRight' &&
        key !== 'ArrowLeft'
      ) {
        return;
      }

      const all = rows();
      if (all.length === 0) return;

      const active = document.activeElement as HTMLElement | null;
      const index = active ? all.indexOf(active) : -1;

      if (key === 'ArrowRight' || key === 'ArrowLeft') {
        const moduleId = active?.dataset.moduleId;
        // Only module headers carry a moduleId; on a lesson row these keys are
        // free to do nothing rather than hijack caret movement.
        if (!moduleId) return;
        event.preventDefault();
        if (key === 'ArrowRight') onExpand?.(moduleId);
        else onCollapse?.(moduleId);
        return;
      }

      event.preventDefault();

      const next =
        key === 'Home'
          ? 0
          : key === 'End'
            ? all.length - 1
            : key === 'ArrowDown'
              ? // From "nothing focused", ArrowDown enters at the top.
                (index + 1) % all.length
              : index <= 0
                ? all.length - 1
                : index - 1;

      all[next]?.focus();
    },
    [rows, onExpand, onCollapse],
  );
}
