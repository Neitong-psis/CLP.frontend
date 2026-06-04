'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  getAdminSessionRaw,
  type AdminSession,
} from '@/feature/admin/auth/admin.auth';

const emptySubscribe = () => () => {};

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  // Raw JSON string — primitives compare by value so useSyncExternalStore
  // won't loop when the session hasn't actually changed.
  const sessionRaw = useSyncExternalStore(
    emptySubscribe,
    getAdminSessionRaw,
    () => null,
  );

  const session: AdminSession | null = sessionRaw
    ? (JSON.parse(sessionRaw) as AdminSession)
    : null;

  useEffect(() => {
    if (!isLoginPage && session === null) {
      router.replace('/admin/login');
    }
  }, [isLoginPage, session, router]);

  if (isLoginPage) return <>{children}</>;
  if (session === null) return null;
  return <>{children}</>;
}
