import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

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
    <div className="border-border bg-card hover:border-muted-foreground/40 group h-full rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5">
      <div className="mb-4 flex items-center justify-between">
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110',
            iconBg,
          )}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <span className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
          <ArrowUpRight className="h-3 w-3" />
          {change}
        </span>
      </div>
      <p className="text-muted-foreground text-[11px] font-medium">{label}</p>
      <p className="text-foreground mt-0.5 text-2xl font-black tracking-tight">
        {value}
      </p>
      <p className="text-muted-foreground mt-1 text-[10px]">vs last month</p>
    </div>
  );
}
