'use client';

import { FEATURES } from '@/constants/homepage';
import SectionHeader from './HeaderSection';

export default function WhyChooseUsSection() {
  return (
    <section className="bg-brand-navy relative overflow-hidden py-12 text-white sm:py-16 md:py-20 lg:py-24">
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

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-4 lg:gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group hover:border-brand-gold/30 relative overflow-hidden rounded-2xl border border-white/10 bg-white/2 p-5 transition-all duration-300 hover:bg-white/5 sm:p-6"
            >
              {/* Bottom line that grows left → right */}
              <div
                aria-hidden
                className="bg-brand-gold/50 absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-[scale] duration-500 ease-out group-hover:scale-x-100"
              />

              <div className="bg-brand-gold/10 text-brand-gold ring-brand-gold/20 group-hover:bg-brand-gold group-hover:text-brand-navy relative mb-4 flex h-10 w-10 items-center justify-center rounded-xl ring-1 transition-all duration-300 group-hover:-translate-y-1 sm:mb-5 sm:h-12 sm:w-12">
                <feature.icon className="h-4 w-4 sm:h-5 sm:w-5" />
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
