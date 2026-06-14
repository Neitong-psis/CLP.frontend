'use client';

import { useState } from 'react';
import {
  BookOpen,
  Users,
  Award,
  BarChart3,
  DollarSign,
  Settings,
  ShieldCheck,
  ChevronDown,
  Mail,
  MessageCircle,
  FileText,
  Zap,
  Globe,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import TopBar from '@/components/common/TopBar';

// ─── Data ──────────────────────────────────────────────────────────────────────

const GUIDES = [
  {
    icon: Zap,
    iconCls: 'bg-amber-500/10 text-amber-500',
    title: 'Getting Started',
    desc: 'Set up your admin workspace, configure platform defaults, and invite your first users in under 10 minutes.',
    badge: 'Start here',
    badgeCls: 'bg-amber-500/10 text-amber-500',
  },
  {
    icon: Users,
    iconCls: 'bg-blue-500/10 text-blue-500',
    title: 'Managing Users',
    desc: 'Add, edit, suspend or remove learners and educators. Assign roles, reset passwords, and review activity logs.',
    badge: 'Popular',
    badgeCls: 'bg-blue-500/10 text-blue-500',
  },
  {
    icon: BookOpen,
    iconCls: 'bg-emerald-500/10 text-emerald-500',
    title: 'Course Management',
    desc: 'Review and publish educator submissions, set categories, manage enrollments, and track completion rates.',
    badge: null,
    badgeCls: '',
  },
  {
    icon: Award,
    iconCls: 'bg-violet-500/10 text-violet-500',
    title: 'Certifications',
    desc: 'Design certificate templates, set completion criteria, issue awards in bulk, and verify authenticity.',
    badge: null,
    badgeCls: '',
  },
  {
    icon: DollarSign,
    iconCls: 'bg-teal-500/10 text-teal-500',
    title: 'Revenue & Analytics',
    desc: 'Track monthly revenue, identify top-performing courses, and export reports for your finance team.',
    badge: null,
    badgeCls: '',
  },
  {
    icon: Settings,
    iconCls: 'bg-slate-500/10 text-muted-foreground',
    title: 'Platform Settings',
    desc: 'Customise branding, configure support email, set time zones, and manage system health diagnostics.',
    badge: null,
    badgeCls: '',
  },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    iconCls: 'text-emerald-500',
    title: 'Role-Based Access',
    desc: 'Three distinct roles — Admin, Educator, Learner — each with scoped permissions and a tailored interface.',
  },
  {
    icon: BarChart3,
    iconCls: 'text-blue-500',
    title: 'Live Analytics',
    desc: 'Real-time dashboards for enrollments, revenue, user distribution, and quiz performance.',
  },
  {
    icon: Globe,
    iconCls: 'text-violet-500',
    title: 'Multi-Language',
    desc: 'Full i18n support. Switch language per-user or set a platform-wide default from Settings.',
  },
  {
    icon: FileText,
    iconCls: 'text-amber-500',
    title: 'Certificate Engine',
    desc: 'Customisable templates, automatic issuance on course completion, and shareable verification links.',
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "How do I reset a user's password?",
    a: 'Go to User Management → find the user → open the Actions menu → select "Reset Password". A new password is generated and you can share it securely with the user.',
  },
  {
    q: 'Can I bulk-import learners?',
    a: 'Bulk CSV import is on the roadmap for Q3. Today you can add users individually via User Management → Add User, or via the public registration flow.',
  },
  {
    q: 'How are certificates verified?',
    a: 'Each certificate has a unique ID embedded in a shareable URL. Anyone with the link can verify authenticity on the public verification page without logging in.',
  },
  {
    q: 'What happens when I suspend a user?',
    a: "The user's session is invalidated immediately. They cannot log in until you reactivate them. Their data and enrollment records are preserved.",
  },
  {
    q: "How do I publish an educator's course?",
    a: 'Open Course Management → find the pending course → click the row action menu → select "Edit" → change status to Public. The course becomes visible to learners instantly.',
  },
  {
    q: 'Where can I change the platform name shown to learners?',
    a: 'Settings → General → Platform Name. Changes take effect immediately across the UI.',
  },
];

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-border border-b last:border-0">
      <button
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminLearnMorePage() {
  return (
    <div className="flex min-h-full flex-col">
      <TopBar role="admin" title="Learn More" />

      <div className="flex-1 space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="border-border bg-card overflow-hidden rounded-2xl border">
          <div className="from-brand-navy to-brand-navy/80 relative px-8 py-10 text-white">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 size-48 rounded-full bg-white/[0.03]" />
            <div className="absolute right-24 -bottom-6 size-32 rounded-full bg-white/[0.03]" />

            <div className="relative max-w-xl">
              <div className="mb-3 flex items-center gap-2">
                <HelpCircle className="text-brand-gold size-5" />
                <span className="text-brand-gold text-sm font-semibold">
                  Help Center
                </span>
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                How can we help you?
              </h2>
              <p className="mt-2 text-base text-white/70">
                Browse guides, feature explanations, and answers to the most
                common admin questions.
              </p>
            </div>
          </div>
        </div>

        {/* Guide cards */}
        <section>
          <h3 className="text-foreground mb-4 text-[15px] font-bold">
            Admin Guides
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map(
              ({ icon: Icon, iconCls, title, desc, badge, badgeCls }) => (
                <button
                  key={title}
                  className="border-border bg-card hover:border-muted-foreground/30 group flex cursor-pointer flex-col gap-3 rounded-2xl border p-5 text-left transition-[border-color,transform] duration-150 hover:-translate-y-0.5"
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

        {/* Platform features */}
        <section>
          <h3 className="text-foreground mb-4 text-[15px] font-bold">
            Platform Features
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

        {/* FAQ + Contact side by side */}
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
                Our support team replies within 24 hours on business days.
              </p>
              <a
                href="mailto:support@clp.io"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:underline"
              >
                support@clp.io
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
              <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-500 hover:underline">
                Start a conversation →
              </button>
            </div>

            <div className="border-border bg-card rounded-2xl border p-6">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-emerald-500/10">
                <FileText className="size-4 text-emerald-500" />
              </div>
              <p className="text-foreground text-sm font-bold">Release Notes</p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                Stay up to date with platform changes, new features, and
                deprecation notices.
              </p>
              <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500 hover:underline">
                View changelog →
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
