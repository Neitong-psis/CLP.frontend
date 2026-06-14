'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useToast } from '@/components/ui/toast';
import { isApiError } from '@/lib/api/errors';
import type { AdminCourseRow } from '@/constants/admin';
import {
  fetchRawCourses,
  updateCourse,
  deleteCourse,
  toAdminCourseRow,
} from '@/features/courses';

export interface CourseManagement {
  courses: AdminCourseRow[];
  loading: boolean;
  saveEdit: (updated: AdminCourseRow) => Promise<void>;
  remove: (id: string) => Promise<void>;
  publish: (id: string) => Promise<void>;
  approve: (course: AdminCourseRow) => Promise<void>;
}

function errorMessage(error: unknown, fallback: string): string {
  return isApiError(error) ? error.message : fallback;
}

/**
 * Manages the admin courses list against the backend `/api/v1/courses`.
 * Loads all pages on mount. Each mutation awaits the API then updates local
 * state (pessimistic). A `metaRef` tracks each course's raw JSONB meta so
 * `saveEdit` can merge level changes without overwriting existing fields
 * (sections, rating, etc.).
 */
export function useCourseManagement(): CourseManagement {
  const [courses, setCourses] = useState<AdminCourseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const metaRef = useRef<Record<string, Record<string, unknown>>>({});
  const { toast } = useToast();

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const raw = await fetchRawCourses();
        if (!active) return;
        const rows: AdminCourseRow[] = [];
        const metas: Record<string, Record<string, unknown>> = {};
        for (const c of raw) {
          rows.push(toAdminCourseRow(c));
          metas[c.id] = (c.meta ?? {}) as Record<string, unknown>;
        }
        setCourses(rows);
        metaRef.current = metas;
      } catch (error) {
        if (active)
          toast(errorMessage(error, 'Failed to load courses.'), 'error');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [toast]);

  const saveEdit = useCallback(
    async (updated: AdminCourseRow) => {
      try {
        const existingMeta = metaRef.current[updated.id] ?? {};
        const mergedMeta = { ...existingMeta, level: updated.level };
        const course = await updateCourse(updated.id, {
          title: updated.title,
          isPublished: updated.status === 'Public',
          meta: mergedMeta,
        });
        const row = toAdminCourseRow(course);
        metaRef.current[row.id] = (course.meta ?? {}) as Record<
          string,
          unknown
        >;
        setCourses((prev) => prev.map((c) => (c.id === row.id ? row : c)));
        toast(`"${row.title}" has been updated.`, 'success');
      } catch (error) {
        toast(errorMessage(error, 'Failed to update course.'), 'error');
      }
    },
    [toast],
  );

  const remove = useCallback(
    async (id: string) => {
      const target = courses.find((c) => c.id === id);
      try {
        await deleteCourse(id);
        setCourses((prev) => prev.filter((c) => c.id !== id));
        toast(`"${target?.title ?? 'Course'}" was deleted.`, 'error');
      } catch (error) {
        toast(errorMessage(error, 'Failed to delete course.'), 'error');
      }
    },
    [toast, courses],
  );

  const publish = useCallback(
    async (id: string) => {
      try {
        const course = await updateCourse(id, { isPublished: true });
        const row = toAdminCourseRow(course);
        metaRef.current[row.id] = (course.meta ?? {}) as Record<
          string,
          unknown
        >;
        setCourses((prev) => prev.map((c) => (c.id === row.id ? row : c)));
        toast(`"${row.title}" published successfully.`, 'success');
      } catch (error) {
        toast(errorMessage(error, 'Failed to publish course.'), 'error');
      }
    },
    [toast],
  );

  const approve = useCallback(
    async (course: AdminCourseRow) => {
      try {
        const updated = await updateCourse(course.id, { isPublished: true });
        const row = toAdminCourseRow(updated);
        metaRef.current[row.id] = (updated.meta ?? {}) as Record<
          string,
          unknown
        >;
        setCourses((prev) => prev.map((c) => (c.id === row.id ? row : c)));
        toast(`"${row.title}" approved and published.`, 'success');
      } catch (error) {
        toast(errorMessage(error, 'Failed to approve course.'), 'error');
      }
    },
    [toast],
  );

  return { courses, loading, saveEdit, remove, publish, approve };
}
