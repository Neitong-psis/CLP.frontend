import { ENROLLED_COURSES } from '@/config/learner';
import TopBar from '@/feature/learner/TopBar';
import MyLearningTabs from '@/feature/learner/my_learner/MyLearningTabs';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';

export default function MyLearningPage() {
  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        role="learner"
        title="My Learning"
        subtitle={`${ENROLLED_COURSES.length} courses enrolled`}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <MyLearningTabs courses={ENROLLED_COURSES} />
      </div>

      <FooterBottomBar theme="light" />
    </div>
  );
}
