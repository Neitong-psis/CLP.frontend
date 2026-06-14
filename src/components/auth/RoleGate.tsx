'use client';

/**
 * Conditional rendering by role. Renders `children` only when the current user
 * holds at least one of `roles`; otherwise renders `fallback`.
 *
 * This is a client-side UX gate (the real authorization boundary is the
 * backend + middleware). Use it inside pages to hide/show role-specific UI.
 */
import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { hasAnyRole } from '@/lib/rbac/has-role';
import type { RoleId } from '@/constants/roles';

export interface RoleGateProps {
  roles: readonly RoleId[];
  children: ReactNode;
  /** Shown when the user lacks the role. Defaults to nothing. */
  fallback?: ReactNode;
  /** Shown while the session is still loading. Defaults to nothing. */
  loadingFallback?: ReactNode;
}

export function RoleGate({
  roles,
  children,
  fallback = null,
  loadingFallback = null,
}: RoleGateProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <>{loadingFallback}</>;
  }
  if (!hasAnyRole(user, roles)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}
