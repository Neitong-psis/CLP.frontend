export interface AnalyticsPoint {
  month: string;
  users: number;
  enrollments: number;
}

export interface PlatformAnalyticsCardProps {
  data: readonly AnalyticsPoint[];
}

const YMAX = 120000;
const YTICKS = [0, 30000, 60000, 90000, 120000];

function LineChart({ data }: { data: readonly AnalyticsPoint[] }) {
  const W = 600;
  const H = 220;
  const pad = { t: 10, r: 20, b: 36, l: 68 };
  const iW = W - pad.l - pad.r;
  const iH = H - pad.t - pad.b;
  const n = data.length;

  const ux = (i: number) => pad.l + (i / (n - 1)) * iW;
  const uy = (v: number) => pad.t + (1 - v / YMAX) * iH;

  const uPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${ux(i)},${uy(d.users)}`)
    .join(' ');
  const ePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${ux(i)},${uy(d.enrollments)}`)
    .join(' ');
  const eArea = `${ePath} L${ux(n - 1)},${pad.t + iH} L${pad.l},${pad.t + iH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <defs>
        <linearGradient id="laGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>

      {YTICKS.map((t) => (
        <g key={t}>
          <line
            x1={pad.l}
            x2={pad.l + iW}
            y1={uy(t)}
            y2={uy(t)}
            stroke="#e2e8f0"
            strokeWidth={1}
          />
          <text
            x={pad.l - 8}
            y={uy(t)}
            textAnchor="end"
            fontSize={9}
            fill="#94a3b8"
            dominantBaseline="middle"
          >
            {t === 0 ? '0' : String(t)}
          </text>
        </g>
      ))}

      <path d={eArea} fill="url(#laGrad)" />
      <path
        d={ePath}
        fill="none"
        stroke="#10b981"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <path
        d={uPath}
        fill="none"
        stroke="#3b82f6"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {data.map((d, i) => (
        <text
          key={d.month}
          x={ux(i)}
          y={H - 8}
          textAnchor="middle"
          fontSize={9}
          fill="#94a3b8"
        >
          {d.month}
        </text>
      ))}
    </svg>
  );
}

export function PlatformAnalyticsCard({ data }: PlatformAnalyticsCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow">
      <h3 className="text-sm font-bold text-slate-900">Platform Analytics</h3>
      <p className="mt-1 mb-5 text-xs text-slate-500">
        Platform growth across users, enrollments, and activity over the last 12
        months.
      </p>
      <LineChart data={data} />
      <div className="mt-4 flex justify-center gap-6">
        <span className="flex items-center gap-2 text-xs text-slate-500">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
          Users
        </span>
        <span className="flex items-center gap-2 text-xs text-slate-500">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Enrollments
        </span>
      </div>
    </div>
  );
}
