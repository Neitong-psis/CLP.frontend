import { ITEM_ROW_HEIGHT, LESSON_GROUP_HEADER_HEIGHT } from './constants';
import type {
  ContentItem,
  Course,
  CourseModule,
  CourseSidebarLabels,
  ItemLocation,
  ItemState,
  Lesson,
  ModuleState,
  ProgressSummary,
} from './types';

/**
 * Pure derivations over the course tree. Nothing here touches React, so every
 * rule below (locking, precedence, roll-up) is unit-testable in isolation and
 * the components stay presentational.
 */

const EMPTY_PROGRESS: ProgressSummary = { completed: 0, total: 0, percent: 0 };

function toSummary(completed: number, total: number): ProgressSummary {
  return {
    completed,
    total,
    // Guard the empty case: 0/0 must read as 0%, not NaN%.
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

/** All items across a lesson's — or a module's — lessons, in reading order. */
function moduleItems(module: CourseModule): ContentItem[] {
  return module.lessons.flatMap((lesson) => lesson.items);
}

export function lessonProgress(lesson: Lesson): ProgressSummary {
  const total = lesson.items.length;
  if (total === 0) return EMPTY_PROGRESS;
  const completed = lesson.items.reduce(
    (count, item) => (item.completed ? count + 1 : count),
    0,
  );
  return toSummary(completed, total);
}

export function moduleProgress(module: CourseModule): ProgressSummary {
  const items = moduleItems(module);
  if (items.length === 0) return EMPTY_PROGRESS;
  const completed = items.reduce(
    (count, i) => (i.completed ? count + 1 : count),
    0,
  );
  return toSummary(completed, items.length);
}

export function courseProgress(course: Course): ProgressSummary {
  let completed = 0;
  let total = 0;
  for (const mod of course.modules) {
    for (const item of moduleItems(mod)) {
      total += 1;
      if (item.completed) completed += 1;
    }
  }
  return toSummary(completed, total);
}

/**
 * Precedence matters: an item in a locked lesson never renders as "current"
 * even if the player somehow points at it, and a completed item never renders
 * as "in-progress" even if stale progress data lingers on it.
 *
 * `lessonLocked` is passed in rather than read off the item because locking is
 * lesson-granular in this domain (see `Lesson.locked`) — every item shares its
 * parent lesson's lock state, so there is nothing to duplicate per item.
 */
export function itemState(
  item: ContentItem,
  lessonLocked: boolean,
  currentItemId: string | null,
): ItemState {
  if (lessonLocked) return 'locked';
  if (item.completed) return 'completed';
  if (item.id === currentItemId) return 'current';
  if (hasPartialProgress(item)) return 'in-progress';
  return 'not-started';
}

function hasPartialProgress(item: ContentItem): boolean {
  const { progress } = item;
  if (!progress) return false;
  return progress.kind === 'percent'
    ? progress.value > 0
    : progress.completed > 0;
}

export function moduleState(
  module: CourseModule,
  progress: ProgressSummary,
  containsCurrentItem: boolean,
): ModuleState {
  if (module.disabled) return 'disabled';
  if (module.locked) return 'locked';
  // "Active" outranks "completed": re-watching a finished module should still
  // read as where the learner is, otherwise the sidebar loses its you-are-here.
  if (containsCurrentItem) return 'active';
  if (progress.total > 0 && progress.completed === progress.total) {
    return 'completed';
  }
  return 'available';
}

/**
 * Whether the accordion will open. A *locked* module still opens — a learner
 * needs to see what is coming and why it is gated. Its lesson/item rows stay
 * inert.
 */
export function isModuleExpandable(state: ModuleState): boolean {
  return state !== 'disabled';
}

/** Whether the learner may actually start the module's lessons. */
export function isModuleUnlocked(state: ModuleState): boolean {
  return state !== 'locked' && state !== 'disabled';
}

/** Everything a module header needs that isn't on the module itself. */
export interface ModuleMeta {
  readonly index: number;
  readonly progress: ProgressSummary;
  readonly state: ModuleState;
}

export function buildModuleIndex(
  course: Course,
  currentItemId: string | null,
): ReadonlyMap<string, ModuleMeta> {
  const index = new Map<string, ModuleMeta>();
  for (const [position, mod] of course.modules.entries()) {
    const progress = moduleProgress(mod);
    const containsCurrentItem = mod.lessons.some((lesson) =>
      lesson.items.some((item) => item.id === currentItemId),
    );
    index.set(mod.id, {
      index: position,
      progress,
      state: moduleState(mod, progress, containsCurrentItem),
    });
  }
  return index;
}

export function findItemLocation(
  course: Course,
  itemId: string | null,
): ItemLocation | null {
  if (!itemId) return null;
  for (const [moduleIndex, mod] of course.modules.entries()) {
    for (const lesson of mod.lessons) {
      const item = lesson.items.find((candidate) => candidate.id === itemId);
      if (item) return { module: mod, lesson, item, moduleIndex };
    }
  }
  return null;
}

/** `95` → "1h 35m", `50` → "50 min". Keeps long courses from wrapping the row. */
export function formatDuration(
  minutes: number,
  minutesShort: (value: number) => string,
): string {
  if (minutes < 60) return minutesShort(minutes);
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`;
}

/**
 * The trailing half of a row's meta line: an explicit `detail` ("Pending")
 * wins over a computed duration. `null` when the item has neither.
 */
export function itemDetail(
  item: ContentItem,
  labels: CourseSidebarLabels,
): string | null {
  if (item.detail) return item.detail;
  if (item.durationMinutes == null) return null;
  return formatDuration(item.durationMinutes, labels.minutesShort);
}

/**
 * The full meta line under an item's title: "Reading · 10 min",
 * "Assignment · Pending", or the parent lesson's lock reason. One rule, every
 * surface that shows a row (the row itself, the floating preview), so they
 * can't drift.
 */
export function itemMeta(
  item: ContentItem,
  lesson: Lesson,
  labels: CourseSidebarLabels,
): string {
  if (lesson.locked) return lesson.lockedHint ?? labels.lockedLesson;
  const type = labels.itemTypes[item.type];
  const detail = itemDetail(item, labels);
  return detail ? `${type} · ${detail}` : type;
}

/**
 * The short readout on an item row — "2/5" or "60%". Returns `null` when
 * there is nothing worth showing (untouched, finished, or locked).
 */
export function formatItemProgress(
  item: ContentItem,
  lessonLocked: boolean,
): string | null {
  const { progress } = item;
  if (!progress || item.completed || lessonLocked) return null;

  if (progress.kind === 'percent') {
    return progress.value > 0 ? `${Math.round(progress.value)}%` : null;
  }
  if (progress.completed <= 0 || progress.total <= 0) return null;
  return `${progress.completed}/${progress.total}`;
}

/** 0–1, for the thin bar under an in-progress item row. */
export function itemProgressFraction(item: ContentItem): number {
  const { progress } = item;
  if (!progress) return 0;
  if (progress.kind === 'percent') return clamp01(progress.value / 100);
  if (progress.total <= 0) return 0;
  return clamp01(progress.completed / progress.total);
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/**
 * A lesson's rendered height, deterministic from its item count. This is what
 * lets the lesson list window itself (`useVirtualRows`) without measuring the
 * DOM: single-item lessons (the common case) are one row tall; a lesson that
 * bundles several items adds a slim caption above them.
 */
export function lessonRowHeight(lesson: Lesson): number {
  const header = lesson.items.length > 1 ? LESSON_GROUP_HEADER_HEIGHT : 0;
  return header + Math.max(1, lesson.items.length) * ITEM_ROW_HEIGHT;
}
