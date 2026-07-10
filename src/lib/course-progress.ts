import type {
  ReviewItem,
  ReviewLesson,
  ReviewModule,
} from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';

export type ItemDone = (item: ReviewItem) => boolean;

export function lessonItems(lesson: ReviewLesson): ReviewItem[] {
  return [
    ...lesson.documents,
    ...lesson.videos,
    ...lesson.quizzes,
    ...lesson.assignments,
  ];
}

export interface FlatLesson {
  module: ReviewModule;
  lesson: ReviewLesson;
  items: ReviewItem[];
}

/** Every lesson across all modules, in reading order, tagged with its module. */
export function flattenLessons(modules: ReviewModule[]): FlatLesson[] {
  return modules.flatMap((mod) =>
    mod.lessons.map((lesson) => ({
      module: mod,
      lesson,
      items: lessonItems(lesson),
    })),
  );
}

export function isLessonDone(lesson: ReviewLesson, isDone: ItemDone): boolean {
  return lessonItems(lesson).every(isDone);
}

export function isModuleDone(mod: ReviewModule, isDone: ItemDone): boolean {
  return mod.lessons.every((lesson) => isLessonDone(lesson, isDone));
}

export function lessonDoneCount(
  lesson: ReviewLesson,
  isDone: ItemDone,
): number {
  return lessonItems(lesson).filter(isDone).length;
}

/** Count of completed lessons in a module. */
export function moduleDoneLessonCount(
  mod: ReviewModule,
  isDone: ItemDone,
): number {
  return mod.lessons.filter((lesson) => isLessonDone(lesson, isDone)).length;
}

export interface CourseLocks {
  lockedLessonIds: Set<string>;
  lockedItemIds: Set<string>;
  lockedModuleIds: Set<string>;
  blockedBy: Map<string, string>;
}

export function computeLocks(
  modules: ReviewModule[],
  isDone: ItemDone,
  lockingEnabled: boolean,
): CourseLocks {
  const lockedLessonIds = new Set<string>();
  const lockedItemIds = new Set<string>();
  const lockedModuleIds = new Set<string>();
  const blockedBy = new Map<string, string>();

  if (!lockingEnabled) {
    return { lockedLessonIds, lockedItemIds, lockedModuleIds, blockedBy };
  }

  let allPriorDone = true;
  let firstIncompleteTitle: string | null = null;

  for (const { lesson, items } of flattenLessons(modules)) {
    if (!allPriorDone) {
      lockedLessonIds.add(lesson.id);
      for (const item of items) lockedItemIds.add(item.id);
      if (firstIncompleteTitle) blockedBy.set(lesson.id, firstIncompleteTitle);
    }
    if (!isLessonDone(lesson, isDone)) {
      allPriorDone = false;
      if (firstIncompleteTitle === null) firstIncompleteTitle = lesson.title;
    }
  }

  for (const mod of modules) {
    if (
      mod.lessons.length > 0 &&
      mod.lessons.every((lesson) => lockedLessonIds.has(lesson.id))
    ) {
      lockedModuleIds.add(mod.id);
    }
  }

  return { lockedLessonIds, lockedItemIds, lockedModuleIds, blockedBy };
}

export function firstResumableItemId(
  modules: ReviewModule[],
  isDone: ItemDone,
  locks: CourseLocks,
  seedActiveId?: string,
): string {
  const flatItems = flattenLessons(modules).flatMap((f) => f.items);
  if (flatItems.length === 0) return seedActiveId ?? '';

  if (
    seedActiveId &&
    flatItems.some((i) => i.id === seedActiveId) &&
    !locks.lockedItemIds.has(seedActiveId)
  ) {
    return seedActiveId;
  }

  const firstIncomplete = flatItems.find(
    (i) => !locks.lockedItemIds.has(i.id) && !isDone(i),
  );
  if (firstIncomplete) return firstIncomplete.id;

  const firstUnlocked = flatItems.find((i) => !locks.lockedItemIds.has(i.id));
  return (firstUnlocked ?? flatItems[0]).id;
}
