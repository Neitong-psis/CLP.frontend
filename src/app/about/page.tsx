'use client';

import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/footer/Footer';
import HeaderSection from '@/components/common/SectionHeader';
import { ArrowRight, GraduationCap, Heart, Globe, Shield } from 'lucide-react';
import { BRAND } from '@/constants/brand';
import { HERO_STATS, TRUST_BADGES } from '@/constants/homepage';
import { useInView } from '@/hooks/useInView';
import { entranceClass, entranceStyle } from '@/lib/utils/animation';

// ─── Data ────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    icon: GraduationCap,
    title: 'Academic Excellence',
    description:
      'We hold every student to the highest standard, aligning our curriculum with Cambridge International and Australian qualifications.',
  },
  {
    icon: Heart,
    title: 'Holistic Development',
    description:
      'Beyond academics, we nurture character, empathy, and the social skills that define great leaders.',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description:
      'Our programmes prepare students for an interconnected world — from Southeast Asia to university campuses abroad.',
  },
  {
    icon: Shield,
    title: 'Integrity & Trust',
    description:
      'We build lasting relationships with students, families, and partners grounded in honesty and accountability.',
  },
] as const;

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-brand-navy relative overflow-hidden pt-32 pb-32 sm:pt-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="bg-brand-gold/10 pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-4 inline-flex items-center gap-2">
          <span className="bg-brand-gold h-px w-6 sm:w-8" />
          <span className="text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase sm:text-[11px]">
            Who We Are
          </span>
          <span className="bg-brand-gold h-px w-6 sm:w-8" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Shaping Leaders for
          <br className="hidden sm:block" /> a Changing World
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
          {BRAND.tagline}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/programs"
            className="group bg-brand-gold text-brand-navy hover:shadow-brand-gold/40 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-px hover:shadow-lg"
          >
            Our Programs
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-px hover:border-white/50"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Mission & Vision ─────────────────────────────────────────────────────────

