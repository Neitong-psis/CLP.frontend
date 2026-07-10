import React from 'react';
import { StatCard, type StatCardProps } from '@/components/shared/StatCard';
import { cn } from '@/lib/utils/cn';

interface StatGridProps {
  stats?: Array<Omit<StatCardProps, 'icon' | 'iconBg'>>;
  items: Array<StatCardProps>;
  className?: string;
}

export function StatGrid({ items, className }: StatGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {items.map((item, idx) => (
        <StatCard key={idx} variant="educator" {...item} />
      ))}
    </div>
  );
}
