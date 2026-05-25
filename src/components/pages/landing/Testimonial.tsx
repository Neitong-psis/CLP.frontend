'use client';

import { Star, Quote } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { TESTIMONIALS, type Testimonial } from '@/constants/homepage';
import { entranceClass, entranceStyle } from '@/utils/animation';
import SectionHeader from './HeaderSection';

const CARD_STAGGER_MS = 150;
const HEADER_LEAD_MS = 200;
const STARS = Array.from({ length: 5 });

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  active: boolean;
}

function TestimonialCard({ testimonial, index, active }: TestimonialCardProps) {
  return (
    <div
      className={entranceClass(active, 'lg')}
      style={entranceStyle(active, HEADER_LEAD_MS + index * CARD_STAGGER_MS)}
    >
      <figure className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-lg border border-[#00003e]/10 bg-[#00003e]/[0.02] p-7 transition-colors hover:border-[#f4a300]/40 hover:bg-white">
        <Quote
          aria-hidden
          className="pointer-events-none absolute -top-2 -right-2 h-24 w-24 text-[#f4a300]/0 transition-colors group-hover:text-[#f4a300]/8"
        />

        <div className="flex items-center gap-0.5">
          {STARS.map((_, j) => (
            <Star key={j} className="h-4 w-4 fill-[#f4a300] text-[#f4a300]" />
          ))}
        </div>

        <blockquote className="flex-1 text-base leading-relaxed text-[#00003e]/80">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <figcaption className="flex items-center gap-3 border-t border-[#00003e]/10 pt-4 transition-colors group-hover:border-[#f4a300]/20">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#00003e] text-sm font-bold text-[#f4a300] transition-colors group-hover:bg-[#f4a300] group-hover:text-[#00003e]">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-[#00003e]">
              {testimonial.name}
            </p>
            <p className="text-xs text-[#00003e]/50">{testimonial.role}</p>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

export default function TestimonialsSection() {
  const [sectionRef, active] = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section ref={sectionRef} className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={entranceClass(active)}>
          <SectionHeader
            eyebrow="Student Stories"
            title="Real results, real students."
            description="Hear from the leaders we've helped shape."
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={i}
              active={active}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
