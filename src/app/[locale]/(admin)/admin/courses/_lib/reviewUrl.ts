import type { AdminCourseRow } from '@/constants/admin';

/**
 * The admin course review page (`admin/courses/[id]`) is entirely
 * query-param driven — it has no fetch-by-id, so every link into it must
 * carry the display fields it needs or it renders "Course not found".
 */
export function buildCourseReviewUrl(
  locale: string,
  course: Pick<
    AdminCourseRow,
    'id' | 'title' | 'instructor' | 'category' | 'level' | 'status'
  >,
): string {
  const params = new URLSearchParams({
    title: course.title,
    instructor: course.instructor,
    category: course.category,
    level: course.level,
    status: course.status,
  });
  return `/${locale}/admin/courses/${course.id}?${params.toString()}`;
}
