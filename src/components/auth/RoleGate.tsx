'use client';

import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { hasAnyRole } from '@/lib/rbac/has-role';
import type { RoleId } from '@/constants/roles';

export interface RoleGateProps {
  roles: readonly RoleId[];
  children: ReactNode;
  fallback?: ReactNode;
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
