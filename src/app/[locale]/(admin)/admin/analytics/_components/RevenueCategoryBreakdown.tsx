export interface RevenueCategoryDatum {
  name: string;
  amount: string;
  pct: number;
}

export interface RevenueCategoryBreakdownProps {
  title: string;
  subtitle: string;
  data: RevenueCategoryDatum[];
}

// Moved verbatim from analytics/page.tsx ("Category breakdown" card).
// CAT_MAX was module-scope in the original file; it's derived from `data`
// here instead so the card is self-contained — same value for the same
// input, just computed at render time rather than import time.
//
// Named distinctly from the unrelated `RevenueByCategoryCard` under
// components/pages/admin/components/dashboard — different markup, different
// data source, only the domain concept overlaps.
export function RevenueCategoryBreakdown({
  title,
  subtitle,
  data,
}: RevenueCategoryBreakdownProps) {
  const catMax = Math.max(...data.map((c) => c.pct));

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/3 p-5">
      <h3 className="mb-0.5 text-sm font-bold text-white">{title}</h3>
      <p className="mb-5 text-[11px] text-white/35">{subtitle}</p>
      <ul className="space-y-3">
        {data.map((cat) => (
          <li key={cat.name} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-xs font-medium text-white/60">
              {cat.name}
            </span>
            <div
              className="flex-1 overflow-hidden rounded-full bg-white/[0.07]"
              style={{ height: '6px' }}
            >
              <div
                className="bg-brand-gold h-full rounded-full"
                style={{ width: `${(cat.pct / catMax) * 100}%` }}
              />
            </div>
            <span className="w-14 shrink-0 text-right text-xs font-semibold text-white/55">
              {cat.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
