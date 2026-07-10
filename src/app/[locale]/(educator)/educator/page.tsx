'use client';

import { MONTHLY_ENROLLMENTS, QUIZ_ANALYTICS } from '@/constants/educator';

import TopBar from '@/components/common/TopBar';
import { RoleGate } from '@/components/auth/RoleGate';
import { ROLE } from '@/constants/roles';
import { useCurrentUser } from '@/hooks/use-current-user';
import { GreetingHero } from '@/components/pages/educator/dashboard/GreetingHero';
import { DashboardStats } from '@/components/pages/educator/dashboard/DashboardStats';
import { EnrollmentTrendCard } from '@/components/pages/educator/dashboard/EnrollmentTrendCard';
import { QuizAnalyticsCard } from '@/components/pages/educator/dashboard/QuizAnalyticsCard';
import { CourseInsightsGrid } from '@/components/pages/educator/dashboard/CourseInsightsGrid';

export default function EducatorDashboardPage() {
  const currentUser = useCurrentUser();

  return (
    <RoleGate
      roles={[ROLE.EDUCATOR]}
      loadingFallback={<DashboardSkeleton />}
      fallback={<AccessDenied />}
    >
      <div className="bg-background flex min-h-full flex-col">
        <TopBar
          role="educator"
          title="Educator Overview"
          subtitle={`Live workspace synced for ${currentUser.email}`}
        />

        <div className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <GreetingHero />
          <DashboardStats />

          <div className="animate-fade-in-up delay-200">
            <EnrollmentTrendCard data={MONTHLY_ENROLLMENTS} />
          </div>

          <CourseInsightsGrid className="animate-fade-in-up mb-5 delay-300 sm:mb-6" />

          <div className="animate-fade-in-up delay-400">
            <QuizAnalyticsCard data={QUIZ_ANALYTICS} />
          </div>
        </div>
      </div>
    </RoleGate>
  );
}

function DashboardSkeleton() {
  return (
    <div className="animate-pulse px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="bg-muted mb-5 h-52 rounded-2xl sm:hidden" />
      <div className="mb-5 hidden sm:mb-6 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-muted h-28 rounded-2xl" />
        ))}
      </div>
      <div className="bg-muted mb-6 h-64 rounded-2xl" />
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <div className="bg-muted h-56 rounded-2xl" />
        <div className="bg-muted h-56 rounded-2xl" />
      </div>
      <div className="bg-muted h-48 rounded-2xl" />
    </div>
  );
}

function AccessDenied() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 p-6 text-center">
      <p className="text-foreground text-sm font-semibold">Access restricted</p>
      <p className="text-muted-foreground text-xs">
        You need an Educator account to view this page.
      </p>
    </div>
  );
}
