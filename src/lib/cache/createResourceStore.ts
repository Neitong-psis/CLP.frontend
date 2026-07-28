import { useEffect, useSyncExternalStore } from 'react';
import { isApiError } from '@/lib/api/errors';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface ResourceStore<T> {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => AsyncState<T>;
  getServerSnapshot: () => AsyncState<T>;
  /** Fetches once and caches the result; subsequent calls are no-ops unless
   *  `force` is passed or the cache was cleared via `invalidate()`. This is
   *  what stops every remount of a page from re-triggering the same request
   *  and re-flashing a loading skeleton. */
  ensureLoaded: (force?: boolean) => void;
  /** Patches the cached data in place after a mutation (create/update/delete)
   *  succeeds, so every consumer sees the change without a refetch. */
  mutate: (updater: (prev: T | null) => T | null) => void;
  invalidate: () => void;
}

const SERVER_SNAPSHOT: AsyncState<never> = {
  data: null,
  loading: false,
  error: null,
};

/**
 * Plain (non-React) external store caching the result of one async fetch.
 * Same subscribe/getSnapshot/getServerSnapshot shape as `courseTasksStore.ts`,
 * generalized from a sync localStorage read to an async REST call — the goal
 * is the same "shared store behind useSyncExternalStore" state management,
 * just fronting real API data instead of a static mock array.
 */
export function createResourceStore<T>(
  fetcher: () => Promise<T>,
): ResourceStore<T> {
  let state: AsyncState<T> = { data: null, loading: false, error: null };
  let inflight: Promise<void> | null = null;
  const listeners = new Set<() => void>();

  function set(next: Partial<AsyncState<T>>): void {
    state = { ...state, ...next };
    listeners.forEach((listener) => listener());
  }

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot: () => state,
    getServerSnapshot: () => SERVER_SNAPSHOT,
    ensureLoaded(force = false) {
      if (inflight || (!force && state.data !== null)) return;
      set({ loading: true, error: null });
      inflight = fetcher()
        .then((data) => set({ data, loading: false }))
        .catch((error: unknown) =>
          set({
            loading: false,
            error: isApiError(error) ? error.message : 'Failed to load.',
          }),
        )
        .finally(() => {
          inflight = null;
        });
    },
    mutate(updater) {
      set({ data: updater(state.data) });
    },
    invalidate() {
      state = { data: null, loading: false, error: null };
      listeners.forEach((listener) => listener());
    },
  };
}

export function useResourceStore<T>(store: ResourceStore<T>): AsyncState<T> {
  const state = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  useEffect(() => {
    store.ensureLoaded();
  }, [store]);
  return state;
}
