'use client';

import { useId, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { useAdminMonthlyRevenueT } from '@/i18n';
import { MONTHLY_REVENUE } from '@/constants/admin';
import { formatCurrencyCompact } from '@/lib/utils/stats';
import { cn } from '@/lib/utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MonthlyRevenueDatum {
  month: string;
  amount: number;
}

interface MonthlyRevenueCardProps {
  data?: MonthlyRevenueDatum[];
  highlightIndex?: number;
  className?: string;
}

// ─── Chart geometry ───────────────────────────────────────────────────────────

const W = 620;
const H = 220;
const PAD = { t: 14, r: 16, b: 30, l: 46 };
const IW = W - PAD.l - PAD.r;
const IH = H - PAD.t - PAD.b;
const BASELINE = PAD.t + IH;
const BAR_RADIUS = 4;

const BAR_NEUTRAL = 'var(--chart-bar-neutral)';
const ACCENT = 'var(--chart-bar)';
const ACCENT_HOVER = 'var(--chart-bar-hover)';
const LABEL = 'var(--chart-axis-text)';
const GRID = 'var(--chart-grid)';

const fmt = formatCurrencyCompact;

// Smallest "1/2/5 x 10^n" value at or above `value` — keeps the y-axis
// readable whether monthly revenue is in the tens or the hundreds of
// thousands, instead of a fixed $100k ceiling that flattens small datasets.
function niceCeiling(value: number): number {
  if (value <= 0) return 10;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const fraction = value / magnitude;
  const niceFraction =
    fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
  return niceFraction * magnitude;
}

// ─── BarChart ─────────────────────────────────────────────────────────────────

