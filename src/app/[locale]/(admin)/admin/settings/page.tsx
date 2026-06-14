import { ADMIN_USER } from '@/constants/admin';
import TopBar from '@/components/common/TopBar';
import { GeneralSection } from './_components/GeneralSection';
import { PersonalInfoSection } from './_components/PersonalInfoSection';
import { SystemHealthSection } from './_components/SystemHealthSection';

export default function AdminSettingsPage() {
  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        role="admin"
        title="Platform Settings"
        subtitle={`Live workspace synced for ${ADMIN_USER.email}`}
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
