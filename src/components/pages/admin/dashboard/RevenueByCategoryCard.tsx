export interface RevenueCategory {
  name: string;
  amount: string;
  pct: number;
}

export interface RevenueByCategoryCardProps {
  data: readonly RevenueCategory[];
}

export function RevenueByCategoryCard({ data }: RevenueByCategoryCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow">
      <h3 className="mb-5 text-sm font-bold text-slate-900">
        Revenue by Category
      </h3>
      <ul className="space-y-4">
        {data.map((cat) => (
          <li key={cat.name} className="flex items-center gap-4">
            <span className="w-28 shrink-0 text-xs font-semibold text-slate-700">
              {cat.name}
            </span>
            <div
              className="flex-1 overflow-hidden rounded-full bg-slate-100"
              style={{ height: '6px' }}
            >
              <div
                className="bg-brand-gold h-full rounded-full"
                style={{ width: `${cat.pct}%` }}
              />
            </div>
            <span className="w-14 shrink-0 text-right text-xs font-semibold text-slate-600">
              {cat.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
