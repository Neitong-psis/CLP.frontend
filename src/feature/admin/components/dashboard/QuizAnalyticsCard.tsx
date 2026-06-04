export interface QuizAnalyticsItem {
  readonly title: string;
  readonly completion: number;
  readonly avgScore: number;
  readonly passRate: number;
}

export interface QuizAnalyticsCardProps {
  data: readonly QuizAnalyticsItem[];
  className?: string;
}

// ─── Pass-rate ring ───────────────────────────────────────────────────────────

function passRateColor(pct: number): string {
  if (pct >= 80) return '#10b981';
  if (pct >= 60) return '#f59e0b';
  return '#f43f5e';
}

function PassRateRing({ pct }: { pct: number }) {
  const SIZE = 60;
  const R = 23;
  const circ = 2 * Math.PI * R;
  const filled = (pct / 100) * circ;
  const color = passRateColor(pct);

  return (
    <div className="relative size-15 shrink-0">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="size-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={5}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke={color}
          strokeWidth={5}
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          className="text-[13px] font-semibold tabular-nums"
          style={{ color }}
        >
          {pct}%
        </span>
      </div>
    </div>
  );
}

// ─── Stat row ─────────────────────────────────────────────────────────────────

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-[12px] text-slate-500">{label}</dt>
      <dd className="text-[13px] font-medium text-slate-900 tabular-nums">
        {value}%
      </dd>
    </div>
  );
}

// ─── QuizAnalyticsCard ────────────────────────────────────────────────────────

export function QuizAnalyticsCard({ data, className }: QuizAnalyticsCardProps) {
  return (
    <section className={className} aria-label="Quiz analytics">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-[14px] font-medium text-slate-900">
          Quiz Analytics
        </h2>
        <span className="text-[12px] text-slate-400">
          {data.length} quizzes
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {data.map((q) => (
          <div
            key={q.title}
            className="cursor-pointer rounded-2xl border-[0.5px] border-slate-200 bg-white p-5 transition-[transform,border-color] duration-150 hover:-translate-y-0.5 hover:border-slate-300"
          >
            {/* Title row + ring */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[13px] leading-snug font-medium text-slate-900">
                  {q.title}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">Pass rate</p>
              </div>
              <PassRateRing pct={q.passRate} />
            </div>

            {/* Stats */}
            <dl className="mt-4 space-y-2 border-t border-slate-100 pt-4">
              <StatRow label="Completion" value={q.completion} />
              <StatRow label="Avg Score" value={q.avgScore} />
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}
