import { EDUCATOR_COURSE_TASKS, type CourseTask } from '@/constants/educator';

const STORAGE_KEY = 'qb_educator_course_tasks_v2';

/**
 * Plain (non-React) external store backing `CourseTasksContext`.
 *
 * Reading `localStorage` inside a `useState` lazy initializer looks tempting
 * but causes a real SSR/client hydration mismatch the moment stored data
 * diverges from the fixture — which is always, after the very first save.
 * React "recovers" by discarding and regenerating the mismatched subtree,
 * which is exactly the kind of thing that reads as "state goes weird after a
 * refresh". `useSyncExternalStore` is the sanctioned fix: the server (and the
 * client's first hydration pass) always see `getServerSnapshot()`, then a
 * synced follow-up render picks up the real stored value — no mismatch ever
 * reaches the DOM. Same pattern as `components/course-sidebar/storage.ts`,
 * generalized from one string preference to the full task list.
 */

let cachedTasks: CourseTask[] | null = null;
const listeners = new Set<() => void>();

function readFromStorage(): CourseTask[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CourseTask[];
  } catch {}
  return [...EDUCATOR_COURSE_TASKS];
}

function writeToStorage(tasks: CourseTask[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {}
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): CourseTask[] {
  if (cachedTasks === null) cachedTasks = readFromStorage();
  return cachedTasks;
}

/** Nothing is persisted on the server; every client hydrates from this same
 *  stable fixture reference first, then syncs to the real stored value. */
export function getServerSnapshot(): CourseTask[] {
  return EDUCATOR_COURSE_TASKS;
}

export function setTasks(updater: (prev: CourseTask[]) => CourseTask[]): void {
  cachedTasks = updater(getSnapshot());
  writeToStorage(cachedTasks);
  listeners.forEach((listener) => listener());
}
