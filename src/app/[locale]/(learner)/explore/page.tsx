import { getTranslations } from 'next-intl/server';
import { NS } from '@/i18n/namespaces';
import { EXPLORE_COURSES, MOCK_USER } from '@/config/learner';
import TopBar from '@/components/pages/learner/TopBar';
import ExploreFilter from '@/components/pages/learner/explore/ExploreFilter';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';

export default async function ExplorePage() {
  const t = await getTranslations(NS.learner.explore);

  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <TopBar
        role="learner"
        title={t('title')}
        subtitle={t('subtitle', { email: MOCK_USER.email })}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <ExploreFilter courses={EXPLORE_COURSES} />
      </div>

      <FooterBottomBar theme="light" />
    </div>
  );
}
