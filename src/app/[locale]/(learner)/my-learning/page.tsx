'use client';

import { useLearnerMyLearningT } from '@/i18n';
import { ENROLLED_COURSES } from '@/constants/learner';
import { useCurrentUser } from '@/hooks/use-current-user';
import TopBar from '@/components/pages/learner/TopBar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';
import CourseGrid from './_components/CourseGrid';

export default function MyLearningPage() {
  const t = useLearnerMyLearningT();
  const { firstName, email } = useCurrentUser();

  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        role="learner"
        title={t('title')}
        subtitle={t('subtitle', { email })}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <CourseGrid courses={ENROLLED_COURSES} userName={firstName} />
      </div>

      <FooterBottomBar theme="light" />
    </div>
  );
}
