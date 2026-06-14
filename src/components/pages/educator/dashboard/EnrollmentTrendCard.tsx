'use client';

import { useMemo, useRef, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface EnrollmentPoint {
  month: string;
  count: number;
}

export interface EnrollmentTrendCardProps {
  data: readonly EnrollmentPoint[];
  title?: string;
}

type Period = '6M' | '1Y';

const W = 800;
const H = 230;
const PAD_L = 46;
const PAD_R = 18;
const PAD_T = 14;
const PAD_B = 30;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;
const TICKS = 4;

/** Round the data max up to a clean axis ceiling (e.g. 420 → 500). */
function niceCeil(max: number): number {
  const step = 10 ** Math.floor(Math.log10(max));
  return Math.ceil(max / step) * step;
}

function InteractiveChart({ data }: { data: readonly EnrollmentPoint[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const maxVal = niceCeil(Math.max(...data.map((d) => d.count)));
  const px = (i: number) => PAD_L + (i / (data.length - 1)) * PLOT_W;
  const py = (v: number) => PAD_T + PLOT_H - (v / maxVal) * PLOT_H;

  const pts = data.map((d, i) => ({ x: px(i), y: py(d.count) }));

  let linePath = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cpX = (prev.x + curr.x) / 2;
    linePath += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${PAD_T + PLOT_H} L ${PAD_L} ${PAD_T + PLOT_H} Z`;

  const yTicks = Array.from(
    { length: TICKS + 1 },
    (_, i) => (maxVal / TICKS) * i,
  );

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xRatio = (e.clientX - rect.left) / rect.width;
    const plotRatio = (xRatio * W - PAD_L) / PLOT_W;
    const i = Math.round(plotRatio * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, i)));
  }

  const h = hover === null ? null : { ...data[hover], ...pts[hover] };
  const delta =
    hover !== null && hover > 0
      ? data[hover].count - data[hover - 1].count
      : null;

  return (
    <div
      ref={containerRef}
      className="relative cursor-crosshair"
      onPointerMove={handleMove}
      onPointerLeave={() => setHover(null)}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--chart-line)"
              stopOpacity="0.14"
            />
            <stop offset="100%" stopColor="var(--chart-line)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* dotted gridlines */}
        {yTicks.map((v) => (
          <g key={v}>
            <line
              x1={PAD_L}
              y1={py(v)}
              x2={W - PAD_R}
              y2={py(v)}
              stroke="var(--chart-grid)"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
            <text
              x={PAD_L - 10}
              y={py(v) + 4}
              textAnchor="end"
              fill="var(--chart-axis-text)"
              fontSize="11"
            >
              {v}
            </text>
          </g>
        ))}

        <path
          d={areaPath}
          fill="url(#trendArea)"
          className="animate-fade-in delay-500"
        />
        <path
          d={linePath}
          fill="none"
          stroke="var(--chart-line)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          className="animate-draw-line delay-200"
        />

        {/* hover crosshair + highlighted point */}
        {h && (
          <g>
            <line
              x1={h.x}
              y1={PAD_T}
              x2={h.x}
              y2={PAD_T + PLOT_H}
              stroke="var(--chart-accent)"
              strokeWidth="1.25"
              strokeDasharray="4 4"
            />
            <circle
              cx={h.x}
              cy={h.y}
              r="9"
              fill="var(--chart-accent)"
              fillOpacity="0.2"
            />
            <circle
              cx={h.x}
              cy={h.y}
              r="4.5"
              fill="var(--chart-accent)"
              stroke="var(--chart-dot-halo)"
              strokeWidth="2"
            />
          </g>
        )}

        {/* pulsing end point */}
        {!h && (
          <g className="animate-fade-in delay-500">
            <circle
              cx={pts[pts.length - 1].x}
              cy={pts[pts.length - 1].y}
              r="8"
              fill="var(--chart-accent)"
              fillOpacity="0.25"
            >
              <animate
                attributeName="r"
                values="6;10;6"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={pts[pts.length - 1].x}
              cy={pts[pts.length - 1].y}
              r="4"
              fill="var(--chart-accent)"
              stroke="var(--chart-dot-halo)"
              strokeWidth="2"
            />
          </g>
        )}

        {/* x labels */}
        {data.map((d, i) => (
          <text
            key={d.month}
            x={px(i)}
            y={H - 6}
            textAnchor="middle"
            fontSize="11"
            fill={hover === i ? 'var(--chart-line)' : 'var(--chart-axis-text)'}
            fontWeight={hover === i ? 700 : 400}
          >
            {d.month}
          </text>
        ))}
      </svg>

      {/* floating tooltip */}
      {h && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(h.x / W) * 100}%`,
            top: `${(h.y / H) * 100}%`,
            marginTop: '-14px',
          }}
        >
          <div className="bg-brand-navy animate-fade-in rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
            <p className="text-[10px] font-medium text-white/50 uppercase">
              {h.month}
            </p>
            <p className="text-sm font-bold text-white">
              {h.count.toLocaleString()} enrollments
            </p>
            {delta !== null && (
              <p
                className={cn(
                  'text-[10px] font-semibold',
                  delta >= 0 ? 'text-emerald-400' : 'text-rose-400',
                )}
              >
                {delta >= 0 ? '+' : ''}
                {delta} vs prev month
              </p>
            )}
          </div>
          <div className="border-t-brand-navy mx-auto h-0 w-0 border-x-6 border-t-6 border-x-transparent" />
        </div>
      )}
    </div>
  );
}

export function EnrollmentTrendCard({
  data,
  title = 'Enrollment Trend',
}: EnrollmentTrendCardProps) {
  const [period, setPeriod] = useState<Period>('1Y');
  const visible = useMemo(
    () => (period === '6M' ? data.slice(-6) : data),
    [data, period],
  );

  const total = visible.reduce((sum, d) => sum + d.count, 0);
  const growth =
    visible.length > 1
      ? Math.round(
          ((visible[visible.length - 1].count - visible[0].count) /
            visible[0].count) *
            100,
        )
      : 0;

  return (
    <div className="border-border bg-card mb-6 rounded-2xl border p-6 transition-shadow duration-200 hover:shadow-md">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-foreground text-sm font-bold">{title}</h3>
          <div className="mt-1.5 flex items-baseline gap-2.5">
            <p className="text-foreground text-2xl font-black">
              {total.toLocaleString()}
            </p>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              {growth >= 0 ? '+' : ''}
              {growth}%
            </span>
          </div>
          <p className="text-muted-foreground mt-0.5 text-[11px]">
            Total enrollments · {period === '6M' ? 'last 6' : 'last 12'} months
          </p>
        </div>

        {/* period toggle */}
        <div className="border-border bg-muted flex rounded-lg border p-0.5">
          {(['6M', '1Y'] as Period[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={cn(
                'rounded-md px-3 py-1.5 text-xs font-semibold transition-all',
                period === p
                  ? 'text-foreground bg-card ring-border shadow-sm ring-1'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* key remounts the chart so the draw animation replays on toggle */}
      <div key={period}>
        <InteractiveChart data={visible} />
      </div>
    </div>
  );
}
