const PREFIX = 'qb_course_progress_';

export function readCourseProgress(courseId: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(
      localStorage.getItem(PREFIX + courseId) ?? '[]',
    ) as string[];
  } catch {
    return [];
  }
}

export function saveCourseProgress(courseId: string, itemIds: string[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PREFIX + courseId, JSON.stringify(itemIds));
}
