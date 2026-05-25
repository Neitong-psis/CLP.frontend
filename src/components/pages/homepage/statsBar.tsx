'use client';

import { HERO_STATS } from '@/config/homepage';

export default function StatsBar() {
  return (
    <section className="border-y border-[#00003e]/10 bg-[#00003e]/[0.02]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#00003e]/10 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
        {HERO_STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 px-6 py-10 text-center"
          >
            <span className="text-3xl font-bold text-[#00003e] sm:text-4xl">
              {stat.value}
            </span>
            <span className="text-xs font-semibold tracking-widest text-[#00003e]/50 uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
