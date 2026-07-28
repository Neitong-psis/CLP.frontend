'use client';

import { useState } from 'react';

export type SortDir = 'asc' | 'desc';

export interface ColumnSort<K extends string> {
  sortKey: K | null;
  sortDir: SortDir;
  /** Cycle a column: asc → desc → off. Switching to a new column starts at asc. */
  toggleSort: (key: K) => void;
  reset: () => void;
}

/** Generic asc→desc→off column-sort state, shared by every sortable table. */
export function useColumnSort<K extends string>(): ColumnSort<K> {
  const [sortKey, setSortKey] = useState<K | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  function toggleSort(key: K) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
    } else if (sortDir === 'asc') {
      setSortDir('desc');
    } else {
      setSortKey(null);
    }
  }

  function reset() {
    setSortKey(null);
    setSortDir('asc');
  }

  return { sortKey, sortDir, toggleSort, reset };
}
