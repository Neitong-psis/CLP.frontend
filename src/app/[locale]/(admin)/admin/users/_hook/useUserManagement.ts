'use client';

import { useCallback, useMemo } from 'react';
import type { AdminUserRow } from '@/constants/admin';
import { useToast } from '@/components/ui/toast';
import { isApiError } from '@/lib/api/errors';
import { useResourceStore } from '@/lib/cache/createResourceStore';
import { isMockModeEnabled } from '@/lib/mock/mock-mode';
import {
  createUser,
  deleteUser,
  setUserActive,
  updateUser,
  resetUserPassword,
  generateUserPassword,
  usersStore,
  type SaveUserInput,
} from '@/services/users';

export interface UserManagement {
  users: AdminUserRow[];
  /** True while the initial list fetch is in flight. */
  loading: boolean;
  saveEdit: (updated: AdminUserRow, password?: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  suspend: (id: string) => Promise<void>;
  activate: (id: string) => Promise<void>;
  add: (input: SaveUserInput) => Promise<void>;
  /** Generates a new random password, PATCHes the backend, returns the new password. */
  resetPassword: (id: string) => Promise<string>;
}

function errorMessage(error: unknown, fallback: string): string {
  return isApiError(error) ? error.message : fallback;
}

export function useUserManagement(): UserManagement {
  const { data, loading } = useResourceStore(usersStore);
  const users = useMemo(() => data ?? [], [data]);
  const { toast } = useToast();

  const saveEdit = useCallback(
    async (updated: AdminUserRow, password?: string) => {
      if (isMockModeEnabled()) {
        usersStore.mutate((prev) =>
          prev ? prev.map((u) => (u.id === updated.id ? updated : u)) : prev,
        );
        toast(`"${updated.name}" has been updated.`, 'success');
        return;
      }
      try {
        const row = await updateUser(updated.id, {
          name: updated.name,
          email: updated.email,
          role: updated.role,
          status: updated.status,
          ...(password ? { password } : {}),
        });
        usersStore.mutate((prev) =>
          prev ? prev.map((u) => (u.id === row.id ? row : u)) : prev,
        );
        toast(`"${row.name}" has been updated.`, 'success');
      } catch (error) {
        toast(errorMessage(error, 'Failed to update user.'), 'error');
      }
    },
    [toast],
  );

  const remove = useCallback(
    async (id: string) => {
      const target = users.find((u) => u.id === id);
      if (isMockModeEnabled()) {
        usersStore.mutate((prev) =>
          prev ? prev.filter((u) => u.id !== id) : prev,
        );
        toast(`"${target?.name ?? 'User'}" was removed.`, 'success');
        return;
      }
      try {
        await deleteUser(id);
        usersStore.mutate((prev) =>
          prev ? prev.filter((u) => u.id !== id) : prev,
        );
        toast(`"${target?.name ?? 'User'}" was removed.`, 'success');
      } catch (error) {
        toast(errorMessage(error, 'Failed to remove user.'), 'error');
      }
    },
    [toast, users],
  );

  const suspend = useCallback(
    async (id: string) => {
      if (isMockModeEnabled()) {
        const target = users.find((u) => u.id === id);
        usersStore.mutate((prev) =>
          prev
            ? prev.map((u) => (u.id === id ? { ...u, status: 'Suspended' } : u))
            : prev,
        );
        toast(`"${target?.name ?? 'User'}" has been suspended.`, 'warning');
        return;
      }
      try {
        const row = await setUserActive(id, false);
        usersStore.mutate((prev) =>
          prev ? prev.map((u) => (u.id === row.id ? row : u)) : prev,
        );
        toast(`"${row.name}" has been suspended.`, 'warning');
      } catch (error) {
        toast(errorMessage(error, 'Failed to suspend user.'), 'error');
      }
    },
    [toast, users],
  );

  const activate = useCallback(
    async (id: string) => {
      if (isMockModeEnabled()) {
        const target = users.find((u) => u.id === id);
        usersStore.mutate((prev) =>
          prev
            ? prev.map((u) => (u.id === id ? { ...u, status: 'Active' } : u))
            : prev,
        );
        toast(`"${target?.name ?? 'User'}" is now active.`, 'success');
        return;
      }
      try {
        const row = await setUserActive(id, true);
        usersStore.mutate((prev) =>
          prev ? prev.map((u) => (u.id === row.id ? row : u)) : prev,
        );
        toast(`"${row.name}" is now active.`, 'success');
      } catch (error) {
        toast(errorMessage(error, 'Failed to activate user.'), 'error');
      }
    },
    [toast, users],
  );

  const add = useCallback(
    async (input: SaveUserInput) => {
      if (isMockModeEnabled()) {
        const row: AdminUserRow = {
          id: `mock-${Date.now()}`,
          name: input.name,
          email: input.email,
          role: input.role,
          status: input.status,
          inviteStatus: 'Pending',
          enrolled: 0,
          joined: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          lastActive: '—',
        };
        usersStore.mutate((prev) => (prev ? [row, ...prev] : prev));
        toast(`"${row.name}" was added successfully.`, 'success');
        return;
      }
      try {
        const row = await createUser(input);
        usersStore.mutate((prev) => (prev ? [row, ...prev] : prev));
        toast(`"${row.name}" was added successfully.`, 'success');
      } catch (error) {
        toast(errorMessage(error, 'Failed to add user.'), 'error');
      }
    },
    [toast],
  );

  const resetPassword = useCallback(
    async (id: string): Promise<string> => {
      const newPwd = generateUserPassword();
      const target = users.find((u) => u.id === id);
      if (isMockModeEnabled()) {
        toast(`Password reset for "${target?.name ?? 'user'}".`, 'success');
        return newPwd;
      }
      try {
        await resetUserPassword(id, newPwd);
        toast(`Password reset for "${target?.name ?? 'user'}".`, 'success');
        return newPwd;
      } catch (error) {
        toast(errorMessage(error, 'Failed to reset password.'), 'error');
        throw error;
      }
    },
    [toast, users],
  );

  return {
    users,
    loading,
    saveEdit,
    remove,
    suspend,
    activate,
    add,
    resetPassword,
  };
}
