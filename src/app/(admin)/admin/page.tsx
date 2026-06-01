import {
  TOP_PERFORMING_COURSES,
  REVENUE_BY_CATEGORY,
  QUIZ_ANALYTICS,
  PLATFORM_ANALYTICS_DATA,
} from '@/constants/admin';
import TopBar from '@/components/common/TopBar';
import { DashboardStatGrid } from '@/components/pages/admin/dashboard/DashboardStatGrid';
import { UserDistributionCard } from '@/components/pages/admin/dashboard/UserDistributionCard';
import { TopCoursesCard } from '@/components/pages/admin/dashboard/TopCoursesCard';
import { RevenueStatsGrid } from '@/components/pages/admin/dashboard/RevenueStatsGrid';
import { MonthlyRevenueCard } from '@/components/pages/admin/dashboard/MonthlyRevenueCard';
import { QuizAnalyticsCard } from '@/components/pages/admin/dashboard/QuizAnalyticsCard';
import { RevenueByCategoryCard } from '@/components/pages/admin/dashboard/RevenueByCategoryCard';
import { PlatformAnalyticsCard } from '@/components/pages/admin/dashboard/PlatformAnalyticsCard';

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-full flex-col">
      <TopBar role="admin" title="Platform Overview" />

      <div className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <DashboardStatGrid />

        <div className="grid gap-6 lg:grid-cols-2">
          <UserDistributionCard />
          <TopCoursesCard data={TOP_PERFORMING_COURSES} />
        </div>

        <RevenueStatsGrid />

        <div className="grid gap-6 lg:grid-cols-2">
          <MonthlyRevenueCard />
          <RevenueByCategoryCard data={REVENUE_BY_CATEGORY} />
        </div>

        <PlatformAnalyticsCard data={PLATFORM_ANALYTICS_DATA} />

        <QuizAnalyticsCard data={QUIZ_ANALYTICS} />
      </div>
    </div>
  );
}
