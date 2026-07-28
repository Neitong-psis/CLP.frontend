'use client';

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { createUser, usersStore } from '@/services/users';
import { isApiError } from '@/lib/api/errors';
import {
  getServerSnapshot,
  getSnapshot,
  setApprovals,
  subscribe,
  type PendingApproval,
} from './userApprovalsStore';

export interface NewApprovalInput {
  name: string;
  email: string;
  role: PendingApproval['role'];
  department: string;
  password: string;
  registeredDate: string;
}

interface UserApprovalsCtxValue {
  approvals: PendingApproval[];
  addApproval: (input: NewApprovalInput) => void;
  /** Provisions a real account via `createUser`, then marks the request
   *  approved (kept in the local queue for the Active Admins tab). */
  approve: (
    id: string,
  ) => Promise<{ ok: true } | { ok: false; message: string }>;
  reject: (id: string) => void;
}

const UserApprovalsContext = createContext<UserApprovalsCtxValue | null>(null);

export function UserApprovalsProvider({ children }: { children: ReactNode }) {
  const approvals = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const addApproval = useCallback((input: NewApprovalInput) => {
    const request: PendingApproval = {
      id: `appr-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: input.name,
      email: input.email,
      role: input.role,
      department: input.department,
      registeredDate: input.registeredDate,
      status: 'Pending',
      password: input.password,
    };
    setApprovals((prev) => [request, ...prev]);
  }, []);

  const approve = useCallback(async (id: string) => {
    const request = getSnapshot().find((a) => a.id === id);
    if (!request) return { ok: false as const, message: 'Request not found.' };

    try {
      const row = await createUser({
        name: request.name,
        email: request.email,
        role: request.role,
        status: 'Active',
        password: request.password,
      });
      usersStore.mutate((prev) => (prev ? [row, ...prev] : prev));
      setApprovals((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'Approved' } : a)),
      );
      return { ok: true as const };
    } catch (error) {
      return {
        ok: false as const,
        message: isApiError(error) ? error.message : 'Failed to create user.',
      };
    }
  }, []);

  const reject = useCallback((id: string) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Rejected' } : a)),
    );
  }, []);

  return (
    <UserApprovalsContext.Provider
      value={{ approvals, addApproval, approve, reject }}
    >
      {children}
    </UserApprovalsContext.Provider>
  );
}

export function useUserApprovals(): UserApprovalsCtxValue {
  const context = useContext(UserApprovalsContext);
  if (!context) {
    throw new Error(
      'useUserApprovals must be used inside UserApprovalsProvider',
    );
  }
  return context;
}
