import React from 'react';
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface StatCardProps {
  variant?: 'simple' | 'admin' | 'educator';
  icon: LucideIcon;
  value: number | string;

  // Simple specific
  title?: string;
  iconColorClass?: string;
  bgColorClass?: string;

  // Admin / Educator specific
  label?: string;
  change?: string;
  desc?: string;
  iconColor?: string; // admin specific
  iconBg?: string; // educator specific
}

export function StatCard({
  variant = 'simple',
  icon: Icon,
  value,
  title,
  iconColorClass = 'text-blue-600',
  bgColorClass = 'bg-blue-50',
  label,
  change,
  desc,
  iconColor,
  iconBg,
}: StatCardProps) {
  if (variant === 'admin') {
    const isNegative = String(change).startsWith('-');
    const ChangeIcon = isNegative ? ArrowDownRight : ArrowUpRight;
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-slate-200">
        <div className="mb-4 flex items-center justify-between">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full shadow-sm',
              iconColor,
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          {change !== undefined && (
            <span
              className={cn(
                'flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors duration-200',
                isNegative
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-emerald-50 text-emerald-600',
              )}
            >
              <ChangeIcon className="h-3 w-3" />
              {change}
            </span>
          )}
        </div>
        <p className="text-[13px] font-semibold text-slate-500">{label}</p>
        <p className="text-brand-navy mt-1 text-2xl font-bold">{value}</p>
        <p className="mt-1 text-[11px] text-slate-400">{desc}</p>
      </div>
    );
  }

  if (variant === 'educator') {
    const isNegative = String(change).startsWith('-');
    const isNeutral =
      !String(change).startsWith('+') && !String(change).startsWith('-');
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
          {change !== undefined && (
            <span
              className={cn(
                'flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold',
                isNegative
                  ? 'bg-rose-50 text-rose-600'
                  : isNeutral
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-green-50 text-green-600',
              )}
            >
              {!isNeutral &&
                (isNegative ? (
                  <ArrowDownRight className="h-3 w-3" />
                ) : (
                  <ArrowUpRight className="h-3 w-3" />
                ))}
              {change}
            </span>
          )}
        </div>
        <p className="text-[11px] font-medium text-slate-400">{label}</p>
        <p className="text-brand-navy mt-0.5 text-2xl font-black">{value}</p>
      </div>
    );
  }

  // Default: 'simple'
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-4">
        <div className={`rounded-lg ${bgColorClass} p-3 ${iconColorClass}`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