function MissionSection() {
  const [ref, inView] = useInView<HTMLElement>();
  const cards = [
    {
      label: 'Mission',
      heading: 'Equip every student with the skills to lead.',
      body: 'AYLA was founded on the belief that leadership is not a privilege for the few — it is a skill that can be taught, practised, and refined. Our mission is to provide every young Cambodian with access to a world-class, internationally accredited education that builds academic strength, personal character, and the confidence to lead.',
    },
    {
      label: 'Vision',
      heading: 'A generation of leaders driving Cambodia forward.',
      body: "We envision a Cambodia where young people are the architects of their nation's future — confident in their knowledge, principled in their values, and capable of competing on the world stage. By blending the national MoEYS curriculum with Cambridge International standards, we open doors that were once beyond reach.",
    },
  ];

  return (
    <section ref={ref} className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mb-14 ${entranceClass(inView)}`}
          style={entranceStyle(inView, 0)}
        >
          <HeaderSection eyebrow="Our Purpose" title="Why AYLA exists." />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {cards.map((card, i) => (
            <div
              key={card.label}
              className={`border-brand-navy/8 rounded-2xl border p-8 sm:p-10 ${entranceClass(inView)}`}
              style={entranceStyle(inView, i * 150)}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="bg-brand-gold h-8 w-1 rounded-full" />
                <span className="text-brand-gold text-[11px] font-bold tracking-[0.2em] uppercase">
                  {card.label}
                </span>
              </div>
              <h3 className="text-brand-navy mb-4 text-xl leading-snug font-bold sm:text-2xl">
                {card.heading}
              </h3>
              <p className="text-brand-navy/60 text-[15px] leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Our Story ────────────────────────────────────────────────────────────────

function StorySection() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section ref={ref} className="bg-[#f8f9fc] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div
            className={entranceClass(inView)}
            style={entranceStyle(inView, 0)}
          >
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="bg-brand-gold h-px w-6 sm:w-8" />
              <span className="text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase sm:text-[11px]">
                Our Story
              </span>
              <span className="bg-brand-gold h-px w-6 sm:w-8" />
            </div>
            <h2 className="text-brand-navy mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              From one classroom to Cambodia&apos;s most trusted academy.
            </h2>
            <div className="text-brand-navy/60 space-y-4 text-[15px] leading-relaxed">
              <p>
                AYLA was founded with a straightforward but ambitious premise:
                that Cambodian students deserve access to the same quality of
                education offered at leading international schools — without
                leaving home.
              </p>
              <p>
                Starting with a single cohort in Phnom Penh, we built a
                curriculum that married the rigour of the Cambridge
                International framework with the cultural context of the
                national MoEYS syllabus. The results spoke for themselves.
              </p>
              <p>
                Today, AYLA serves thousands of students across four programme
                tracks, supported by certified educators, industry mentors, and
                university partnerships spanning Australia, the UK, and
                Southeast Asia.
              </p>
            </div>
          </div>

          <div
            className={`grid grid-cols-2 gap-5 ${entranceClass(inView)}`}
            style={entranceStyle(inView, 200)}
          >
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="border-brand-navy/8 rounded-2xl border bg-white p-6 text-center shadow-sm"
              >
                <p className="text-brand-navy text-3xl font-bold sm:text-4xl">
                  {stat.value}
                </p>
                <p className="text-brand-navy/50 mt-1.5 text-[12px] font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Values ───────────────────────────────────────────────────────────────────

function ValuesSection() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section ref={ref} className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mb-14 ${entranceClass(inView)}`}
          style={entranceStyle(inView, 0)}
        >
          <HeaderSection
            eyebrow="Our Values"
            title="What we stand for."
            description="Every decision at AYLA — from curriculum design to how we speak with students — is guided by these four principles."
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className={`group border-brand-navy/8 hover:border-brand-gold/40 hover:shadow-brand-navy/8 rounded-2xl border bg-[#f8f9fc] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${entranceClass(inView)}`}
              style={entranceStyle(inView, i * 100)}
            >
              <div className="bg-brand-navy text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300">
                <v.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-brand-navy mb-2 text-[15px] font-bold">
                {v.title}
              </h3>
              <p className="text-brand-navy/55 text-[13px] leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Accreditations ───────────────────────────────────────────────────────────

function AccreditationsSection() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section ref={ref} className="bg-[#f8f9fc] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p
          className={`text-brand-navy/40 mb-10 text-center text-[11px] font-bold tracking-[0.2em] uppercase ${entranceClass(inView)}`}
          style={entranceStyle(inView, 0)}
        >
          Accredited &amp; Recognised By
        </p>
        <div
          className={`flex flex-wrap items-center justify-center gap-4 sm:gap-6 ${entranceClass(inView)}`}
          style={entranceStyle(inView, 100)}
        >
          {TRUST_BADGES.map((badge) => (
            <span
              key={badge.label}
              className="border-brand-navy/15 text-brand-navy/60 rounded-full border bg-white px-5 py-2.5 text-sm font-bold shadow-sm"
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTASection() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className="bg-brand-navy relative overflow-hidden py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="bg-brand-gold/15 pointer-events-none absolute bottom-0 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full blur-[100px]" />

      <div
        className={`relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8 ${entranceClass(inView)}`}
        style={entranceStyle(inView, 0)}
      >
        <p className="text-brand-gold mb-3 text-[11px] font-bold tracking-[0.2em] uppercase">
          Join AYLA
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ready to start your journey?
        </h2>
        <p className="mt-5 text-base text-white/55 sm:text-lg">
          Applications are open for the 2027 cohort. Find the programme that
          fits your goals and take the first step.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/programs"
            className="group bg-brand-gold text-brand-navy hover:shadow-brand-gold/40 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-px hover:shadow-lg"
          >
            Explore Programs
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-px hover:border-white/50"
          >
            Contact Admissions
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <MissionSection />
        <StorySection />
        <ValuesSection />
        <AccreditationsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
