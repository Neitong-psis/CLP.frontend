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
  Active: 'border-blue-400/30 bg-blue-500/10 text-blue-500',
  Inactive: 'border-border bg-muted text-muted-foreground',
  Completed: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-500',
};

export const ACTIVITY_STYLE: Record<StudentActivity, string> = {
  'Highly active': 'border-emerald-400/30 bg-emerald-500/10 text-emerald-500',
  Active: 'border-blue-400/30 bg-blue-500/10 text-blue-500',
  'At risk': 'border-rose-400/30 bg-rose-500/10 text-rose-500',
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
