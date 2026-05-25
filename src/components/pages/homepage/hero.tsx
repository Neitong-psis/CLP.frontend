'use client';

import Link from 'next/link';
import { ArrowRight, Play, Quote, Star } from 'lucide-react';
import { BRAND } from '@/config/brand';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#f4a300]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#00003e]/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
        {/* Copy */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f4a300]/30 bg-[#f4a300]/10 px-3 py-1.5 text-xs font-semibold tracking-widest text-[#f4a300] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f4a300]" />
            Australia-Accredited · Phnom Penh
          </div>

          <h1 className="text-4xl leading-tight font-bold tracking-tight text-[#00003e] sm:text-5xl lg:text-6xl">
            Shaping tomorrow&apos;s{' '}
            <span className="relative inline-block">
              <span className="relative z-10">leaders</span>
              <span
                aria-hidden
                className="absolute bottom-1 left-0 z-0 h-3 w-full bg-[#f4a300]/40"
              />
            </span>{' '}
            today.
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-[#00003e]/60 sm:text-lg">
            {BRAND.tagline} Join thousands of young Cambodians mastering
            leadership through our world-class programs.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/auth/register"
              className="group inline-flex items-center gap-2 rounded-full bg-[#00003e] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00003e]/90 hover:shadow-xl hover:shadow-[#00003e]/30"
            >
              Apply Now
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/programs"
              className="group inline-flex items-center gap-2 rounded-full border border-[#00003e]/15 bg-white px-6 py-3 text-sm font-semibold text-[#00003e] transition-all duration-200 hover:border-[#00003e] hover:bg-[#00003e]/5"
            >
              <Play className="h-4 w-4 fill-current" />
              Watch Tour
            </Link>
          </div>

          {/* Trust line */}
          <div className="mt-4 flex items-center gap-3 text-xs text-[#00003e]/50">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-[#f4a300] text-[#f4a300]"
                />
              ))}
            </div>
            <span>4.9 / 5 · Rated by 500+ families</span>
          </div>
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            {/* Main card */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00003e] to-[#00003e]/80 p-8 shadow-2xl">
              <div className="flex h-full flex-col justify-between text-white">
                <div className="flex items-start justify-between">
                  <div className="rounded-2xl bg-[#f4a300]/20 p-3">
                    <Quote className="h-6 w-6 text-[#f4a300]" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-[#f4a300] uppercase">
                    Student Story
                  </span>
                </div>
                <div>
                  <p className="text-lg leading-relaxed font-medium text-white/90">
                    &ldquo;AYLA didn&apos;t just teach me leadership — it
                    transformed how I see my future.&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-white/50">
                    — Sokha, Class of 2025
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badge top-right */}
            <div className="absolute -top-4 -right-4 rotate-3 rounded-2xl bg-[#f4a300] px-4 py-3 shadow-xl">
              <p className="text-[10px] font-bold tracking-widest text-[#00003e] uppercase">
                Now Enrolling
              </p>
              <p className="text-sm font-bold text-[#00003e]">Spring 2026</p>
            </div>

            {/* Floating badge bottom-left */}
            <div className="absolute -bottom-4 -left-4 -rotate-3 rounded-2xl border border-[#00003e]/10 bg-white px-4 py-3 shadow-xl">
              <p className="text-[10px] font-bold tracking-widest text-[#e00025] uppercase">
                Accredited
              </p>
              <p className="text-sm font-bold text-[#00003e]">
                Australian Standard
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
