'use client';

import { FEATURES } from '@/constants/homepage';
import SectionHeader from './HeaderSection';

export default function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden bg-[#00003e] py-20 text-white sm:py-24">
      {/* Dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #f4a300 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why AYLA"
          title="Built different. Built for you."
          description="Four reasons our students consistently outperform their peers."
          variant="dark"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-[#f4a300]/30 hover:bg-white/[0.05]"
            >
              {/* Glow bloom behind the icon — radiates outward on hover */}
              <div
                aria-hidden
                className="absolute top-2 left-2 h-20 w-20 rounded-full bg-[#f4a300]/0 blur-xl transition-all duration-500 group-hover:bg-[#f4a300]/30"
              />

              {/* Bottom line that grows left → right */}
              <div
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#f4a300]/50 transition-[scale] duration-500 ease-out group-hover:scale-x-100"
              />

              <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4a300]/10 text-[#f4a300] ring-1 ring-[#f4a300]/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#f4a300] group-hover:text-[#00003e]">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="relative mb-2 text-base font-bold text-white">
                {feature.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-white/55">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
