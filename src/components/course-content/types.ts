import {
  FileText,
  Play,
  ClipboardList,
  ClipboardCheck,
  type LucideIcon,
} from 'lucide-react';
import type {
  ReviewItem,
  ReviewItemKind,
  ReviewModule,
} from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import type { ItemDone } from '@/lib/course-progress';

/** Icon per content kind — single source of truth for all three surfaces. */
export const KIND_ICON: Record<ReviewItemKind, LucideIcon> = {
  document: FileText,
  video: Play,
  quiz: ClipboardList,
  assignment: ClipboardCheck,
};

/** Optional per-item overlay glyph (learner only): a failed quiz or a submitted
 *  assignment gets a small corner badge on top of its normal state. */
export type ItemBadge = 'failed' | 'submitted' | null;

/** Pre-resolved i18n strings so the shared component stays translation-agnostic. */
export interface SidebarLabels {
  courseContent: string;
  moduleCount: string;
  lessonCount: string;
  /** Progress caption under the bar, e.g. "2 / 24 completed" — completion count
   *  is computed by the sidebar (via `isItemDone`) so it can't drift from the tree. */
  formatProgress: (done: number, total: number) => string;
  backAria: string;
  collapseAria: string;
  expandAria: string;
  /** Tooltip on a locked row, given the title of the lesson that blocks it. */
  lockedHint: (blockingLessonTitle: string) => string;
  lockedShort: string;
}

/** Everything the tree/rail need to render + gate every level. Computed once at
 *  the sidebar/sheet root and threaded down so rows don't recompute locks. */
export interface CourseTreeProps {
  modules: ReviewModule[];
  activeId: string;
  expanded: Set<string>;
  onToggleModule: (id: string) => void;
  isItemDone: ItemDone;
  onSelect: (id: string) => void;
  onLockedSelect?: (blockingLessonTitle: string) => void;
  getItemBadge?: (item: ReviewItem) => ItemBadge;
  lockingEnabled: boolean;
  labels: SidebarLabels;
}
