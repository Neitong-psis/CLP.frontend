'use client';

import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useEducatorStatsT } from '@/i18n';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils/cn';

export interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  iconBg: string;
  href?: string;
}

export function StatCard({
  label,
  value,
  change,
  icon: Icon,
  iconBg,
  href,
}: StatCardProps) {
  const t = useEducatorStatsT();
  const locale = useLocale();
  const isPositive = !change.startsWith('-');
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  const inner = (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110',
            iconBg,
          )}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <span
          className={cn(
            'flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold',
            isPositive
              ? 'bg-emerald-500/10 text-emerald-500'
              : 'bg-rose-500/10 text-rose-500',
          )}
        >
          <TrendIcon className="h-3 w-3" />
          {change}
        </span>
      </div>
      <p className="text-muted-foreground text-[11px] font-medium">{label}</p>
      <p className="text-foreground mt-0.5 text-2xl font-black tracking-tight">
        {value}
      </p>
      <p className="text-muted-foreground mt-1 text-[10px]">
        {t('vsLastMonth')}
      </p>
    </>
  );

  const cls =
    'border-border bg-card hover:border-brand-gold/40 group block h-full rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5';

  if (href) {
    return (
      <Link href={`/${locale}${href}`} className={cls}>
        {inner}
      </Link>
    );
  }

  return <div className={cls}>{inner}</div>;
}
