import { useMemo, useState } from 'react';
import {
  EDUCATOR_STUDENTS,
  type StudentActivity,
  type StudentRow,
} from '@/constants/educator';
import { useColumnSort } from '@/hooks/useColumnSort';
import { parseCurrency, parseRelativeTime } from '@/lib/utils/sort';
import type { StatusFilter } from './constants';

export type SortKey = 'name' | 'course' | 'progress' | 'lastSeen' | 'earnings';

/** Search, status/activity filtering and column sorting over the educator's
 *  learner roster. */
export function useStudentFilter() {
  const [students] = useState<StudentRow[]>([...EDUCATOR_STUDENTS]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [activityFilter, setActivityFilter] = useState<StudentActivity | 'All'>(
    'All',
  );
  const { sortKey, sortDir, toggleSort } = useColumnSort<SortKey>();

  const counts = useMemo(() => {
    const c = {
      total: students.length,
      active: 0,
      inactive: 0,
      achieved: 0,
    };
    for (const s of students) {
      if (s.status === 'Active') c.active++;
      if (s.status === 'Inactive') c.inactive++;
      if (s.status === 'Completed') c.achieved++;
    }
    return c;
  }, [students]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const rows = students.filter((s) => {
      if (statusFilter !== 'All' && s.status !== statusFilter) return false;
      if (activityFilter !== 'All' && s.activity !== activityFilter)
        return false;
      if (
        q &&
        !s.name.toLowerCase().includes(q) &&
        !s.email.toLowerCase().includes(q) &&
        !s.course.toLowerCase().includes(q)
      )
        return false;
      return true;
    });

    if (sortKey) {
      rows.sort((a, b) => {
        const cmp =
          sortKey === 'name'
            ? a.name.localeCompare(b.name)
            : sortKey === 'course'
              ? a.course.localeCompare(b.course)
              : sortKey === 'progress'
                ? a.progress - b.progress
                : sortKey === 'lastSeen'
                  ? parseRelativeTime(a.lastSeen) -
                    parseRelativeTime(b.lastSeen)
                  : parseCurrency(a.earnings) - parseCurrency(b.earnings);
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return rows;
  }, [students, search, statusFilter, activityFilter, sortKey, sortDir]);

  function clearFilters() {
    setSearch('');
    setStatusFilter('All');
    setActivityFilter('All');
  }

  const hasFilters =
    search !== '' || statusFilter !== 'All' || activityFilter !== 'All';

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    activityFilter,
    setActivityFilter,
    sortKey,
    sortDir,
    toggleSort,
    clearFilters,
    hasFilters,
    counts,
    filtered,
    total: students.length,
  };
}
