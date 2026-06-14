/**
 * RBAC role identifiers — the single source of truth on the frontend.
 *
 * These UUIDs mirror the backend `RoleEnum` (src/roles/roles.enum.ts). A user
 * owns a role iff `user.roles` contains an object whose `id` equals one of these.
 * Never duplicate these literals anywhere else — import `ROLE` instead.
 */
export const ROLE = {
  ADMIN: 'e3e6012e-9d29-4e78-831d-d2427a1dfa01',
  EDUCATOR: 'e3e6012e-9d29-4e78-831d-d2427a1dfa02',
  LEARNER: 'e3e6012e-9d29-4e78-831d-d2427a1dfa03',
} as const;

export type RoleId = (typeof ROLE)[keyof typeof ROLE];

/**
 * Order used to resolve a user's primary role when they hold several.
 * Most-privileged first.
 */
export const ROLE_PRIORITY: readonly RoleId[] = [
  ROLE.ADMIN,
  ROLE.EDUCATOR,
  ROLE.LEARNER,
];

/** Landing route for each role after login / when resolving a home. */
export const ROLE_HOME: Record<RoleId, string> = {
  [ROLE.ADMIN]: '/admin',
  [ROLE.EDUCATOR]: '/educator',
  [ROLE.LEARNER]: '/dashboard',
};

/** Human-readable label per role, for UI display. */
export const ROLE_LABEL: Record<RoleId, string> = {
  [ROLE.ADMIN]: 'Administrator',
  [ROLE.EDUCATOR]: 'Educator',
  [ROLE.LEARNER]: 'Learner',
};

/** Fallback route for an authenticated user with no recognised role. */
export const DEFAULT_HOME = '/';

/** Type guard: is an arbitrary string one of the known role ids? */
export function isRoleId(value: string): value is RoleId {
  return (Object.values(ROLE) as string[]).includes(value);
}
