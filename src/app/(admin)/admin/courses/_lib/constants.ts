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
  Public: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  Pending: 'border border-amber-200 bg-amber-50 text-amber-600',
  Archive: 'border border-slate-200 bg-slate-50 text-slate-500',
};

export const CATEGORY_STYLE: Record<string, string> = {
  'Web Development': 'border border-blue-200 bg-blue-50 text-blue-600',
  'Data Science': 'border border-teal-200 bg-teal-50 text-teal-600',
  'Cloud Computing': 'border border-slate-200 bg-slate-100 text-slate-600',
  Programming: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  DevOps: 'border border-orange-200 bg-orange-50 text-orange-600',
  Design: 'border border-violet-200 bg-violet-50 text-violet-600',
};
