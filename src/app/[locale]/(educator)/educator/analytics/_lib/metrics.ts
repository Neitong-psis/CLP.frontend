import {
  TrendingUp,
  Users,
  BookOpen,
  DollarSign,
  type LucideIcon,
} from 'lucide-react';
import {
  WEEKLY_ENROLLMENTS,
  EDUCATOR_STUDENTS,
  EDUCATOR_COURSES,
  TOP_COURSES,
} from '@/constants/educator';

// ── Metric accents ──────────────────────────────────────────────────────────
// Each KPI gets its own accent so the strip reads as an enterprise overview
// rather than four identical tiles. `stroke` feeds the inline sparkline SVG.

export interface MetricAccent {
  /** Gradient classes for the icon tile (used after `bg-linear-to-br`). */
  tile: string;
  /** Colored shadow revealed on hover. */
  glow: string;
  /** Sparkline + area-gradient colour. */
  stroke: string;
  /** Trend pill colours. */
  badge: string;
}

const ACCENTS = {
  blue: {
    tile: 'from-accent-blue to-accent-indigo',
    glow: 'group-hover:shadow-accent-blue/30',
    stroke: '#3b5bfd',
    badge: 'bg-accent-blue-soft text-accent-blue',
  },
  gold: {
    tile: 'from-brand-gold to-brand-gold-dark',
    glow: 'group-hover:shadow-brand-gold/30',
    stroke: '#f4a300',
    badge: 'bg-amber-50 text-brand-gold-dark',
  },
  emerald: {
    tile: 'from-emerald-400 to-emerald-600',
    glow: 'group-hover:shadow-emerald-500/30',
    stroke: '#10b981',
    badge: 'bg-emerald-50 text-emerald-600',
  },
  navy: {
    tile: 'from-brand-navy-tint to-brand-navy',
    glow: 'group-hover:shadow-brand-navy/30',
    stroke: '#00003e',
    badge: 'bg-indigo-50 text-indigo-600',
  },
} satisfies Record<string, MetricAccent>;

const coursesWithLearners = EDUCATOR_COURSES.filter((c) => c.enrolled > 0);

const publishedCount = EDUCATOR_COURSES.filter(
  (c) => c.status === 'Published',
).length;

const avgCompletion = Math.round(
  coursesWithLearners.reduce((a, c) => a + c.completionRate, 0) /
    coursesWithLearners.length,
);

export interface Metric {
  label: string;
  icon: LucideIcon;
  /** Count-up target. */
  target: number;
  prefix: string;
  suffix: string;
  change: string;
  caption: string;
  trend: 'up' | 'down';
  accent: MetricAccent;
  /** Decorative trend series for the card sparkline. */
  spark: number[];
}

export const METRICS: Metric[] = [
  {
    label: 'Total Students',
    icon: Users,
    target: EDUCATOR_STUDENTS.length,
    prefix: '',
    suffix: '',
    change: '+12.5%',
    caption: 'vs last month',
    trend: 'up',
    accent: ACCENTS.blue,
    spark: [4, 5, 5, 6, 6, 7, 7, 8],
  },
  {
    label: 'Published Courses',
    icon: BookOpen,
    target: publishedCount,
    prefix: '',
    suffix: '',
    change: '+1',
    caption: 'new this month',
    trend: 'up',
    accent: ACCENTS.gold,
    spark: [2, 2, 3, 3, 3, 4, 4, 4],
  },
  {
    label: 'Avg. Completion',
    icon: TrendingUp,
    target: avgCompletion,
    prefix: '',
    suffix: '%',
    change: '+3.2%',
    caption: 'vs last month',
    trend: 'up',
    accent: ACCENTS.emerald,
    spark: [52, 55, 54, 58, 57, 60, 59, 61],
  },
  {
    label: 'Total Revenue',
    icon: DollarSign,
    target: 20208,
    prefix: '$',
    suffix: '',
    change: '+8.4%',
    caption: 'vs last month',
    trend: 'up',
    accent: ACCENTS.navy,
    spark: [12, 14, 15, 16, 17, 18, 19, 20],
  },
];

// ── Weekly enrollments ──────────────────────────────────────────────────────

export const BAR_MAX = Math.max(...WEEKLY_ENROLLMENTS.map((d) => d.count));
export const WEEKLY_TOTAL = WEEKLY_ENROLLMENTS.reduce((a, d) => a + d.count, 0);
export const WEEKLY_AVG = Math.round(WEEKLY_TOTAL / WEEKLY_ENROLLMENTS.length);
export const WEEKLY_PEAK = WEEKLY_ENROLLMENTS.reduce((a, d) =>
  d.count > a.count ? d : a,
);

// ── Completion distribution (donut) ─────────────────────────────────────────
// Sequential heat ramp: low completion (concern) → high completion (healthy).

const COMPLETION_RAW = [
  { label: '0–25%', count: 1, color: '#fb7185' },
  { label: '26–50%', count: 2, color: '#f4a300' },
  { label: '51–75%', count: 3, color: '#6366f1' },
  { label: '76–100%', count: 2, color: '#10b981' },
];

export const COMPLETION_TOTAL = COMPLETION_RAW.reduce((a, s) => a + s.count, 0);

export interface CompletionSegment {
  label: string;
  count: number;
  color: string;
  /** Share of the total, 0–1 (drives the donut arc length). */
  fraction: number;
  /** Cumulative start of the arc, 0–1 (drives the dash offset). */
  offset: number;
  pct: number;
}

export const COMPLETION_SEGMENTS: CompletionSegment[] = (() => {
  let acc = 0;
  return COMPLETION_RAW.map((s) => {
    const fraction = s.count / COMPLETION_TOTAL;
    const seg: CompletionSegment = {
      ...s,
      fraction,
      offset: acc,
      pct: Math.round(fraction * 100),
    };
    acc += fraction;
    return seg;
  });
})();

// ── Course performance table ────────────────────────────────────────────────

const REVENUE_PER_SEAT = 24;

export interface CourseRow {
  rank: number;
  title: string;
  enrolled: number;
  completion: number;
  revenue: number;
  /** Enrolled share of the strongest course, 0–1. */
  share: number;
}

export const COURSE_ROWS: CourseRow[] = (() => {
  const max = Math.max(...TOP_COURSES.map((c) => c.enrolled));
  return TOP_COURSES.map((c, i) => ({
    rank: i + 1,
    title: c.title,
    enrolled: c.enrolled,
    completion: c.completion,
    revenue: c.enrolled * REVENUE_PER_SEAT,
    share: c.enrolled / max,
  }));
})();
