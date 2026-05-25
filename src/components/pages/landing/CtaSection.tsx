import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-white pb-20 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#f4a300] px-8 py-16 text-center sm:px-12 sm:py-20">
          {/* Blobs float continuously — opposite phase via delay offset */}
          <div
            aria-hidden
            className="motion-safe:animate-float pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/15 blur-3xl"
          />
          <div
            aria-hidden
            className="motion-safe:animate-float pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#00003e]/10 blur-3xl motion-safe:delay-300"
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <div className="overflow-hidden">
              <span className="motion-safe:animate-slide-up block text-xs font-bold tracking-[0.2em] text-[#00003e]/60 uppercase motion-safe:delay-100">
                Limited Seats · Spring 2026
              </span>
            </div>

            <div className="overflow-hidden">
              <h2 className="motion-safe:animate-slide-up text-3xl leading-tight font-bold tracking-tight text-[#00003e] motion-safe:delay-200 sm:text-4xl">
                Your leadership journey starts here.
              </h2>
            </div>

            <div className="overflow-hidden">
              <p className="motion-safe:animate-slide-up text-base text-[#00003e]/70 motion-safe:delay-300">
                Join the next generation of Cambodian leaders. Application
                deadline: March 31, 2026.
              </p>
            </div>

            <div className="motion-safe:animate-fade-in-up mt-3 flex flex-wrap items-center justify-center gap-3 motion-safe:delay-400">
              <Link
                href="/auth/signin"
                className="group inline-flex items-center gap-2 rounded-full bg-[#00003e] px-6 py-3.5 text-sm font-semibold text-white ring-2 ring-transparent transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#00003e]/90 hover:ring-white/20"
              >
                Start Application
                <ArrowRight className="h-4 w-4 transition-[translate] duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-full border border-[#00003e]/20 bg-white/40 px-6 py-3.5 text-sm font-semibold text-[#00003e] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white"
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
