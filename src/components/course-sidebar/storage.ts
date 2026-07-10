'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * localStorage access that never throws.
 *
 * Safari's private mode and hardened browser profiles throw on `localStorage`
 * access itself — a sidebar must not take the page down because a preference
 * could not be persisted.
 */

export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string | null): void {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    // Preference is lost for this session. Not worth surfacing to the learner.
  }
}

/**
 * Reads a persisted preference as an external store.
 *
 * `useSyncExternalStore` is what makes this hydration-safe without a
 * `setState` in an effect: React renders the server snapshot (`null`) during
 * hydration, then immediately re-renders with the real value. Subscribing to
 * `storage` also syncs the preference across tabs for free.
 */
export function useStoredValue(key: string): string | null {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const onStorage = (event: StorageEvent) => {
        if (event.key === key) onChange();
      };
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
    },
    [key],
  );

  const getSnapshot = useCallback(() => readStorage(key), [key]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Nothing is persisted on the server; the caller falls back to its default. */
function getServerSnapshot(): string | null {
  return null;
}
