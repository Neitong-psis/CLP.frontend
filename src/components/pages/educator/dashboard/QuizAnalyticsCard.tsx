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
        <h3 className="text-foreground text-sm font-bold">Quiz Analytics</h3>
        <p className="text-muted-foreground mt-0.5 text-[11px]">
          Completion rates, averages, pass/fail signals, and difficult question
          insights.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {data.map((q, qi) => (
          <div
            key={q.title}
            className="border-border hover:border-brand-gold/40 rounded-xl border p-4 transition-all duration-200 hover:bg-amber-50/40 hover:shadow-sm"
          >
            <p className="text-foreground text-sm font-bold">{q.title}</p>
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
        ))}
      </div>
    </div>
  );
}
