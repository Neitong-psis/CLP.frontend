'use client';

import { useMemo } from 'react';
import { TrendingUp, Sparkles, Star } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useEducatorGreetingHeroT } from '@/i18n';
import {
  EDUCATOR_USER,
  EDUCATOR_STAT_CONFIG,
  MONTHLY_ENROLLMENTS,
} from '@/constants/educator';

// ── Sparkline geometry ────────────────────────────────────────────────────────

const SPARK_W = 300;
const SPARK_H = 56;
const SPARK_VALUES = MONTHLY_ENROLLMENTS.map((d) => d.count);
const SPARK_MIN = Math.min(...SPARK_VALUES);
const SPARK_MAX = Math.max(...SPARK_VALUES);
const SPARK_POINTS = SPARK_VALUES.map((v, i) => ({
  x: (i / (SPARK_VALUES.length - 1)) * SPARK_W,
  y: SPARK_H - 4 - ((v - SPARK_MIN) / (SPARK_MAX - SPARK_MIN)) * (SPARK_H - 16),
}));

const SPARK_LINE = SPARK_POINTS.reduce((d, p, i) => {
  if (i === 0) return `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  const prev = SPARK_POINTS[i - 1];
  const cx = ((prev.x + p.x) / 2).toFixed(1);
  return `${d} C ${cx} ${prev.y.toFixed(1)}, ${cx} ${p.y.toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
}, '');
const SPARK_AREA = `${SPARK_LINE} L ${SPARK_W} ${SPARK_H} L 0 ${SPARK_H} Z`;
const SPARK_END = SPARK_POINTS[SPARK_POINTS.length - 1];

// ── Rating ring geometry ──────────────────────────────────────────────────────

const RATING_VALUE = parseFloat(EDUCATOR_STAT_CONFIG[2].value);
const RING_R = 18;
const RING_CIRC = 2 * Math.PI * RING_R;
const RING_DASH = (RATING_VALUE / 5) * RING_CIRC;

// ── Component ─────────────────────────────────────────────────────────────────

export function GreetingHero() {
  const t = useEducatorGreetingHeroT();
  const locale = useLocale();

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return t('morning');
    if (h < 18) return t('afternoon');
    return t('evening');
  }, [t]);

  const todayLabel = useMemo(
    () =>
      new Date().toLocaleDateString(locale === 'km' ? 'km-KH' : 'en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
    [locale],
  );

  const revenue = EDUCATOR_STAT_CONFIG[3];
  const students = EDUCATOR_STAT_CONFIG[0];
  const courses = EDUCATOR_STAT_CONFIG[1];
  const rating = EDUCATOR_STAT_CONFIG[2];

  return (
    <div className="animate-fade-in-up mb-5 sm:hidden">
      <div className="border-border bg-card rounded-3xl border p-5 shadow-sm">
        {/* ── Greeting row ─────────────────────────────────────────────── */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="text-brand-gold h-3.5 w-3.5" />
              <p className="text-muted-foreground text-[11px] font-medium">
                {greeting}
              </p>
            </div>
            <p className="text-foreground mt-1 text-lg font-bold">
              {EDUCATOR_USER.name}
            </p>
            <span className="border-brand-gold/30 bg-brand-gold/10 text-brand-gold mt-1.5 inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold">
              {EDUCATOR_USER.role}
            </span>
          </div>

          {/* Live date pill */}
          <div className="border-border bg-muted/60 flex items-center gap-1.5 rounded-full border px-2.5 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <p className="text-muted-foreground text-[10px] font-semibold">
              {todayLabel}
            </p>
          </div>
        </div>

        {/* ── Revenue card — full-width featured ───────────────────────── */}
        <div className="border-border from-brand-gold/8 relative mb-3 overflow-hidden rounded-2xl border bg-linear-to-br to-transparent">
          <div className="flex items-start justify-between px-4 pt-4 pb-2">
            <div>
              <p className="text-muted-foreground text-[9px] font-semibold tracking-widest uppercase">
                {t('monthlyRevenue')}
              </p>
              <p className="text-brand-gold mt-1 text-3xl font-black tracking-tight">
                {revenue.value}
              </p>
            </div>
            <span className="mt-1 flex items-center gap-0.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-3 w-3" />
              {revenue.change}
            </span>
          </div>

          {/* Full-width sparkline flush to bottom */}
          <svg
            viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
            preserveAspectRatio="none"
            className="h-14 w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="sparkFill2" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-brand-gold)"
                  stopOpacity="0.28"
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-brand-gold)"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            <path d={SPARK_AREA} fill="url(#sparkFill2)" />
            <path
              d={SPARK_LINE}
              fill="none"
              stroke="var(--color-brand-gold)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <circle
              cx={SPARK_END.x}
              cy={SPARK_END.y}
              r="3"
              fill="var(--color-brand-gold)"
            />
          </svg>
        </div>

        {/* ── Stats row — 3 equal columns ──────────────────────────────── */}
        <div className="grid grid-cols-3 gap-2">
          {/* Rating */}
          <div className="border-border bg-muted/40 flex flex-col items-center justify-center rounded-2xl border p-3">
            <div className="relative h-11 w-11">
              <svg
                viewBox="0 0 44 44"
                className="h-11 w-11 -rotate-90"
                aria-hidden
              >
                <circle
                  cx="22"
                  cy="22"
                  r={RING_R}
                  fill="none"
                  stroke="var(--color-muted)"
                  strokeWidth="3.5"
                />
                <circle
                  cx="22"
                  cy="22"
                  r={RING_R}
                  fill="none"
                  stroke="var(--color-brand-gold)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={`${RING_DASH} ${RING_CIRC}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-foreground text-[13px] font-black">
                  {rating.value}
                </span>
              </div>
            </div>
            <div className="mt-1.5 flex items-center gap-0.5">
              <Star className="h-2.5 w-2.5 fill-current text-amber-400" />
              <p className="text-muted-foreground text-[9px]">{t('rating')}</p>
            </div>
          </div>

          {/* Students */}
          <div className="border-border bg-muted/40 flex flex-col justify-center rounded-2xl border p-3.5">
            <students.icon className="text-brand-gold/70 mb-1.5 h-3.5 w-3.5" />
            <p className="text-foreground text-base leading-none font-black">
              {students.value}
            </p>
            <p className="text-muted-foreground mt-1 text-[9px]">
              {t('students')}
            </p>
            <p className="mt-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
              {students.change}
            </p>
          </div>

          {/* Courses */}
          <div className="border-border bg-muted/40 flex flex-col justify-center rounded-2xl border p-3.5">
            <div className="bg-brand-gold/15 mb-1.5 flex h-6 w-6 items-center justify-center rounded-lg">
              <courses.icon className="text-brand-gold h-3.5 w-3.5" />
            </div>
            <p className="text-foreground text-base leading-none font-black">
              {courses.value}
            </p>
            <p className="text-muted-foreground mt-1 text-[9px]">
              {t('publishedCourses')}
            </p>
            <p className="mt-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
              {courses.change}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
