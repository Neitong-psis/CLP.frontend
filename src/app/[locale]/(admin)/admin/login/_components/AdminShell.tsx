'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/common/sidebar/Sidebar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  if (isLogin) return <>{children}</>;

  return (
    <div className="bg-muted flex h-screen overflow-hidden">
      <div className="hidden lg:flex lg:h-full lg:shrink-0">
        <Sidebar role="admin" />
      </div>
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar placeholder removed to avoid duplicate language picker */}

        <div className="flex-1 overflow-y-auto">
          {children}
          <FooterBottomBar theme="light" />
        </div>
      </main>
    </div>
  );
}
