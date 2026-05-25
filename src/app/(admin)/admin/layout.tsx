import Sidebar from '@/components/common/sidebar/Sidebar';
import Footer from '@/components/common/footer/Footer';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <div className="hidden lg:flex lg:h-full lg:shrink-0">
        <Sidebar role="admin" />
      </div>
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {children}
          <Footer theme="light" />
        </div>
      </main>
    </div>
  );
}
