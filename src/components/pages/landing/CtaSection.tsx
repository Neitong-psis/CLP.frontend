import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { authHref } from '@/constants/auth-links';

export default function CTASection() {
  return (
    <section className="bg-white pb-20 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-gold relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-12 sm:py-20">
          {/* Blobs float continuously — opposite phase via delay offset */}
          <div
            aria-hidden
            className="motion-safe:animate-float pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/15 blur-3xl"
          />
          <div
            aria-hidden
            className="motion-safe:animate-float bg-brand-navy/10 pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl motion-safe:delay-300"
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <div className="overflow-hidden">
              <span className="motion-safe:animate-slide-up text-brand-navy/60 block text-xs font-bold tracking-[0.2em] uppercase motion-safe:delay-100">
                Limited Seats · Spring 2026
              </span>
            </div>

            <div className="overflow-hidden">
              <h2 className="motion-safe:animate-slide-up text-brand-navy text-3xl leading-tight font-bold tracking-tight motion-safe:delay-200 sm:text-4xl">
                Your leadership journey starts here.
              </h2>
            </div>

            <div className="overflow-hidden">
              <p className="motion-safe:animate-slide-up text-brand-navy/70 text-base motion-safe:delay-300">
                Join the next generation of Cambodian leaders. Application
                deadline: March 31, 2026.
              </p>
            </div>

            <div className="motion-safe:animate-fade-in-up mt-3 flex flex-wrap items-center justify-center gap-3 motion-safe:delay-400">
              {/* Primary — white glow ring expands + brightness sweep */}
              <Link
                href={authHref('login', 'learner')}
                className="group bg-brand-navy relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(255,255,255,0.3)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-300 ease-out group-hover:translate-x-0"
                />
                <span className="relative">Start Application</span>
                <ArrowRight className="relative h-4 w-4 transition-[translate] duration-200 group-hover:translate-x-1" />
              </Link>

              {/* Secondary — fills solid white from bottom + border sharpens */}
              <Link
                href="/about"
                className="group border-brand-navy/25 text-brand-navy hover:border-brand-navy/0 relative inline-flex items-center gap-2 overflow-hidden rounded-full border bg-white/40 px-6 py-3.5 text-sm font-semibold backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(0,0,62,0.12)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full bg-white transition-transform duration-300 ease-out group-hover:translate-y-0"
                />
                <span className="relative">Schedule a Visit</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
