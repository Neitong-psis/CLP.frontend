'use client';

import {
  DollarSign,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

interface StatCardProps {
  icon: React.ElementType;
  iconBg: string;
  badge: string;
  badgeColor: 'green' | 'red' | 'gray';
  badgeDown?: boolean;
  label: string;
  value: string;
}

function StatCard({
  icon: Icon,
  iconBg,
  badge,
  badgeColor,
  badgeDown,
  label,
  value,
}: StatCardProps) {
  const badgeClass =
    badgeColor === 'green'
      ? 'text-emerald-500'
      : badgeColor === 'red'
        ? 'text-rose-500'
        : 'text-muted-foreground';

  const BadgeArrow = badgeDown ? ArrowDownRight : ArrowUpRight;

  return (
    <div className="border-border bg-card rounded-2xl border p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full ${iconBg}`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold ${badgeClass}`}
        >
          <BadgeArrow className="h-3.5 w-3.5" />
          {badge}
        </span>
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="text-foreground mt-0.5 text-2xl font-extrabold tracking-tight">
        {value}
      </p>
    </div>
  );
}

export function EarningsStatCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        icon={DollarSign}
        iconBg="bg-emerald-500"
        badge="All time"
        badgeColor="green"
        label="Total Earned"
        value="$312.4k"
      />
      <StatCard
        icon={TrendingUp}
        iconBg="bg-blue-500"
        badge="+24%"
        badgeColor="green"
        label="This Month"
        value="$7,960"
      />
      <StatCard
        icon={DollarSign}
        iconBg="bg-slate-400"
        badge="-3%"
        badgeColor="red"
        badgeDown
        label="Last Month"
        value="$6,820"
      />
      <StatCard
        icon={Users}
        iconBg="bg-violet-500"
        badge="avg"
        badgeColor="gray"
        label="Revenue/Student"
        value="$49"
      />
    </div>
  );
}
