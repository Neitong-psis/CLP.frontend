'use client';

import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/toast';
import type { AdminCourseRow } from '@/constants/admin';
import {
  fetchRawCourses,
  saveAdminCourseRow,
  publishCourse,
  deleteCourse,
  toAdminCourseRow,
} from '@/services/courses';
import { fetchAllCategories } from '@/services/categories';

export interface CourseManagement {
  courses: AdminCourseRow[];
  loading: boolean;
  saveEdit: (updated: AdminCourseRow) => Promise<void>;
  remove: (id: string) => Promise<void>;
  publish: (id: string) => Promise<void>;
  approve: (course: AdminCourseRow) => Promise<void>;
}

export function useCourseManagement(): CourseManagement {
  const [courses, setCourses] = useState<AdminCourseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryIdByName, setCategoryIdByName] = useState<
    Record<string, string>
  >({});
  const { toast } = useToast();

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchRawCourses(), fetchAllCategories()])
      .then(([raw, categories]) => {
        if (cancelled) return;
        setCourses(raw.map(toAdminCourseRow));
        setCategoryIdByName(
          Object.fromEntries(categories.map((c) => [c.name, c.id])),
        );
      })
      .catch(() => {
        toast('Failed to load courses.', 'error');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [toast]);

  const saveEdit = useCallback(
    async (updated: AdminCourseRow) => {
      try {
        const saved = await saveAdminCourseRow(
          updated,
          categoryIdByName[updated.category],
        );
        const row = toAdminCourseRow(saved);
        setCourses((prev) => prev.map((c) => (c.id === row.id ? row : c)));
        toast(`"${row.title}" has been updated.`, 'success');
      } catch {
        toast(`Failed to update "${updated.title}".`, 'error');
      }
    },
    [toast, categoryIdByName],
  );

  const remove = useCallback(
    async (id: string) => {
      const target = courses.find((c) => c.id === id);
      try {
        await deleteCourse(id);
        setCourses((prev) => prev.filter((c) => c.id !== id));
        toast(`"${target?.title ?? 'Course'}" was deleted.`, 'error');
      } catch {
        toast(`Failed to delete "${target?.title ?? 'course'}".`, 'error');
      }
    },
    [toast, courses],
  );

  const publish = useCallback(
    async (id: string) => {
      const title = courses.find((c) => c.id === id)?.title ?? 'Course';
      try {
        const saved = await publishCourse(id);
        const row = toAdminCourseRow(saved);
        setCourses((prev) => prev.map((c) => (c.id === id ? row : c)));
        toast(`"${title}" published successfully.`, 'success');
      } catch {
        toast(`Failed to publish "${title}".`, 'error');
      }
    },
    [toast, courses],
  );

  const approve = useCallback(
    async (course: AdminCourseRow) => {
      await publish(course.id);
    },
    [publish],
  );

  return { courses, loading, saveEdit, remove, publish, approve };
}
