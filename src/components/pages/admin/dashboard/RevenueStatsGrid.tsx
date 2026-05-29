import {
  ArrowUpRight,
  DollarSign,
  Activity,
  Globe,
  type LucideIcon,
} from 'lucide-react';
import { REVENUE_STATS } from '@/constants/admin';

// ─── Types ────────────────────────────────────────────────────────────────────

interface RevenueStatItem {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  iconColor: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const ICON_CONFIG: Pick<RevenueStatItem, 'icon' | 'iconColor'>[] = [
  { icon: DollarSign, iconColor: 'bg-emerald-100 text-emerald-600' },
  { icon: Activity, iconColor: 'bg-teal-100 text-teal-600' },
  { icon: Activity, iconColor: 'bg-violet-100 text-violet-600' },
  { icon: Globe, iconColor: 'bg-orange-100 text-orange-600' },
];

// ─── Sub-component ────────────────────────────────────────────────────────────

function RevenueStatCard({
  label,
  value,
  change,
  icon: Icon,
  iconColor,
}: RevenueStatItem) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow">
      <div className="mb-3 flex items-center justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full ${iconColor}`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <span className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
          <ArrowUpRight className="h-3 w-3" />
          {change}
        </span>
      </div>
      <p className="text-[11px] font-medium text-slate-500">{label}</p>
      <p className="mt-0.5 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function RevenueStatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {REVENUE_STATS.map(({ label, value, change }, i) => (
        <RevenueStatCard
          key={label}
          label={label}
          value={value}
          change={change}
          {...ICON_CONFIG[i]}
        />
      ))}
    </div>
  );
}
