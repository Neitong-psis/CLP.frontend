import {
  ADMIN_USER,
  MONTHLY_REVENUE,
  REVENUE_BY_CATEGORY,
} from '@/constants/admin';
import TopBar from '@/components/common/TopBar';
import { RevenueStatsGrid } from '@/components/pages/admin/components/dashboard/RevenueStatsGrid';
import { MonthlyRevenueCard } from '@/components/pages/admin/components/dashboard/MonthlyRevenueCard';
import { RevenueByCategoryCard } from '@/components/pages/admin/components/dashboard/RevenueByCategoryCard';

export default function AdminRevenuePage() {
  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        role="admin"
        title="Revenue"
        subtitle={`Live workspace synced for ${ADMIN_USER.email}`}
      />
      <div className="flex-2 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <RevenueStatsGrid />
        <div className="grid gap-6 lg:grid-cols-2">
          <MonthlyRevenueCard data={MONTHLY_REVENUE} />
          <RevenueByCategoryCard data={REVENUE_BY_CATEGORY} />
        </div>
      </div>
    </div>
  );
}
