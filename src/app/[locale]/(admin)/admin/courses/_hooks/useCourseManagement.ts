'use client';

import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/toast';
import { ADMIN_COURSES, type AdminCourseRow } from '@/constants/admin';
import {
  fetchRawCourses,
  saveAdminCourseRow,
  publishCourse,
  deleteCourse,
  toAdminCourseRow,
} from '@/services/courses';
import { fetchAllCategories } from '@/services/categories';
import { isMockModeEnabled } from '@/lib/mock/mock-mode';

export interface CourseManagement {
  courses: AdminCourseRow[];
  loading: boolean;
  saveEdit: (updated: AdminCourseRow) => Promise<void>;
  remove: (id: string) => Promise<void>;
  publish: (id: string) => Promise<void>;
  approve: (course: AdminCourseRow) => Promise<void>;
}

export function useCourseManagement(): CourseManagement {
  const [courses, setCourses] = useState<AdminCourseRow[]>(() =>
    isMockModeEnabled() ? ADMIN_COURSES : [],
  );
  const [loading, setLoading] = useState(() => !isMockModeEnabled());
  const [categoryIdByName, setCategoryIdByName] = useState<
    Record<string, string>
  >({});
  const { toast } = useToast();

  useEffect(() => {
    if (isMockModeEnabled()) {
      return;
    }

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
      if (isMockModeEnabled()) {
        setCourses((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c)),
        );
        toast(`"${updated.title}" has been updated.`, 'success');
        return;
      }
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
      if (isMockModeEnabled()) {
        setCourses((prev) => prev.filter((c) => c.id !== id));
        toast(`"${target?.title ?? 'Course'}" was deleted.`, 'error');
        return;
      }
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
      if (isMockModeEnabled()) {
        setCourses((prev) =>
          prev.map((c) =>
            c.id === id
              ? {
                  ...c,
                  status: 'Public',
                  workStatus: 'published',
                  workProgress: 100,
                }
              : c,
          ),
        );
        toast(`"${title}" published successfully.`, 'success');
        return;
      }
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
