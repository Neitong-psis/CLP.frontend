import {
  ClipboardList,
  FileText,
  PenLine,
  PlayCircle,
  type LucideIcon,
} from 'lucide-react';
import type { ContentItemType, CourseSidebarLabels } from './types';

// ── Geometry ──────────────────────────────────────────────────────────────────

export const SIDEBAR_WIDTH_EXPANDED = 320;
export const SIDEBAR_WIDTH_MINI = 72;

/**
 * Fixed height of a single content-item row, in px. A lesson's rendered
 * height is deterministic from its item count (`ITEM_ROW_HEIGHT * items.length`,
 * plus `LESSON_GROUP_HEADER_HEIGHT` once a lesson bundles more than one item),
 * which is what lets `useVirtualRows` window the list without a measurement
 * pass — see that hook for how the per-lesson heights are used.
 */
export const ITEM_ROW_HEIGHT = 52;

/** Extra height for the slim lesson caption shown only when a lesson has >1 item. */
export const LESSON_GROUP_HEADER_HEIGHT = 26;

/** Above this lesson count a module switches to a windowed, self-scrolling list. */
export const VIRTUALIZE_THRESHOLD = 30;

/** Height of that windowed viewport. Sized to show roughly 7 single-item rows. */
export const VIRTUAL_VIEWPORT_HEIGHT = ITEM_ROW_HEIGHT * 7;

/** Rows rendered beyond each edge of the viewport, to cover fast scrolling. */
export const VIRTUAL_OVERSCAN = 4;

// ── Motion ────────────────────────────────────────────────────────────────────

/** Seconds. Mirrors the spec: accordion/hover 150ms, collapse 250ms. */
export const DURATION = {
  hover: 0.15,
  accordion: 0.15,
  collapse: 0.25,
  preview: 0.15,
} as const;

/** A single easing curve everywhere, so nothing feels like a different app. */
export const EASE = [0.32, 0.72, 0, 1] as const;

/** Dwell before the mini-rail preview opens / closes. Prevents flicker on pass-through. */
export const PREVIEW_OPEN_DELAY_MS = 80;
export const PREVIEW_CLOSE_DELAY_MS = 120;

// ── Content kinds ─────────────────────────────────────────────────────────────

export const CONTENT_TYPE_ICON: Readonly<Record<ContentItemType, LucideIcon>> =
  {
    document: FileText,
    video: PlayCircle,
    quiz: ClipboardList,
    assignment: PenLine,
  };

// ── Persistence ───────────────────────────────────────────────────────────────

export const DEFAULT_STORAGE_KEY = 'course-sidebar';
export const STORAGE_SUFFIX_MODULE = ':expanded-module';
export const STORAGE_SUFFIX_MODE = ':mode';

// ── i18n ──────────────────────────────────────────────────────────────────────

export const DEFAULT_LABELS: CourseSidebarLabels = {
  courseContent: 'Course content',
  overallProgress: 'Overall progress',
  moduleLabel: (index) => `Module ${index + 1}`,
  moduleCompleted: (done, total) => `${done} of ${total} completed`,
  modulePercent: (percent) => `${percent}% complete`,
  lockedModule: 'Locked until the previous module is completed',
  lockedLesson: 'Locked until the previous lesson is completed',
  disabledModule: 'Not yet published',
  collapse: 'Collapse sidebar',
  expand: 'Expand sidebar',
  closeDrawer: 'Close course content',
  openDrawer: 'Open course content',
  itemTypes: {
    document: 'Reading',
    video: 'Video',
    quiz: 'Quiz',
    assignment: 'Assignment',
  },
  minutesShort: (minutes) => `${minutes} min`,
};
