import Sidebar from '@/components/common/sidebar/Sidebar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';
import { ToastProvider } from '@/components/ui/toast';

export default function EducatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="bg-background flex h-screen overflow-hidden">
        <div className="hidden lg:flex lg:h-full lg:shrink-0">
          <Sidebar role="educator" />
        </div>
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {children}
            <FooterBottomBar theme="light" />
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
