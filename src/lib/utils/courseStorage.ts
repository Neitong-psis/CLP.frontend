import { flattenItems } from '@/app/[locale]/(learner)/learn/[courseId]/_lib/content';
import type { ReviewModule } from '@/app/[locale]/(learner)/learn/[courseId]/_lib/content';

const PREFIX = 'qb_course_progress_';
const STATE_PREFIX = 'qb_course_state_';

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

/**
 * Richer learner state that sits alongside the legacy `viewed` id array above.
 * Kept in a separate key so the existing progress-percent readers (My Learning,
 * dashboard) that only understand the `viewed` array are untouched.
 *
 * - `passed`     — quiz item ids the learner scored ≥60% on
 * - `submitted`  — assignment item ids the learner has submitted
 * - `attempts`   — per-quiz failed-attempt counter (drives the 3-strikes relearn)
 */
export interface CourseState {
  passed: string[];
  submitted: string[];
  attempts: Record<string, number>;
}

const EMPTY_STATE: CourseState = { passed: [], submitted: [], attempts: {} };

export function readCourseState(courseId: string): CourseState {
  if (typeof window === 'undefined') return { ...EMPTY_STATE };
  try {
    const raw = localStorage.getItem(STATE_PREFIX + courseId);
    if (!raw) return { ...EMPTY_STATE };
    const parsed = JSON.parse(raw) as Partial<CourseState>;
    return {
      passed: parsed.passed ?? [],
      submitted: parsed.submitted ?? [],
      attempts: parsed.attempts ?? {},
    };
  } catch {
    return { ...EMPTY_STATE };
  }
}

export function saveCourseState(courseId: string, state: CourseState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STATE_PREFIX + courseId, JSON.stringify(state));
}

/**
 * Resolves a course's real completion percentage from a set of viewed ids.
 *
 * Counts only ids that match an actual item in `modules` — stray ids (e.g.
 * leftover demo-seed ids from an unrelated course) are ignored instead of
 * inflating the count, which is what caused My Learning and the dashboard's
 * Continue Learning card to disagree on the same course's percentage.
 *
 * Pure (no localStorage access) so callers needing an SSR-safe default can
 * pass an empty set; see {@link getCourseProgressPercent} for the storage-
 * backed convenience wrapper.
 */
export function calcCourseProgressPercent(
  modules: ReviewModule[],
  viewedIds: Iterable<string>,
): number {
  const items = flattenItems(modules);
  if (items.length === 0) return 0;
  const viewed = new Set(viewedIds);
  const count = items.filter((item) => viewed.has(item.id)).length;
  return Math.round((count / items.length) * 100);
}

/** Same as {@link calcCourseProgressPercent}, reading persisted progress from localStorage. */
export function getCourseProgressPercent(
  courseId: string,
  modules: ReviewModule[],
): number {
  return calcCourseProgressPercent(modules, readCourseProgress(courseId));
}
