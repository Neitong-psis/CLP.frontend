'use client';

import { useMemo, useRef, useEffect, useState } from 'react';
import { WEEKLY_ACTIVITY } from '@/constants/learner';
import { useLearnerDashboardT } from '@/i18n';
import { useInView } from '@/hooks/useInView';
import { entranceClass, entranceStyle } from '@/lib/utils/animation';
import { cn } from '@/lib/utils/cn';

type TFn = ReturnType<typeof useLearnerDashboardT>;

/* Weekdays only — matches the Figma artboard + "weekday target" copy. */
const DATA = WEEKLY_ACTIVITY.slice(0, 5);

const VIEW_W = 560;
const VIEW_H = 210;
const PAD = { top: 18, right: 10, bottom: 34, left: 56 };
const CHART_W = VIEW_W - PAD.left - PAD.right;
const CHART_H = VIEW_H - PAD.top - PAD.bottom;
const MAX_MIN = 120;
const TARGET_MIN = 60;
const Y_TICKS = [0, 30, 60, 90, 120] as const;
const BRAND_GOLD = '#f4a300';
const COUNT = DATA.length;
const COL_W = CHART_W / (COUNT - 1);

function toPoint(index: number, minutes: number) {
  return {
    x: PAD.left + (index / (COUNT - 1)) * CHART_W,
    y: PAD.top + CHART_H - (minutes / MAX_MIN) * CHART_H,
  };
}

function buildPaths(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return { line: '', area: '' };
  let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1];
    const c = pts[i];
    const mx = ((p.x + c.x) / 2).toFixed(1);
    d += ` C ${mx},${p.y.toFixed(1)} ${mx},${c.y.toFixed(1)} ${c.x.toFixed(1)},${c.y.toFixed(1)}`;
  }
  const bottom = (PAD.top + CHART_H).toFixed(1);
  return {
    line: d,
    area: `${d} L ${pts[pts.length - 1].x.toFixed(1)},${bottom} L ${pts[0].x.toFixed(1)},${bottom} Z`,
  };
}

