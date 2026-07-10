import { getTranslations } from 'next-intl/server';
import TopBar from '@/components/common/TopBar';
import { RevenueDashboardContent } from './_components/RevenueDashboardContent';

export default async function AdminRevenuePage() {
  const t = await getTranslations('admin.revenuePage');
  return (
    <div className="flex min-h-full flex-col">
      <TopBar role="admin" title={t('title')} subtitle={t('subtitle')} />
      <div className="flex-2 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <RevenueDashboardContent />
      </div>
    </div>
  );
}
