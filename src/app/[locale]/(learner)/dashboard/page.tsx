import { getTranslations } from 'next-intl/server';
import { NS } from '@/i18n/namespaces';
import { MOCK_USER } from '@/constants/learner';
import TopBar from '@/components/pages/learner/TopBar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';
import ContinueLearningCard from './_components/ContinueLearningCard';
import OverviewStats from './_components/OverviewStats';
import ActivityChart from './_components/ActivityChart';
import RecommendedSection from './_components/RecommendedSection';
import TodaysPlan from './_components/TodaysPlan';
import UpNextPanel from './_components/UpNextPanel';
import RecentAchievements from './_components/RecentAchievements';

function greetingKey(
  hour: number,
): 'greetingMorning' | 'greetingAfternoon' | 'greetingEvening' {
  if (hour < 12) return 'greetingMorning';
  if (hour < 18) return 'greetingAfternoon';
  return 'greetingEvening';
}

export default async function DashboardPage() {
  const t = await getTranslations(NS.learner.dashboard);
  const now = new Date();
  const firstName = MOCK_USER.name.split(' ')[0];

  return (
    <div className="bg-background min-h-full">
      <TopBar
        role="learner"
        title={t('greetingTitle', {
          greeting: t(greetingKey(now.getHours())),
          name: firstName,
        })}
        subtitle={t('dashboardSubtitle')}
      />

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_308px]">
          {/* ── Main column ── */}
          <div className="min-w-0 space-y-5">
            <ContinueLearningCard />
            <OverviewStats />
            <ActivityChart />
            <RecommendedSection />
          </div>

          {/* ── Right panel ── */}
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
