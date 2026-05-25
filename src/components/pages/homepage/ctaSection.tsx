'use client';

import { ArrowRight, Link } from "lucide-react";

export default function CTASection() {
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
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00003e]/60">
              Limited Seats · Spring 2026
            </span>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#00003e] sm:text-4xl">
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
