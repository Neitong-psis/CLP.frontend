import type { StudentActivity, StudentStatus } from '@/constants/educator';

export type StatusFilter = StudentStatus | 'All';

export const STATUS_OPTIONS: StatusFilter[] = [
  'All',
  'Active',
  'Inactive',
  'Completed',
];

export const STATUS_LABEL: Record<StudentStatus, string> = {
  Active: 'Active',
  Inactive: 'Inactive',
  Completed: 'Achieved',
};

export const STATUS_STYLE: Record<StudentStatus, string> = {
  Active: 'border-blue-200 bg-blue-50 text-blue-600',
  Inactive: 'border-slate-200 bg-slate-100 text-slate-500',
  Completed: 'border-emerald-200 bg-emerald-50 text-emerald-600',
};

export const ACTIVITY_STYLE: Record<StudentActivity, string> = {
  'Highly active': 'border-emerald-200 bg-emerald-50 text-emerald-600',
  Active: 'border-blue-200 bg-blue-50 text-blue-600',
  'At risk': 'border-rose-200 bg-rose-50 text-rose-600',
};

export function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_COLORS = [
  'bg-brand-navy',
  'bg-brand-gold',
  'bg-blue-500',
  'bg-emerald-500',
  'bg-violet-500',
  'bg-rose-500',
];

/** Deterministic per-name avatar color so the same learner always matches. */
export function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/** Bar color that reflects how far along the learner is. */
export function progressColor(progress: number): string {
  if (progress >= 80) return 'bg-emerald-500';
  if (progress >= 40) return 'bg-brand-gold';
  return 'bg-rose-400';
}
