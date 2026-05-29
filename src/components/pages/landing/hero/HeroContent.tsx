import { ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import { HERO_CONTENT } from '@/constants/hero';
import { ButtonLink } from '@/components/ui/button';
import { HighlightedWord } from '@/components/ui/HighlightedWord';
import { fadeUp, animationDelay } from './hero.animations';

const { headline, subhead, primaryCta, secondaryCta } = HERO_CONTENT;

export function HeroContent() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <h1 className="font-heading text-brand-navy max-w-4xl text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl">
        {headline.lead}{' '}
        <HighlightedWord delay={250}>{headline.highlight}</HighlightedWord>{' '}
        {headline.tail}
      </h1>

      <p
        className={cn(
          'text-brand-navy/65 max-w-xl text-base leading-relaxed sm:text-lg',
          fadeUp,
          animationDelay.lg,
        )}
      >
        {subhead}
      </p>

      <div
        className={cn(
          'flex flex-wrap items-center justify-center gap-3 pt-1',
          fadeUp,
          animationDelay.xl,
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
