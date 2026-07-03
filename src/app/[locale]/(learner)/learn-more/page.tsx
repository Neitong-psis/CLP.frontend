'use client';

import { useState } from 'react';
import {
  BookOpen,
  Compass,
  ClipboardList,
  Award,
  BarChart3,
  Rocket,
  ChevronDown,
  Mail,
  MessageCircle,
  FileText,
  PlayCircle,
  Globe,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import TopBar from '@/components/common/TopBar';

// ─── Data ──────────────────────────────────────────────────────────────────────

const GUIDES = [
  {
    icon: Rocket,
    iconCls: 'bg-amber-500/10 text-amber-500',
    title: 'Getting Started',
    desc: 'Set up your profile, browse the course catalog, and enrol in your first course in under 5 minutes.',
    badge: 'Start here',
    badgeCls: 'bg-amber-500/10 text-amber-500',
  },
  {
    icon: Compass,
    iconCls: 'bg-blue-500/10 text-blue-500',
    title: 'Exploring Courses',
    desc: 'Browse the marketplace, filter by category or level, and preview a course before enrolling.',
    badge: 'Popular',
    badgeCls: 'bg-blue-500/10 text-blue-500',
  },
  {
    icon: PlayCircle,
    iconCls: 'bg-violet-500/10 text-violet-500',
    title: 'Learning a Course',
    desc: 'Work through documents, videos, quizzes, and assignments in order, and mark each item complete as you go.',
    badge: null,
    badgeCls: '',
  },
  {
    icon: ClipboardList,
    iconCls: 'bg-emerald-500/10 text-emerald-500',
    title: 'Quizzes & Assignments',
    desc: 'Take graded quizzes for instant scoring, and submit assignments for review directly inside the lesson.',
    badge: null,
    badgeCls: '',
  },
  {
    icon: BarChart3,
    iconCls: 'bg-teal-500/10 text-teal-500',
    title: 'Tracking Progress',
    desc: 'My Learning shows your progress on every enrolled course, and picks up right where you left off.',
    badge: null,
    badgeCls: '',
  },
  {
    icon: Award,
    iconCls: 'bg-rose-500/10 text-rose-500',
    title: 'Certificates',
    desc: 'You automatically receive a certificate when you reach 100% completion on any course. No action needed.',
    badge: null,
    badgeCls: '',
  },
];

const FEATURES = [
  {
    icon: BookOpen,
    iconCls: 'text-blue-500',
    title: 'My Learning',
    desc: 'A single dashboard for every course you are enrolled in, with progress bars and quick resume links.',
  },
  {
    icon: Compass,
    iconCls: 'text-violet-500',
    title: 'Course Explorer',
    desc: 'Search and filter the full course catalog by category, level, rating, and price.',
  },
  {
    icon: PlayCircle,
    iconCls: 'text-amber-500',
    title: 'Course Player',
    desc: 'A distraction-free player for documents, videos, quizzes, and assignments with a persistent curriculum sidebar.',
  },
  {
    icon: ClipboardList,
    iconCls: 'text-emerald-500',
    title: 'Quizzes & Assignments',
    desc: 'Instant quiz scoring plus file or text-based assignment submissions, all tracked per lesson.',
  },
  {
    icon: Award,
    iconCls: 'text-rose-500',
    title: 'Auto Certificates',
    desc: 'Completion certificates are issued automatically with a unique verification link you can share.',
  },
  {
    icon: Globe,
    iconCls: 'text-teal-500',
    title: 'Multi-Language',
    desc: 'The platform supports Khmer and English — switch languages any time from your profile menu.',
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'How do I enrol in a course?',
    a: 'Go to Explore, find a course you like, and click "Enrol" (or "Buy Now" for a paid course). It will immediately appear in My Learning.',
  },
  {
    q: 'Where can I continue a course I already started?',
    a: 'Open My Learning — each enrolled course card shows your progress and a "Continue" button that takes you straight back to your last unfinished lesson.',
  },
  {
    q: 'How do quizzes work?',
    a: 'Each quiz shows one question at a time. Once submitted, you get your score immediately along with the correct answers, and your best attempt is saved to your progress.',
  },
  {
    q: 'How do I submit an assignment?',
    a: 'Open the assignment inside the lesson, follow the instructions, and submit either a text response or a file upload depending on what the lesson requires.',
  },
  {
    q: 'How do I get my certificate?',
    a: 'Certificates are issued automatically the moment you complete 100% of a course. You will get a notification, and it will appear under Certificates with a shareable verification link.',
  },
  {
    q: 'Can I retake a quiz?',
    a: 'Yes. Reopen the quiz from the course player at any time — your most recent attempt is what counts toward your progress.',
  },
  {
    q: 'Can I switch the app language?',
    a: 'Yes. Open your profile menu in the top-right corner and choose your preferred language — the whole platform updates immediately.',
  },
  {
    q: 'What does "at risk" or "inactive" mean on my dashboard?',
    a: 'Those labels are only visible to educators reviewing student progress — as a learner you will simply see your own progress percentage and next steps.',
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-border border-b last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-foreground text-sm font-semibold">{q}</span>
        <ChevronDown
          className={cn(
            'text-muted-foreground mt-0.5 size-4 shrink-0 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>
      {open && (
        <p className="text-muted-foreground pb-4 text-sm leading-relaxed">
          {a}
        </p>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function LearnerLearnMorePage() {
  return (
    <div className="bg-background flex min-h-full flex-col">
      <TopBar
        role="learner"
        title="Learn More"
        subtitle="Guides, feature docs, and answers for learners"
      />

      <div className="flex-1 space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="border-border bg-card overflow-hidden rounded-2xl border">
          <div className="from-brand-navy via-brand-navy/95 to-brand-navy/80 relative bg-gradient-to-br px-8 py-10 text-white">
            {/* Decorative blobs */}
            <div className="bg-brand-gold/[0.07] absolute -top-12 -right-12 size-52 rounded-full" />
            <div className="absolute right-20 -bottom-8 size-36 rounded-full bg-white/[0.03]" />
            <div className="bg-brand-gold/[0.05] absolute top-4 right-40 size-20 rounded-full" />

            <div className="relative max-w-xl">
              <div className="mb-3 flex items-center gap-2">
                <HelpCircle className="text-brand-gold size-5" />
                <span className="text-brand-gold text-sm font-semibold">
                  Learner Help Center
                </span>
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Everything you need to learn effectively
              </h2>
              <p className="mt-2 text-base text-white/70">
                Step-by-step guides, feature explanations, and answers to the
                most common learner questions — all in one place.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                  <Compass className="size-3" />
                  Explore Courses
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                  <BookOpen className="size-3" />
                  My Learning
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                  <Award className="size-3" />
                  Certificates
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Guide cards */}
        <section>
          <h3 className="text-foreground mb-4 text-[15px] font-bold">
            Learner Guides
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map(
              ({ icon: Icon, iconCls, title, desc, badge, badgeCls }) => (
                <button
                  key={title}
                  type="button"
                  className="group border-border bg-card hover:border-muted-foreground/30 flex cursor-pointer flex-col gap-3 rounded-2xl border p-5 text-left transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={cn(
                        'flex size-9 items-center justify-center rounded-xl',
                        iconCls,
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    {badge && (
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                          badgeCls,
                        )}
                      >
                        {badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-bold">{title}</p>
                    <p className="text-muted-foreground mt-1 text-[12px] leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </button>
              ),
            )}
          </div>
        </section>

        {/* Learning workflow strip */}
        <section className="border-border bg-card overflow-hidden rounded-2xl border p-6">
          <h3 className="text-foreground mb-1 text-[15px] font-bold">
            How Learning Works
          </h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Every course follows the same simple path from enrolment to
            certificate.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            {[
              {
                step: '1',
                label: 'Enrol',
                desc: 'Browse Explore, preview a course, and enrol — it appears instantly in My Learning.',
                color: 'bg-blue-500',
                light: 'bg-blue-500/10 text-blue-500',
              },
              {
                step: '2',
                label: 'Learn',
                desc: 'Work through documents, videos, quizzes, and assignments at your own pace.',
                color: 'bg-violet-500',
                light: 'bg-violet-500/10 text-violet-500',
              },
              {
                step: '3',
                label: 'Get Certified',
                desc: 'Reach 100% completion and receive your certificate automatically.',
                color: 'bg-emerald-500',
                light: 'bg-emerald-500/10 text-emerald-500',
              },
            ].map(({ step, label, desc, color, light }, i, arr) => (
              <div key={step} className="flex flex-1 items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-black text-white',
                      color,
                    )}
                  >
                    {step}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="bg-border mt-2 hidden h-full w-px sm:block" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <span
                    className={cn(
                      'mb-1 inline-block rounded-md px-2 py-0.5 text-[10px] font-bold',
                      light,
                    )}
                  >
                    Step {step}
                  </span>
                  <p className="text-foreground text-sm font-bold">{label}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Platform features */}
        <section>
          <h3 className="text-foreground mb-4 text-[15px] font-bold">
            Platform Features
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, iconCls, title, desc }) => (
              <div
                key={title}
                className="border-border bg-card rounded-2xl border p-5"
              >
                <Icon className={cn('mb-3 size-5', iconCls)} />
                <p className="text-foreground text-sm font-bold">{title}</p>
                <p className="text-muted-foreground mt-1.5 text-[12px] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ + Contact */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* FAQ */}
          <section className="border-border bg-card rounded-2xl border p-6 lg:col-span-2">
            <h3 className="text-foreground mb-1 text-[15px] font-bold">
              Frequently Asked Questions
            </h3>
            <p className="text-muted-foreground mb-5 text-sm">
              Can&apos;t find what you&apos;re looking for? Reach out via the
              contact panel.
            </p>
            <div>
              {FAQ.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="flex flex-col gap-4">
            <div className="border-border bg-card rounded-2xl border p-6">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-blue-500/10">
                <Mail className="size-4 text-blue-500" />
              </div>
              <p className="text-foreground text-sm font-bold">Email Support</p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                Our learner support team replies within 24 hours on business
                days.
              </p>
              <a
                href="mailto:learners@clp.io"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:underline"
              >
                learners@clp.io
              </a>
            </div>

            <div className="border-border bg-card rounded-2xl border p-6">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-violet-500/10">
                <MessageCircle className="size-4 text-violet-500" />
              </div>
              <p className="text-foreground text-sm font-bold">Live Chat</p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                Available Mon–Fri 09:00–18:00 (UTC+7). Average wait: &lt;3 min.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-500 hover:underline"
              >
                Start a conversation →
              </button>
            </div>

            <div className="border-border bg-card rounded-2xl border p-6">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-emerald-500/10">
                <FileText className="size-4 text-emerald-500" />
              </div>
              <p className="text-foreground text-sm font-bold">Release Notes</p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                Stay up to date with new courses, course player improvements,
                and platform updates.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500 hover:underline"
              >
                View changelog →
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
