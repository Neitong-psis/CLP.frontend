'use client';

import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
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
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div
      ref={ref}
      className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
    >
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-brand-navy text-sm font-bold">
            Weekly Enrollments
          </h3>
          <p className="mt-0.5 text-[11px] text-slate-400">
            New enrollments into your courses per day
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
            {WEEKLY_TOTAL} total
          </span>
          <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            Peak {WEEKLY_PEAK.day}
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
          <div className="h-px flex-1 border-t border-dashed border-slate-300" />
          <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-400">
            avg {WEEKLY_AVG}
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
                    {count} <span className="font-normal">enrolls</span>
                  </p>
                </div>
                <div className="border-t-brand-navy mx-auto h-0 w-0 border-x-4 border-t-4 border-x-transparent" />
              </div>

              {/* Count label */}
              <span
                className={cn(
                  'text-[10px] font-semibold transition-colors',
                  isHovered ? 'text-brand-navy' : 'text-slate-400',
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
                    ? 'text-brand-navy font-semibold'
                    : 'text-slate-400',
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
