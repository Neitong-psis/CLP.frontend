import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  iconBg: string;
}

export function StatCard({
  label,
  value,
  change,
  icon: Icon,
  iconBg,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-full',
            iconBg,
          )}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <span className="flex items-center gap-0.5 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-bold text-green-600">
          <ArrowUpRight className="h-3 w-3" />
          {change}
        </span>
      </div>
      <p className="text-[11px] font-medium text-slate-400">{label}</p>
      <p className="text-brand-navy mt-0.5 text-2xl font-black">{value}</p>
    </div>
  );
}
