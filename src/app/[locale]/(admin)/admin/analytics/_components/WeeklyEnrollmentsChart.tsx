export interface WeeklyEnrollmentDatum {
  day: string;
  count: number;
}

export interface WeeklyEnrollmentsChartProps {
  title: string;
  subtitle: string;
  data: WeeklyEnrollmentDatum[];
}

// Moved verbatim from analytics/page.tsx ("Weekly enrollment chart" card).
// BAR_MAX was module-scope in the original file; it's derived from `data`
// here instead so the card is self-contained — same value for the same
// input, just computed at render time rather than import time.
export function WeeklyEnrollmentsChart({
  title,
  subtitle,
  data,
}: WeeklyEnrollmentsChartProps) {
  const barMax = Math.max(...data.map((d) => d.count));

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/3 p-5">
      <h3 className="mb-0.5 text-sm font-bold text-white">{title}</h3>
      <p className="mb-5 text-[11px] text-white/35">{subtitle}</p>
      <div className="flex h-40 items-end gap-2">
        {data.map(({ day, count }) => (
          <div key={day} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[10px] text-white/40">{count}</span>
            <div
              className="bg-brand-gold/80 hover:bg-brand-gold w-full rounded-t transition-colors"
              style={{ height: `${(count / barMax) * 100}%` }}
            />
            <span className="text-[10px] text-white/35">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
