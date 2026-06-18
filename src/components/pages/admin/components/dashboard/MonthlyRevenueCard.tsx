'use client';

import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAdminMonthlyRevenueT } from '@/i18n';
import { MONTHLY_REVENUE } from '@/constants/admin';
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
const PAD = { t: 12, r: 16, b: 28, l: 48 };
const IW = W - PAD.l - PAD.r;
const IH = H - PAD.t - PAD.b;
const BASELINE = PAD.t + IH;
const Y_MAX = 100;
const Y_TICKS = [25, 50, 75, 100];

const BAR_DEFAULT = 'var(--chart-bar-neutral)';
const BAR_HOVER = 'var(--chart-bar-neutral-hover)';
const ACCENT = 'var(--chart-bar)';
const LABEL = 'var(--chart-axis-text)';
const GRID = 'var(--chart-grid)';

const fmt = (v: number) => `$${v}k`;

// ─── BarChart ─────────────────────────────────────────────────────────────────

function BarChart({
  data,
  highlightIndex,
}: {
  data: MonthlyRevenueDatum[];
  highlightIndex: number;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  const activeIndex = hovered ?? highlightIndex;
  const slotW = IW / data.length;
  const barW = slotW * 0.5;

  const hi = data[activeIndex];
  const hiX = PAD.l + activeIndex * slotW + slotW / 2;
  const hiBarTopY = BASELINE - ((hi?.amount ?? 0) / Y_MAX) * IH;

  const boxW = 74;
  const boxH = 38;
  const boxY = 8;
  const boxX = Math.min(Math.max(hiX - boxW / 2, 4), W - boxW - 4);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Monthly revenue. ${hi?.month ?? ''}: ${fmt(hi?.amount ?? 0)}.`}
    >
      {/* Y-axis gridlines + labels */}
      {Y_TICKS.map((tick) => {
        const y = BASELINE - (tick / Y_MAX) * IH;
        return (
          <g key={tick}>
            <line
              x1={PAD.l}
              x2={PAD.l + IW}
              y1={y}
              y2={y}
              stroke={GRID}
              strokeWidth={1}
            />
            <text
              x={PAD.l - 6}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={10}
              fill={LABEL}
            >
              ${tick}k
            </text>
          </g>
        );
      })}

      {/* Bars + month labels */}
      {data.map(({ month, amount }, i) => {
        const barH = (amount / Y_MAX) * IH;
        const x = PAD.l + i * slotW + (slotW - barW) / 2;
        const isActive = i === activeIndex;
        return (
          <g
            key={month}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <rect
              x={PAD.l + i * slotW}
              y={PAD.t}
              width={slotW}
              height={IH + 20}
              fill="transparent"
            />
            <rect
              x={x}
              y={BASELINE - barH}
              width={barW}
              height={barH}
              rx={5}
              fill={isActive ? ACCENT : hovered === i ? BAR_HOVER : BAR_DEFAULT}
              style={{ transition: 'fill 120ms ease' }}
            />
            <text
              x={x + barW / 2}
              y={H - 8}
              textAnchor="middle"
              fontSize={11}
              fill={isActive ? ACCENT : LABEL}
              style={{ transition: 'fill 120ms ease' }}
            >
              {month}
            </text>
          </g>
        );
      })}

      {/* Callout for active bar */}
      {hi && (
        <g style={{ pointerEvents: 'none' }}>
          <line
            x1={hiX}
            x2={hiX}
            y1={boxY + boxH}
            y2={hiBarTopY}
            stroke="var(--chart-grid)"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
          <circle
            cx={hiX}
            cy={hiBarTopY}
            r={4}
            fill={ACCENT}
            stroke="var(--chart-dot-halo)"
            strokeWidth={2}
          />
          <rect
            x={boxX}
            y={boxY}
            width={boxW}
            height={boxH}
            rx={8}
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth={1}
          />
          <text
            x={boxX + boxW / 2}
            y={boxY + 16}
            textAnchor="middle"
            fontSize={13}
            fontWeight={500}
            fill="var(--foreground)"
          >
            {fmt(hi.amount)}
          </text>
          <text
            x={boxX + boxW / 2}
            y={boxY + 30}
            textAnchor="middle"
            fontSize={10}
            fill={LABEL}
          >
            {hi.month}
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
  const hi = highlightIndex ?? data.length - 1;
  const current = data[hi];
  const prev = data[hi - 1];
  const pctChange =
    prev && prev.amount > 0
      ? (((current?.amount ?? 0) - prev.amount) / prev.amount) * 100
      : null;
  const isPositive = pctChange === null || pctChange >= 0;
  const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <section
      className={cn(
        'border-border bg-card flex flex-col rounded-2xl border-[0.5px]',
        className,
      )}
    >
      {/* Header */}
      <div className="border-border flex items-start justify-between gap-4 border-b px-6 py-5">
        <div>
          <h3 className="text-foreground text-[14px] font-medium">
            {t('title')}
          </h3>
          <p className="text-muted-foreground mt-0.5 text-[13px]">
            {t('last12')}
          </p>
        </div>
        {current && (
          <div className="text-right">
            <p className="text-foreground text-[26px] leading-none font-semibold tabular-nums">
              {fmt(current.amount)}
            </p>
            {pctChange !== null && (
              <span
                className={cn(
                  'mt-1.5 inline-flex items-center gap-0.5 text-[12px] font-medium tabular-nums',
                  isPositive ? 'text-emerald-600' : 'text-rose-600',
                )}
              >
                <ChangeIcon className="size-3.5" aria-hidden="true" />
                {Math.abs(pctChange).toFixed(1)}% {t('vsPrevMonth')}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="px-4 pt-2 pb-4">
        <BarChart data={data} highlightIndex={hi} />
      </div>
    </section>
  );
}
