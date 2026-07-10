'use client';

import { useState, useEffect } from 'react';
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

export function useCourseStats(): UseCourseStatsResult {
  const [data, setData] = useState<CourseStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchCourseStats(), fetchTopPerformingCourses()])
      .then(([stats, topPerforming]) => {
        if (!cancelled) setData(buildCourseStats(stats, topPerforming));
      })
      .catch(() => {
        // Leave data null — components fall back to static constants
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading };
}
