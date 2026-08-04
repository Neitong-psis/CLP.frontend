export interface PlatformAnalyticsDatum {
  month: string;
  users: number;
  enrollments: number;
}

export interface PlatformAnalyticsChartProps {
  data: PlatformAnalyticsDatum[];
}

// Moved verbatim from analytics/page.tsx's local `LineChart` function.
// Only change: reads `data` from props instead of the module-level
// PLATFORM_ANALYTICS_DATA import, so it can be rendered/tested with any
// dataset. Same math, same SVG output for the same input.
export function PlatformAnalyticsChart({ data }: PlatformAnalyticsChartProps) {
  const W = 560;
  const H = 150;
  const pad = { t: 10, r: 10, b: 24, l: 10 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const n = data.length;
  const enrollMax = Math.max(...data.map((d) => d.enrollments));

  const ex = (i: number) => pad.l + (i / (n - 1)) * innerW;
  const ey = (v: number) => pad.t + (1 - v / enrollMax) * innerH;

  const path = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${ex(i)},${ey(d.enrollments)}`)
    .join(' ');
  const areaPath =
    path + ` L${ex(n - 1)},${pad.t + innerH} L${pad.l},${pad.t + innerH} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4a300" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f4a300" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={pad.l}
          x2={pad.l + innerW}
          y1={pad.t + t * innerH}
          y2={pad.t + t * innerH}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={1}
        />
      ))}
      <path d={areaPath} fill="url(#aGrad)" />
      <path
        d={path}
        fill="none"
        stroke="#f4a300"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {data.map((d, i) => (
        <text
          key={d.month}
          x={ex(i)}
          y={H - 4}
          textAnchor="middle"
          fontSize={9}
          fill="rgba(255,255,255,0.45)"
        >
          {d.month}
        </text>
      ))}
    </svg>
  );
}
