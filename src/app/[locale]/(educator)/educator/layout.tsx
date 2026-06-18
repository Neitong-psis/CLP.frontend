import Sidebar from '@/components/common/sidebar/Sidebar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';
import { ToastProvider } from '@/components/ui/toast';
import { CourseTasksProvider } from '@/context/CourseTasksContext';
import { MobileSidebarProvider } from '@/context/MobileSidebarContext';
import { MobileSidebarDrawer } from '@/components/common/sidebar/MobileSidebarDrawer';
import { EDUCATOR_USER } from '@/constants/educator';

export default function EducatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <CourseTasksProvider>
        <MobileSidebarProvider userInitials={EDUCATOR_USER.initials}>
          <div className="bg-background flex h-screen overflow-hidden">
            {/* Desktop sidebar — hidden below lg */}
            <div className="hidden lg:flex lg:h-full lg:shrink-0">
              <Sidebar role="educator" />
            </div>

            {/* Profile dropdown menu — triggered from TopBar avatar on mobile/tablet */}
            <MobileSidebarDrawer role="educator" />

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
      </CourseTasksProvider>
    </ToastProvider>
  );
}
