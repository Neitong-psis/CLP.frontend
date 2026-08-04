'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '@/components/common/sidebar/Sidebar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';
import { MobileSidebarProvider } from '@/context/MobileSidebarContext';
import { MobileSidebarDrawer } from '@/components/common/sidebar/MobileSidebarDrawer';
import { useAuth } from '@/hooks/use-auth';
import { useCurrentUser } from '@/hooks/use-current-user';
import { ROLE } from '@/constants/roles';
import { hasRole, resolveHome } from '@/lib/rbac/has-role';
import { isDemoCookieActive } from '@/lib/demo/demo-mode';

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === '/admin/login';
  const { user, loading } = useAuth();
  const currentUser = useCurrentUser();
  const [isDemo] = useState(isDemoCookieActive);

  const isAdmin = isDemo || hasRole(user, ROLE.ADMIN);

  // Non-admins never see the dashboard shell — send them to the login page
  // (unauthenticated) or their own role's home (authenticated, wrong role)
  // instead of flashing a sidebar around an "access denied" message.
  useEffect(() => {
    if (isLogin || isDemo || loading || isAdmin) return;
    router.replace(user ? resolveHome(user) : '/admin/login');
  }, [isLogin, isDemo, loading, isAdmin, user, router]);

  if (isLogin) return <>{children}</>;

  if (loading || !isAdmin) {
    return <div className="bg-background h-screen" />;
  }

  return (
    <MobileSidebarProvider userInitials={currentUser.initials}>
      <div className="bg-background flex h-screen overflow-hidden">
        <div className="hidden lg:flex lg:h-full lg:shrink-0">
          <Sidebar role="admin" />
        </div>

        <MobileSidebarDrawer role="admin" />

        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="scrollbar-none flex flex-1 flex-col overflow-y-auto">
            <div className="flex-1">{children}</div>
            <div className="hidden lg:block">
              <FooterBottomBar theme="light" />
            </div>
          </div>
        </main>
      </div>
    </MobileSidebarProvider>
  );
}
