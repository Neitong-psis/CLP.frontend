'use client';

import { PROGRAMS } from "@/config/homepage";
import { ArrowRight, Link } from "lucide-react";
import SectionHeader from "./sectionHeader";

export default function ProgramsSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Programs"
          title="Find the path that fits you."
          description="Three pathways designed to grow with you — from foundational leadership to advanced excellence."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROGRAMS.map((program) => (
            <Link
              key={program.href}
              href={program.href}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-[#00003e]/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#f4a300]/40 hover:shadow-xl hover:shadow-[#00003e]/10"
            >
              {/* Hover accent */}
              <div
                aria-hidden
                className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#f4a300]/0 transition-all duration-500 group-hover:bg-[#f4a300]/10"
              />

              <div className="relative flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00003e] text-[#f4a300] transition-colors group-hover:bg-[#f4a300] group-hover:text-[#00003e]">
                  <program.icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-[#00003e]/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#00003e]/60">
                  {program.tag}
                </span>
              </div>

              <h3 className="relative text-xl font-bold text-[#00003e]">
                {program.title}
              </h3>
              <p className="relative flex-1 text-sm leading-relaxed text-[#00003e]/60">
                {program.description}
              </p>

              <div className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-[#f4a300]">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}