'use client';

import TopBar from '@/components/common/TopBar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { EarningsStatCards } from './_components/EarningsStatCards';
import { MonthlyRevenueChart } from './_components/MonthlyRevenueChart';

export default function EducatorEarningsPage() {
  const currentUser = useCurrentUser();

  return (
    <div className="bg-background flex min-h-full flex-col">
      <TopBar
        role="educator"
        title="Earnings"
        subtitle={`Live workspace synced for ${currentUser.email}`}
      />

      <div className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <EarningsStatCards />
        <MonthlyRevenueChart />
      </div>
    </div>
  );
}
