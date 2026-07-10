import { z } from 'zod';
import { http } from '@/lib/api/http';
import { normalizeError } from '@/lib/api/errors';
import {
  adminUserSchema,
  usersPageSchema,
  type AdminUser,
} from '@/schemas/admin-user.schema';
import { ROLE, ROLE_PRIORITY, type RoleId } from '@/constants/roles';
import type { AdminUserRow, UserRole, UserStatus } from '@/constants/admin';

const USERS_ENDPOINT = '/users';

const userStatsSchema = z.object({
  total: z.number(),
  trend: z.number(),
  distribution: z.object({
    admins: z.number(),
    educators: z.number(),
    learners: z.number(),
  }),
});

export type UserStats = z.infer<typeof userStatsSchema>;

const userAnalyticsSchema = z.object({
  months: z.array(z.string()),
  growth: z.array(z.number()),
});

export type UserAnalytics = z.infer<typeof userAnalyticsSchema>;

const MAX_PAGE_LIMIT = 50;
const MAX_PAGES = 100;
const STATUS_ACTIVE = 1;
const STATUS_INACTIVE = 2;

const ROLE_ID_TO_LABEL: Record<RoleId, UserRole> = {
  [ROLE.ADMIN]: 'Admin',
  [ROLE.EDUCATOR]: 'Educator',
  [ROLE.LEARNER]: 'Learner',
};

const ROLE_LABEL_TO_ID: Record<UserRole, RoleId> = {
  Admin: ROLE.ADMIN,
  Educator: ROLE.EDUCATOR,
  Learner: ROLE.LEARNER,
};

export interface SaveUserInput {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  password?: string;
}

// ─── Domain → row mapping ────────────────────────────────────────────────────
function resolveRoleLabel(user: AdminUser): UserRole {
  const owned = new Set(user.roles.map((r) => r.id));
  const primary = ROLE_PRIORITY.find((id) => owned.has(id));
  return primary ? ROLE_ID_TO_LABEL[primary] : 'Learner';
}

function resolveStatusLabel(user: AdminUser): UserStatus {
  return Number(user.status?.id) === STATUS_ACTIVE ? 'Active' : 'Suspended';
}

function formatJoined(date: Date | undefined): string {
  if (!date) return '—';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function toAdminUserRow(user: AdminUser): AdminUserRow {
  return {
    id: String(user.id),
    name:
      [user.firstName, user.lastName].filter(Boolean).join(' ') ||
      user.email ||
      'Unnamed user',
    email: user.email ?? '—',
    role: resolveRoleLabel(user),
    status: resolveStatusLabel(user),
    inviteStatus: 'Approved',
    enrolled: 0,
    joined: formatJoined(user.createdAt),
    lastActive: '—',
  };
}

// ─── Row → DTO mapping ───────────────────────────────────────────────────────
function splitName(name: string): { firstName: string; lastName: string } {
  const [firstName, ...rest] = name.trim().split(/\s+/);
  return { firstName, lastName: rest.length ? rest.join(' ') : firstName };
}

function toUserDto(input: SaveUserInput) {
  return {
    ...splitName(input.name),
    email: input.email.trim().toLowerCase(),
    roles: [{ id: ROLE_LABEL_TO_ID[input.role] }],
    status: {
      id: input.status === 'Active' ? STATUS_ACTIVE : STATUS_INACTIVE,
    },
  };
}

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';

/** Generates a cryptographically random alphanumeric password. */
export function generateUserPassword(length = 16): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
}

// ─── API functions ───────────────────────────────────────────────────────────
export async function fetchUserStats(): Promise<UserStats> {
  try {
    const { data } = await http.get<unknown>(`${USERS_ENDPOINT}/stats`);
    return userStatsSchema.parse(data);
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function fetchUserAnalytics(): Promise<UserAnalytics> {
  try {
    const { data } = await http.get<unknown>(`${USERS_ENDPOINT}/analytics`);
    return userAnalyticsSchema.parse(data);
  } catch (error) {
    throw normalizeError(error);
  }
}

/**
 * Fetches every user by walking the infinity-paginated list endpoint
 * until `hasNextPage` is false. Search/pagination stay client-side in the
 * existing `useUserFilter` hook, so the page UI is unchanged.
 */
export async function fetchAllUsers(): Promise<AdminUserRow[]> {
  try {
    const all: AdminUser[] = [];
    for (let page = 1; page <= MAX_PAGES; page += 1) {
      const { data } = await http.get<unknown>(USERS_ENDPOINT, {
        params: { page, limit: MAX_PAGE_LIMIT },
      });
      const parsed = usersPageSchema.parse(data);
      all.push(...parsed.data);
      if (!parsed.hasNextPage) break;
    }
    return all.map(toAdminUserRow);
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function createUser(input: SaveUserInput): Promise<AdminUserRow> {
  try {
    const { data } = await http.post<unknown>(USERS_ENDPOINT, {
      ...toUserDto(input),
      password: input.password ?? generateUserPassword(),
    });
    return toAdminUserRow(adminUserSchema.parse(data));
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function updateUser(
  id: string,
  input: SaveUserInput,
): Promise<AdminUserRow> {
  try {
    const dto = toUserDto(input);
    const body = input.password ? { ...dto, password: input.password } : dto;
    const { data } = await http.patch<unknown>(`${USERS_ENDPOINT}/${id}`, body);
    return toAdminUserRow(adminUserSchema.parse(data));
  } catch (error) {
    throw normalizeError(error);
  }
}

/** Sets a new password for a user without touching any other fields. */
export async function resetUserPassword(
  id: string,
  newPassword: string,
): Promise<void> {
  try {
    await http.patch(`${USERS_ENDPOINT}/${id}`, { password: newPassword });
  } catch (error) {
    throw normalizeError(error);
  }
}

/** Flips only the active/inactive flag (suspend ↔ activate). */
export async function setUserActive(
  id: string,
  active: boolean,
): Promise<AdminUserRow> {
  try {
    const { data } = await http.patch<unknown>(`${USERS_ENDPOINT}/${id}`, {
      status: { id: active ? STATUS_ACTIVE : STATUS_INACTIVE },
    });
    return toAdminUserRow(adminUserSchema.parse(data));
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    await http.delete(`${USERS_ENDPOINT}/${id}`);
  } catch (error) {
    throw normalizeError(error);
  }
}
