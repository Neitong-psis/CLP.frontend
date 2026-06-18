import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';

export interface MobileStatCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  gradient: string;
}

export function MobileStatCard({
  label,
  value,
  change,
  icon: Icon,
  gradient,
}: MobileStatCardProps) {
  const isPositive = !change.startsWith('-');
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div
      className={`flex w-40 shrink-0 flex-col rounded-2xl bg-linear-to-br p-4 shadow-lg ${gradient}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 shadow-inner">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <span className="flex items-center gap-0.5 rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold text-white">
          <TrendIcon className="h-2.5 w-2.5" />
          {change}
        </span>
      </div>
      <p className="text-2xl font-black tracking-tight text-white">{value}</p>
      <p className="mt-1 text-[11px] leading-tight font-medium text-white/65">
        {label}
      </p>
      <p className="mt-2 text-[10px] text-white/35">vs last month</p>
    </div>
  );
}
