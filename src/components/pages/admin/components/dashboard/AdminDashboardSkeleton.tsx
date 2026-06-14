import { cn } from '@/lib/utils/cn';

// ─── TopBar ───────────────────────────────────────────────────────────────────

function TopBarSkeleton() {
  return (
    <header className="border-border bg-card sticky top-0 z-10 flex h-14 shrink-0 items-center gap-4 border-b px-4 sm:h-16 sm:px-6 lg:px-8">
      <div className="bg-muted h-5 w-44 animate-pulse rounded" />
      <div className="ml-auto flex items-center gap-2">
        <div className="bg-muted hidden h-6 w-14 animate-pulse rounded-full sm:block" />
        <div className="bg-muted size-8 animate-pulse rounded-lg" />
        <div className="bg-muted size-8 animate-pulse rounded-lg" />
        <div className="bg-muted size-8 animate-pulse rounded-lg" />
      </div>
    </header>
  );
}

// ─── Stat grid (4 cards) ──────────────────────────────────────────────────────

function StatGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="border-border bg-card flex flex-col rounded-2xl border-[0.5px] p-5"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="bg-muted h-3 w-28 animate-pulse rounded" />
            <div className="bg-muted size-7 animate-pulse rounded-full" />
          </div>
          <div className="mt-3 flex items-end justify-between gap-3">
            <div className="bg-muted h-8 w-24 animate-pulse rounded" />
            <div className="bg-muted h-6 w-14 animate-pulse rounded-full" />
          </div>
          <div className="bg-muted mt-2 h-2.5 w-20 animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
}

// ─── Revenue chart ────────────────────────────────────────────────────────────

function RevenueChartSkeleton({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'border-border bg-card flex flex-col rounded-2xl border-[0.5px]',
        className,
      )}
    >
      <div className="border-border flex items-start justify-between gap-4 border-b px-6 py-5">
        <div className="space-y-1.5">
          <div className="bg-muted h-4 w-36 animate-pulse rounded" />
          <div className="bg-muted h-3 w-24 animate-pulse rounded" />
        </div>
        <div className="space-y-1.5 text-right">
          <div className="bg-muted h-7 w-20 animate-pulse rounded" />
          <div className="bg-muted h-3 w-28 animate-pulse rounded" />
        </div>
      </div>
      <div className="px-4 pt-2 pb-4">
        <div className="bg-muted h-[220px] w-full animate-pulse rounded-lg" />
      </div>
    </section>
  );
}

// ─── User distribution donut ──────────────────────────────────────────────────

function DistributionSkeleton({ className }: { className?: string }) {
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

// ─── Top courses table ────────────────────────────────────────────────────────

function TopCoursesSkeleton({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'border-border bg-card overflow-hidden rounded-2xl border-[0.5px]',
        className,
      )}
    >
      <header className="border-border flex items-center justify-between border-b px-6 py-4">
        <div className="bg-muted h-3.5 w-40 animate-pulse rounded" />
        <div className="bg-muted h-3 w-16 animate-pulse rounded" />
      </header>
      <ul className="divide-border divide-y">
        {Array.from({ length: 5 }).map((_, i) => (
          <li
            key={i}
            className="flex animate-pulse items-center gap-4 px-6 py-3.5"
          >
            <div className="bg-muted h-4 w-4 shrink-0 rounded" />
            <div className="bg-muted h-9 w-9 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="bg-muted h-3 w-48 rounded" />
              <div className="bg-muted h-2.5 w-28 rounded" />
              <div className="bg-muted h-0.5 w-full rounded-full" />
            </div>
            <div className="hidden shrink-0 space-y-1 text-right sm:block">
              <div className="bg-muted h-3 w-16 rounded" />
              <div className="bg-muted h-2.5 w-12 rounded" />
            </div>
            <div className="bg-muted h-6 w-11 shrink-0 rounded-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── Revenue by category ──────────────────────────────────────────────────────

function RevenueCategorySkeleton({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'border-border bg-card flex h-full flex-col rounded-2xl border-[0.5px] p-6',
        className,
      )}
    >
      <div className="mb-6 flex items-start justify-between gap-2">
        <div className="space-y-1.5">
          <div className="bg-muted h-3.5 w-36 animate-pulse rounded" />
          <div className="bg-muted h-2.5 w-28 animate-pulse rounded" />
        </div>
        <div className="bg-muted h-5 w-6 animate-pulse rounded-full" />
      </div>
      <ul className="flex flex-1 flex-col justify-between">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="animate-pulse">
            <div className="mb-2 flex items-center gap-2">
              <div className="bg-muted h-3 w-4 rounded" />
              <div className="bg-muted h-3 flex-1 rounded" />
              <div className="bg-muted h-3 w-12 rounded" />
            </div>
            <div className="flex items-center gap-2 pl-6">
              <div className="bg-muted h-2 flex-1 rounded-full" />
              <div className="bg-muted h-2.5 w-8 rounded" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── Quiz analytics ───────────────────────────────────────────────────────────

function QuizSkeleton() {
  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <div className="bg-muted h-4 w-32 animate-pulse rounded" />
        <div className="bg-muted h-3 w-16 animate-pulse rounded" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="border-border bg-card rounded-2xl border-[0.5px] p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="bg-muted h-3.5 w-full animate-pulse rounded" />
                <div className="bg-muted h-3 w-3/4 animate-pulse rounded" />
                <div className="bg-muted h-3 w-16 animate-pulse rounded" />
              </div>
              <div className="bg-muted size-15 animate-pulse rounded-full" />
            </div>
            <div className="border-border mt-4 space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <div className="bg-muted h-3 w-20 animate-pulse rounded" />
                <div className="bg-muted h-3 w-10 animate-pulse rounded" />
              </div>
              <div className="flex justify-between">
                <div className="bg-muted h-3 w-20 animate-pulse rounded" />
                <div className="bg-muted h-3 w-10 animate-pulse rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Full page skeleton ───────────────────────────────────────────────────────

export function AdminDashboardSkeleton() {
  return (
    <div className="bg-muted flex min-h-full flex-col">
      <TopBarSkeleton />
      <div className="flex-1 space-y-8 px-6 py-8 lg:px-8">
        <StatGridSkeleton />
        <div className="grid gap-6 lg:grid-cols-3">
          <RevenueChartSkeleton className="lg:col-span-2" />
          <DistributionSkeleton />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <TopCoursesSkeleton className="lg:col-span-2" />
          <RevenueCategorySkeleton />
        </div>
        <QuizSkeleton />
      </div>
    </div>
  );
}
