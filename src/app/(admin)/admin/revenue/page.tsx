import {
  ADMIN_USER,
  MONTHLY_REVENUE,
  REVENUE_BY_CATEGORY,
} from '@/constants/admin';
import TopBar from '@/components/common/TopBar';
import { RevenueStatsGrid } from '@/components/pages/admin/dashboard/RevenueStatsGrid';
import { MonthlyRevenueCard } from '@/components/pages/admin/dashboard/MonthlyRevenueCard';
import { RevenueByCategoryCard } from '@/components/pages/admin/dashboard/RevenueByCategoryCard';

export default function AdminRevenuePage() {
  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        role="admin"
        title="Revenue"
        subtitle={`Live workspace synced for ${ADMIN_USER.email}`}
      />
      <div className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <RevenueStatsGrid />
        <MonthlyRevenueCard data={MONTHLY_REVENUE} />
        <RevenueByCategoryCard data={REVENUE_BY_CATEGORY} />
      </div>
    </div>
  );
}
