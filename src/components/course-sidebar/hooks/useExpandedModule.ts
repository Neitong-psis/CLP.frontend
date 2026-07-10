'use client';

import { useCallback, useState } from 'react';
import { STORAGE_SUFFIX_MODULE } from '../constants';
import { useStoredValue, writeStorage } from '../storage';
import type { Course } from '../types';

interface UseExpandedModuleResult {
  /** `null` means every module is collapsed. */
  readonly expandedId: string | null;
  readonly toggle: (moduleId: string) => void;
  readonly expand: (moduleId: string) => void;
}

/**
 * Single-open accordion with memory.
 *
 * Resolution order for what is open: the learner's choice this session, then
 * the remembered module, then the module holding the current lesson, then the
 * first module. Persisted through `useStoredValue`, so hydration needs no
 * effect and no second paint.
 */
export function useExpandedModule(
  course: Course,
  currentModuleId: string | null,
  storageKey: string,
): UseExpandedModuleResult {
  const key = `${storageKey}${STORAGE_SUFFIX_MODULE}`;
  const stored = useStoredValue(key);

  // `undefined` — untouched this session; `null` — deliberately all collapsed.
  const [choice, setChoice] = useState<string | null | undefined>(undefined);

  // Follow the player when the lesson changes from outside the sidebar (a deep
  // link, a "next lesson" button in the player). Adjusting state during render
  // is React's documented alternative to an effect here: it re-renders before
  // painting, so the wrong module is never briefly visible.
  const [seenModuleId, setSeenModuleId] = useState(currentModuleId);
  if (seenModuleId !== currentModuleId) {
    setSeenModuleId(currentModuleId);
    if (currentModuleId) setChoice(currentModuleId);
  }

  // Ignore an id left behind by a module that was since renamed or deleted.
  const isStoredValid =
    stored !== null && course.modules.some((item) => item.id === stored);

  const expandedId =
    choice !== undefined
      ? choice
      : isStoredValid
        ? stored
        : (currentModuleId ?? course.modules[0]?.id ?? null);

  const persist = useCallback(
    (next: string | null) => {
      setChoice(next);
      writeStorage(key, next);
    },
    [key],
  );

  const toggle = useCallback(
    (moduleId: string) => {
      // Opening one closes the other — that is the whole accordion contract.
      persist(expandedId === moduleId ? null : moduleId);
    },
    [expandedId, persist],
  );

  const expand = useCallback(
    (moduleId: string) => persist(moduleId),
    [persist],
  );

  return { expandedId, toggle, expand };
}
