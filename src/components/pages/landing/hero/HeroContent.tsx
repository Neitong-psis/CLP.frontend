import { ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import { HERO_CONTENT } from '@/constants/hero';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { HighlightedWord } from '@/components/ui/HighlightedWord';
import { fadeUp, slideUp, animationDelay } from './hero.animations';

const { headline, subhead, primaryCta, secondaryCta } = HERO_CONTENT;

export function HeroContent() {
  return (
    <div className="flex flex-col gap-7">
      <div className="overflow-hidden">
        <h1
          className={cn(
            'font-heading text-brand-navy text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-6xl',
            slideUp,
            animationDelay.sm,
          )}
        >
          {headline.lead}{' '}
          <HighlightedWord>{headline.highlight}</HighlightedWord>{' '}
          {headline.tail}
        </h1>
      </div>

      <div className="overflow-hidden">
        <p
          className={cn(
            'text-brand-navy/60 max-w-lg text-base leading-relaxed sm:text-lg',
            slideUp,
            animationDelay.md,
          )}
        >
          {subhead}
        </p>
      </div>

      <div
        className={cn(
          'flex flex-wrap items-center gap-3 pt-1',
          fadeUp,
          animationDelay.lg,
        )}
      >
        <ButtonLink
          href={primaryCta.href}
          icon={<ArrowRight aria-hidden className="h-4 w-4" />}
        >
          {primaryCta.label}
        </ButtonLink>
        <ButtonLink href={secondaryCta.href} variant="secondary">
          {secondaryCta.label}
        </ButtonLink>
      </div>
    </div>
  );
}
