import { ALL_COURSES, EXPLORE_COURSES, type Course } from '@/constants/learner';
import { slugify } from '@/lib/utils/slugify';

export const CATALOG: readonly Course[] = [...ALL_COURSES, ...EXPLORE_COURSES];

export function courseSlug(course: Course): string {
  return slugify(course.title);
}

/** Accepts the canonical title slug, and a raw id for backwards compatibility
 *  with old public /courses/{id} links. */
export function findCourse(param: string): Course | undefined {
  return (
    CATALOG.find((c) => courseSlug(c) === param) ??
    CATALOG.find((c) => c.id === param)
  );
}

export function courseCategories(list: readonly Course[]): readonly string[] {
  return ['All', ...new Set(list.map((c) => c.category))];
}
