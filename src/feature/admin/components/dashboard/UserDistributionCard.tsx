'use client';

import { useState } from 'react';
import { cn } from '@/utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RoleSegment {
  label: string;
  count: number;
  color: string;
}

export interface UserDistributionCardProps {
  data?: RoleSegment[];
  period?: string;
  className?: string;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_DATA: RoleSegment[] = [
  { label: 'Learners', count: 4, color: '#6366f1' },
  { label: 'Educators', count: 2, color: '#10b981' },
  { label: 'Admins', count: 1, color: '#f59e0b' },
];

// ─── Donut geometry (160 × 160 px) ───────────────────────────────────────────

const SIZE = 160;
const CENTER = SIZE / 2;
const R = 62;
const STROKE = 16;
const GAP = 4;

function polar(deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [CENTER + R * Math.cos(a), CENTER + R * Math.sin(a)];
}

function arcPath(start: number, end: number): string {
  const [x0, y0] = polar(start);
  const [x1, y1] = polar(end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function UserDistributionCard({
  data = DEFAULT_DATA,
  period = 'Live user records',
  className,
}: UserDistributionCardProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const total = data.reduce((sum, d) => sum + d.count, 0);

  const segments = data.map((d) => ({
    ...d,
    pct: total > 0 ? Math.round((d.count / total) * 100) : 0,
    len: total > 0 ? (d.count / total) * 100 : 0,
  }));

  const arcs = segments.map((seg, i) => {
    const startDeg =
      (segments.slice(0, i).reduce((sum, s) => sum + s.len, 0) / 100) * 360;
    return { ...seg, startDeg, endDeg: startDeg + (seg.len / 100) * 360 };
  });

  const active = activeIdx !== null ? segments[activeIdx] : null;

  return (
    <section
      className={cn(
        'flex h-full flex-col rounded-2xl border-[0.5px] border-slate-200 bg-white',
        className,
      )}
      aria-label="User distribution"
    >
      {/* Header */}
      <div className="flex items-baseline justify-between border-b border-slate-100 px-5 py-4">
        <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          User Distribution
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-[20px] leading-none font-semibold text-slate-900 tabular-nums">
            {total.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400">users</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-5 py-6">
        {/* Donut */}
        <div className="relative size-40 shrink-0">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="size-full"
            role="img"
            aria-label={arcs.map((a) => `${a.label} ${a.pct}%`).join(', ')}
          >
            {arcs.map((a, i) => {
              const sweep = a.endDeg - a.startDeg;
              const isActive = activeIdx === null || activeIdx === i;
              const arcStyle = {
                opacity: isActive ? 1 : 0.2,
                transition: 'opacity 200ms ease, stroke-width 200ms ease',
              };
              const sw = activeIdx === i ? STROKE + 4 : STROKE;
              // Wide transparent hit area makes the thin arc easy to target
              const HIT = STROKE + 16;

              if (sweep >= 359.99) {
                return (
                  <g
                    key={a.label}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setActiveIdx(i)}
                    onMouseLeave={() => setActiveIdx(null)}
                  >
                    <circle
                      cx={CENTER}
                      cy={CENTER}
                      r={R}
                      fill="none"
                      stroke="transparent"
                      strokeWidth={HIT}
                    />
                    <circle
                      cx={CENTER}
                      cy={CENTER}
                      r={R}
                      fill="none"
                      stroke={a.color}
                      strokeWidth={sw}
                      style={arcStyle}
                    />
                  </g>
                );
              }
              const gap = sweep > GAP ? GAP : 0;
              const d = arcPath(a.startDeg, a.endDeg - gap);
              return (
                <g
                  key={a.label}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                >
                  {/* Invisible wide stroke for easier targeting */}
                  <path
                    d={d}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={HIT}
                  />
                  <path
                    d={d}
                    fill="none"
                    stroke={a.color}
                    strokeWidth={sw}
                    style={arcStyle}
                  />
                </g>
              );
            })}
          </svg>

          {/* Centre label — updates on hover */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-[30px] leading-none font-semibold tabular-nums transition-colors duration-200"
              style={{ color: active ? active.color : '#0f172a' }}
            >
              {active ? active.count : total}
            </span>
            <span className="mt-1 text-[12px] text-slate-500 transition-all duration-200">
              {active ? active.label.toLowerCase() : 'total'}
            </span>
          </div>
        </div>

        {/* Legend rows with progress bars */}
        <ul className="w-full space-y-3">
          {segments.map((seg, i) => {
            const isActive = activeIdx === null || activeIdx === i;
            return (
              <li
                key={seg.label}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
                className="cursor-default"
                style={{
                  opacity: isActive ? 1 : 0.4,
                  transition: 'opacity 200ms ease',
                }}
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-full transition-transform duration-200"
                    style={{
                      backgroundColor: seg.color,
                      transform: activeIdx === i ? 'scale(1.4)' : 'scale(1)',
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      'flex-1 text-[13px] transition-colors duration-200',
                      activeIdx === i
                        ? 'font-medium text-slate-900'
                        : 'text-slate-700',
                    )}
                  >
                    {seg.label}
                  </span>
                  <span className="text-[13px] font-semibold text-slate-900 tabular-nums">
                    {seg.count}
                  </span>
                  <span className="w-9 text-right text-[12px] text-slate-400 tabular-nums">
                    {seg.pct}%
                  </span>
                </div>
                <div
                  className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-valuenow={seg.pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${seg.label}: ${seg.pct}%`}
                >
                  <div
                    className="h-full rounded-full transition-all duration-200"
                    style={{
                      width: `${seg.pct}%`,
                      backgroundColor: seg.color,
                      filter: activeIdx === i ? 'brightness(1.15)' : 'none',
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-1.5 border-t border-slate-100 px-5 py-3">
        <span
          className="size-1.5 animate-pulse rounded-full bg-emerald-400"
          aria-hidden="true"
        />
        <span className="text-[11px] text-slate-400">{period}</span>
      </div>
    </section>
  );
}
