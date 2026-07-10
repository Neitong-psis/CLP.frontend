'use client';

import { cn } from '@/lib/utils/cn';
import { usePlatformAnalytics } from '@/hooks/usePlatformAnalytics';
import { PLATFORM_ANALYTICS_DATA } from '@/constants/admin';
import { PlatformAnalyticsCard } from './PlatformAnalyticsCard';

interface PlatformAnalyticsContainerProps {
  firstVisit?: boolean;
  className?: string;
}

function PlatformAnalyticsSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'border-border bg-card rounded-xl border p-5 shadow',
        className,
      )}
    >
      <div className="bg-muted h-3.5 w-36 animate-pulse rounded" />
      <div className="bg-muted mt-2 mb-5 h-2.5 w-64 animate-pulse rounded" />
      <div className="bg-muted h-[220px] w-full animate-pulse rounded" />
      <div className="mt-4 flex justify-center gap-6">
        <div className="bg-muted h-2.5 w-14 animate-pulse rounded" />
        <div className="bg-muted h-2.5 w-20 animate-pulse rounded" />
      </div>
    </div>
  );
}

export function PlatformAnalyticsContainer({
  firstVisit = false,
  className,
}: PlatformAnalyticsContainerProps) {
  const { data, loading } = usePlatformAnalytics();

  if (loading) {
    return <PlatformAnalyticsSkeleton className={className} />;
  }

  return (
    <PlatformAnalyticsCard
      data={data ?? PLATFORM_ANALYTICS_DATA}
      className={cn(
        !firstVisit && 'animate-in fade-in slide-in-from-bottom-2 duration-500',
        className,
      )}
    />
  );
}
