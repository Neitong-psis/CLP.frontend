'use client';

import { useState, useEffect } from 'react';
import {
  fetchRawCourses,
  deriveCourseStats,
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
    fetchRawCourses()
      .then((raw) => {
        if (!cancelled) setData(deriveCourseStats(raw));
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
