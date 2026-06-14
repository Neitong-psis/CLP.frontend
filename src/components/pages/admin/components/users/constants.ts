import type { UserRole, UserStatus } from '@/constants/admin';

export const PAGE_SIZE = 10;

export const ROLES: UserRole[] = ['Learner', 'Educator', 'Admin'];
export const STATUSES: UserStatus[] = [
  'Active',
  'Inactive',
  'Suspended',
  'Achieved',
];

/** Role badge colors — alpha-based so they work on both light and dark backgrounds. */
export const ROLE_COLOR = {
  Admin: 'border-violet-500/20 bg-violet-500/10 text-violet-500',
  Educator: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500',
  Learner: 'border-blue-500/20 bg-blue-500/10 text-blue-500',
} satisfies Record<UserRole, string>;

/** Avatar circle colors — alpha-based for theme compatibility. */
export const ROLE_AVATAR_BG = {
  Admin: 'bg-violet-500/15 text-violet-500',
  Educator: 'bg-emerald-500/15 text-emerald-500',
  Learner: 'bg-blue-500/15 text-blue-500',
} satisfies Record<UserRole, string>;

/** Status badge colors — alpha-based so they work on both light and dark backgrounds. */
export const STATUS_COLOR = {
  Active: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500',
  Achieved: 'border-amber-500/20 bg-amber-500/10 text-amber-500',
  Inactive: 'border-orange-500/20 bg-orange-500/10 text-orange-500',
  Suspended: 'border-rose-500/20 bg-rose-500/10 text-rose-500',
} satisfies Record<UserStatus, string>;

/** Shared cancel-button className used in every modal footer. */
export const CANCEL_BTN_CLS =
  'rounded-xl border border-border px-5 text-muted-foreground hover:bg-muted';

/** Returns two-character uppercase initials from a full name. */
export function userInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
