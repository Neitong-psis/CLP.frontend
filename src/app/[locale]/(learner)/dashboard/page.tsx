import { MOCK_USER } from '@/config/learner';
import TopBar from '@/components/pages/learner/TopBar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';
import ContinueLearningCard from '@/components/pages/learner/dashboard/ContinueLearningCard';
import OverviewStats from '@/components/pages/learner/dashboard/OverviewStats';
import ActivityChart from '@/components/pages/learner/dashboard/ActivityChart';
import RecommendedSection from '@/components/pages/learner/dashboard/RecommendedSection';
import TodaysPlan from '@/components/pages/learner/dashboard/TodaysPlan';
import UpNextPanel from '@/components/pages/learner/dashboard/UpNextPanel';
import RecentAchievements from '@/components/pages/learner/dashboard/RecentAchievements';

function greeting(hour: number): string {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardPage() {
  const now = new Date();
  const firstName = MOCK_USER.name.split(' ')[0];
  const dateLabel = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-background min-h-full">
      <TopBar
        role="learner"
        title={`${greeting(now.getHours())}, ${firstName}!`}
        subtitle={dateLabel}
      />

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Two-column layout: main content + right panel */}
        <div className="grid gap-6 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_308px]">
          {/* ── Main column ── */}
          <div className="min-w-0 space-y-5">
            <ContinueLearningCard />
            <OverviewStats />
            <ActivityChart />
            <RecommendedSection />
          </div>

          {/* ── Right panel — sticky on desktop ── */}
          <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <TodaysPlan />
            <UpNextPanel />
            <RecentAchievements />
          </div>
        </div>
      </main>

      <FooterBottomBar theme="light" />
    </div>
  );
}
