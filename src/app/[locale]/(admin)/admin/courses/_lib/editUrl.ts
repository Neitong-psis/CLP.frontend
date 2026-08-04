import type { AdminCourseRow } from '@/constants/admin';

/**
 * Routes into the course-builder wizard (`admin/courses/new`) in edit mode.
 * Like `buildCourseReviewUrl`, this page has no fetch-by-id for course info
 * — the table already has everything Step 1 needs (title/description/price/
 * thumbnail/level/category/instructor), so it rides along as query params.
 * Curriculum isn't included: there's no endpoint to fetch an existing
 * course's modules yet, so the wizard opens on Step 1 with Step 2 empty.
 */
export function buildCourseEditUrl(
  locale: string,
  course: Pick<
    AdminCourseRow,
    | 'id'
    | 'title'
    | 'description'
    | 'price'
    | 'thumbnail'
    | 'level'
    | 'category'
    | 'categoryId'
    | 'instructor'
    | 'instructorId'
    | 'status'
  >,
  /** Step to land on — Step 1 by default, but e.g. the archived-course
   *  preview's "Edit" action jumps straight to Step 3. */
  step = 1,
): string {
  const params = new URLSearchParams({ edit: course.id, title: course.title });
  if (course.description) params.set('description', course.description);
  if (course.price != null) params.set('price', String(course.price));
  if (course.thumbnail) params.set('thumbnail', course.thumbnail);
  if (course.level) params.set('level', course.level);
  if (course.category) params.set('category', course.category);
  if (course.categoryId) params.set('categoryId', course.categoryId);
  if (course.instructor) params.set('instructor', course.instructor);
  if (course.instructorId) params.set('instructorId', course.instructorId);
  params.set('status', course.status);
  params.set('step', String(step));
  return `/${locale}/admin/courses/new?${params.toString()}`;
}
