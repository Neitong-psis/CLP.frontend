import { ArrowUpRight } from 'lucide-react';
import type { AnalyticsMetric } from '../_lib/buildMetrics';

export interface AnalyticsMetricCardsProps {
  metrics: AnalyticsMetric[];
}

// Moved verbatim from analytics/page.tsx (the METRICS.map(...) block).
export function AnalyticsMetricCards({ metrics }: AnalyticsMetricCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {metrics.map(({ label, value, change, icon: Icon, color }) => (
        <div
          key={label}
          className="rounded-xl border border-white/[0.07] bg-white/3 p-4"
        >
          <div
            className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg ${color}`}
          >
            <Icon className="h-4 w-4" />
          </div>
          <p className="text-[11px] text-white/40">{label}</p>
          <p className="mt-0.5 text-xl font-bold text-white">{value}</p>
          <p className="mt-1 flex items-center gap-0.5 text-[11px] font-semibold text-emerald-400">
            <ArrowUpRight className="h-3 w-3" />
            {change}
          </p>
        </div>
      ))}
    </div>
  );
}
