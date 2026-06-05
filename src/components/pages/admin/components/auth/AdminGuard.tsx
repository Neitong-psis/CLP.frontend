'use client';

import { useEffect, useState, startTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  getAdminSession,
  type AdminSession,
} from '@/components/pages/admin/auth/admin.auth';

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isLoginPage = usePathname() === '/admin/login';
  const [session, setSession] = useState<AdminSession | null>(null);
  const [ready, setReady] = useState(false);

  // Re-read localStorage whenever the route crosses the login boundary
  // (initial mount and login → admin transition).
  useEffect(() => {
    startTransition(() => {
      setSession(getAdminSession());
      setReady(true);
    });
  }, [isLoginPage]);

  useEffect(() => {
    if (ready && !isLoginPage && !session) {
      router.replace('/admin/login');
    }
  }, [ready, isLoginPage, session, router]);

  if (!ready || (!isLoginPage && !session)) return null;
  return <>{children}</>;
}
