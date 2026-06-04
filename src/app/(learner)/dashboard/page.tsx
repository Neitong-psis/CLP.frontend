import { MOCK_USER } from '@/config/learner';
import TopBar from '@/feature/learner/TopBar';
import StatCards from '@/feature/learner/dashboard/StatCards';
import LearningProgress from '@/feature/learner/dashboard/LearningProgress';
import RecommendedCourses from '@/feature/learner/dashboard/RecommendedCourses';
import UpcomingQuizzes from '@/feature/learner/dashboard/UpcomingQuizzes';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';
import { Spacer } from '@/components/ui/Spacer';

export default function DashboardPage() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = MOCK_USER.name.split(' ')[0];
  const dateLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="min-h-full bg-slate-50">
      <TopBar
        role="learner"
        title={`${greeting}, ${firstName}!`}
        subtitle={dateLabel}
      />

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Row 1 — stat cards */}
        <StatCards />

        {/* Row 2 — Continue Learning (2/3) + Quizzes (1/3) */}
        <div className="mb-4 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LearningProgress />
            <Spacer height={24} />
            <RecommendedCourses />
          </div>
          <UpcomingQuizzes />
        </div>

        {/* Row 3 — Recommended full width */}
        {/* <RecommendedCourses /> */}
      </div>

      <FooterBottomBar theme="light" />
    </div>
  );
}
