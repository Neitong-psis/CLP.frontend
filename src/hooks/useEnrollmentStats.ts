'use client';

import {
  createResourceStore,
  useResourceStore,
} from '@/lib/cache/createResourceStore';
import {
  fetchEnrollmentStats,
  type EnrollmentStats,
} from '@/services/enrollments';

interface UseEnrollmentStatsResult {
  data: EnrollmentStats | null;
  loading: boolean;
  error: string | null;
}

const enrollmentStatsStore =
  createResourceStore<EnrollmentStats>(fetchEnrollmentStats);

export function useEnrollmentStats(): UseEnrollmentStatsResult {
  return useResourceStore(enrollmentStatsStore);
}
