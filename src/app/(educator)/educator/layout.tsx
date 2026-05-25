import Sidebar from '@/components/common/sidebar/Sidebar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';

export default function EducatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
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
  );
}
