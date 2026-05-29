import { MONTHLY_REVENUE } from '@/constants/admin';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MonthlyRevenueDatum {
  month: string;
  amount: number;
}

interface MonthlyRevenueCardProps {
  data?: MonthlyRevenueDatum[];
}

// ─── Chart constants ──────────────────────────────────────────────────────────

const Y_MAX = 100;
const Y_TICKS = [0, 25, 50, 75, 100];
const W = 600;
const H = 200;
const PAD = { t: 10, r: 10, b: 28, l: 48 };
const IW = W - PAD.l - PAD.r;
const IH = H - PAD.t - PAD.b;

// ─── Sub-component ────────────────────────────────────────────────────────────

function BarChart({ data }: { data: MonthlyRevenueDatum[] }) {
  const n = data.length;
  const slotW = IW / n;
  const barW = slotW * 0.62;
  const uy = (v: number) => PAD.t + (1 - v / Y_MAX) * IH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* Grid lines + y-axis labels */}
      {Y_TICKS.map((t) => (
        <g key={t}>
          <line
            x1={PAD.l}
            x2={PAD.l + IW}
            y1={uy(t)}
            y2={uy(t)}
            stroke="#e2e8f0"
            strokeWidth={1}
          />
          <text
            x={PAD.l - 6}
            y={uy(t)}
            textAnchor="end"
            fontSize={9}
            fill="#94a3b8"
            dominantBaseline="middle"
          >
            ${t}k
          </text>
        </g>
      ))}

      {/* Bars + x-axis labels */}
      {data.map(({ month, amount }, i) => {
        const bH = (amount / Y_MAX) * IH;
        const x = PAD.l + i * slotW + (slotW - barW) / 2;
        return (
          <g key={month}>
            <rect
              x={x}
              y={uy(amount)}
              width={barW}
              height={bH}
              rx={3}
              fill="#f4a300"
              fillOpacity={0.85}
            />
            <text
              x={x + barW / 2}
              y={H - 6}
              textAnchor="middle"
              fontSize={9}
              fill="#94a3b8"
            >
              {month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function MonthlyRevenueCard({
  data = MONTHLY_REVENUE,
}: MonthlyRevenueCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow">
      <h3 className="text-sm font-bold text-slate-900">Monthly Revenue</h3>
      <p className="mt-1 mb-5 text-xs text-slate-500">
        Platform revenue over 12 months.
      </p>
      <BarChart data={data} />
    </div>
  );
}
