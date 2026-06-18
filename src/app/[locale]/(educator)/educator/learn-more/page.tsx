'use client';

import { useState } from 'react';
import {
  BookOpen,
  Users,
  BarChart3,
  PencilLine,
  ChevronDown,
  Mail,
  MessageCircle,
  FileText,
  Zap,
  Video,
  Award,
  HelpCircle,
  ClipboardList,
  TrendingUp,
  DollarSign,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import TopBar from '@/components/common/TopBar';

// ─── Data ──────────────────────────────────────────────────────────────────────

const GUIDES = [
  {
    icon: Zap,
    iconCls: 'bg-amber-500/10 text-amber-500',
    title: 'Getting Started',
    desc: 'Set up your educator profile, publish your first course, and enrol your first learners in under 15 minutes.',
    badge: 'Start here',
    badgeCls: 'bg-amber-500/10 text-amber-500',
  },
  {
    icon: BookOpen,
    iconCls: 'bg-blue-500/10 text-blue-500',
    title: 'Creating a Course',
    desc: 'Use the 3-step wizard to add course info, build your curriculum with modules and lessons, then submit for admin review.',
    badge: 'Popular',
    badgeCls: 'bg-blue-500/10 text-blue-500',
  },
  {
    icon: Video,
    iconCls: 'bg-violet-500/10 text-violet-500',
    title: 'Adding Content',
    desc: 'Attach text blocks, images, videos, quizzes, and assignments to any lesson. Reorder or delete content at any time.',
    badge: null,
    badgeCls: '',
  },
  {
    icon: Users,
    iconCls: 'bg-emerald-500/10 text-emerald-500',
    title: 'Managing Students',
    desc: 'Track progress, filter by activity or risk, invite new learners by email, and monitor engagement per course.',
    badge: null,
    badgeCls: '',
  },
  {
    icon: BarChart3,
    iconCls: 'bg-teal-500/10 text-teal-500',
    title: 'Analytics & Insights',
    desc: 'View weekly enrollments, completion ranges, quiz pass rates, and revenue trends from your Analytics dashboard.',
    badge: null,
    badgeCls: '',
  },
  {
    icon: Award,
    iconCls: 'bg-rose-500/10 text-rose-500',
    title: 'Certificates',
    desc: 'Learners automatically receive a certificate when they reach 100% course completion. No manual action needed.',
    badge: null,
    badgeCls: '',
  },
];

const FEATURES = [
  {
    icon: PencilLine,
    iconCls: 'text-blue-500',
    title: 'Course Builder',
    desc: '3-step wizard: fill in course info, build a curriculum with drag-and-drop modules, then preview before submitting.',
  },
  {
    icon: ClipboardList,
    iconCls: 'text-violet-500',
    title: 'Quiz & Assignments',
    desc: 'Add single-choice or multi-choice quizzes and file-upload assignments directly inside any lesson.',
  },
  {
    icon: TrendingUp,
    iconCls: 'text-emerald-500',
    title: 'Live Analytics',
    desc: 'Real-time charts for enrollments, student completion ranges, quiz scores, and revenue per course.',
  },
  {
    icon: DollarSign,
    iconCls: 'text-amber-500',
    title: 'Flexible Pricing',
    desc: 'Set your course as free or paid. Choose a price in USD — the platform handles billing and payouts.',
  },
  {
    icon: Globe,
    iconCls: 'text-teal-500',
    title: 'Multi-Language',
    desc: 'The platform supports Khmer and English. Learners pick their language; your content adapts accordingly.',
  },
  {
    icon: Award,
    iconCls: 'text-rose-500',
    title: 'Auto Certificates',
    desc: 'Completion certificates are issued automatically with a unique verification link shareable by learners.',
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'How do I submit a course for review?',
    a: 'Complete all three steps in the Create Course wizard — Course Info, Curriculum, and Preview & Publish. Once you click "Submit for Review", the admin team is notified and will publish or request changes within 2 business days.',
  },
  {
    q: 'Can I edit a course after it is published?',
    a: 'Yes. Open the course from My Courses → select the Published tab → click "View Course". Edits to a live course go back into an "Under Review" state until an admin approves them.',
  },
  {
    q: 'How do I add a quiz to a lesson?',
    a: 'Inside the Course Builder, expand a lesson and click "Add Section". Choose Quiz from the section type list. You can set single-choice or multi-choice format and add as many options as needed.',
  },
  {
    q: 'Where do I see my earnings?',
    a: 'Go to Analytics → the Metric Cards at the top show your Total Revenue. The Course Performance table below breaks revenue down per course.',
  },
  {
    q: 'What happens when a student is at risk?',
    a: 'A student is flagged as "At Risk" when their progress stalls below 40% and they have not been active recently. You can filter for at-risk learners in Student Management and reach them by email.',
  },
  {
    q: 'How are completion certificates issued?',
    a: 'Certificates are issued automatically once a learner reaches 100% progress on any of your courses. The learner receives a notification and a shareable verification link — you do not need to take any action.',
  },
  {
    q: 'Can I set my course as free?',
    a: 'Yes. In Step 1 of the Course Builder, toggle Pricing to "Free". Free courses are still subject to the same admin review process before they go live.',
  },
  {
    q: 'How do I invite a specific learner to my course?',
    a: 'Go to Student Management → click "Add Student" → enter their name, email, and the course name. They will receive an invitation email and appear as "Inactive" until they accept.',
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

export default function EducatorLearnMorePage() {
  return (
    <div className="bg-background flex min-h-full flex-col">
      <TopBar
        role="educator"
        title="Learn More"
        subtitle="Guides, feature docs, and answers for educators"
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
                  Educator Help Center
                </span>
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Everything you need to teach effectively
              </h2>
              <p className="mt-2 text-base text-white/70">
                Step-by-step guides, feature explanations, and answers to the
                most common educator questions — all in one place.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                  <BookOpen className="size-3" />
                  Course Builder
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                  <Users className="size-3" />
                  Student Management
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                  <BarChart3 className="size-3" />
                  Analytics
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Guide cards */}
        <section>
          <h3 className="text-foreground mb-4 text-[15px] font-bold">
            Educator Guides
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

        {/* Course creation workflow strip */}
        <section className="border-border bg-card overflow-hidden rounded-2xl border p-6">
          <h3 className="text-foreground mb-1 text-[15px] font-bold">
            How Course Creation Works
          </h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Every course follows a simple 3-step process before going live.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            {[
              {
                step: '1',
                label: 'Course Info',
                desc: 'Title, subtitle, category, level, pricing, and thumbnail.',
                color: 'bg-blue-500',
                light: 'bg-blue-500/10 text-blue-500',
              },
              {
                step: '2',
                label: 'Curriculum',
                desc: 'Add modules → lessons → text, video, quiz, or assignment sections.',
                color: 'bg-violet-500',
                light: 'bg-violet-500/10 text-violet-500',
              },
              {
                step: '3',
                label: 'Preview & Submit',
                desc: 'Review your course, fix any missing fields, then submit for admin approval.',
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
                Our educator support team replies within 24 hours on business
                days.
              </p>
              <a
                href="mailto:educators@clp.io"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:underline"
              >
                educators@clp.io
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
                Stay up to date with course builder improvements, new content
                section types, and platform updates.
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
