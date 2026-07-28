import AdminShell from '@/app/[locale]/(admin)/admin/login/_components/AdminShell';
import { ToastProvider } from '@/components/ui/toast';
import { UserApprovalsProvider } from '@/context/UserApprovalsContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <UserApprovalsProvider>
        <AdminShell>{children}</AdminShell>
      </UserApprovalsProvider>
    </ToastProvider>
  );
}