function BarChart({ data }: { data: MonthlyRevenueDatum[] }) {
  const uid = useId();
  const [hovered, setHovered] = useState<number | null>(null);

  const yMax = niceCeiling(Math.max(...data.map((d) => d.amount)));
  const yTicks = [1, 2, 3, 4].map((n) => Math.round((yMax * n) / 4));

  const slotW = IW / data.length;
  const barW = slotW * 0.42;

  const hi = hovered !== null ? data[hovered] : null;
  const hiX = hovered !== null ? PAD.l + hovered * slotW + slotW / 2 : 0;
  const hiBarTopY = hi ? BASELINE - (hi.amount / yMax) * IH : 0;
  const latest = data[data.length - 1];

  const boxW = 78;
  const boxH = 40;
  const boxY = 6;
  const boxX = Math.min(Math.max(hiX - boxW / 2, 4), W - boxW - 4);

  const accentGradientId = `revenue-accent-${uid}`;
  const neutralGradientId = `revenue-neutral-${uid}`;
  const plotClipId = `revenue-plot-${uid}`;
  const shadowFilterId = `revenue-shadow-${uid}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Monthly revenue over the last ${data.length} months. Most recent, ${latest.month}: ${fmt(latest.amount)}.`}
    >
      <defs>
        <linearGradient id={accentGradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity={1} />
          <stop offset="100%" stopColor={ACCENT} stopOpacity={0.68} />
        </linearGradient>
        <linearGradient id={neutralGradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={BAR_NEUTRAL} stopOpacity={1} />
          <stop offset="100%" stopColor={BAR_NEUTRAL} stopOpacity={0.55} />
        </linearGradient>
        <clipPath id={plotClipId}>
          <rect x={PAD.l} y={PAD.t} width={IW} height={IH} />
        </clipPath>
        <filter
          id={shadowFilterId}
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="4"
            floodColor="#0f172a"
            floodOpacity={0.18}
          />
        </filter>
      </defs>

      {/* Y-axis gridlines + labels */}
      {yTicks.map((tick) => {
        const y = BASELINE - (tick / yMax) * IH;
        return (
          <g key={tick}>
            <line
              x1={PAD.l}
              x2={PAD.l + IW}
              y1={y}
              y2={y}
              stroke={GRID}
              strokeWidth={1}
              strokeDasharray="2 4"
            />
            <text
              x={PAD.l - 8}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={10}
              fill={LABEL}
            >
              {fmt(tick)}
            </text>
          </g>
        );
      })}
      {/* Baseline — solid, grounds the columns */}
      <line
        x1={PAD.l}
        x2={PAD.l + IW}
        y1={BASELINE}
        y2={BASELINE}
        stroke={GRID}
        strokeWidth={1}
      />

      {/* Bars + month labels */}
      <g clipPath={`url(#${plotClipId})`}>
        {data.map(({ amount }, i) => {
          const barH = (amount / yMax) * IH;
          const x = PAD.l + i * slotW + (slotW - barW) / 2;
          const isHovered = i === hovered;
          const dimmed = hovered !== null && !isHovered;
          return (
            <rect
              key={i}
              x={x}
              y={BASELINE - barH}
              width={barW}
              height={barH + BAR_RADIUS}
              rx={BAR_RADIUS}
              fill={
                dimmed
                  ? `url(#${neutralGradientId})`
                  : isHovered
                    ? ACCENT_HOVER
                    : `url(#${accentGradientId})`
              }
              style={{ transition: 'fill 120ms ease' }}
            />
          );
        })}
      </g>
      {data.map(({ month }, i) => {
        const x = PAD.l + i * slotW + (slotW - barW) / 2;
        const isHovered = i === hovered;
        return (
          <g key={month}>
            <rect
              x={PAD.l + i * slotW}
              y={PAD.t}
              width={slotW}
              height={IH + 20}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
            <text
              x={x + barW / 2}
              y={H - 9}
              textAnchor="middle"
              fontSize={10.5}
              fontWeight={isHovered ? 600 : 400}
              fill={isHovered ? ACCENT : LABEL}
              style={{ transition: 'fill 120ms ease', pointerEvents: 'none' }}
            >
              {month}
            </text>
          </g>
        );
      })}

      {/* Callout — only while actively hovering a bar */}
      {hi && (
        <g style={{ pointerEvents: 'none' }}>
          <line
            x1={hiX}
            x2={hiX}
            y1={boxY + boxH}
            y2={hiBarTopY}
            stroke="var(--chart-grid)"
            strokeWidth={1}
            strokeDasharray="2 3"
          />
          <circle
            cx={hiX}
            cy={hiBarTopY}
            r={3.5}
            fill={ACCENT}
            stroke="var(--chart-dot-halo)"
            strokeWidth={2}
          />
          <rect
            x={boxX}
            y={boxY}
            width={boxW}
            height={boxH}
            rx={9}
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth={1}
            filter={`url(#${shadowFilterId})`}
          />
          <text
            x={boxX + boxW / 2}
            y={boxY + 17}
            textAnchor="middle"
            fontSize={13.5}
            fontWeight={600}
            fill="var(--foreground)"
          >
            {fmt(hi.amount)}
          </text>
          <text
            x={boxX + boxW / 2}
            y={boxY + 31}
            textAnchor="middle"
            fontSize={9.5}
            letterSpacing={0.3}
            fill={LABEL}
          >
            {hi.month.toUpperCase()}
          </text>
        </g>
      )}
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function MonthlyRevenueCard({
  data = MONTHLY_REVENUE,
  highlightIndex,
  className,
}: MonthlyRevenueCardProps) {
  const t = useAdminMonthlyRevenueT();
  const isEmpty = data.length === 0 || data.every((d) => d.amount === 0);
  const hi = highlightIndex ?? data.length - 1;
  const current = data[hi];

  return (
    <section
      className={cn(
        'border-border bg-card flex h-full flex-col rounded-2xl border-[0.5px]',
        className,
      )}
    >
      {/* Header — mirrors UserDistributionCard's header exactly (padding,
          items-baseline, label/value type scale) so both cards' dividers
          land at the same height when placed side by side. */}
      <div className="border-border flex items-baseline justify-between border-b px-5 py-4">
        <p className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
          {t('title')}
        </p>
        {current && !isEmpty && (
          <span className="text-foreground text-[20px] leading-none font-semibold tabular-nums">
            {fmt(current.amount)}
          </span>
        )}
      </div>

      {/* Chart */}
      <div className="flex flex-1 flex-col justify-center px-4 pt-3 pb-4">
        {isEmpty ? (
          <div
            className="flex flex-col items-center justify-center gap-2 text-center"
            style={{ height: H }}
          >
            <TrendingUp
              className="text-muted-foreground/40 size-6"
              aria-hidden="true"
            />
            <p className="text-foreground text-[13px] font-medium">
              {t('emptyTitle')}
            </p>
            <p className="text-muted-foreground max-w-64 text-[12px]">
              {t('emptyDesc')}
            </p>
          </div>
        ) : (
          <BarChart data={data} />
        )}
      </div>
    </section>
  );
}
