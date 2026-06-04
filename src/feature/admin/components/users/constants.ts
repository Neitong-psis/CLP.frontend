import type { UserRole, UserStatus } from '@/constants/admin';

export const PAGE_SIZE = 5;

export const ROLES: UserRole[] = ['Learner', 'Educator', 'Admin'];
export const STATUSES: UserStatus[] = [
  'Active',
  'Inactive',
  'Suspended',
  'Achieved',
];

/** Role badge + edit-toggle color tokens (border sets width; these set color). */
export const ROLE_COLOR = {
  Admin: 'border-violet-200 bg-violet-50 text-violet-600',
  Educator: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  Learner: 'border-blue-200 bg-blue-50 text-blue-600',
} satisfies Record<UserRole, string>;

/** Avatar circle colors — one shade darker than the badge. */
export const ROLE_AVATAR_BG = {
  Admin: 'bg-violet-100 text-violet-700',
  Educator: 'bg-emerald-100 text-emerald-700',
  Learner: 'bg-blue-100 text-blue-700',
} satisfies Record<UserRole, string>;

/** Status badge + edit-toggle color tokens. */
export const STATUS_COLOR = {
  Active: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  Achieved: 'border-amber-200 bg-amber-50 text-amber-600',
  Inactive: 'border-orange-200 bg-orange-50 text-orange-600',
  Suspended: 'border-rose-200 bg-rose-50 text-rose-600',
} satisfies Record<UserStatus, string>;

/** Shared cancel-button className used in every modal footer. */
export const CANCEL_BTN_CLS =
  'rounded-xl border border-slate-200 px-5 text-slate-600 hover:bg-slate-50';

/** Returns two-character uppercase initials from a full name. */
export function userInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
