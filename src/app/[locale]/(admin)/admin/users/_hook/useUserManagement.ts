'use client';

import { useCallback, useEffect, useState } from 'react';
import { ADMIN_USERS, type AdminUserRow } from '@/constants/admin';
import { useToast } from '@/components/ui/toast';
import { isApiError } from '@/lib/api/errors';
import { isMockModeEnabled } from '@/lib/mock/mock-mode';
import {
  createUser,
  deleteUser,
  fetchAllUsers,
  setUserActive,
  updateUser,
  resetUserPassword,
  generateUserPassword,
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
  const [users, setUsers] = useState<AdminUserRow[]>(() =>
    isMockModeEnabled() ? ADMIN_USERS : [],
  );
  const [loading, setLoading] = useState(() => !isMockModeEnabled());
  const { toast } = useToast();

  useEffect(() => {
    if (isMockModeEnabled()) {
      return;
    }

    let active = true;
    void (async () => {
      try {
        const rows = await fetchAllUsers();
        if (active) setUsers(rows);
      } catch (error) {
        if (active)
          toast(errorMessage(error, 'Failed to load users.'), 'error');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [toast]);

  const saveEdit = useCallback(
    async (updated: AdminUserRow, password?: string) => {
      if (isMockModeEnabled()) {
        setUsers((prev) =>
          prev.map((u) => (u.id === updated.id ? updated : u)),
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
        setUsers((prev) => prev.map((u) => (u.id === row.id ? row : u)));
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
        setUsers((prev) => prev.filter((u) => u.id !== id));
        toast(`"${target?.name ?? 'User'}" was removed.`, 'success');
        return;
      }
      try {
        await deleteUser(id);
        setUsers((prev) => prev.filter((u) => u.id !== id));
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
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, status: 'Suspended' } : u)),
        );
        toast(`"${target?.name ?? 'User'}" has been suspended.`, 'warning');
        return;
      }
      try {
        const row = await setUserActive(id, false);
        setUsers((prev) => prev.map((u) => (u.id === row.id ? row : u)));
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
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, status: 'Active' } : u)),
        );
        toast(`"${target?.name ?? 'User'}" is now active.`, 'success');
        return;
      }
      try {
        const row = await setUserActive(id, true);
        setUsers((prev) => prev.map((u) => (u.id === row.id ? row : u)));
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
        setUsers((prev) => [row, ...prev]);
        toast(`"${row.name}" was added successfully.`, 'success');
        return;
      }
      try {
        const row = await createUser(input);
        setUsers((prev) => [row, ...prev]);
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
