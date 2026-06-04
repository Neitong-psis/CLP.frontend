import AdminGuard from '@/feature/admin/components/auth/AdminGuard';
import AdminShell from '@/feature/admin/components/auth/AdminShell';
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
