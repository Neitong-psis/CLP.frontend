import Sidebar from '@/components/common/sidebar/Sidebar';
import { ToastProvider } from '@/components/ui/toast';
import { MobileSidebarProvider } from '@/context/MobileSidebarContext';
import { MobileSidebarDrawer } from '@/components/common/sidebar/MobileSidebarDrawer';
import { MOCK_USER } from '@/constants/learner';

export default function LearnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <MobileSidebarProvider userInitials={MOCK_USER.initials}>
        <div className="bg-background flex h-screen overflow-hidden">
          {/* Desktop sidebar — hidden below lg */}
          <div className="hidden lg:flex lg:h-full lg:shrink-0">
            <Sidebar role="learner" />
          </div>

          <MobileSidebarDrawer role="learner" />

          {/* Main content */}
          <main className="flex flex-1 flex-col overflow-hidden">
            <div className="scrollbar-none flex-1 overflow-y-auto">
              {children}
            </div>
          </main>
        </div>
      </MobileSidebarProvider>
    </ToastProvider>
  );
}
