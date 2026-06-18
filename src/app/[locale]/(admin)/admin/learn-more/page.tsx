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
import { useAdminLearnMoreT } from '@/i18n';
import { cn } from '@/lib/utils/cn';
import TopBar from '@/components/common/TopBar';

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
  const t = useAdminLearnMoreT();

  const GUIDES = [
    {
      icon: Zap,
      iconCls: 'bg-amber-500/10 text-amber-500',
      title: t('guide0Title'),
      desc: t('guide0Desc'),
      badge: t('guide0Badge'),
      badgeCls: 'bg-amber-500/10 text-amber-500',
    },
    {
      icon: Users,
      iconCls: 'bg-blue-500/10 text-blue-500',
      title: t('guide1Title'),
      desc: t('guide1Desc'),
      badge: t('guide1Badge'),
      badgeCls: 'bg-blue-500/10 text-blue-500',
    },
    {
      icon: BookOpen,
      iconCls: 'bg-emerald-500/10 text-emerald-500',
      title: t('guide2Title'),
      desc: t('guide2Desc'),
      badge: null,
      badgeCls: '',
    },
    {
      icon: Award,
      iconCls: 'bg-violet-500/10 text-violet-500',
      title: t('guide3Title'),
      desc: t('guide3Desc'),
      badge: null,
      badgeCls: '',
    },
    {
      icon: DollarSign,
      iconCls: 'bg-teal-500/10 text-teal-500',
      title: t('guide4Title'),
      desc: t('guide4Desc'),
      badge: null,
      badgeCls: '',
    },
    {
      icon: Settings,
      iconCls: 'bg-slate-500/10 text-muted-foreground',
      title: t('guide5Title'),
      desc: t('guide5Desc'),
      badge: null,
      badgeCls: '',
    },
  ];

  const FEATURES = [
    {
      icon: ShieldCheck,
      iconCls: 'text-emerald-500',
      title: t('feat0Title'),
      desc: t('feat0Desc'),
    },
    {
      icon: BarChart3,
      iconCls: 'text-blue-500',
      title: t('feat1Title'),
      desc: t('feat1Desc'),
    },
    {
      icon: Globe,
      iconCls: 'text-violet-500',
      title: t('feat2Title'),
      desc: t('feat2Desc'),
    },
    {
      icon: FileText,
      iconCls: 'text-amber-500',
      title: t('feat3Title'),
      desc: t('feat3Desc'),
    },
  ];

  const FAQ: { q: string; a: string }[] = [
    { q: t('faq0Q'), a: t('faq0A') },
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
  ];

  return (
    <div className="flex min-h-full flex-col">
      <TopBar role="admin" title={t('title')} />

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
                  {t('helpCenter')}
                </span>
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                {t('heroTitle')}
              </h2>
              <p className="mt-2 text-base text-white/70">
                {t('heroSubtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Guide cards */}
        <section>
          <h3 className="text-foreground mb-4 text-[15px] font-bold">
            {t('adminGuides')}
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
            {t('platformFeatures')}
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
              {t('faqTitle')}
            </h3>
            <p className="text-muted-foreground mb-5 text-sm">
              {t('faqSubtitle')}
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
              <p className="text-foreground text-sm font-bold">
                {t('emailSupport')}
              </p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                {t('emailSupportDesc')}
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
              <p className="text-foreground text-sm font-bold">
                {t('liveChat')}
              </p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                {t('liveChatDesc')}
              </p>
              <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-500 hover:underline">
                {t('startConversation')}
              </button>
            </div>

            <div className="border-border bg-card rounded-2xl border p-6">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-emerald-500/10">
                <FileText className="size-4 text-emerald-500" />
              </div>
              <p className="text-foreground text-sm font-bold">
                {t('releaseNotes')}
              </p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                {t('releaseNotesDesc')}
              </p>
              <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500 hover:underline">
                {t('viewChangelog')}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
