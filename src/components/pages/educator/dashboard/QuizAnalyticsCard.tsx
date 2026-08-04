import { cn } from '@/lib/utils/cn';

export interface QuizAnalyticsItem {
  title: string;
  difficult: string;
  completion: number;
  avgScore: number;
  passRate: number;
}

export interface QuizAnalyticsCardProps {
  data: readonly QuizAnalyticsItem[];
}

function QuizStatRow({
  label,
  value,
  barClass,
  delay,
}: {
  label: string;
  value: number;
  barClass: string;
  delay: number;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[12px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-bold">{value}%</span>
      </div>
      <div className="bg-muted h-1 w-full overflow-hidden rounded-full">
        <div
          className={cn('animate-highlight-in h-full rounded-full', barClass)}
          style={{ width: `${value}%`, animationDelay: `${delay}s` }}
        />
      </div>
    </div>
  );
}

export function QuizAnalyticsCard({ data }: QuizAnalyticsCardProps) {
  return (
    <div className="border-border bg-card rounded-2xl border p-6 transition-shadow duration-200 hover:shadow-md">
      <div className="mb-5">
        <h3 className="text-foreground text-sm font-bold">
          Assignment Analytics
        </h3>
        <p className="text-muted-foreground mt-0.5 text-[11px]">
          Completion rates, averages, pass/fail signals, and difficult question
          insights.
        </p>
      </div>

      <div className="scrollbar-none -mx-6 flex gap-4 overflow-x-auto px-6 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
        {data.map((q, qi) => (
          <div
            key={q.title}
            className="group border-border hover:border-brand-gold/50 relative w-[75%] shrink-0 cursor-default overflow-hidden rounded-xl border p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.2)] sm:w-auto sm:shrink"
          >
            {/* Subtle gold wash that fades in — works in both modes */}
            <div className="bg-brand-gold/5 pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Left accent bar */}
            <div className="bg-brand-gold pointer-events-none absolute top-3 bottom-3 left-0 w-0.5 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100" />

            <div className="relative">
              <p className="text-foreground group-hover:text-brand-gold text-sm font-bold transition-colors duration-200">
                {q.title}
              </p>
              <p className="text-muted-foreground mt-0.5 mb-4 text-[11px]">
                Difficult: {q.difficult}
              </p>
              <div className="border-border space-y-3 border-t pt-3">
                <QuizStatRow
                  label="Completion"
                  value={q.completion}
                  barClass="bg-brand-gold"
                  delay={0.3 + qi * 0.1}
                />
                <QuizStatRow
                  label="Avg score"
                  value={q.avgScore}
                  barClass="bg-chart-line"
                  delay={0.4 + qi * 0.1}
                />
                <QuizStatRow
                  label="Pass rate"
                  value={q.passRate}
                  barClass="bg-emerald-500"
                  delay={0.5 + qi * 0.1}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
