'use client';

import {
  createResourceStore,
  useResourceStore,
} from '@/lib/cache/createResourceStore';
import {
  fetchCourseStats,
  fetchTopPerformingCourses,
  buildCourseStats,
  type CourseStats,
} from '@/services/courses';

interface UseCourseStatsResult {
  data: CourseStats | null;
  loading: boolean;
}

const courseStatsStore = createResourceStore<CourseStats>(() =>
  Promise.all([fetchCourseStats(), fetchTopPerformingCourses()]).then(
    ([stats, topPerforming]) => buildCourseStats(stats, topPerforming),
  ),
);

export function useCourseStats(): UseCourseStatsResult {
  const { data, loading } = useResourceStore(courseStatsStore);
  return { data, loading };
}
