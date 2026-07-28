import type { ReactNode } from 'react';

/**
 * Course
 *  └─ Module          (accordion, single-open)
 *      └─ Lesson       (a unit of instruction — locking happens here)
 *          └─ ContentItem  (document / video / quiz / assignment — the clickable row)
 *
 * A lesson usually holds one item, but can bundle several (a reading plus its
 * quiz). `Lesson` is a real, named level of the tree — not folded into a hint
 * string — because a module's lessons are what the domain locks sequentially.
 */

/** Content kinds a row can represent. Each maps to its own icon. */
export type ContentItemType = 'document' | 'video' | 'quiz' | 'assignment';

/**
 * Item lifecycle. *Derived* (see `selectors.ts`) rather than stored, so an
 * item can never be simultaneously `completed` and `current` in the UI.
 * Precedence: locked > completed > current > in-progress > not-started.
 */
export type ItemState =
  | 'locked'
  | 'completed'
  | 'current'
  | 'in-progress'
  | 'not-started';

/**
 * Module lifecycle, also derived. `disabled` is an authoring state (module is
 * unpublished) and outranks everything; `locked` means prerequisites are unmet.
 */
export type ModuleState =
  | 'disabled'
  | 'locked'
  | 'completed'
  | 'active'
  | 'available';

/**
 * How an item reports partial completion.
 * `ratio` renders as "2/5" (quiz questions, assignment checkpoints).
 * `percent` renders as "60%" (video watch time, reading scroll depth).
 */
export type ItemProgress =
  | {
      readonly kind: 'ratio';
      readonly completed: number;
      readonly total: number;
    }
  | { readonly kind: 'percent'; readonly value: number };

export interface ContentItem {
  readonly id: string;
  readonly title: string;
  readonly type: ContentItemType;
  /** Omit when a duration is meaningless (an assignment) or already in `detail`. */
  readonly durationMinutes?: number;
  /**
   * Replaces the duration in the meta line: "Quiz · Completed",
   * "Assignment · Pending". Use for state that reads better than a clock.
   */
  readonly detail?: string;
  readonly completed?: boolean;
  readonly progress?: ItemProgress;
}

export interface Lesson {
  readonly id: string;
  readonly title: string;
  readonly items: readonly ContentItem[];
  /**
   * Locking is data-driven and lesson-granular, not inferred from sibling
   * completion. The caller owns the unlock policy (sequential, date-gated,
   * paid-tier, …); every item in a locked lesson is locked with it.
   */
  readonly locked?: boolean;
  /** Why it is locked, e.g. "Complete Responsive Design to unlock". */
  readonly lockedHint?: string;
}

export interface CourseModule {
  readonly id: string;
  readonly title: string;
  readonly lessons: readonly Lesson[];
  readonly locked?: boolean;
  readonly disabled?: boolean;
}

export interface Course {
  readonly id: string;
  readonly title: string;
  readonly modules: readonly CourseModule[];
}

/** Memoised completion roll-up, computed once per module per render pass. */
export interface ProgressSummary {
  readonly completed: number;
  readonly total: number;
  /** 0–100, rounded. `0` when `total` is 0 (never NaN). */
  readonly percent: number;
}

/** A resolved position in the course tree. */
export interface ItemLocation {
  readonly module: CourseModule;
  readonly lesson: Lesson;
  readonly item: ContentItem;
  readonly moduleIndex: number;
}

/** Sidebar width modes. `mini` is the 72px icon rail. */
export type SidebarMode = 'expanded' | 'mini';

/**
 * Pre-resolved i18n strings. Keeps the component translation-agnostic — the
 * same pattern the existing course-content tree uses. All optional at the call
 * site; `DEFAULT_LABELS` fills the gaps.
 */
export interface CourseSidebarLabels {
  readonly courseContent: string;
  readonly overallProgress: string;
  readonly moduleLabel: (index: number) => string;
  readonly moduleCompleted: (done: number, total: number) => string;
  readonly modulePercent: (percent: number) => string;
  readonly lockedModule: string;
  readonly lockedLesson: string;
  readonly disabledModule: string;
  readonly collapse: string;
  readonly expand: string;
  readonly closeDrawer: string;
  readonly openDrawer: string;
  readonly itemTypes: Readonly<Record<ContentItemType, string>>;
  readonly minutesShort: (minutes: number) => string;
}

export interface CourseSidebarProps {
  readonly course: Course;
  /** The item currently open in the player. `null` before anything is opened. */
  readonly currentItemId: string | null;
  readonly onSelectItem: (
    item: ContentItem,
    lesson: Lesson,
    module: CourseModule,
  ) => void;
  /** Fired when a learner clicks a locked row — surface a toast, don't navigate. */
  readonly onLockedItem?: (
    item: ContentItem,
    lesson: Lesson,
    module: CourseModule,
  ) => void;
  readonly defaultMode?: SidebarMode;
  /**
   * Rendered beside the collapse toggle, above the course title — a logo, a
   * back link. Shown in the expanded column and the drawer; the 72px rail has
   * no room for it.
   */
  readonly brand?: ReactNode;
  /**
   * Rendered beside the course title itself — an export/download action,
   * something scoped to *this course* rather than to the sidebar chrome.
   * Shown in the expanded column and the drawer only.
   */
  readonly titleAction?: ReactNode;
  readonly labels?: Partial<CourseSidebarLabels>;
  /**
   * Namespace for the remembered expanded-module + width-mode. Pass a
   * course-scoped key so two courses don't fight over one slot.
   */
  readonly storageKey?: string;
  readonly className?: string;
}
