import { createResourceStore } from '@/lib/cache/createResourceStore';
import { ADMIN_USERS, type AdminUserRow } from '@/constants/admin';
import { fetchAllUsers } from './users.api';
import { isMockModeEnabled } from '@/lib/mock/mock-mode';

/** Shared cache for the admin user list — see `courses.store.ts` for why. */
export const usersStore = createResourceStore<AdminUserRow[]>(() =>
  isMockModeEnabled() ? Promise.resolve(ADMIN_USERS) : fetchAllUsers(),
);
