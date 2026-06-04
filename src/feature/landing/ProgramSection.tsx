'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { PROGRAMS } from '@/constants/homepage';
import SectionHeader from './HeaderSection';

export default function ProgramsSection() {
  return (
    <section className="bg-[#f8f9fc] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Programs"
          title="Find the path that fits you."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map((program) => (
            <Link
              key={program.href}
              href={program.href}
              className="group border-brand-navy/8 hover:shadow-brand-navy/10 hover:border-brand-gold/50 flex flex-col rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Photo — inset with padding so it has a floating card-within-card look */}
              <div className="p-3 pb-0">
                <div className="relative h-48 w-full overflow-hidden rounded-xl">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-90"
                  />
                  {/* Hover tint overlay */}
                  <div className="bg-brand-navy/0 group-hover:bg-brand-navy/15 absolute inset-0 transition-all duration-300" />
                </div>
              </div>

              {/* Icon badge */}
              <div className="relative flex justify-center">
                <div className="absolute -top-7 z-10">
                  <div className="bg-brand-navy text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg ring-[3px] ring-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                    <program.icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col items-center gap-3 px-5 pt-12 pb-6 text-center">
                <h3 className="text-brand-navy text-[15px] leading-snug font-bold">
                  {program.title}
                </h3>
                <p className="text-brand-navy/55 flex-1 text-[13px] leading-relaxed">
                  {program.description}
                </p>
                <div className="text-brand-gold mt-1 inline-flex items-center gap-1 text-[12px] font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
