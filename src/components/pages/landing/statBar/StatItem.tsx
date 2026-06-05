'use client';

import type { Stat } from '@/constants/homepage';
import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/lib/utils/cn';
import {
  entranceClass,
  entranceStyle,
  transition,
} from '@/lib/utils/animation';
import { parseStat, formatCount } from '@/lib/utils/stats';
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
        'group relative flex flex-col items-center gap-1 px-6 py-10 text-center',
        entranceClass(isInView, 'sm'),
      )}
      style={entranceStyle(isInView, index * ENTRANCE_STAGGER_MS)}
    >
      {index > 0 && (
        <span className="absolute top-1/2 left-0 h-12 w-px -translate-y-1/2 bg-white/30" />
      )}
      <span className="text-brand-gold text-3xl font-bold sm:text-4xl">
        {parsed.prefix}
        <span className="tabular-nums">
          {formatCount(parsed.number, animated)}
        </span>
        {parsed.suffix}
      </span>
      <span
        className={cn(
          'text-xs font-semibold tracking-widest text-white/60 uppercase group-hover:text-white',
          transition.colors,
        )}
      >
        {stat.label}
      </span>
    </div>
  );
}
