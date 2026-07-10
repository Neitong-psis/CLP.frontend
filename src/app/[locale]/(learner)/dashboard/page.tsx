'use client';

import { useEffect, useState } from 'react';
import { useLearnerDashboardT } from '@/i18n';
import { useCurrentUser } from '@/hooks/use-current-user';
import TopBar from '@/components/pages/learner/TopBar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';
import ContinueLearningCard from './_components/ContinueLearningCard';
import OverviewStats from './_components/OverviewStats';
import ActivityChart from './_components/ActivityChart';
import RecommendedSection from './_components/RecommendedSection';
import TodaysPlan from './_components/TodaysPlan';
import UpNextPanel from './_components/UpNextPanel';
import RecentAchievements from './_components/RecentAchievements';

type GreetingKey = 'greetingMorning' | 'greetingAfternoon' | 'greetingEvening';

function greetingKey(hour: number): GreetingKey {
  if (hour < 12) return 'greetingMorning';
  if (hour < 18) return 'greetingAfternoon';
  return 'greetingEvening';
}

export default function DashboardPage() {
  const t = useLearnerDashboardT();
  const { firstName } = useCurrentUser();
  // Default to the morning greeting for the first paint so SSR and the
  // client's pre-mount render match; the real local-time greeting swaps in
  // once mounted (same hydration-safety pattern as ContinueLearningCard).
  const [greeting, setGreeting] = useState<GreetingKey>('greetingMorning');

  useEffect(() => {
    const id = setTimeout(() => {
      setGreeting(greetingKey(new Date().getHours()));
    }, 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="bg-background min-h-full">
      <TopBar
        role="learner"
        title={t('greetingTitle', {
          greeting: t(greeting),
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
