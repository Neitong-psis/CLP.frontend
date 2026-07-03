import { TrendingUp, Users, DollarSign, type LucideIcon } from 'lucide-react';
import { WEEKLY_ENROLLMENTS, TOP_COURSES } from '@/constants/educator';

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
}

const ACCENTS = {
  blue: {
    tile: 'from-accent-blue to-accent-indigo',
    glow: 'group-hover:shadow-accent-blue/30',
    stroke: '#3b5bfd',
  },
  emerald: {
    tile: 'from-emerald-400 to-emerald-600',
    glow: 'group-hover:shadow-emerald-500/30',
    stroke: '#10b981',
  },
  navy: {
    tile: 'from-brand-navy-tint to-brand-navy',
    glow: 'group-hover:shadow-brand-navy/30',
    stroke: '#00003e',
  },
  violet: {
    tile: 'from-violet-400 to-violet-600',
    glow: 'group-hover:shadow-violet-500/30',
    stroke: '#8b5cf6',
  },
} satisfies Record<string, MetricAccent>;

export interface Metric {
  label: string;
  icon: LucideIcon;
  /** Count-up target. */
  target: number;
  /** Decimal places to keep in the count-up display (e.g. 1 for "312.4"). */
  decimals?: number;
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
    label: 'Total Earned',
    icon: DollarSign,
    target: 312.4,
    decimals: 1,
    prefix: '$',
    suffix: 'k',
    change: 'All time',
    caption: 'Lifetime earnings',
    trend: 'up',
    accent: ACCENTS.emerald,
    spark: [220, 240, 255, 270, 285, 295, 305, 312.4],
  },
  {
    label: 'This Month',
    icon: TrendingUp,
    target: 7960,
    prefix: '$',
    suffix: '',
    change: '+24%',
    caption: 'vs last month',
    trend: 'up',
    accent: ACCENTS.blue,
    spark: [5200, 5600, 6100, 6500, 7000, 7300, 7700, 7960],
  },
  {
    label: 'Last Month',
    icon: DollarSign,
    target: 6820,
    prefix: '$',
    suffix: '',
    change: '-3%',
    caption: 'vs prior month',
    trend: 'down',
    accent: ACCENTS.navy,
    spark: [7400, 7200, 7100, 7000, 6950, 6900, 6850, 6820],
  },
  {
    label: 'Revenue/Student',
    icon: Users,
    target: 49,
    prefix: '$',
    suffix: '',
    change: 'avg',
    caption: 'per enrolled learner',
    trend: 'up',
    accent: ACCENTS.violet,
    spark: [42, 44, 45, 46, 47, 48, 48, 49],
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
