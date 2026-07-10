import type {
  ContentItem,
  ContentItemType,
  Course,
  CourseModule,
  Lesson,
} from '@/components/course-sidebar';
import type {
  ReviewItem,
  ReviewItemKind,
  ReviewLesson,
  ReviewModule,
} from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import {
  lessonItems,
  type CourseLocks,
  type ItemDone,
} from '@/lib/course-progress';

/**
 * Adapts the authoring tree (Module → Lesson → Content item) to the sidebar's
 * own Module → Lesson → Item shape.
 *
 * This is a direct, lossless mapping — both trees share the same three
 * levels — so nothing needs to be folded away. `ReviewItemKind` is renamed to
 * `ContentItemType` one-for-one (they're the same four kinds); locking maps
 * onto `Lesson.locked` since this domain always gates whole lessons, never
 * individual items within one.
 */

const KIND_TO_TYPE: Readonly<Record<ReviewItemKind, ContentItemType>> = {
  document: 'document',
  video: 'video',
  quiz: 'quiz',
  assignment: 'assignment',
};

export interface CourseSidebarAdapterInput {
  readonly courseId: string;
  readonly courseTitle: string;
  readonly modules: readonly ReviewModule[];
  readonly locks: CourseLocks;
  readonly isItemDone: ItemDone;
  /** Failed attempts per quiz id, so a retry is visible without opening it. */
  readonly attempts: Readonly<Record<string, number>>;
  readonly submitted: ReadonlySet<string>;
  readonly maxQuizAttempts: number;
  readonly labels: AdapterLabels;
}

/** Pre-resolved copy, so the adapter stays free of `next-intl`. */
export interface AdapterLabels {
  readonly completed: string;
  readonly pending: string;
  readonly submitted: string;
  readonly attemptsUsed: (used: number, max: number) => string;
  readonly lockedHint: (blockingLessonTitle: string) => string;
  readonly lockedFallback: string;
}

export function toSidebarCourse({
  courseId,
  courseTitle,
  modules,
  locks,
  isItemDone,
  attempts,
  submitted,
  maxQuizAttempts,
  labels,
}: CourseSidebarAdapterInput): Course {
  const sidebarModules: CourseModule[] = modules.map((mod) => ({
    id: mod.id,
    title: mod.title,
    locked: locks.lockedModuleIds.has(mod.id),
    lessons: mod.lessons.map((lesson) =>
      toSidebarLesson({
        lesson,
        locks,
        isItemDone,
        attempts,
        submitted,
        maxQuizAttempts,
        labels,
      }),
    ),
  }));

  return { id: courseId, title: courseTitle, modules: sidebarModules };
}

function toSidebarLesson({
  lesson,
  locks,
  isItemDone,
  attempts,
  submitted,
  maxQuizAttempts,
  labels,
}: {
  lesson: ReviewLesson;
  locks: CourseLocks;
  isItemDone: ItemDone;
  attempts: Readonly<Record<string, number>>;
  submitted: ReadonlySet<string>;
  maxQuizAttempts: number;
  labels: AdapterLabels;
}): Lesson {
  const locked = locks.lockedLessonIds.has(lesson.id);
  const blockedBy = locks.blockedBy.get(lesson.id);

  return {
    id: lesson.id,
    title: lesson.title,
    locked,
    lockedHint: locked
      ? blockedBy
        ? labels.lockedHint(blockedBy)
        : labels.lockedFallback
      : undefined,
    items: lessonItems(lesson).map((item) =>
      toContentItem({
        item,
        done: isItemDone(item),
        attempts,
        submitted,
        maxQuizAttempts,
        labels,
      }),
    ),
  };
}

function toContentItem({
  item,
  done,
  attempts,
  submitted,
  maxQuizAttempts,
  labels,
}: {
  item: ReviewItem;
  done: boolean;
  attempts: Readonly<Record<string, number>>;
  submitted: ReadonlySet<string>;
  maxQuizAttempts: number;
  labels: AdapterLabels;
}): ContentItem {
  return {
    id: item.id,
    title: item.title,
    type: KIND_TO_TYPE[item.kind],
    completed: done,
    detail: itemDetail({
      item,
      done,
      attempts,
      submitted,
      maxQuizAttempts,
      labels,
    }),
  };
}

/**
 * The trailing half of the row's meta line. Durations on this data are already
 * human strings ("10 min", "12:40"), never minute counts — which is exactly
 * what `ContentItem.detail` exists for.
 */
function itemDetail({
  item,
  done,
  attempts,
  submitted,
  maxQuizAttempts,
  labels,
}: {
  item: ReviewItem;
  done: boolean;
  attempts: Readonly<Record<string, number>>;
  submitted: ReadonlySet<string>;
  maxQuizAttempts: number;
  labels: AdapterLabels;
}): string {
  switch (item.kind) {
    case 'document':
      return item.readTime;
    case 'video':
      return item.duration;
    case 'quiz': {
      if (done) return labels.completed;
      const used = attempts[item.id] ?? 0;
      return used > 0
        ? labels.attemptsUsed(used, maxQuizAttempts)
        : `${item.estimatedMinutes} min`;
    }
    case 'assignment':
      return submitted.has(item.id) ? labels.submitted : labels.pending;
  }
}
