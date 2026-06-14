import { Users, BookOpen, Star, DollarSign } from 'lucide-react';

import {
  DASHBOARD_STATS,
  MONTHLY_ENROLLMENTS,
  QUIZ_ANALYTICS,
} from '@/constants/educator';

import TopBar from '@/components/common/TopBar';
import { StatCard } from '@/components/pages/educator/dashboard/StatCard';
import { EnrollmentTrendCard } from '@/components/pages/educator/dashboard/EnrollmentTrendCard';
import { QuizAnalyticsCard } from '@/components/pages/educator/dashboard/QuizAnalyticsCard';
import { CourseInsightsGrid } from '@/components/pages/educator/dashboard/CourseInsightsGrid';
import { RoleGate } from '@/components/auth/RoleGate';
import { ROLE } from '@/constants/roles';

const STAT_ICONS = [Users, BookOpen, Star, DollarSign];
const STAT_BG = [
  'bg-brand-navy',
  'bg-brand-gold',
  'bg-brand-gold',
  'bg-brand-navy',
];
const STAT_DELAYS = ['', 'delay-100', 'delay-200', 'delay-300'];

export default function EducatorDashboardPage() {
  return (
    <RoleGate
      roles={[ROLE.EDUCATOR]}
      loadingFallback={<p className="p-6 text-sm text-slate-300">Loading…</p>}
      fallback={
        <p className="p-6 text-sm text-slate-300">No educator access.</p>
      }
    >
      <div className="flex min-h-full flex-col bg-white">
        <TopBar role="educator" title="Educator Dashboard" />
        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {DASHBOARD_STATS.map(({ label, value, change }, i) => (
              <div
                key={label}
                className={`animate-fade-in-up ${STAT_DELAYS[i]}`}
              >
                <StatCard
                  label={label}
                  value={value}
                  change={change}
                  icon={STAT_ICONS[i]}
                  iconBg={STAT_BG[i]}
                />
              </div>
            ))}
          </div>
          <div className="animate-fade-in-up delay-200">
            <EnrollmentTrendCard data={MONTHLY_ENROLLMENTS} />
          </div>
          <CourseInsightsGrid className="animate-fade-in-up mb-6 delay-300" />
          <div className="animate-fade-in-up delay-400">
            <QuizAnalyticsCard data={QUIZ_ANALYTICS} />
          </div>
        </div>
      </div>
    </RoleGate>
  );
}
