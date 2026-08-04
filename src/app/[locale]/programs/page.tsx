import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import { PROGRAM_DETAILS, type ProgramDetail } from '@/constants/programs';

function ProgramCard({ program }: { program: ProgramDetail }) {
  const Icon = program.icon;
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group border-brand-navy/8 hover:shadow-brand-navy/10 hover:border-brand-gold/30 flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="from-brand-navy/70 absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
        <span className="bg-brand-gold text-brand-navy absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase">
          {program.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="bg-brand-navy/5 text-brand-navy mb-1 flex h-9 w-9 items-center justify-center rounded-xl">
          <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
        </div>
        <h3 className="text-brand-navy group-hover:text-brand-navy/70 text-[17px] leading-snug font-bold transition-colors duration-200">
          {program.title}
        </h3>
        <p className="text-brand-gold text-[12px] font-semibold italic">
          {program.tagline}
        </p>
        <p className="text-brand-navy/55 line-clamp-3 text-[13px] leading-relaxed">
          {program.description}
        </p>

        <span className="text-brand-navy mt-3 inline-flex items-center gap-1.5 text-sm font-bold">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <div className="bg-brand-navy relative overflow-hidden py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="bg-brand-gold h-px w-6" />
              <span className="text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase">
                Programs
              </span>
            </div>
            <h1 className="max-w-2xl text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Find the program built for you
            </h1>
            <p className="mt-3 max-w-xl text-base text-white/60">
              From first-time leaders to alumni mentors — every program is built
              around real skills, real projects, and real outcomes.
            </p>
          </div>
        </div>

        {/* Grid */}
        <section className="bg-[#f8f9fc] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PROGRAM_DETAILS.map((program) => (
                <ProgramCard key={program.slug} program={program} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
