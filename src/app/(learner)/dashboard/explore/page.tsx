import { EXPLORE_COURSES, MOCK_USER } from '@/config/learner';
import TopBar from '@/components/pages/learner/TopBar';
import ExploreFilter from '@/components/pages/learner/explore/ExploreFilter';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';

export default function ExplorePage() {
  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        title="Explore Courses"
        subtitle={`Live workspace synced for ${MOCK_USER.email}`}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <ExploreFilter courses={EXPLORE_COURSES} />
      </div>

      <FooterBottomBar theme="light" />
    </div>
  );
}
