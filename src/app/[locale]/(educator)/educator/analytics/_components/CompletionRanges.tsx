'use client';

import { useState } from 'react';
import { useEducatorAnalyticsCompletionT } from '@/i18n';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/lib/utils/cn';
import { COMPLETION_SEGMENTS, COMPLETION_TOTAL } from '../_lib/metrics';

export function CompletionRanges() {
  const t = useEducatorAnalyticsCompletionT();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [active, setActive] = useState<number | null>(null);
  const total = useCountUp(COMPLETION_TOTAL, { active: inView });

  return (
    <div
      ref={ref}
      className="border-border bg-card h-full rounded-2xl border p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
    >
      <div className="mb-5">
        <h3 className="text-foreground text-sm font-bold">{t('title')}</h3>
        <p className="text-muted-foreground mt-0.5 text-[11px]">
          {t('subtitle')}
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-7">
        {/* Donut */}
        <div className="relative h-40 w-40 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            {/* Track — uses CSS variable so it respects dark mode */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="13"
            />
            {COMPLETION_SEGMENTS.map((s, i) => {
              const isActive = active === i;
              const faded = active !== null && !isActive;
              return (
                <circle
                  key={s.label}
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke={s.color}
                  strokeWidth={isActive ? 16 : 13}
                  strokeLinecap="butt"
                  pathLength={1}
                  strokeDasharray={inView ? `${s.fraction} 1` : '0 1'}
                  strokeDashoffset={-s.offset}
                  className="transition-all duration-700 ease-out"
                  style={{
                    transitionDelay: `${i * 130}ms`,
                    opacity: faded ? 0.3 : 1,
                  }}
                />
              );
            })}
          </svg>

          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {active === null ? (
              <>
                <span className="text-foreground text-2xl font-black tabular-nums">
                  {Math.round(total)}
                </span>
                <span className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
                  {t('students')}
                </span>
              </>
            ) : (
              <>
                <span
                  className="text-2xl font-black tabular-nums"
                  style={{ color: COMPLETION_SEGMENTS[active].color }}
                >
                  {COMPLETION_SEGMENTS[active].pct}%
                </span>
                <span className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
                  {t('count', { count: COMPLETION_SEGMENTS[active].count })}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        <ul className="w-full space-y-1">
          {COMPLETION_SEGMENTS.map((s, i) => (
            <li key={s.label}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={cn(
                  '-mx-2 flex w-[calc(100%+1rem)] items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left transition-colors',
                  active === i ? 'bg-muted/60' : 'hover:bg-muted/40',
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-200"
                    style={{
                      backgroundColor: s.color,
                      transform: active === i ? 'scale(1.4)' : 'scale(1)',
                    }}
                  />
                  <span className="text-foreground text-xs font-medium">
                    {t('complete', { label: s.label })}
                  </span>
                </span>
                <span className="text-muted-foreground text-[11px] tabular-nums">
                  {s.count}
                  <span className="text-muted-foreground/50"> · {s.pct}%</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
