'use client';

import { useAdminDashboardT } from '@/i18n';
import { cn } from '@/lib/utils/cn';
import { useUserStats } from '@/hooks/useUserStats';
import { UserDistributionCard, type RoleSegment } from './UserDistributionCard';

interface UserDistributionContainerProps {
  firstVisit?: boolean;
  className?: string;
}

const SEGMENT_COLORS = {
  learners: 'var(--chart-indigo)',
  educators: 'var(--chart-emerald)',
  admins: 'var(--chart-warn)',
} as const;

function UserDistributionSkeleton({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'border-border bg-card flex h-full flex-col rounded-2xl border-[0.5px]',
        className,
      )}
    >
      <div className="border-border flex items-baseline justify-between border-b px-5 py-4">
        <div className="bg-muted h-2.5 w-28 animate-pulse rounded" />
        <div className="bg-muted h-6 w-16 animate-pulse rounded" />
      </div>
      <div className="flex flex-col items-center gap-6 px-5 py-6">
        <div className="relative flex size-40 items-center justify-center">
          <div className="bg-muted size-40 animate-pulse rounded-full" />
          <div className="bg-card absolute size-24 rounded-full" />
          <div className="absolute flex flex-col items-center gap-1">
            <div className="bg-muted h-7 w-12 animate-pulse rounded" />
            <div className="bg-muted h-2.5 w-8 animate-pulse rounded" />
          </div>
        </div>
        <ul className="w-full space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i}>
              <div className="mb-1.5 flex items-center gap-2">
                <div className="bg-muted size-2.5 animate-pulse rounded-full" />
                <div className="bg-muted h-3 flex-1 animate-pulse rounded" />
                <div className="bg-muted h-3 w-6 animate-pulse rounded" />
                <div className="bg-muted h-3 w-9 animate-pulse rounded" />
              </div>
              <div className="bg-muted h-1.5 w-full animate-pulse rounded-full" />
            </li>
          ))}
        </ul>
      </div>
      <div className="border-border flex items-center gap-1.5 border-t px-5 py-3">
        <div className="bg-muted size-1.5 animate-pulse rounded-full" />
        <div className="bg-muted h-2.5 w-24 animate-pulse rounded" />
      </div>
    </section>
  );
}

export function UserDistributionContainer({
  firstVisit = false,
  className,
}: UserDistributionContainerProps) {
  const t = useAdminDashboardT();
  const { data, loading } = useUserStats();

  if (loading) {
    return <UserDistributionSkeleton className={className} />;
  }

  const segments: RoleSegment[] | undefined = data
    ? [
        {
          label: t('learners'),
          count: data.distribution.learners,
          color: SEGMENT_COLORS.learners,
        },
        {
          label: t('educators'),
          count: data.distribution.educators,
          color: SEGMENT_COLORS.educators,
        },
        {
          label: t('admins'),
          count: data.distribution.admins,
          color: SEGMENT_COLORS.admins,
        },
      ]
    : undefined;

  return (
    <UserDistributionCard
      data={segments}
      period={t('liveUserRecords')}
      className={cn(
        !firstVisit && 'animate-in fade-in slide-in-from-bottom-2 duration-500',
        className,
      )}
    />
  );
}
