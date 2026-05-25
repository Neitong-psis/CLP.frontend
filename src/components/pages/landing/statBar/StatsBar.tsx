'use client';

import { HERO_STATS } from '@/constants/homepage';
import { useInView } from '@/hooks/useInView';
import StatItem from './StatItem';

export default function StatsBar() {
  const [ref, isInView] = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className="border-brand-navy/10 bg-brand-navy/[0.02] border-y"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#00003e]/10 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
        {HERO_STATS.map((stat, index) => (
          <StatItem
            key={stat.label}
            stat={stat}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  );
}
