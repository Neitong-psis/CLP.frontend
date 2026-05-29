import { USER_DISTRIBUTION } from '@/constants/admin';

// ─── Donut geometry ───────────────────────────────────────────────────────────

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const TOTAL = USER_DISTRIBUTION.reduce((sum, s) => sum + s.count, 0);

const SEGMENTS = (() => {
  let offset = 0;
  return USER_DISTRIBUTION.map((seg) => {
    const len = (seg.count / TOTAL) * CIRCUMFERENCE;
    const dashoffset = CIRCUMFERENCE - offset;
    offset += len;
    return { ...seg, len, dashoffset };
  });
})();

// ─── Sub-components ───────────────────────────────────────────────────────────

function DonutChart() {
  return (
    <svg viewBox="0 0 112 112" className="h-36 w-36 -rotate-90">
      <circle
        r={RADIUS}
        cx={56}
        cy={56}
        fill="none"
        stroke="#f1f5f9"
        strokeWidth={20}
      />
      {SEGMENTS.map((seg) => (
        <circle
          key={seg.label}
          r={RADIUS}
          cx={56}
          cy={56}
          fill="none"
          stroke={seg.color}
          strokeWidth={20}
          strokeDasharray={`${seg.len} ${CIRCUMFERENCE}`}
          strokeDashoffset={seg.dashoffset}
          strokeLinecap="butt"
        />
      ))}
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function UserDistributionCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow">
      <h3 className="mb-5 text-sm font-bold text-slate-900">
        User Distribution
      </h3>
      <div className="flex items-center gap-8">
        {/* Donut + centre total */}
        <div className="relative shrink-0">
          <DonutChart />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-slate-900">{TOTAL}</span>
            <span className="text-[10px] text-slate-400">Total</span>
          </div>
        </div>

        {/* Legend */}
        <ul className="flex-1 space-y-3">
          {USER_DISTRIBUTION.map((seg) => (
            <li key={seg.label} className="flex items-center gap-2.5">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-sm text-slate-600">{seg.label}</span>
              <span className="ml-auto text-sm font-bold text-slate-900">
                {seg.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
