'use client';

import SectionHeader from "./sectionHeader";
import { TESTIMONIALS } from "@/config/homepage";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Student Stories"
          title="Real results, real students."
          description="Hear from the leaders we've helped shape."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col gap-5 rounded-2xl border border-[#00003e]/10 bg-[#00003e]/[0.02] p-7"
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#f4a300] text-[#f4a300]" />
                ))}
              </div>
              <blockquote className="flex-1 text-base leading-relaxed text-[#00003e]/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-[#00003e]/10 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00003e] text-sm font-bold text-[#f4a300]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#00003e]">{t.name}</p>
                  <p className="text-xs text-[#00003e]/50">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
