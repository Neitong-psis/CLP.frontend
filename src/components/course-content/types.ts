import {
  FileText,
  PlayCircle,
  ClipboardList,
  PenLine,
  type LucideIcon,
} from 'lucide-react';
import type {
  ReviewItem,
  ReviewItemKind,
  ReviewModule,
} from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import type { ItemDone } from '@/lib/course-progress';

/** Icon per content kind — single source of truth for all three surfaces.
 *  Matches the learner course-sidebar's icon choices for visual consistency. */
export const KIND_ICON: Record<ReviewItemKind, LucideIcon> = {
  document: FileText,
  video: PlayCircle,
  quiz: ClipboardList,
  assignment: PenLine,
};

/** The admin's per-item review decision — the *only* thing an item's status
 *  token shows. `null` means "not decided yet" (admin/educator opening an
 *  item to look at it is not a verdict, so viewing never affects this). */
export type ItemBadge = 'approved' | 'rejected' | null;

/** Pre-resolved i18n strings so the shared component stays translation-agnostic. */
export interface SidebarLabels {
  courseContent: string;
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
