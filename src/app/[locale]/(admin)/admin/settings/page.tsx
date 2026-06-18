import { ADMIN_USER } from '@/constants/admin';
import TopBar from '@/components/common/TopBar';
import { getTranslations } from 'next-intl/server';
import { GeneralSection } from './_components/GeneralSection';
import { PersonalInfoSection } from './_components/PersonalInfoSection';
import { SystemHealthSection } from './_components/SystemHealthSection';

export default async function AdminSettingsPage() {
  const t = await getTranslations('admin.settingsPage');
  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        role="admin"
        title={t('title')}
        subtitle={`${t('subtitle')} ${ADMIN_USER.email}`}
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
