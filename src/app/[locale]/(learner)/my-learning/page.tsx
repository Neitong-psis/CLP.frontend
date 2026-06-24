import { getTranslations } from 'next-intl/server';
import { NS } from '@/i18n/namespaces';
import { ENROLLED_COURSES, MOCK_USER } from '@/constants/learner';
import TopBar from '@/components/pages/learner/TopBar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';
import CourseGrid from '@/components/pages/learner/my-learning/CourseGrid';

export default async function MyLearningPage() {
  const t = await getTranslations(NS.learner.myLearning);

  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        role="learner"
        title={t('title')}
        subtitle={t('subtitle', { email: MOCK_USER.email })}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <CourseGrid
          courses={ENROLLED_COURSES}
          userName={MOCK_USER.name.split(' ')[0]}
        />
      </div>

      <FooterBottomBar theme="light" />
    </div>
  );
}
