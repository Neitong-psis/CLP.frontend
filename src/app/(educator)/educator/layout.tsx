import Sidebar from '@/components/common/sidebar/Sidebar';
import Footer from '@/components/common/footer/Footer';

export default function EducatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role="educator" />
      <main className="flex flex-1 flex-col overflow-y-auto">
        {children}
        <Footer theme="light" />
      </main>
    </div>
  );
}
