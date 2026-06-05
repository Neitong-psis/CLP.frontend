import AdminGuard from '@/components/pages/admin/components/auth/AdminGuard';
import AdminShell from '@/components/pages/admin/components/auth/AdminShell';
import { ToastProvider } from '@/components/ui/toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <AdminGuard>
        <AdminShell>{children}</AdminShell>
      </AdminGuard>
    </ToastProvider>
  );
}
