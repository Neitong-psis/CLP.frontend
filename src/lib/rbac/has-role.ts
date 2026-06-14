import {
  DEFAULT_HOME,
  isRoleId,
  ROLE_HOME,
  ROLE_PRIORITY,
  type RoleId,
} from '@/constants/roles';

export interface RoleBearer {
  roles: ReadonlyArray<{ id: string }>;
}

export function hasRole(
  user: RoleBearer | null | undefined,
  role: RoleId,
): boolean {
  return Boolean(user?.roles.some((r) => r.id === role));
}

export function hasAnyRole(
  user: RoleBearer | null | undefined,
  roles: readonly RoleId[],
): boolean {
  return roles.some((role) => hasRole(user, role));
}

export function getUserRoleIds(user: RoleBearer | null | undefined): RoleId[] {
  if (!user) {
    return [];
  }
  return user.roles.map((r) => r.id).filter((id): id is RoleId => isRoleId(id));
}

export function resolvePrimaryRole(
  user: RoleBearer | null | undefined,
): RoleId | null {
  return ROLE_PRIORITY.find((role) => hasRole(user, role)) ?? null;
}

export function resolveHome(user: RoleBearer | null | undefined): string {
  const role = resolvePrimaryRole(user);
  return role ? ROLE_HOME[role] : DEFAULT_HOME;
}
