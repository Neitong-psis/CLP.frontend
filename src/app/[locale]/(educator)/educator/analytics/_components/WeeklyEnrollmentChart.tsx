'use client';

import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { useEducatorAnalyticsWeeklyT } from '@/i18n';
import { WEEKLY_ENROLLMENTS } from '@/constants/educator';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils/cn';
import {
  BAR_MAX,
  WEEKLY_TOTAL,
  WEEKLY_AVG,
  WEEKLY_PEAK,
} from '../_lib/metrics';

export function WeeklyEnrollmentChart() {
  const t = useEducatorAnalyticsWeeklyT();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div
      ref={ref}
      className="border-border bg-card h-full rounded-2xl border p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-foreground text-sm font-bold">{t('title')}</h3>
          <p className="text-muted-foreground mt-0.5 text-[11px]">
            {t('subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-muted/40 text-muted-foreground rounded-lg px-2.5 py-1 text-[11px] font-semibold">
            {t('total', { count: WEEKLY_TOTAL })}
          </span>
          <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-500">
            <TrendingUp className="h-3 w-3" />
            {t('peak', { day: WEEKLY_PEAK.day })}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative flex h-44 items-end gap-2 sm:gap-3">
        {/* Average reference line */}
        <div
          className="pointer-events-none absolute inset-x-0 z-10 flex items-center"
          style={{ bottom: `${(WEEKLY_AVG / BAR_MAX) * 100}%` }}
        >
          <div className="border-border h-px flex-1 border-t border-dashed" />
          <span className="bg-muted text-muted-foreground ml-2 rounded px-1.5 py-0.5 text-[9px] font-semibold">
            {t('avg', { avg: WEEKLY_AVG })}
          </span>
        </div>

        {WEEKLY_ENROLLMENTS.map(({ day, count }, i) => {
          const isHovered = hover === i;
          const dimmed = hover !== null && !isHovered;
          return (
            <div
              key={day}
              className="group relative flex h-full flex-1 cursor-pointer flex-col items-center justify-end gap-1.5"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              {/* Tooltip */}
              <div
                className={cn(
                  'pointer-events-none absolute -top-1 left-1/2 z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap transition-all duration-200',
                  isHovered ? 'opacity-100' : 'translate-y-[-90%] opacity-0',
                )}
              >
                <div className="bg-brand-navy rounded-lg px-2.5 py-1.5 text-center shadow-lg">
                  <p className="text-[9px] font-medium tracking-wide text-white/50 uppercase">
                    {day}
                  </p>
                  <p className="text-xs font-bold text-white">
                    {count} <span className="font-normal">{t('enrolls')}</span>
                  </p>
                </div>
                <div className="border-t-brand-navy mx-auto h-0 w-0 border-x-4 border-t-4 border-x-transparent" />
              </div>

              {/* Count label */}
              <span
                className={cn(
                  'text-[10px] font-semibold transition-colors',
                  isHovered ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {count}
              </span>

              {/* Bar */}
              <div className="flex w-full flex-1 items-end">
                <div
                  className={cn(
                    'w-full origin-bottom rounded-t-md bg-linear-to-t transition-all duration-700 ease-out',
                    isHovered
                      ? 'from-brand-gold-dark to-brand-gold shadow-brand-gold/30 shadow-lg'
                      : 'from-brand-gold/70 to-brand-gold/90',
                    dimmed && 'opacity-40',
                  )}
                  style={{
                    height: inView ? `${(count / BAR_MAX) * 100}%` : '0%',
                    transitionDelay: `${i * 70}ms`,
                  }}
                />
              </div>

              {/* Day label */}
              <span
                className={cn(
                  'text-[10px] transition-colors',
                  isHovered
                    ? 'text-foreground font-semibold'
                    : 'text-muted-foreground',
                )}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
