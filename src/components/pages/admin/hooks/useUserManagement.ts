'use client';

import { useCallback, useEffect, useState } from 'react';
import type { AdminUserRow } from '@/constants/admin';
import { useToast } from '@/components/ui/toast';
import { isApiError } from '@/lib/api/errors';
import {
  createUser,
  deleteUser,
  fetchAllUsers,
  setUserActive,
  updateUser,
  resetUserPassword,
  generateUserPassword,
  type SaveUserInput,
} from '@/features/users';

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

/**
 * Manages the admin users list against the backend `/api/v1/users` endpoints.
 * Loads the full list on mount; each mutation awaits the API call and only
 * then updates local state (pessimistic), firing a toast either way.
 */
export function useUserManagement(): UserManagement {
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
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
      try {
        await deleteUser(id);
        setUsers((prev) => prev.filter((u) => u.id !== id));
        toast(`"${target?.name ?? 'User'}" was removed.`, 'error');
      } catch (error) {
        toast(errorMessage(error, 'Failed to remove user.'), 'error');
      }
    },
    [toast, users],
  );

  const suspend = useCallback(
    async (id: string) => {
      try {
        const row = await setUserActive(id, false);
        setUsers((prev) => prev.map((u) => (u.id === row.id ? row : u)));
        toast(`"${row.name}" has been suspended.`, 'warning');
      } catch (error) {
        toast(errorMessage(error, 'Failed to suspend user.'), 'error');
      }
    },
    [toast],
  );

  const activate = useCallback(
    async (id: string) => {
      try {
        const row = await setUserActive(id, true);
        setUsers((prev) => prev.map((u) => (u.id === row.id ? row : u)));
        toast(`"${row.name}" is now active.`, 'success');
      } catch (error) {
        toast(errorMessage(error, 'Failed to activate user.'), 'error');
      }
    },
    [toast],
  );

  const add = useCallback(
    async (input: SaveUserInput) => {
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
      try {
        await resetUserPassword(id, newPwd);
        const target = users.find((u) => u.id === id);
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
