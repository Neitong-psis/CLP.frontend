'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { hasAnyRole } from '@/lib/rbac/has-role';
import { isDemoCookieActive } from '@/lib/demo/demo-mode';
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
  const [isDemo] = useState(isDemoCookieActive);

  if (isDemo) return <>{children}</>;
  if (loading) return <>{loadingFallback}</>;
  if (!hasAnyRole(user, roles)) return <>{fallback}</>;
  return <>{children}</>;
}
