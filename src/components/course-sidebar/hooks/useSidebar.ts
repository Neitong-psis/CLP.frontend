'use client';

import { useCallback, useEffect, useState } from 'react';
import { STORAGE_SUFFIX_MODE } from '../constants';
import { useStoredValue, writeStorage } from '../storage';
import type { SidebarMode } from '../types';
import { useIsDesktop } from './useIsDesktop';

interface UseSidebarResult {
  readonly mode: SidebarMode;
  readonly isMini: boolean;
  readonly toggleMode: () => void;
  readonly isDesktop: boolean;
  readonly isDrawerOpen: boolean;
  readonly openDrawer: () => void;
  readonly closeDrawer: () => void;
}

function isSidebarMode(value: string | null): value is SidebarMode {
  return value === 'mini' || value === 'expanded';
}

/**
 * Owns the sidebar *shell*: width mode on desktop, drawer state below it.
 * Deliberately knows nothing about modules or lessons.
 */
export function useSidebar(
  storageKey: string,
  defaultMode: SidebarMode,
): UseSidebarResult {
  const isDesktop = useIsDesktop();
  const key = `${storageKey}${STORAGE_SUFFIX_MODE}`;
  const stored = useStoredValue(key);

  const [choice, setChoice] = useState<SidebarMode | undefined>(undefined);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const mode = choice ?? (isSidebarMode(stored) ? stored : defaultMode);

  const toggleMode = useCallback(() => {
    const next: SidebarMode = mode === 'mini' ? 'expanded' : 'mini';
    setChoice(next);
    writeStorage(key, next);
  }, [mode, key]);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // Crossing up to desktop must not leave an orphaned drawer scrim behind.
  // Adjusted during render rather than in an effect so the scrim never paints
  // for a frame at the new breakpoint.
  const [wasDesktop, setWasDesktop] = useState(isDesktop);
  if (wasDesktop !== isDesktop) {
    setWasDesktop(isDesktop);
    if (isDesktop && isDrawerOpen) setDrawerOpen(false);
  }

  // Escape closes the drawer. Bound only while it is open so it cannot swallow
  // Escape from a dialog rendered above the sidebar.
  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDrawer();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  // Lock the page behind the drawer, restoring whatever overflow was there.
  useEffect(() => {
    if (!isDrawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isDrawerOpen]);

  // Mini is a desktop-only affordance: a 72px rail is useless as an overlay.
  const effectiveMode: SidebarMode = isDesktop ? mode : 'expanded';

  return {
    mode: effectiveMode,
    isMini: effectiveMode === 'mini',
    toggleMode,
    isDesktop,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
  };
}
