import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Award,
  ShieldCheck,
} from 'lucide-react';
import { DASHBOARD_STATS } from '@/constants/admin';
import { StatCard, type StatCardProps } from './StatCard';

// ─── Config ───────────────────────────────────────────────────────────────────
// Co-located with the grid that owns it — not leaked into the page.

const STAT_CONFIG: Pick<StatCardProps, 'icon' | 'iconColor' | 'desc'>[] = [
  {
    icon: Users,
    iconColor: 'bg-blue-100 text-blue-600',
    desc: 'From live user records',
  },
  {
    icon: BookOpen,
    iconColor: 'bg-emerald-100 text-emerald-600',
    desc: '11 total courses',
  },
  {
    icon: TrendingUp,
    iconColor: 'bg-violet-100 text-violet-600',
    desc: 'All-time enrollments',
  },
  {
    icon: DollarSign,
    iconColor: 'bg-orange-100 text-orange-600',
    desc: 'May 2026',
  },
  {
    icon: Award,
    iconColor: 'bg-amber-100 text-amber-600',
    desc: 'Total issued to date',
  },
  {
    icon: ShieldCheck,
    iconColor: 'bg-sky-100 text-sky-600',
    desc: 'Verified credentials',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function DashboardStatGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {DASHBOARD_STATS.map(({ label, value, change }, i) => (
        <StatCard
          key={label}
          label={label}
          value={value}
          change={change}
          {...STAT_CONFIG[i]}
        />
      ))}
    </div>
  );
}
