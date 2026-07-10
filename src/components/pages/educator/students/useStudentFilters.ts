import { useState, useMemo } from 'react';
import { StudentRow } from '@/constants/educator';

export interface StudentFiltersState {
  filterLearner: string;
  filterCourse: string;
  filterProgress: string;
  filterActivity: string;
  filterStatus: string;
  filterLastActive: string;
}

export function useStudentFilters(initialStudents: StudentRow[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<StudentFiltersState>({
    filterLearner: '',
    filterCourse: '',
    filterProgress: '',
    filterActivity: '',
    filterStatus: '',
    filterLastActive: '',
  });

  const setFilter = (key: keyof StudentFiltersState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredStudents = useMemo(() => {
    return initialStudents.filter((student) => {
      // Search Term Filter
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // Dropdown Filters
      if (filters.filterLearner && student.name !== filters.filterLearner)
        return false;
      if (filters.filterCourse && student.course !== filters.filterCourse)
        return false;
      if (filters.filterActivity && student.activity !== filters.filterActivity)
        return false;
      if (filters.filterStatus && student.status !== filters.filterStatus)
        return false;

      if (
        filters.filterProgress &&
        student.progress < Number(filters.filterProgress)
      )
        return false;

      if (filters.filterLastActive) {
        const isToday =
          student.lastSeen.includes('m') || student.lastSeen.includes('h');
        const is7Days =
          isToday ||
          (student.lastSeen.includes('d') && parseInt(student.lastSeen) <= 7);
        const is30Days =
          is7Days ||
          (student.lastSeen.includes('w') && parseInt(student.lastSeen) <= 4);
        const is90Days =
          is30Days ||
          (student.lastSeen.includes('w') &&
            parseInt(student.lastSeen) <= 12) ||
          (student.lastSeen.includes('m') && parseInt(student.lastSeen) <= 3);

        if (filters.filterLastActive === 'today' && !isToday) return false;
        if (filters.filterLastActive === '7days' && !is7Days) return false;
        if (filters.filterLastActive === '30days' && !is30Days) return false;
        if (filters.filterLastActive === '90days' && !is90Days) return false;
      }

      return true;
    });
  }, [initialStudents, searchTerm, filters]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilter,
    filteredStudents,
  };
}
