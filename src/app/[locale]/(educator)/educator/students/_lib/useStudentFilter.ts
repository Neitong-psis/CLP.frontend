import { useMemo, useState } from 'react';
import { EDUCATOR_STUDENTS, type StudentRow } from '@/constants/educator';
import type { StatusFilter } from './constants';

export type SortKey = 'name' | 'progress' | null;
export type SortDir = 'asc' | 'desc';

export interface NewStudentInput {
  name: string;
  email: string;
  course: string;
}

/** Search, status/risk filtering and sorting over the educator's learner roster. */
export function useStudentFilter() {
  const [students, setStudents] = useState<StudentRow[]>([
    ...EDUCATOR_STUDENTS,
  ]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [riskOnly, setRiskOnly] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const counts = useMemo(() => {
    const c = {
      total: students.length,
      active: 0,
      achieved: 0,
      atRisk: 0,
      avgProgress: 0,
    };
    for (const s of students) {
      if (s.status === 'Active') c.active++;
      if (s.status === 'Completed') c.achieved++;
      if (s.activity === 'At risk') c.atRisk++;
      c.avgProgress += s.progress;
    }
    c.avgProgress = Math.round(c.avgProgress / (students.length || 1));
    return c;
  }, [students]);

  /** Adds a newly invited learner to the top of the roster (Inactive until they accept). */
  function addStudent(input: NewStudentInput) {
    const now = new Date();
    const enrolled = now.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
    setStudents((prev) => [
      {
        id: `invited-${Date.now()}`,
        name: input.name,
        email: input.email,
        course: input.course,
        progress: 0,
        activity: 'Active',
        status: 'Inactive',
        enrolled,
        lastSeen: 'Just invited',
        earnings: '$0',
      },
      ...prev,
    ]);
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const rows = students.filter((s) => {
      if (statusFilter !== 'All' && s.status !== statusFilter) return false;
      if (riskOnly && s.activity !== 'At risk') return false;
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
            : a.progress - b.progress;
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return rows;
  }, [students, search, statusFilter, riskOnly, sortKey, sortDir]);

  /** Cycle a column: asc → desc → off. */
  function toggleSort(key: Exclude<SortKey, null>) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
    } else if (sortDir === 'asc') {
      setSortDir('desc');
    } else {
      setSortKey(null);
    }
  }

  function clearFilters() {
    setSearch('');
    setStatusFilter('All');
    setRiskOnly(false);
  }

  const hasFilters = search !== '' || statusFilter !== 'All' || riskOnly;

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    riskOnly,
    setRiskOnly,
    sortKey,
    sortDir,
    toggleSort,
    clearFilters,
    hasFilters,
    counts,
    filtered,
    addStudent,
    total: students.length,
  };
}
