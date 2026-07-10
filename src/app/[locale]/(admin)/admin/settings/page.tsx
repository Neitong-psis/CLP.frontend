'use client';

import { useAdminSettingsT } from '@/i18n';
import TopBar from '@/components/common/TopBar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { GeneralSection } from './_components/GeneralSection';
import { PersonalInfoSection } from './_components/PersonalInfoSection';
import { SystemHealthSection } from './_components/SystemHealthSection';

export default function AdminSettingsPage() {
  const t = useAdminSettingsT();
  const currentUser = useCurrentUser();
  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        role="admin"
        title={t('title')}
        subtitle={t('subtitle', { email: currentUser.email })}
      />
      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <PersonalInfoSection />
          <GeneralSection />
          <SystemHealthSection />
        </div>
      </div>
    </div>
  );
}
