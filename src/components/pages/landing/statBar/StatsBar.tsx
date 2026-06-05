'use client';

import { HERO_STATS } from '@/constants/homepage';
import { useInView } from '@/hooks/useInView';
import StatItem from './StatItem';

export default function StatsBar() {
  const [ref, isInView] = useInView<HTMLElement>();

  return (
    <section ref={ref} className="bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="bg-brand-navy grid grid-cols-2 rounded-xl sm:grid-cols-4">
          {HERO_STATS.map((stat, index) => (
            <StatItem
              key={stat.label}
              stat={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
