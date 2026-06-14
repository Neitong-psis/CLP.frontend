import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PROGRAM_DETAILS } from '@/constants/programs';

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = PROGRAM_DETAILS.find((p) => p.slug === slug);
  if (!program) notFound();

  const Icon = program.icon;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div className="relative h-80 w-full overflow-hidden sm:h-[420px] lg:h-[520px]">
          <Image
            src={program.image}
            alt={program.title}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="from-brand-navy/80 via-brand-navy/30 absolute inset-0 bg-linear-to-t to-transparent" />

          <div className="absolute inset-x-0 bottom-0 px-4 pb-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <span className="bg-brand-gold text-brand-navy mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                {program.tag}
              </span>
              <h1 className="text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {program.title}
              </h1>
              <p className="mt-2 text-base text-white/70 italic">
                {program.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* ── Stats bar ────────────────────────────────────────────── */}
        <div className="bg-brand-navy">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
              {program.stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-1 py-5 text-center"
                >
                  <span className="text-brand-gold text-xl font-bold">
                    {s.value}
                  </span>
                  <span className="text-[11px] font-semibold tracking-widest text-white/50 uppercase">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Overview + Who is it for ─────────────────────────────── */}
        <section className="bg-[#f8f9fc] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/programs"
              className="group text-brand-navy/50 hover:text-brand-navy mb-10 inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              All Programs
            </Link>

            <div className="grid gap-10 lg:grid-cols-3">
              {/* Description */}
              <div className="lg:col-span-2">
                <div className="mb-4 inline-flex items-center gap-2">
                  <span className="bg-brand-gold h-px w-6" />
                  <span className="text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase">
                    Overview
                  </span>
                </div>
                <h2 className="text-brand-navy mb-4 text-2xl font-bold">
                  About this Program
                </h2>
                <p className="text-brand-navy/65 text-base leading-relaxed">
                  {program.description}
                </p>
              </div>

              {/* Who is it for */}
              <div className="border-brand-navy/8 rounded-2xl border bg-white p-6 shadow-sm">
                <div className="bg-brand-navy text-brand-gold mb-3 flex h-10 w-10 items-center justify-center rounded-xl">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-brand-navy mb-2 text-sm font-bold">
                  Who is it for?
                </h3>
                <p className="text-brand-navy/60 text-[13px] leading-relaxed">
                  {program.whoIsItFor}
                </p>
                <Link
                  href="/auth"
                  className="group bg-brand-gold text-brand-navy relative mt-5 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Curriculum ───────────────────────────────────────────── */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="bg-brand-gold h-px w-6" />
              <span className="text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase">
                Curriculum
              </span>
            </div>
            <h2 className="text-brand-navy mb-10 text-2xl font-bold">
              What you&apos;ll learn
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {program.curriculum.map((item, i) => (
                <div
                  key={i}
                  className="border-brand-navy/8 hover:border-brand-gold/30 hover:shadow-brand-navy/8 flex gap-4 rounded-xl border p-5 transition-all duration-200 hover:shadow-md"
                >
                  <span className="bg-brand-navy/5 text-brand-navy/40 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-brand-gold text-[10px] font-bold tracking-widest uppercase">
                      {item.week}
                    </p>
                    <h4 className="text-brand-navy mt-0.5 text-sm font-bold">
                      {item.topic}
                    </h4>
                    <p className="text-brand-navy/55 mt-1 text-[12px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Outcomes ─────────────────────────────────────────────── */}
        <section className="bg-brand-navy py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="bg-brand-gold h-px w-6" />
              <span className="text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase">
                Outcomes
              </span>
            </div>
            <h2 className="mb-10 text-2xl font-bold text-white">
              What you&apos;ll walk away with
            </h2>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {program.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/4 p-4"
                >
                  <CheckCircle2 className="text-brand-gold mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-sm leading-snug text-white/75">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
              <Link
                href="/auth"
                className="group bg-brand-gold text-brand-navy hover:shadow-brand-gold/30 relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Start Application
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/programs"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/70 transition-all duration-300 hover:border-white hover:text-white"
              >
                View All Programs
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const { PROGRAM_DETAILS } = await import('@/constants/programs');
  return PROGRAM_DETAILS.map((p) => ({ slug: p.slug }));
}
