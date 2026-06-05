'use client';

import { Star, Quote } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { TESTIMONIALS, type Testimonial } from '@/constants/homepage';
import { entranceClass, entranceStyle } from '@/lib/utils/animation';
import SectionHeader from '@/components/common/SectionHeader';

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
      <figure className="group border-brand-navy/10 bg-brand-navy/2 hover:border-brand-gold/40 relative flex h-full flex-col gap-5 overflow-hidden rounded-lg border p-7 transition-colors hover:bg-white">
        <Quote
          aria-hidden
          className="text-brand-gold/0 group-hover:text-brand-gold/8 pointer-events-none absolute -top-2 -right-2 h-24 w-24 transition-colors"
        />

        <div className="flex items-center gap-0.5">
          {STARS.map((_, j) => (
            <Star key={j} className="text-brand-gold h-4 w-4" />
          ))}
        </div>

        <blockquote className="text-brand-navy/80 flex-1 text-base leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <figcaption className="border-brand-navy/10 group-hover:border-brand-gold/20 flex items-center gap-3 border-t pt-4 transition-colors">
          <div className="bg-brand-navy text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="text-brand-navy text-sm font-bold">
              {testimonial.name}
            </p>
            <p className="text-brand-navy/50 text-xs">{testimonial.role}</p>
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
