import type { UserRole } from '@/constants/admin';

const STORAGE_KEY = 'qb_admin_user_approvals_v1';

export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected';

export interface PendingApproval {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  registeredDate: string;
  status: ApprovalStatus;
  password?: string;
}

const SEED_APPROVALS: PendingApproval[] = [
  {
    id: 'appr-1',
    name: 'John Doe',
    email: 'john.doe@clp.com',
    role: 'Admin',
    department: 'Academic Affairs',
    registeredDate: 'Mar 8, 2025',
    status: 'Pending',
  },
  {
    id: 'appr-2',
    name: 'Sreymom Chan',
    email: 'sreymom.chan@clp.com',
    role: 'Learner',
    department: 'Training Center',
    registeredDate: 'Mar 9, 2025',
    status: 'Pending',
  },
  {
    id: 'appr-3',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@clp.com',
    role: 'Educator',
    department: 'Administration',
    registeredDate: 'Mar 10, 2025',
    status: 'Pending',
  },
];

/**
 * Plain (non-React) external store for the admin signup-approval queue.
 * Same subscribe/getSnapshot/getServerSnapshot/setter shape as
 * `courseTasksStore.ts` — the backend has no Department field and no
 * pending/rejected invite concept at all today, so this queue is local-only
 * until a real endpoint exists. Approving a request still provisions a real
 * account via the existing `createUser` API (see `UserApprovalsContext.tsx`).
 */

let cachedApprovals: PendingApproval[] | null = null;
const listeners = new Set<() => void>();

function readFromStorage(): PendingApproval[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as PendingApproval[];
  } catch {}
  return [...SEED_APPROVALS];
}

function writeToStorage(approvals: PendingApproval[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(approvals));
  } catch {}
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): PendingApproval[] {
  if (cachedApprovals === null) cachedApprovals = readFromStorage();
  return cachedApprovals;
}

export function getServerSnapshot(): PendingApproval[] {
  return SEED_APPROVALS;
}

export function setApprovals(
  updater: (prev: PendingApproval[]) => PendingApproval[],
): void {
  cachedApprovals = updater(getSnapshot());
  writeToStorage(cachedApprovals);
  listeners.forEach((listener) => listener());
}
