import type { DashboardSkeletonVariant } from "@/config/dashboard-pages";
import { SkeletonBlock } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/clp/page-container";

interface PageSkeletonProps {
  readonly variant: DashboardSkeletonVariant;
}

export function PageSkeleton({ variant }: PageSkeletonProps) {
  return (
    <PageContainer as="main" className="space-y-8">
      <SectionHeaderSkeleton />
      {variant === "overview" ? <OverviewSkeleton /> : null}
      {variant === "my-learning" ? <MyLearningSkeleton /> : null}
      {variant === "explore" ? <ExploreSkeleton /> : null}
      {variant === "progress" ? <ProgressSkeleton /> : null}
      {variant === "quizzes" ? <QuizzesSkeleton /> : null}
      {variant === "certificates" ? <CertificatesSkeleton /> : null}
      {variant === "settings" ? <SettingsSkeleton /> : null}
    </PageContainer>
  );
}

function SectionHeaderSkeleton() {
  return (
    <div className="space-y-2">
      <SkeletonBlock className="h-7 w-48" />
      <SkeletonBlock className="h-4 w-72 max-w-full" />
    </div>
  );
}

function OverviewSkeleton() {
  return (
    <>
      <SkeletonBlock className="h-36 w-full rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonBlock key={`stat-${String(index)}`} className="h-28" />
        ))}
      </div>
      <div>
        <SkeletonBlock className="mb-4 h-6 w-40" />
        <div className="grid gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonBlock key={`quiz-${String(index)}`} className="h-56" />
          ))}
        </div>
      </div>
      <div>
        <SkeletonBlock className="mb-4 h-6 w-44" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonBlock key={`continue-${String(index)}`} className="h-48" />
          ))}
        </div>
      </div>
    </>
  );
}

function MyLearningSkeleton() {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonBlock key={`tab-${String(index)}`} className="h-9 w-28 rounded-full" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonBlock key={`course-${String(index)}`} className="h-72" />
        ))}
      </div>
    </>
  );
}

function ExploreSkeleton() {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 7 }).map((_, index) => (
          <SkeletonBlock key={`pill-${String(index)}`} className="h-9 w-28 rounded-full" />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonBlock key={`explore-${String(index)}`} className="h-80" />
        ))}
      </div>
    </>
  );
}

function ProgressSkeleton() {
  return (
    <>
      <SkeletonBlock className="h-32 w-full rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonBlock key={`progress-stat-${String(index)}`} className="h-28" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <SkeletonBlock className="h-80 lg:col-span-2" />
        <SkeletonBlock className="h-80" />
      </div>
    </>
  );
}

function QuizzesSkeleton() {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonBlock key={`quiz-card-${String(index)}`} className="h-64" />
        ))}
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonBlock key={`timeline-${String(index)}`} className="h-20" />
        ))}
      </div>
    </>
  );
}

function CertificatesSkeleton() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonBlock key={`cert-stat-${String(index)}`} className="h-24" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <SkeletonBlock key={`cert-${String(index)}`} className="h-96" />
        ))}
      </div>
    </>
  );
}

function SettingsSkeleton() {
  return (
    <div className="max-w-2xl space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonBlock key={`setting-${String(index)}`} className="h-20" />
      ))}
    </div>
  );
}
