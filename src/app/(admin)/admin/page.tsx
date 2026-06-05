import {
  TOP_PERFORMING_COURSES,
  REVENUE_BY_CATEGORY,
  QUIZ_ANALYTICS,
} from '@/constants/admin';
import TopBar from '@/components/common/TopBar';
import { DashboardStatGrid } from '@/components/pages/admin/components/dashboard/DashboardStatGrid';
import { UserDistributionCard } from '@/components/pages/admin/components/dashboard/UserDistributionCard';
import { TopCoursesCard } from '@/components/pages/admin/components/dashboard/TopCoursesCard';
import { MonthlyRevenueCard } from '@/components/pages/admin/components/dashboard/MonthlyRevenueCard';
import { QuizAnalyticsCard } from '@/components/pages/admin/components/dashboard/QuizAnalyticsCard';
import { RevenueByCategoryCard } from '@/components/pages/admin/components/dashboard/RevenueByCategoryCard';

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <TopBar role="admin" title="Platform Overview" />

      <div className="flex-1 space-y-8 px-6 py-8 lg:px-8">
        <DashboardStatGrid />

        <div className="grid gap-6 lg:grid-cols-3">
          <MonthlyRevenueCard className="lg:col-span-2" />
          <UserDistributionCard />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <TopCoursesCard
            data={TOP_PERFORMING_COURSES}
            className="lg:col-span-2"
          />
          <RevenueByCategoryCard data={REVENUE_BY_CATEGORY} />
        </div>

        <QuizAnalyticsCard data={QUIZ_ANALYTICS} />
      </div>
    </div>
  );
}
