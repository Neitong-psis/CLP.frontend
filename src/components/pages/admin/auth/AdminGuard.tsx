'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getAdminSession } from '@/feature/admin/auth/admin.auth';

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';
  const hasSession = getAdminSession() !== null;

  useEffect(() => {
    if (!isLoginPage && !hasSession) {
      router.replace('/admin/login');
    }
  }, [isLoginPage, hasSession, router]);

  if (!isLoginPage && !hasSession) return null;
  return <>{children}</>;
}
