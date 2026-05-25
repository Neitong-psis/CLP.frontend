import { ShieldCheck } from 'lucide-react';
import { cn } from '@/utils/cn';
import { HERO_CONTENT } from '@/constants/hero';
import { FloatingBadge } from '@/components/ui/FloatingBadge';
import { QuoteCard } from '../QuoteCard';
import { scaleIn, animationDelay } from './hero.animations';

const { testimonial, enrollmentBadge, accreditationBadge } = HERO_CONTENT;

export function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center py-6 lg:justify-end lg:py-0">
      <div
        className={cn(
          'group relative mx-6 w-full max-w-[400px] sm:mx-0',
          scaleIn,
          animationDelay.md,
        )}
      >
        <QuoteCard
          quote={testimonial.quote}
          badge={testimonial.badge}
          author={testimonial.author}
          stats={testimonial.stats}
        />

        <FloatingBadge
          variant="enrollment"
          eyebrow={enrollmentBadge.eyebrow}
          value={enrollmentBadge.value}
          ariaLabel={enrollmentBadge.ariaLabel}
          className="transition-[translate] duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-3"
        />

        <FloatingBadge
          variant="accreditation"
          eyebrow={accreditationBadge.eyebrow}
          value={accreditationBadge.value}
          ariaLabel={accreditationBadge.ariaLabel}
          icon={ShieldCheck}
          className="transition-[translate] duration-500 ease-out group-hover:-translate-x-1 group-hover:translate-y-3"
        />
      </div>
    </div>
  );
}
