'use client';

import { useCallback, useMemo } from 'react';
import { useToast } from '@/components/ui/toast';
import type { AdminCourseRow } from '@/constants/admin';
import {
  saveAdminCourseRow,
  publishCourse,
  deleteCourse,
  toAdminCourseRow,
  coursesStore,
} from '@/services/courses';
import { categoriesStore } from '@/services/categories';
import { useResourceStore } from '@/lib/cache/createResourceStore';
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
  const coursesState = useResourceStore(coursesStore);
  const categoriesState = useResourceStore(categoriesStore);
  const { toast } = useToast();

  const courses = useMemo(() => coursesState.data ?? [], [coursesState.data]);
  const loading = coursesState.loading || categoriesState.loading;

  const categoryIdByName = useMemo(
    () =>
      Object.fromEntries(
        (categoriesState.data ?? []).map((c) => [c.name, c.id]),
      ),
    [categoriesState.data],
  );

  const saveEdit = useCallback(
    async (updated: AdminCourseRow) => {
      if (isMockModeEnabled()) {
        coursesStore.mutate((prev) =>
          prev ? prev.map((c) => (c.id === updated.id ? updated : c)) : prev,
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
        coursesStore.mutate((prev) =>
          prev ? prev.map((c) => (c.id === row.id ? row : c)) : prev,
        );
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
        coursesStore.mutate((prev) =>
          prev ? prev.filter((c) => c.id !== id) : prev,
        );
        toast(`"${target?.title ?? 'Course'}" was deleted.`, 'error');
        return;
      }
      try {
        await deleteCourse(id);
        coursesStore.mutate((prev) =>
          prev ? prev.filter((c) => c.id !== id) : prev,
        );
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
        coursesStore.mutate((prev) =>
          prev
            ? prev.map((c) =>
                c.id === id
                  ? {
                      ...c,
                      status: 'Public',
                      workStatus: 'published',
                      workProgress: 100,
                    }
                  : c,
              )
            : prev,
        );
        toast(`"${title}" published successfully.`, 'success');
        return;
      }
      try {
        const saved = await publishCourse(id);
        const row = toAdminCourseRow(saved);
        coursesStore.mutate((prev) =>
          prev ? prev.map((c) => (c.id === id ? row : c)) : prev,
        );
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
