import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  iconColor: string;
  desc: string;
}

export function StatCard({
  label,
  value,
  change,
  icon: Icon,
  iconColor,
  desc,
}: StatCardProps) {
  const isNegative = change.startsWith('-');
  const ChangeIcon = isNegative ? ArrowDownRight : ArrowUpRight;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow transition-colors hover:border-slate-300">
      <div className="mb-3 flex items-center justify-between">
        <div
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full',
            iconColor,
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <span
          className={cn(
            'flex items-center gap-0.5 text-[11px] font-semibold',
            isNegative ? 'text-red-500' : 'text-emerald-600',
          )}
        >
          <ChangeIcon className="h-3 w-3" />
          {change}
        </span>
      </div>
      <p className="text-[11px] font-medium text-slate-500">{label}</p>
      <p className="mt-0.5 text-xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-[10px] text-slate-400">{desc}</p>
    </div>
  );
}
