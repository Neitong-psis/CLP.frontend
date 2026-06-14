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

export const CATEGORY_STYLE: Record<string, string> = {
  'Web Development': 'border border-blue-500/20 bg-blue-500/10 text-blue-500',
  'Data Science': 'border border-teal-500/20 bg-teal-500/10 text-teal-500',
  'Cloud Computing': 'border border-border bg-muted text-muted-foreground',
  Programming:
    'border border-emerald-500/20 bg-emerald-500/10 text-emerald-500',
  DevOps: 'border border-orange-500/20 bg-orange-500/10 text-orange-500',
  Design: 'border border-violet-500/20 bg-violet-500/10 text-violet-500',
};
