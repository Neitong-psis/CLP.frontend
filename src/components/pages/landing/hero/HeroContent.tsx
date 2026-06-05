'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { HERO_CONTENT } from '@/constants/hero';
import { ButtonLink } from '@/components/ui/button';
import { fadeUp, animationDelay } from './hero.animations';

const CYCLING_WORDS = [
  'Quality Education',
  'Leadership Development',
  'Innovative Learning',
] as const;

const VISIBLE_MS = 2400;
const EXIT_MS = 350;

function CyclingWord() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const [displayIndex, setDisplayIndex] = useState(0);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setPhase('out');
      const swapTimer = setTimeout(() => {
        setDisplayIndex((i) => (i + 1) % CYCLING_WORDS.length);
        setIndex((i) => (i + 1) % CYCLING_WORDS.length);
        setPhase('in');
      }, EXIT_MS);
      return () => clearTimeout(swapTimer);
    }, VISIBLE_MS);
    return () => clearTimeout(showTimer);
  }, [index]);

  return (
    <span
      className="relative mt-2 block overflow-hidden"
      style={{ paddingBottom: '0.12em' }}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Spacer: renders the longest word invisibly to give the container
          the correct natural line height at every font-size breakpoint */}
      <span aria-hidden className="invisible block leading-[1.1]">
        {CYCLING_WORDS.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>

      <span
        className={cn(
          'text-brand-gold absolute inset-x-0 top-0 text-center leading-[1.1] font-bold',
          phase === 'in'
            ? 'motion-safe:animate-slide-up'
            : 'motion-safe:animate-slide-up-out',
        )}
      >
        {CYCLING_WORDS[displayIndex]}
      </span>
    </span>
  );
}

const { subhead, primaryCta, secondaryCta } = HERO_CONTENT;

export function HeroContent() {
  return (
    <div className="flex flex-col items-center gap-6 text-center sm:gap-8 lg:gap-10">
      {/* Headline
          Mobile  (< sm):  text-4xl, single column, "Through:" inline
          Tablet  (sm–lg): text-5xl
          Laptop  (lg–xl): text-6xl
          Desktop (xl+):   text-7xl
      */}
      <h1
        className={cn(
          'font-heading w-full max-w-[16ch] text-[clamp(1.9rem,8vw,2.6rem)] leading-[1.1] font-bold tracking-tight text-white',
          'sm:max-w-2xl sm:text-5xl',
          'lg:max-w-4xl lg:text-6xl',
          'xl:text-7xl',
          fadeUp,
          animationDelay.sm,
        )}
      >
        {/* Mobile & tablet: stacked layout */}
        <span className="lg:hidden">
          Empowering Schools
          <br />
          <span className="text-white/35">Through</span>
          <span className="mx-1 text-white/20">:</span>
        </span>

        {/* Laptop & desktop: single line */}
        <span className="hidden lg:inline">
          Empowering Schools <span className="text-white/35">Through</span>
          <span className="mx-1.5 text-white/20">:</span>
        </span>

        <CyclingWord />
      </h1>

      {/* Subhead */}
      <p
        className={cn(
          'max-w-sm text-sm leading-relaxed text-white/50',
          'sm:max-w-md sm:text-base',
          'lg:max-w-lg lg:text-lg',
          fadeUp,
          animationDelay.lg,
        )}
      >
        {subhead}
      </p>

      {/* CTAs */}
      <div
        className={cn(
          'flex flex-col items-center gap-3 sm:flex-row sm:gap-4',
          fadeUp,
          animationDelay.xl,
        )}
      >
        {/* Primary — gold glow ring on hover */}
        <ButtonLink
          href={primaryCta.href}
          icon={<ArrowRight aria-hidden className="h-4 w-4" />}
          className="w-full shadow-[0_0_0_0_rgba(244,163,0,0)] hover:shadow-[0_0_0_4px_rgba(244,163,0,0.25)] hover:brightness-110 sm:w-auto"
        >
          {primaryCta.label}
        </ButtonLink>

        {/* Secondary — frosted fill slides up + glow ring on hover */}
        <a
          href={secondaryCta.href}
          className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:text-white hover:shadow-[0_0_0_4px_rgba(255,255,255,0.07)] sm:w-auto"
        >
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full rounded-full bg-white/10 transition-transform duration-300 ease-out group-hover:translate-y-0"
          />
          <span className="relative">{secondaryCta.label}</span>
        </a>
      </div>
    </div>
  );
}
