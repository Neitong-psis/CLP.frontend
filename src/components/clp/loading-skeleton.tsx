import { cn } from "@/lib/cn";

interface LoadingSkeletonProps {
  readonly className?: string;
}

export function SkeletonBlock({ className }: LoadingSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-xl bg-[#EEF2FF]", className)}
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-busy aria-label="Loading dashboard">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key -- static skeleton placeholders
          <SkeletonBlock key={`stat-${String(i)}`} className="h-28" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonBlock key={`course-${String(i)}`} className="h-72" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <SkeletonBlock className="h-80 lg:col-span-2" />
        <SkeletonBlock className="h-80" />
      </div>
    </div>
  );
}
