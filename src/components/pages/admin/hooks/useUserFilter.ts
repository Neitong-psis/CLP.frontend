'use client';

import { useState } from 'react';
import type { AdminUserRow } from '@/constants/admin';
import { PAGE_SIZE } from '@/constants/admin/users';

export interface UserFilter {
  search: string;
  setSearch: (value: string) => void;
  currentPage: number;
  totalPages: number;
  pageStart: number;
  pageEnd: number;
  filtered: AdminUserRow[];
  paginated: AdminUserRow[];
  goToPage: (page: number) => void;
  prevPage: () => void;
  nextPage: () => void;
}

/**
 * Filters and paginates a users array.
 * - Resets to page 1 on every search change.
 * - Syncs page state downward when deletions reduce totalPages below the
 *   current page (fixes the stale-page bug in the original implementation).
 *
 * Contract: goToPage(n) → filtered rows for page n; empty query → all rows.
 */
export function useUserFilter(users: AdminUserRow[]): UserFilter {
  const [search, setSearchRaw] = useState('');
  const [page, setPage] = useState(1);

  const filtered = search
    ? users.filter(({ name, email }) => {
        const q = search.toLowerCase();
        return (
          name.toLowerCase().includes(q) || email.toLowerCase().includes(q)
        );
      })
    : users;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const pageStart =
    filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const pageEnd = Math.min(currentPage * PAGE_SIZE, filtered.length);

  function setSearch(value: string) {
    setSearchRaw(value);
    setPage(1);
  }

  function goToPage(p: number) {
    setPage(p);
  }

  function prevPage() {
    setPage((p) => Math.max(1, p - 1));
  }

  function nextPage() {
    setPage((p) => Math.min(totalPages, p + 1));
  }

  return {
    search,
    setSearch,
    currentPage,
    totalPages,
    pageStart,
    pageEnd,
    filtered,
    paginated,
    goToPage,
    prevPage,
    nextPage,
  };
}
