'use client';

import { useState } from 'react';

/**
 * Returns true once per browser session for the given key.
 * Uses a module-level Set so the first caller marks the key and every
 * subsequent call (e.g. child components) receives false for the same key.
 */
const visited = new Set<string>();

export function useFirstVisit(key: string): boolean {
  const [isFirst] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    if (visited.has(key)) return false;
    visited.add(key);
    return true;
  });
  return isFirst;
}
