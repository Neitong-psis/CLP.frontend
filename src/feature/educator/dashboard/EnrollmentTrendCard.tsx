export interface EnrollmentPoint {
  month: string;
  count: number;
}

export interface EnrollmentTrendCardProps {
  data: readonly EnrollmentPoint[];
  title?: string;
  maxVal?: number;
}

function EnrollmentChart({
  data,
  maxVal,
}: {
  data: readonly EnrollmentPoint[];
  maxVal: number;
}) {
  const W = 800;
  const H = 200;
  const padL = 45;
  const padR = 20;
  const padT = 10;
  const padB = 36;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const px = (i: number) => padL + (i / (data.length - 1)) * plotW;
  const py = (v: number) => padT + plotH - (v / maxVal) * plotH;

  const pts = data.map((d, i) => ({ x: px(i), y: py(d.count) }));

  let linePath = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cpX = (prev.x + curr.x) / 2;
    linePath += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${padT + plotH} L ${padL} ${padT + plotH} Z`;

  const yLabels = [0, 100, 200, 300, 400];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ height: 220 }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00003e" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#00003e" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {yLabels.map((v) => (
        <g key={v}>
          <line
            x1={padL}
            y1={py(v)}
            x2={W - padR}
            y2={py(v)}
            stroke="#f1f5f9"
            strokeWidth="1"
          />
          <text
            x={padL - 8}
            y={py(v) + 4}
            textAnchor="end"
            fill="#94a3b8"
            fontSize="11"
          >
            {v}
          </text>
        </g>
      ))}

      <path d={areaPath} fill="url(#chartGrad)" />
      <path
        d={linePath}
        fill="none"
        stroke="#00003e"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {data.map((d, i) => (
        <text
          key={d.month}
          x={px(i)}
          y={H - 6}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="11"
        >
          {d.month}
        </text>
      ))}
    </svg>
  );
}

export function EnrollmentTrendCard({
  data,
  title = 'Monthly Enrollment Trend',
  maxVal = 450,
}: EnrollmentTrendCardProps) {
  return (
    <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="text-brand-navy mb-4 text-sm font-bold">{title}</h3>
      <EnrollmentChart data={data} maxVal={maxVal} />
    </div>
  );
}
