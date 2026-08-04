import { TrendingUp, Users, BookOpen, Award } from 'lucide-react';
import type { getTranslations } from 'next-intl/server';
import type { AdminUserRow, AdminCourseRow } from '@/constants/admin';

type AnalyticsT = Awaited<ReturnType<typeof getTranslations>>;

export interface AnalyticsMetric {
  label: string;
  value: string;
  change: string;
  icon: typeof TrendingUp;
  color: string;
}

// Moved verbatim from analytics/page.tsx — same four metrics, same order,
// same formatting. Pulled out so the numbers/labels can be unit-tested
// without rendering the page.
export function buildAnalyticsMetrics(
  t: AnalyticsT,
  users: AdminUserRow[],
  courses: AdminCourseRow[],
): AnalyticsMetric[] {
  return [
    {
      label: t('metricTotalLearners'),
      value: users.filter((u) => u.role === 'Learner').length.toString(),
      change: '+8%',
      icon: Users,
      color: 'bg-blue-500/20 text-blue-400',
    },
    {
      label: t('metricPublishedCourses'),
      value: courses.filter((c) => c.status === 'Public').length.toString(),
      change: '+2',
      icon: BookOpen,
      color: 'bg-brand-gold/20 text-brand-gold',
    },
    {
      label: t('metricAvgRating'),
      value: `${(
        courses.reduce((a, c) => a + c.rating, 0) / courses.length
      ).toFixed(1)}`,
      change: '+5%',
      icon: TrendingUp,
      color: 'bg-emerald-500/20 text-emerald-400',
    },
    {
      label: t('metricTotalEnrollments'),
      value: courses.reduce((a, c) => a + c.enrolled, 0).toLocaleString(),
      change: '+28%',
      icon: Award,
      color: 'bg-purple-500/20 text-purple-400',
    },
  ];
}
