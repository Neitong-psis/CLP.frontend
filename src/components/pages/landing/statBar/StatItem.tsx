'use client';

import type { Stat } from '@/constants/homepage';
import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/utils/cn';
import { entranceClass, entranceStyle, transition } from '@/utils/animation';
import { parseStat, formatCount } from '@/utils/stats';
import { COUNT_STAGGER_MS, ENTRANCE_STAGGER_MS } from '@/constants/stats';

interface StatItemProps {
  stat: Stat;
  index: number;
  isInView: boolean;
}

export default function StatItem({ stat, index, isInView }: StatItemProps) {
  const parsed = parseStat(stat.value);
  const animated = useCountUp(parsed.number, {
    active: isInView,
    delay: index * COUNT_STAGGER_MS,
  });

  return (
    <div
      className={cn(
        'group flex flex-col items-center gap-1 px-6 py-10 text-center',
        entranceClass(isInView, 'sm'),
      )}
      style={entranceStyle(isInView, index * ENTRANCE_STAGGER_MS)}
    >
      <span className="text-brand-navy text-3xl font-bold sm:text-4xl">
        {parsed.prefix}
        <span className="tabular-nums">
          {formatCount(parsed.number, animated)}
        </span>
        {parsed.suffix}
      </span>
      <span
        className={cn(
          'text-brand-navy/50 group-hover:text-brand-gold text-xs font-semibold tracking-widest uppercase',
          transition.colors,
        )}
      >
        {stat.label}
      </span>
    </div>
  );
}
