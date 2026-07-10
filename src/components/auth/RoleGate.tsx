'use client';

import { useState } from 'react';
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

function checkDemoMode(): boolean {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') return true;
  if (typeof document === 'undefined') return false;
  return document.cookie.split('; ').some((c) => c === 'qb_demo=1');
}

export function RoleGate({
  roles,
  children,
  fallback = null,
  loadingFallback = null,
}: RoleGateProps) {
  const { user, loading } = useAuth();
  const [isDemo] = useState(checkDemoMode);

  if (isDemo) return <>{children}</>;
  if (loading) return <>{loadingFallback}</>;
  if (!hasAnyRole(user, roles)) return <>{fallback}</>;
  return <>{children}</>;
}
