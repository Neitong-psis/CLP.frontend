'use client';

import { useCallback, useState } from 'react';
import { useToast } from '@/components/ui/toast';
import type { AdminCourseRow } from '@/constants/admin';
import { ADMIN_COURSES } from '@/constants/admin';

export interface CourseManagement {
  courses: AdminCourseRow[];
  loading: boolean;
  saveEdit: (updated: AdminCourseRow) => Promise<void>;
  remove: (id: string) => Promise<void>;
  publish: (id: string) => Promise<void>;
  approve: (course: AdminCourseRow) => Promise<void>;
}

export function useCourseManagement(): CourseManagement {
  const [courses, setCourses] = useState<AdminCourseRow[]>(ADMIN_COURSES);
  const { toast } = useToast();

  const saveEdit = useCallback(
    async (updated: AdminCourseRow) => {
      setCourses((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c)),
      );
      toast(`"${updated.title}" has been updated.`, 'success');
    },
    [toast],
  );

  const remove = useCallback(
    async (id: string) => {
      const target = courses.find((c) => c.id === id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
      toast(`"${target?.title ?? 'Course'}" was deleted.`, 'error');
    },
    [toast, courses],
  );

  const publish = useCallback(
    async (id: string) => {
      setCourses((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: 'Public' } : c)),
      );
      const title = courses.find((c) => c.id === id)?.title ?? 'Course';
      toast(`"${title}" published successfully.`, 'success');
    },
    [toast, courses],
  );

  const approve = useCallback(
    async (course: AdminCourseRow) => {
      setCourses((prev) =>
        prev.map((c) => (c.id === course.id ? { ...c, status: 'Public' } : c)),
      );
      toast(`"${course.title}" approved and published.`, 'success');
    },
    [toast],
  );

  return { courses, loading: false, saveEdit, remove, publish, approve };
}