export default function ActivityChart() {
  const t = useLearnerDashboardT();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const lineRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const { points, linePath, areaPath } = useMemo(() => {
    const pts = DATA.map((d, i) => toPoint(i, d.minutes));
    const { line, area } = buildPaths(pts);
    return { points: pts, linePath: line, areaPath: area };
  }, []);

  useEffect(() => {
    if (lineRef.current) setPathLen(lineRef.current.getTotalLength());
  }, [linePath]);

  const effective = pathLen || 2000;
  const hoveredPt = hovered !== null ? points[hovered] : null;
  const hoveredDay = hovered !== null ? DATA[hovered] : null;

  return (
    <div
      ref={ref}
      className={cn(
        'border-border bg-card rounded-2xl border p-5 shadow-sm sm:p-6',
        entranceClass(inView, 'md'),
      )}
      style={entranceStyle(inView, 200)}
    >
      {/* Header */}
      <div className="mb-2 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-foreground text-lg font-bold tracking-tight">
            {t('learningActivity')}
          </h3>
          <p className="text-muted-foreground mt-1 text-sm">
            {t('activitySubtitle')}
          </p>
        </div>
        <span className="border-border text-foreground/70 shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold">
          {t('thisWeek')}
        </span>
      </div>

      {/* Chart + overlay tooltip */}
      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          className="block w-full"
          style={{ height: 'auto' }}
          role="img"
          aria-label="Weekly learning activity in minutes"
          onMouseLeave={() => setHovered(null)}
        >
          <defs>
            <linearGradient id="cg-fill" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--foreground)"
                stopOpacity="0.13"
              />
              <stop
                offset="85%"
                stopColor="var(--foreground)"
                stopOpacity="0"
              />
            </linearGradient>
            <filter id="cg-glow" x="-8%" y="-25%" width="116%" height="170%">
              <feDropShadow
                dx="0"
                dy="3"
                stdDeviation="4"
                floodColor={BRAND_GOLD}
                floodOpacity="0.28"
              />
            </filter>
          </defs>

          {/* Dashed horizontal grid + Y labels */}
          {Y_TICKS.map((tick) => {
            const y = PAD.top + CHART_H - (tick / MAX_MIN) * CHART_H;
            return (
              <g key={tick}>
                <line
                  x1={PAD.left}
                  y1={y}
                  x2={VIEW_W - PAD.right}
                  y2={y}
                  stroke="var(--chart-grid)"
                  strokeWidth="1"
                  strokeDasharray="5 5"
                />
                <text
                  x={PAD.left - 12}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize="11"
                  fontWeight="500"
                  fill="var(--muted-foreground)"
                >
                  {t('yAxisMin', { value: tick })}
                </text>
              </g>
            );
          })}

          {/* X labels */}
          {DATA.map((d, i) => {
            const x = PAD.left + (i / (COUNT - 1)) * CHART_W;
            const isHov = hovered === i;
            return (
              <text
                key={d.day}
                x={x}
                y={VIEW_H - 6}
                textAnchor="middle"
                fontSize="12"
                fill={isHov ? BRAND_GOLD : 'var(--muted-foreground)'}
                fontWeight={isHov ? '700' : '500'}
                style={{ transition: 'fill 0.15s' }}
              >
                {t(`weekdaysShort.${d.day}`)}
              </text>
            );
          })}

          {/* Area fill */}
          <path
            d={areaPath}
            fill="url(#cg-fill)"
            className={cn(
              'transition-opacity duration-700',
              inView ? 'opacity-100' : 'opacity-0',
            )}
          />

          {/* Crosshair on hover */}
          {hoveredPt && (
            <line
              x1={hoveredPt.x}
              y1={PAD.top}
              x2={hoveredPt.x}
              y2={PAD.top + CHART_H}
              stroke={BRAND_GOLD}
              strokeWidth="1.25"
              strokeDasharray="3 3"
              opacity="0.45"
            />
          )}

          {/* Line — solid (matches Figma); soft glow only while hovering */}
          <path
            ref={lineRef}
            d={linePath}
            fill="none"
            stroke={BRAND_GOLD}
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={hovered !== null ? 'url(#cg-glow)' : undefined}
            strokeDasharray={effective}
            strokeDashoffset={inView ? 0 : effective}
            style={{
              transition: inView
                ? 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)'
                : 'none',
            }}
          />

          {/* Hover hit areas + on-demand dots (none shown at rest) */}
          {points.map((pt, i) => {
            const isHov = hovered === i;
            const hitX = i === 0 ? PAD.left : pt.x - COL_W / 2;
            const hitW = i === 0 || i === COUNT - 1 ? COL_W / 2 : COL_W;
            return (
              <g key={DATA[i].day}>
                <rect
                  x={hitX}
                  y={PAD.top}
                  width={hitW}
                  height={CHART_H}
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHovered(i)}
                />
                {/* Soft halo */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHov ? 11 : 0}
                  fill={BRAND_GOLD}
                  opacity={0.14}
                  style={{ transition: 'r 0.22s ease-out' }}
                />
                {/* Dot — fades/scales in on hover only */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHov ? 5.5 : 0}
                  fill={BRAND_GOLD}
                  stroke="var(--chart-dot-halo)"
                  strokeWidth="2.5"
                  style={{
                    opacity: isHov ? 1 : 0,
                    transition: 'r 0.22s ease-out, opacity 0.18s ease-out',
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* HTML tooltip overlay */}
        {hoveredPt && hoveredDay && (
          <Tooltip
            xPct={(hoveredPt.x / VIEW_W) * 100}
            yPct={(hoveredPt.y / VIEW_H) * 100}
            below={hoveredPt.y < 58}
            day={t(`weekdaysFull.${hoveredDay.day}`)}
            minutes={hoveredDay.minutes}
            t={t}
          />
        )}
      </div>
    </div>
  );
}

interface TooltipProps {
  xPct: number;
  yPct: number;
  below: boolean;
  day: string;
  minutes: number;
  t: TFn;
}

function Tooltip({ xPct, yPct, below, day, minutes, t }: TooltipProps) {
  const delta = minutes - TARGET_MIN;
  const above = delta >= 0;

  return (
    <div
      className={cn(
        'pointer-events-none absolute z-20 w-max -translate-x-1/2',
        below ? 'mt-3' : '-mt-3 -translate-y-full',
      )}
      style={{ left: `${xPct}%`, top: `${yPct}%` }}
    >
      <div className="border-border bg-card relative rounded-lg border px-3 py-2 shadow-lg">
        <div className="flex items-center gap-1.5">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: BRAND_GOLD }}
          />
          <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
            {day}
          </span>
        </div>
        <div className="mt-0.5 flex items-baseline gap-1">
          <span className="text-foreground text-lg leading-none font-black tabular-nums">
            {minutes}
          </span>
          <span className="text-muted-foreground text-[11px]">
            {t('minUnit')}
          </span>
        </div>
        <div
          className={cn(
            'mt-1 text-[10px] font-semibold',
            above
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-rose-500 dark:text-rose-400',
          )}
        >
          {above ? '▲' : '▼'} {t('vsTarget', { value: Math.abs(delta) })}
        </div>

        {/* Caret */}
        <div
          className={cn(
            'border-border bg-card absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45',
            below ? '-top-1 border-t border-l' : '-bottom-1 border-r border-b',
          )}
        />
      </div>
    </div>
  );
}
