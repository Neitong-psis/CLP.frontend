'use client';

import { useCallback, useSyncExternalStore } from 'react';

/** Below this the sidebar stops being a column and becomes an overlay drawer. */
const DESKTOP_QUERY = '(min-width: 1024px)';

/**
 * Breakpoint state, read as an external store.
 *
 * Deliberately not `@/hooks/use-media-query`: that hook seeds `false` and syncs
 * inside a deferred effect, so a desktop visitor paints the mobile drawer
 * trigger for a frame before the column appears. `useSyncExternalStore` reads
 * `matchMedia` during the very first client render instead, which removes the
 * flash and keeps the value consistent across a concurrent render.
 */
export function useIsDesktop(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const media = window.matchMedia(DESKTOP_QUERY);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const getSnapshot = useCallback(
    () => window.matchMedia(DESKTOP_QUERY).matches,
    [],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * The server cannot know the viewport. Assuming "not desktop" means the SSR
 * markup is the drawer trigger — the smaller, safer thing to send down the
 * wire, and the one that does not reserve 320px of layout it may not need.
 */
function getServerSnapshot(): boolean {
  return false;
}
