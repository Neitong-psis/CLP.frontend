import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { PROGRAMS, FEATURES, TESTIMONIALS } from '@/config/homepage';

import HeroSection from '@/components/pages/homepage/hero';
import StatsBar from '@/components/pages/homepage/statsBar';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ProgramsSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

/* ─────────────────────────── PROGRAMS ─────────────────────────── */

function ProgramsSection() {
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
                className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#f4a300]/0 transition-all duration-500 group-hover:bg-[#f4a300]/10"
              />

              <div className="relative flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00003e] text-[#f4a300] transition-colors group-hover:bg-[#f4a300] group-hover:text-[#00003e]">
                  <program.icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-[#00003e]/5 px-2.5 py-1 text-[10px] font-bold tracking-widest text-[#00003e]/60 uppercase">
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

/* ─────────────────────────── WHY CHOOSE US ─────────────────────────── */

function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden bg-[#00003e] py-20 text-white sm:py-24">
      {/* Dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #f4a300 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why AYLA"
          title="Built different. Built for you."
          description="Four reasons our students consistently outperform their peers."
          variant="dark"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#f4a300]/40 hover:bg-white/[0.04]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4a300]/10 text-[#f4a300] ring-1 ring-[#f4a300]/20 transition-all group-hover:bg-[#f4a300] group-hover:text-[#00003e]">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-bold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/55">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── TESTIMONIALS ─────────────────────────── */

function TestimonialsSection() {
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
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#f4a300] text-[#f4a300]"
                  />
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

/* ─────────────────────────── FINAL CTA ─────────────────────────── */

function CTASection() {
  return (
    <section className="bg-white pb-20 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f4a300] to-[#e09400] px-8 py-14 text-center sm:px-12 sm:py-16">
          {/* Decoration */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#00003e]/10 blur-3xl"
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <span className="text-xs font-bold tracking-[0.2em] text-[#00003e]/60 uppercase">
              Limited Seats · Spring 2026
            </span>
            <h2 className="text-3xl leading-tight font-bold tracking-tight text-[#00003e] sm:text-4xl">
              Your leadership journey starts here.
            </h2>
            <p className="text-base text-[#00003e]/70">
              Join the next generation of Cambodian leaders. Application
              deadline: March 31, 2026.
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/auth/register"
                className="group inline-flex items-center gap-2 rounded-full bg-[#00003e] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00003e]/90 hover:shadow-xl"
              >
                Start Application
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-full border border-[#00003e]/20 bg-white/40 px-6 py-3 text-sm font-semibold text-[#00003e] backdrop-blur-sm transition-all hover:bg-white"
              >
                Schedule a Visit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── SHARED ─────────────────────────── */

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  variant?: 'light' | 'dark';
}

function SectionHeader({
  eyebrow,
  title,
  description,
  variant = 'light',
}: SectionHeaderProps) {
  const isDark = variant === 'dark';
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-3 inline-flex items-center gap-2">
        <span className="h-px w-8 bg-[#f4a300]" />
        <span className="text-[11px] font-bold tracking-[0.2em] text-[#f4a300] uppercase">
          {eyebrow}
        </span>
        <span className="h-px w-8 bg-[#f4a300]" />
      </div>
      <h2
        className={`text-3xl leading-tight font-bold tracking-tight sm:text-4xl ${
          isDark ? 'text-white' : 'text-[#00003e]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed ${
            isDark ? 'text-white/60' : 'text-[#00003e]/60'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
