'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils/cn';

export interface RevenueCategory {
  name: string;
  amount: string;
  pct: number;
}

export interface RevenueByCategoryCardProps {
  data: readonly RevenueCategory[];
  className?: string;
}

export function RevenueByCategoryCard({
  data,
  className,
}: RevenueByCategoryCardProps) {
  const [mounted, setMounted] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={cn(
        'border-border bg-card flex h-full flex-col rounded-2xl border-[0.5px] p-6',
        className,
      )}
    >
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-foreground text-[14px] font-medium">
            Revenue by Category
          </h3>
          <p className="text-muted-foreground mt-0.5 text-[12px]">
            Top earners this month
          </p>
        </div>
        <span className="bg-muted text-muted-foreground shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium">
          {data.length}
        </span>
      </div>

      {/* Rows — flex-1 + justify-between fills card height evenly */}
      <ul className="flex flex-1 flex-col justify-between">
        {data.map((cat, i) => {
          const isHovered = hoveredIdx === i;
          const isDimmed = hoveredIdx !== null && !isHovered;

          return (
            <li
              key={cat.name}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="group cursor-default"
              style={{
                opacity: isDimmed ? 0.35 : 1,
                transition: 'opacity 180ms ease',
              }}
            >
              {/* Top row: rank + name + amount */}
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={cn(
                    'w-4 shrink-0 text-center text-[11px] tabular-nums',
                    i === 0
                      ? 'text-accent-blue font-semibold'
                      : 'text-muted-foreground font-medium',
                  )}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>

                <span className="text-foreground min-w-0 flex-1 truncate text-[13px] font-medium">
                  {cat.name}
                </span>

                <span
                  className={cn(
                    'shrink-0 text-[13px] font-semibold tabular-nums transition-colors duration-150',
                    isHovered ? 'text-accent-blue' : 'text-foreground',
                  )}
                >
                  {cat.amount}
                </span>
              </div>

              {/* Bar row */}
              <div className="flex items-center gap-2 pl-6">
                <div
                  className="bg-muted h-2 flex-1 overflow-hidden rounded-full"
                  role="progressbar"
                  aria-valuenow={cat.pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${cat.name}: ${cat.pct}%`}
                >
                  <div
                    className="h-full rounded-full transition-[width] ease-out"
                    style={{
                      width: mounted ? `${cat.pct}%` : '0%',
                      backgroundColor: isHovered
                        ? 'var(--chart-bar-hover)'
                        : 'var(--chart-bar)',
                      transitionDuration: `${500 + i * 70}ms`,
                      transitionDelay: mounted ? `${i * 55}ms` : '0ms',
                    }}
                  />
                </div>
                <span className="text-muted-foreground w-8 shrink-0 text-right text-[11px] tabular-nums">
                  {cat.pct}%
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
