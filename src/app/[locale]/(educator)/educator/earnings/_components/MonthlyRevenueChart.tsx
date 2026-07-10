'use client';

import { useState } from 'react';
import { MONTHLY_REVENUE } from '@/constants/educator';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils/cn';

const REVENUE_MAX = 8000;
const Y_TICKS = [8000, 6000, 4000, 2000, 0];

export function MonthlyRevenueChart() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="border-border bg-card rounded-2xl border p-5 shadow-sm sm:p-6">
      <h3 className="text-foreground mb-5 text-sm font-bold">
        Monthly Revenue
      </h3>

      <div ref={ref} className="flex gap-3">
        {/* Y-axis labels */}
        <div className="relative flex h-72 w-10 shrink-0 flex-col justify-between pb-6">
          {Y_TICKS.map((v) => (
            <span
              key={v}
              className="text-muted-foreground text-right text-[10px] leading-none"
            >
              {v === 0 ? '0' : v.toLocaleString()}
            </span>
          ))}
        </div>

        {/* Chart area */}
        <div className="relative flex-1">
          {/* Grid lines */}
          <div className="absolute inset-x-0 top-0 h-[calc(100%-24px)] pb-0">
            {Y_TICKS.filter((v) => v > 0).map((v) => (
              <div
                key={v}
                className="border-border/40 absolute inset-x-0 border-t border-dashed"
                style={{ bottom: `${(v / REVENUE_MAX) * 100}%` }}
              />
            ))}
          </div>

          {/* Bars + x-labels */}
          <div className="flex h-72 items-end gap-1.5">
            {MONTHLY_REVENUE.map(({ month, amount }, i) => {
              const isHovered = hover === i;
              const dimmed = hover !== null && !isHovered;
              const heightPct = (amount / REVENUE_MAX) * 100;

              return (
                <div
                  key={month}
                  className="group relative flex h-full flex-1 cursor-pointer flex-col items-center justify-end gap-1"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="pointer-events-none absolute -top-1 left-1/2 z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap">
                      <div className="bg-brand-navy rounded-lg px-2.5 py-1.5 text-center shadow-lg">
                        <p className="text-[9px] font-medium tracking-wide text-white/50 uppercase">
                          {month}
                        </p>
                        <p className="text-xs font-bold text-white">
                          ${amount.toLocaleString()}
                        </p>
                      </div>
                      <div className="border-t-brand-navy mx-auto h-0 w-0 border-x-4 border-t-4 border-x-transparent" />
                    </div>
                  )}

                  {/* Bar */}
                  <div className="flex w-full flex-1 items-end pb-6">
                    <div
                      className={cn(
                        'w-full origin-bottom rounded-t-sm transition-all duration-700 ease-out',
                        isHovered
                          ? 'bg-brand-gold shadow-brand-gold/30 shadow-md'
                          : 'bg-amber-400',
                        dimmed && 'opacity-40',
                      )}
                      style={{
                        height: inView ? `${heightPct}%` : '0%',
                        transitionDelay: `${i * 60}ms`,
                      }}
                    />
                  </div>

                  {/* X label */}
                  <span
                    className={cn(
                      'absolute bottom-0 text-[10px] transition-colors',
                      isHovered
                        ? 'text-foreground font-semibold'
                        : 'text-muted-foreground',
                    )}
                  >
                    {month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
