'use client';

import { useState } from 'react';
import { ADMIN_USERS, type AdminUserRow } from '@/constants/admin';
import { useToast } from '@/components/ui/toast';

export interface UserManagement {
  users: AdminUserRow[];
  saveEdit: (updated: AdminUserRow) => void;
  remove: (id: string) => void;
  suspend: (id: string) => void;
  activate: (id: string) => void;
  add: (user: AdminUserRow) => void;
}

/**
 * Manages the local users list and all CRUD mutations.
 * Each mutation fires a toast and updates state in one render cycle (React 18 batching).
 */
export function useUserManagement(): UserManagement {
  const [users, setUsers] = useState<AdminUserRow[]>(ADMIN_USERS);
  const { toast } = useToast();

  function saveEdit(updated: AdminUserRow) {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    toast(`"${updated.name}" has been updated.`, 'success');
  }

  function remove(id: string) {
    // Capture name before update — users is current at call-time (interactive event).
    const target = users.find((u) => u.id === id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast(`"${target?.name}" was removed.`, 'error');
  }

  function suspend(id: string) {
    const target = users.find((u) => u.id === id);
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: 'Suspended' as const } : u,
      ),
    );
    toast(`"${target?.name}" has been suspended.`, 'warning');
  }

  function activate(id: string) {
    const target = users.find((u) => u.id === id);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: 'Active' as const } : u)),
    );
    toast(`"${target?.name}" is now active.`, 'success');
  }

  function add(user: AdminUserRow) {
    setUsers((prev) => [user, ...prev]);
    toast(`"${user.name}" was added successfully.`, 'success');
  }

  return { users, saveEdit, remove, suspend, activate, add };
}
