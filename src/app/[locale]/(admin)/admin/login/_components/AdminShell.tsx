'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/common/sidebar/Sidebar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';
import { MobileSidebarProvider } from '@/context/MobileSidebarContext';
import { MobileSidebarDrawer } from '@/components/common/sidebar/MobileSidebarDrawer';
import { useCurrentUser } from '@/hooks/use-current-user';

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';
  const currentUser = useCurrentUser();

  if (isLogin) return <>{children}</>;

  return (
    <MobileSidebarProvider userInitials={currentUser.initials}>
      <div className="bg-background flex h-screen overflow-hidden">
        <div className="hidden lg:flex lg:h-full lg:shrink-0">
          <Sidebar role="admin" />
        </div>

        <MobileSidebarDrawer role="admin" />

        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {children}
            <div className="hidden lg:block">
              <FooterBottomBar theme="light" />
            </div>
          </div>
        </main>
      </div>
    </MobileSidebarProvider>
  );
}
