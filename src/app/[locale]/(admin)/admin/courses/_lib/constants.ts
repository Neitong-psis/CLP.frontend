import type { CourseStatus } from '@/constants/admin';

export const PAGE_SIZE = 8;

export const STATUS_FILTERS: Array<CourseStatus | 'All'> = [
  'All',
  'Public',
  'Pending',
  'Archive',
];

export const ALL_CATEGORIES = [
  'Web Development',
  'Data Science',
  'Cloud Computing',
  'Programming',
  'DevOps',
  'Design',
];

export const ALL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export const STATUS_STYLE: Record<CourseStatus, string> = {
  Public: 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-500',
  Pending: 'border border-amber-500/20 bg-amber-500/10 text-amber-500',
  Archive: 'border border-border bg-muted text-muted-foreground',
};

/** Single neutral treatment for every category — category is a label, not a
 *  status, so it shouldn't compete with the status column's semantic colors. */
export const CATEGORY_BADGE_STYLE =
  'border border-border bg-muted text-muted-foreground';
