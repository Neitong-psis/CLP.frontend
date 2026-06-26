'use client';

import { useState } from 'react';

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
