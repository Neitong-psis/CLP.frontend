'use client';

import { useMemo, useState } from 'react';
import type {
  AdminUserRow,
  InviteStatus,
  UserRole,
  UserStatus,
} from '@/constants/admin';
import { PAGE_SIZE } from '@/constants/admin/users';
import { useColumnSort, type SortDir } from '@/hooks/useColumnSort';
import { parseDateLoose } from '@/lib/utils/sort';

type RoleFilter = UserRole | 'All';
type StatusFilter = UserStatus | 'All';
type InviteFilter = InviteStatus | 'All';
export type UserSortKey = 'name' | 'courses' | 'joined';

export interface UserFilter {
  search: string;
  setSearch: (value: string) => void;

  // ── Faceted filters ──────────────────────────────────────────────────────
  roleFilter: RoleFilter;
  statusFilter: StatusFilter;
  inviteFilter: InviteFilter;
  setRoleFilter: (value: RoleFilter) => void;
  setStatusFilter: (value: StatusFilter) => void;
  setInviteFilter: (value: InviteFilter) => void;

  // ── Sorting ──────────────────────────────────────────────────────────────
  sortKey: UserSortKey | null;
  sortDir: SortDir;
  toggleSort: (key: UserSortKey) => void;

  // ── Pagination ───────────────────────────────────────────────────────────
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
 * Filters and paginates a users array across search + role/status/invitation
 * facets.
 * - Resets to page 1 on every filter change.
 * - Syncs page state downward when deletions reduce totalPages below the
 *   current page (fixes the stale-page bug in the original implementation).
 * - Facet counts are computed against the OTHER active facets, so each option's
 *   number reflects what you'd actually get if you toggled it.
 *
 * Contract: goToPage(n) → filtered rows for page n; empty query → all rows.
 */
export function useUserFilter(users: AdminUserRow[]): UserFilter {
  const [search, setSearchRaw] = useState('');
  const [roleFilter, setRoleFilterRaw] = useState<RoleFilter>('All');
  const [statusFilter, setStatusFilterRaw] = useState<StatusFilter>('All');
  const [inviteFilter, setInviteFilterRaw] = useState<InviteFilter>('All');
  const [page, setPage] = useState(1);
  const {
    sortKey,
    sortDir,
    toggleSort: toggleSortRaw,
  } = useColumnSort<UserSortKey>();

  const filtered = useMemo(() => {
    const matchSearch = (u: AdminUserRow) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    };

    const rows = users.filter(
      (u) =>
        matchSearch(u) &&
        (roleFilter === 'All' || u.role === roleFilter) &&
        (statusFilter === 'All' || u.status === statusFilter) &&
        (inviteFilter === 'All' || u.inviteStatus === inviteFilter),
    );

    if (sortKey) {
      rows.sort((a, b) => {
        const cmp =
          sortKey === 'name'
            ? a.name.localeCompare(b.name)
            : sortKey === 'courses'
              ? a.enrolled - b.enrolled
              : parseDateLoose(a.joined) - parseDateLoose(b.joined);
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return rows;
  }, [users, search, roleFilter, statusFilter, inviteFilter, sortKey, sortDir]);

  function toggleSort(key: UserSortKey) {
    toggleSortRaw(key);
    setPage(1);
  }

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

  function setRoleFilter(value: RoleFilter) {
    setRoleFilterRaw(value);
    setPage(1);
  }

  function setStatusFilter(value: StatusFilter) {
    setStatusFilterRaw(value);
    setPage(1);
  }

  function setInviteFilter(value: InviteFilter) {
    setInviteFilterRaw(value);
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
    roleFilter,
    statusFilter,
    inviteFilter,
    setRoleFilter,
    setStatusFilter,
    setInviteFilter,
    sortKey,
    sortDir,
    toggleSort,
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
