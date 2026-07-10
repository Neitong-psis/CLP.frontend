import { UserRole, UserStatus } from './admin';

export const ROLE_STYLE: Record<UserRole, string> = {
  Admin: 'border border-violet-200 bg-violet-50 text-violet-600',
  Educator: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  Learner: 'border border-blue-200 bg-blue-50 text-blue-600',
};

export const ROLE_AVATAR_BG: Record<UserRole, string> = {
  Admin: 'bg-violet-100 text-violet-700',
  Educator: 'bg-emerald-100 text-emerald-700',
  Learner: 'bg-blue-100 text-blue-700',
};

export const STATUS_STYLE: Record<UserStatus, string> = {
  Active: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  Achieved: 'border border-amber-200 bg-amber-50 text-amber-600',
  Inactive: 'border border-orange-200 bg-orange-50 text-orange-600',
  Suspended: 'border border-rose-200 bg-rose-50 text-rose-600',
};

export const EDIT_ROLE_STYLE: Record<UserRole, string> = {
  Learner: 'border-blue-200 bg-blue-50 text-blue-600',
  Educator: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  Admin: 'border-violet-200 bg-violet-50 text-violet-600',
};

export const EDIT_STATUS_STYLE: Record<UserStatus, string> = {
  Active: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  Inactive: 'border-orange-200 bg-orange-50 text-orange-600',
  Suspended: 'border-rose-200 bg-rose-50 text-rose-600',
  Achieved: 'border-amber-200 bg-amber-50 text-amber-600',
};
