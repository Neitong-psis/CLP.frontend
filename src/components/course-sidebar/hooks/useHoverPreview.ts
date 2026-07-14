'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { PREVIEW_CLOSE_DELAY_MS, PREVIEW_OPEN_DELAY_MS } from '../constants';

export interface PreviewTarget {
  readonly id: string;
  /** Viewport rect of the rail button, used to position the panel beside it. */
  readonly rect: DOMRect;
}

interface UseHoverPreviewResult {
  readonly target: PreviewTarget | null;
  /** Attach to the portalled panel's root node — lets the scroll-dismiss
   *  listener below tell "the page scrolled behind the panel" (stale anchor,
   *  should close) apart from "the pointer is scrolling the panel's own
   *  content" (should not: scroll events don't bubble, but this hook still
   *  sees them via a capture-phase listener on `window`). */
  readonly panelRef: RefObject<HTMLDivElement | null>;
  /** Attach to each rail button (pointerenter / focus). */
  readonly open: (id: string, element: HTMLElement) => void;
  /** Attach to rail buttons and to the panel itself (pointerleave / blur). */
  readonly scheduleClose: () => void;
  /** Pointer moved into the panel — cancel the pending close. */
  readonly cancelClose: () => void;
  readonly closeNow: () => void;
}

/**
 * Hover-intent for the mini rail's floating preview.
 *
 * Open is delayed so dragging the pointer down the rail doesn't strobe a panel
 * for every module it crosses; close is delayed so the pointer can travel the
 * gap between the rail and the panel without dismissing it.
 */
export function useHoverPreview(): UseHoverPreviewResult {
  const [target, setTarget] = useState<PreviewTarget | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);

  const open = useCallback(
    (id: string, element: HTMLElement) => {
      clearTimers();
      // Measure at fire time, not at schedule time: the rail may have scrolled.
      openTimer.current = setTimeout(() => {
        setTarget({ id, rect: element.getBoundingClientRect() });
      }, PREVIEW_OPEN_DELAY_MS);
    },
    [clearTimers],
  );

  const scheduleClose = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(
      () => setTarget(null),
      PREVIEW_CLOSE_DELAY_MS,
    );
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  const closeNow = useCallback(() => {
    clearTimers();
    setTarget(null);
  }, [clearTimers]);

  useEffect(() => clearTimers, [clearTimers]);

  // A panel anchored to a stale rect is worse than no panel — but only when
  // the *page behind it* scrolled. Scroll events don't bubble, yet a
  // capture-phase listener on `window` still sees every one, including the
  // panel scrolling its own (non-bubbling) content — so without the
  // containment check, scrolling the panel's item list would close it.
  useEffect(() => {
    if (!target) return;
    const dismissOnPageScroll = (event: Event) => {
      if (
        panelRef.current &&
        event.target instanceof Node &&
        panelRef.current.contains(event.target)
      ) {
        return;
      }
      setTarget(null);
    };
    const dismiss = () => setTarget(null);
    window.addEventListener('scroll', dismissOnPageScroll, true);
    window.addEventListener('resize', dismiss);
    return () => {
      window.removeEventListener('scroll', dismissOnPageScroll, true);
      window.removeEventListener('resize', dismiss);
    };
  }, [target]);

  // Escape closes it, matching every other transient surface in the app.
  useEffect(() => {
    if (!target) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setTarget(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [target]);

  return { target, panelRef, open, scheduleClose, cancelClose, closeNow };
}
