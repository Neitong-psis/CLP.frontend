import Sidebar from '@/components/common/sidebar/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:h-full lg:flex-shrink-0">
        <Sidebar role="learner" />
      </div>

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto pb-20 lg:pb-0">{children}</div>
      </main>

      {/* <MobileNav /> */}
    </div>
  );
}
