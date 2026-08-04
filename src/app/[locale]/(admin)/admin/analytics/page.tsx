import { getTranslations } from 'next-intl/server';
import {
  WEEKLY_ENROLLMENTS,
  TOP_COURSES,
  ADMIN_USERS,
  ADMIN_COURSES,
  REVENUE_BY_CATEGORY,
  PLATFORM_ANALYTICS_DATA,
} from '@/constants/admin';
import AdminTopBar from '@/components/common/TopBar';
import { buildAnalyticsMetrics } from './_lib/buildMetrics';
import { AnalyticsMetricCards } from './_components/AnalyticsMetricCards';
import { WeeklyEnrollmentsChart } from './_components/WeeklyEnrollmentsChart';
import { RevenueCategoryBreakdown } from './_components/RevenueCategoryBreakdown';
import { PlatformAnalyticsChart } from './_components/PlatformAnalyticsChart';
import { TopCoursesTable } from './_components/TopCoursesTable';

export default async function AdminAnalyticsPage() {
  const t = await getTranslations('admin.analyticsPage');

  const metrics = buildAnalyticsMetrics(t, ADMIN_USERS, ADMIN_COURSES);

  return (
    <div className="bg-brand-navy flex min-h-full flex-col">
      <AdminTopBar role="admin" title={t('title')} subtitle={t('subtitle')} />

      <div className="flex-2 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Metric cards */}
        <AnalyticsMetricCards metrics={metrics} />

        <div className="grid gap-4 lg:grid-cols-2">
          <WeeklyEnrollmentsChart
            title={t('weeklyEnrollments')}
            subtitle={t('weeklySubtitle')}
            data={WEEKLY_ENROLLMENTS}
          />

          <RevenueCategoryBreakdown
            title={t('revenueByCategory')}
            subtitle={t('revenueCategorySubtitle')}
            data={REVENUE_BY_CATEGORY}
          />
        </div>

        {/* Platform analytics line chart */}
        <div className="rounded-xl border border-white/[0.07] bg-white/3 p-5">
          <h3 className="mb-0.5 text-sm font-bold text-white">
            {t('platformAnalytics')}
          </h3>
          <p className="mb-4 text-[11px] text-white/35">
            {t('platformSubtitle')}
          </p>
          <div className="h-36 w-full overflow-hidden">
            <PlatformAnalyticsChart data={PLATFORM_ANALYTICS_DATA} />
          </div>
        </div>

        {/* Top performing courses */}
        <TopCoursesTable
          title={t('topPerformingCourses')}
          subtitle={t('topCoursesSubtitle')}
          columns={[
            t('colRank'),
            t('colCourse'),
            t('colEnrolled'),
            t('colCompletionRate'),
          ]}
          courses={TOP_COURSES}
        />
      </div>
    </div>
  );
}
