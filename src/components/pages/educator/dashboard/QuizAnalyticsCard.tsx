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

function QuizStatRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <span className="text-slate-500">{label}</span>
      <span className="text-brand-navy font-bold">{value}%</span>
    </div>
  );
}

export function QuizAnalyticsCard({ data }: QuizAnalyticsCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-5">
        <h3 className="text-brand-navy text-sm font-bold">Quiz Analytics</h3>
        <p className="mt-0.5 text-[11px] text-slate-400">
          Completion rates, averages, pass/fail signals, and difficult question
          insights.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {data.map((q) => (
          <div key={q.title} className="rounded-lg border border-slate-200 p-4">
            <p className="text-brand-navy text-sm font-bold">{q.title}</p>
            <p className="mt-0.5 mb-4 text-[11px] text-slate-400">
              Difficult: {q.difficult}
            </p>
            <div className="space-y-2.5 border-t border-slate-100 pt-3">
              <QuizStatRow label="Completion" value={q.completion} />
              <QuizStatRow label="Avg score" value={q.avgScore} />
              <QuizStatRow label="Pass rate" value={q.passRate} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
