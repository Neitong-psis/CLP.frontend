import { RoleGate } from '@/components/auth/RoleGate';
import { ROLE } from '@/constants/roles';
import { AdminDashboardContent } from './_components/AdminDashboardContent';

export default function AdminDashboardPage() {
  return (
    <RoleGate
      roles={[ROLE.ADMIN]}
      loadingFallback={<p className="p-6 text-sm text-slate-300">Loading…</p>}
      fallback={<p className="p-6 text-sm text-slate-300">No admin access.</p>}
    >
      <AdminDashboardContent />
    </RoleGate>
  );
}
