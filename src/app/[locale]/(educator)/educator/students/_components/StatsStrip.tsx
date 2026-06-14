'use client';

import {
  Users,
  UserCheck,
  GraduationCap,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface StatCardDef {
  label: string;
  value: number;
  icon: LucideIcon;
  iconCls: string;
  active: boolean;
  onClick: () => void;
}

export function StatsStrip({
  counts,
  statusFilter,
  riskOnly,
  onAll,
  onActive,
  onAchieved,
  onAtRisk,
}: {
  counts: {
    total: number;
    active: number;
    achieved: number;
    atRisk: number;
    avgProgress: number;
  };
  statusFilter: string;
  riskOnly: boolean;
  onAll: () => void;
  onActive: () => void;
  onAchieved: () => void;
  onAtRisk: () => void;
}) {
  const cards: StatCardDef[] = [
    {
      label: 'Total Learners',
      value: counts.total,
      icon: Users,
      iconCls: 'bg-brand-navy/5 text-brand-navy',
      active: statusFilter === 'All' && !riskOnly,
      onClick: onAll,
    },
    {
      label: 'Active',
      value: counts.active,
      icon: UserCheck,
      iconCls: 'bg-blue-50 text-blue-500',
      active: statusFilter === 'Active' && !riskOnly,
      onClick: onActive,
    },
    {
      label: 'Achieved',
      value: counts.achieved,
      icon: GraduationCap,
      iconCls: 'bg-emerald-50 text-emerald-500',
      active: statusFilter === 'Completed' && !riskOnly,
      onClick: onAchieved,
    },
    {
      label: 'At Risk',
      value: counts.atRisk,
      icon: AlertTriangle,
      iconCls: 'bg-rose-50 text-rose-500',
      active: riskOnly,
      onClick: onAtRisk,
    },
  ];

  return (
    <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map(
        ({ label, value, icon: Icon, iconCls, active, onClick }, i) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            className={cn(
              'animate-fade-in-up flex items-center gap-3 rounded-2xl border bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
              active
                ? 'border-brand-gold ring-brand-gold/15 shadow-sm ring-2'
                : 'border-slate-200 hover:border-slate-300',
              i === 1 && 'delay-100',
              i === 2 && 'delay-200',
              i === 3 && 'delay-300',
            )}
          >
            <span
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                iconCls,
              )}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="text-brand-navy block text-xl font-black tabular-nums">
                {value}
              </span>
              <span className="block truncate text-[11px] font-medium text-slate-400">
                {label}
              </span>
            </span>
          </button>
        ),
      )}
    </div>
  );
}
