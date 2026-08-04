'use client';

import { useState } from 'react';
import { CERTIFICATES, type Certificate } from '@/constants/learner';

const PAGE_SIZE = 6;

export type StatusFilter = 'all' | 'verify' | 'view';
export type SortKey = 'recent' | 'title-az' | 'title-za' | 'status';

function sortCertificates(
  list: Certificate[],
  sort: SortKey,
  verifiedIds: string[],
): Certificate[] {
  if (sort === 'recent') return list;
  return [...list].sort((a, b) => {
    switch (sort) {
      case 'title-az':
        return a.fullTitle.localeCompare(b.fullTitle);
      case 'title-za':
        return b.fullTitle.localeCompare(a.fullTitle);
      case 'status': {
        // Unverified (still actionable) certificates first.
        const av = a.verified || verifiedIds.includes(a.id);
        const bv = b.verified || verifiedIds.includes(b.id);
        return Number(av) - Number(bv);
      }
      default:
        return 0;
    }
  });
}

/**
 * Owns the certificates list's search/filter/sort/page UI state and derives
 * the filtered/sorted/paginated result from it plus `verifiedIds` (from
 * `useVerifiedCertificates`). Callers still own resetting `page` back to 1
 * on filter changes, same as before this was extracted.
 */
export function useCertificateFilters(verifiedIds: string[]) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sort, setSort] = useState<SortKey>('recent');
  const [page, setPage] = useState(1);

  const filtered = CERTIFICATES.filter((c) => {
    const matchSearch =
      c.fullTitle.toLowerCase().includes(search.toLowerCase()) ||
      c.certificateId.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;

    const isVerified = c.verified || verifiedIds.includes(c.id);
    if (statusFilter === 'verify') return !isVerified;
    if (statusFilter === 'view') return isVerified;
    return true;
  });

  const sorted = sortCertificates(filtered, sort, verifiedIds);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const verifiedCount = CERTIFICATES.filter(
    (c) => c.verified || verifiedIds.includes(c.id),
  ).length;

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sort,
    setSort,
    page,
    setPage,
    sorted,
    paginated,
    totalPages,
    currentPage,
    verifiedCount,
  };
}
