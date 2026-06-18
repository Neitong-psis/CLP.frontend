'use client';

import { useEducatorStatsT } from '@/i18n';
import { EDUCATOR_STAT_CONFIG } from '@/constants/educator';
import { StatCard } from './StatCard';

const ANIMATION_DELAYS = ['', 'delay-100', 'delay-200', 'delay-300'] as const;
const STAT_LABEL_KEYS = [
  'totalStudents',
  'activeCourses',
  'avgRating',
  'revenue',
] as const;

export function DashboardStats() {
  const t = useEducatorStatsT();

  return (
    <div className="mb-5 hidden sm:mb-6 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {EDUCATOR_STAT_CONFIG.map((stat, i) => (
        <div
          key={stat.label}
          className={`animate-fade-in-up ${ANIMATION_DELAYS[i]}`}
        >
          <StatCard {...stat} label={t(STAT_LABEL_KEYS[i])} href={stat.href} />
        </div>
      ))}
    </div>
  );
}
