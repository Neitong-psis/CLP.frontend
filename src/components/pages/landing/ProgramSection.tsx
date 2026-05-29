'use client';

import Link from 'next/link';
import { PROGRAMS } from '@/constants/homepage';
import { ArrowRight } from 'lucide-react';
import SectionHeader from './HeaderSection';

export default function ProgramsSection() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Programs"
          title="Find the path that fits you."
          description="Three pathways designed to grow with you — from foundational leadership to advanced excellence."
        />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {PROGRAMS.map((program) => (
            <Link
              key={program.href}
              href={program.href}
              className="group border-brand-navy/10 hover:border-brand-gold/40 hover:shadow-brand-navy/10 relative flex flex-col gap-3 overflow-hidden rounded-2xl border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:gap-4 sm:p-6 md:p-7"
            >
              {/* Accent orb — fades in on hover */}
              <div
                aria-hidden
                className="bg-brand-gold/0 group-hover:bg-brand-gold/10 absolute -top-12 -right-12 h-32 w-32 rounded-full transition-all duration-500"
              />

              <div className="relative flex items-center justify-between">
                <div className="bg-brand-navy text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 sm:h-12 sm:w-12">
                  <program.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className="bg-brand-navy/5 text-brand-navy/60 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase">
                  {program.tag}
                </span>
              </div>

              <h3 className="text-brand-navy relative text-lg font-bold sm:text-xl">
                {program.title}
              </h3>
              <p className="text-brand-navy/60 relative flex-1 text-sm leading-relaxed sm:text-base">
                {program.description}
              </p>

              <div className="text-brand-gold relative inline-flex items-center gap-1.5 text-sm font-semibold">
                Learn more
                <ArrowRight className="h-4 w-4 transition-[translate] duration-200 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
