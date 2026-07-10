/**
 * Client-only, localStorage-backed enrollment record. There is no backend
 * enrollment service in this app yet — `CoursePreview` (the "Enroll" CTA) and
 * the checkout page both read/write through here so they can never disagree
 * about which courses a learner already has access to.
 */

const STORAGE_KEY = 'qb_enrolled_courses';

export function readEnrolledIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) ?? '[]',
    ) as string[];
  } catch {
    return [];
  }
}

export function isEnrolledIn(courseId: string): boolean {
  return readEnrolledIds().includes(courseId);
}

export function addToEnrolled(courseId: string): void {
  const ids = readEnrolledIds();
  if (ids.includes(courseId)) return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...ids, courseId]),
    );
  } catch {
    // Best-effort — a learner who can't persist this locally still completed
    // the purchase; there's nothing actionable to surface here.
  }
}
