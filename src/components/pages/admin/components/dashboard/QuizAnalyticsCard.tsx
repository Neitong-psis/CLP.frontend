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
  if (pct >= 80) return 'var(--chart-emerald)';
  if (pct >= 60) return 'var(--chart-warn)';
  return 'var(--chart-bad)';
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
          stroke="var(--chart-grid)"
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
      <dt className="text-muted-foreground text-[12px]">{label}</dt>
      <dd className="text-foreground text-[13px] font-medium tabular-nums">
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
        <h2 className="text-foreground text-[14px] font-medium">
          Quiz Analytics
        </h2>
        <span className="text-muted-foreground text-[12px]">
          {data.length} quizzes
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {data.map((q) => (
          <div
            key={q.title}
            className="border-border bg-card hover:border-muted-foreground/40 cursor-pointer rounded-2xl border-[0.5px] p-5 transition-[transform,border-color] duration-150 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-foreground text-[13px] leading-snug font-medium">
                  {q.title}
                </p>
                <p className="text-muted-foreground mt-0.5 text-[11px]">
                  Pass rate
                </p>
              </div>
              <PassRateRing pct={q.passRate} />
            </div>

            <dl className="border-border mt-4 space-y-2 border-t pt-4">
              <StatRow label="Completion" value={q.completion} />
              <StatRow label="Avg Score" value={q.avgScore} />
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}
