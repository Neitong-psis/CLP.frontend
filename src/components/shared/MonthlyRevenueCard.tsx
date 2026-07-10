import React from 'react';
import { MONTHLY_REVENUE } from '@/constants/admin';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MonthlyRevenueDatum {
  month: string;
  amount: number;
}

interface MonthlyRevenueCardProps {
  data?: readonly MonthlyRevenueDatum[] | MonthlyRevenueDatum[];
  yMax?: number;
  yTicks?: number[];
  formatYLabel?: (v: number) => string;
  barColor?: string;
  title?: string;
}

// ─── Chart constants ──────────────────────────────────────────────────────────

const W = 1000;
const H = 260;
const padT = 10;
const plotH = H - padT;

// ─── Sub-component ────────────────────────────────────────────────────────────

function BarChart({
  data,
  yMax = 100,
  yTicks = [0, 25, 50, 75, 100],
  formatYLabel = (t: number) => `$${t}k`,
  barColor = '#f4a300',
}: {
  data: MonthlyRevenueDatum[];
  yMax?: number;
  yTicks?: number[];
  formatYLabel?: (t: number) => string;
  barColor?: string;
}) {
  const py = (v: number) => padT + plotH - (v / yMax) * plotH;
  const yPct = (v: number) => (py(v) / H) * 100;

  const n = data.length;
  const slotW = W / n;
  const barW = slotW * 0.32;

  const getMonthStyle = (i: number, total: number) => {
    const percent = ((i + 0.5) / total) * 100;
    return {
      left: `${percent}%`,
      transform: 'translateX(-50%)',
    };
  };

  return (
    <div className="relative" style={{ paddingLeft: 44, paddingBottom: 24 }}>
      {/* Y-axis labels */}
      <div
        className="pointer-events-none absolute"
        style={{ left: 0, top: 0, width: 34, height: 220 }}
      >
        {yTicks.map((v) => (
          <span
            key={v}
            className="absolute right-0 -translate-y-1/2 text-[11px] text-slate-400"
            style={{ top: `${yPct(v)}%` }}
          >
            {formatYLabel(v)}
          </span>
        ))}
      </div>

      {/* SVG Plot Area */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full"
        style={{ height: 220 }}
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {yTicks.map((v) => (
          <line
            key={v}
            x1={0}
            y1={py(v)}
            x2={W}
            y2={py(v)}
            stroke="#e2e8f0"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Bars */}
        {data.map(({ month, amount }, i) => {
          const y = py(amount);
          const bH = H - y;
          const x = i * slotW + (slotW - barW) / 2;
          return (
            <rect
              key={month}
              x={x}
              y={y}
              width={barW}
              height={bH}
              rx={6}
              fill={barColor}
              fillOpacity={0.85}
            />
          );
        })}
      </svg>

      {/* X-axis labels */}
      <div className="relative mt-2" style={{ height: 20 }}>
        {data.map((d, i) => {
          const style = getMonthStyle(i, data.length);
          return (
            <span
              key={d.month}
              className="absolute text-[11px] text-slate-400"
              style={style}
            >
              {d.month}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function MonthlyRevenueCard({
  data = MONTHLY_REVENUE,
  yMax = 100,
  yTicks = [0, 25, 50, 75, 100],
  formatYLabel,
  barColor,
  title = 'Monthly Revenue',
}: MonthlyRevenueCardProps) {
  // Coerce data array to mutable to satisfy component typing
  const chartData = React.useMemo(() => [...data], [data]);

  return (
    <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="text-brand-navy mb-4 text-sm font-bold">{title}</h3>
      <BarChart
        data={chartData}
        yMax={yMax}
        yTicks={yTicks}
        formatYLabel={formatYLabel}
        barColor={barColor}
      />
    </div>
  );
}
