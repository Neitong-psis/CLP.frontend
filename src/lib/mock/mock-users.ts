/**
 * The 3 default accounts usable when {@link isMockModeEnabled} is on — one
 * per role, so each portal login can be exercised without a live backend.
 */
import { ROLE } from '@/constants/roles';
import type { User } from '@/schemas/user.schema';

export interface MockAccount {
  email: string;
  password: string;
  user: User;
}

export const MOCK_ACCOUNTS: readonly MockAccount[] = [
  {
    email: 'admin@example.com',
    password: 'secret',
    user: {
      id: 'mock-admin-01',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      roles: [{ id: ROLE.ADMIN, name: 'Admin', description: null }],
      status: { id: 1, name: 'Active' },
    },
  },
  {
    email: 'educator@psis.edu.kh',
    password: 'secret',
    user: {
      id: 'mock-educator-01',
      email: 'educator@psis.edu.kh',
      firstName: 'Educator',
      lastName: 'PSIS',
      roles: [{ id: ROLE.EDUCATOR, name: 'Educator', description: null }],
      status: { id: 1, name: 'Active' },
    },
  },
  {
    email: 'learner@psis.edu.kh',
    password: 'secret',
    user: {
      id: 'mock-learner-01',
      email: 'learner@psis.edu.kh',
      firstName: 'Learner',
      lastName: 'PSIS',
      roles: [{ id: ROLE.LEARNER, name: 'Learner', description: null }],
      status: { id: 1, name: 'Active' },
    },
  },
] as const;

export function findMockAccount(
  email: string,
  password: string,
): MockAccount | null {
  const normalized = email.trim().toLowerCase();
  const account = MOCK_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === normalized,
  );
  return account && account.password === password ? account : null;
}

export function findMockUserById(userId: string): User | null {
  return MOCK_ACCOUNTS.find((a) => a.user.id === userId)?.user ?? null;
}
