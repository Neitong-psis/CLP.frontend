import { getTranslations } from 'next-intl/server';

import { RoleGate } from '@/components/auth/RoleGate';
import { ROLE } from '@/constants/roles';
import { AdminDashboardContent } from './_components/AdminDashboardContent';

export default async function AdminDashboardPage() {
  const t = await getTranslations('admin.common');
  return (
    <RoleGate
      roles={[ROLE.ADMIN]}
      loadingFallback={
        <p className="p-6 text-sm text-slate-300">{t('loading')}</p>
      }
      fallback={
        <p className="p-6 text-sm text-slate-300">{t('noAdminAccess')}</p>
      }
    >
      <AdminDashboardContent />
    </RoleGate>
  );
}
