import { ROLE, type RoleId } from '@/constants/roles';

export interface ProtectedRoute {
  prefix: string;
  role: RoleId;
}

export const PROTECTED_ROUTES: readonly ProtectedRoute[] = [
  { prefix: '/admin', role: ROLE.ADMIN },
  { prefix: '/educator', role: ROLE.EDUCATOR },
  { prefix: '/dashboard', role: ROLE.LEARNER },
  { prefix: '/my-learning', role: ROLE.LEARNER },
  { prefix: '/progress', role: ROLE.LEARNER },
  { prefix: '/certificates', role: ROLE.LEARNER },
  { prefix: '/quizzes', role: ROLE.LEARNER },
  { prefix: '/learn', role: ROLE.LEARNER },
  { prefix: '/checkout', role: ROLE.LEARNER },
];

export function matchProtectedRoute(
  pathname: string,
): ProtectedRoute | undefined {
  return PROTECTED_ROUTES.find(
    (route) =>
      pathname === route.prefix || pathname.startsWith(`${route.prefix}/`),
  );
}
