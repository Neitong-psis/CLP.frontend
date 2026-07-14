'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import {
  ArrowLeft,
  Download,
  Printer,
  Share2,
  Copy,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useLearnerCertificatesT } from '@/i18n';
import { useToast } from '@/components/ui/toast';
import TopBar from '@/components/pages/learner/TopBar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';
import Logo from '@/components/common/Logo';
import { type Certificate } from '@/config/learner';
import { useCurrentUser } from '@/hooks/use-current-user';
import { getCertById } from '../_lib/cert';
import { readVerifiedCertName } from '@/lib/utils/certStorage';
import { exportCertificateToPdf } from '@/lib/utils/certificatePdf';

// ── QR placeholder ────────────────────────────────────────────────────────────

const QR_GRID = Array.from({ length: 49 }, (_, i) => {
  const r = Math.floor(i / 7);
  const c = i % 7;
  const corner = (r < 2 && c < 2) || (r < 2 && c > 4) || (r > 4 && c < 2);
  return corner || ((r + c) % 2 === 0 && (r * 3 + c * 2) % 5 !== 0);
});

function QrPlaceholder() {
  return (
    <div className="inline-grid grid-cols-7 gap-px">
      {QR_GRID.map((filled, i) => (
        <div
          key={i}
          className={cn(
            'size-2 rounded-sm',
            filled ? 'bg-foreground' : 'bg-transparent',
          )}
        />
      ))}
    </div>
  );
}

// ── Content (cert is guaranteed non-null here) ────────────────────────────────

function ViewPageContent({ cert }: { cert: Certificate }) {
  const t = useLearnerCertificatesT();
  const router = useRouter();
  const { toast } = useToast();
  const currentUser = useCurrentUser();
  const [copied, setCopied] = useState(false);
  const [certName, setCertName] = useState(currentUser.fullName);

  useEffect(() => {
    const stored = readVerifiedCertName(cert.id);
    const timer = setTimeout(
      () => setCertName(stored || currentUser.fullName),
      0,
    );
    return () => clearTimeout(timer);
  }, [cert.id, currentUser.fullName]);

  const verifyUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/verify/${cert.certificateId}`
      : `/verify/${cert.certificateId}`;

  function handleCopy() {
    navigator.clipboard.writeText(verifyUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    exportCertificateToPdf({
      learnerName: certName,
      courseTitle: cert.courseTitle,
      completedDate: cert.completedDate,
      instructor: cert.instructor,
      certificateId: cert.certificateId,
      verifyUrl,
    });
  }

  function handleShare() {
    if (navigator.share) {
      navigator
        .share({ title: cert.fullTitle, url: verifyUrl })
        .catch(() => {});
    } else {
      handleCopy();
      toast('Link copied to clipboard', 'success');
    }
  }

  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <TopBar
        role="learner"
        title={t('title')}
        subtitle={t('subtitle', { email: currentUser.email })}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Back header */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => router.push('/certificates')}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/60 flex size-9 items-center justify-center rounded-lg transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div>
            <h2 className="text-foreground text-base font-bold">
              {t('officialCert')}
            </h2>
            <p className="text-muted-foreground text-xs">
              {t('officialCertDesc')}
            </p>
          </div>
        </div>

        {/* Two-column layout: certificate + sidebar */}
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Certificate card */}
          <div className="border-border overflow-hidden rounded-2xl border bg-white shadow-md print:shadow-none">
            <div className="px-12 py-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Logo size="xl" variant="default" className="w-16" />
                  <div>
                    {/* Certificate artifact text is always English (print/canvas design). */}
                    <p className="text-brand-navy text-[11px] font-black tracking-widest uppercase">
                      QBTECH LEARNING PLATFORM
                    </p>
                    <p className="text-brand-gold text-[10px] font-medium">
                      Excellence in Education
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <QrPlaceholder />
                  <p className="text-muted-foreground mt-1 font-mono text-[10px]">
                    VERIFY: {cert.certificateId.split('-')[1]}
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <h1 className="text-brand-navy font-serif text-5xl font-bold">
                  Certificate of Completion
                </h1>
                <p className="text-brand-gold mt-3 text-[11px] font-bold tracking-[0.3em] uppercase">
                  THIS CERTIFIES THAT
                </p>
                <p className="text-brand-navy mt-6 font-serif text-5xl font-bold">
                  {certName}
                </p>
                <div className="border-brand-navy/20 mx-auto mt-2 w-64 border-b" />
                <p className="text-muted-foreground mt-4 text-[11px] font-semibold tracking-[0.25em] uppercase">
                  HAS COMPLETED THE COURSE
                </p>
                <p className="text-brand-navy mt-2 text-2xl font-bold">
                  {cert.fullTitle}
                </p>
              </div>

              <div className="mt-14 grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="border-brand-navy/30 border-b pb-1">
                    <p className="text-brand-navy text-sm font-semibold">
                      {cert.completedDate}
                    </p>
                  </div>
                  <p className="text-muted-foreground mt-1.5 text-[10px] font-semibold tracking-widest uppercase">
                    DATE OF ISSUE
                  </p>
                </div>
                <div className="text-center">
                  <div className="border-brand-navy/30 border-b pb-1">
                    <p className="text-brand-navy text-sm font-semibold">
                      {cert.instructor.toUpperCase()}
                    </p>
                  </div>
                  <p className="text-muted-foreground mt-1.5 text-[10px] font-semibold tracking-widest uppercase">
                    LEAD INSTRUCTOR
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions sidebar */}
          <div className="border-border bg-card space-y-4 rounded-2xl border p-6 lg:sticky lg:top-6">
            <div>
              <h3 className="text-foreground mb-1 font-bold">
                {t('downloadTitle')}
              </h3>
              <p className="text-muted-foreground text-sm">
                {t('downloadDesc')}
              </p>
            </div>

            {/* Verify link */}
            <div className="border-border flex items-center gap-2 rounded-xl border px-4 py-3">
              <p className="text-muted-foreground min-w-0 flex-1 truncate font-mono text-xs">
                {verifyUrl}
              </p>
              <button
                onClick={handleCopy}
                className="text-muted-foreground hover:text-foreground flex shrink-0 items-center gap-1.5 text-xs font-medium transition-colors"
              >
                {copied ? (
                  <Check className="size-3.5 text-emerald-500" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                {t('copyLink')}
              </button>
            </div>

            {/* Action buttons — stacked in sidebar */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleDownload}
                className="bg-brand-navy hover:bg-brand-navy/90 dark:bg-brand-gold dark:text-brand-navy dark:hover:bg-brand-gold/90 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-colors"
              >
                <Download className="size-4" />
                {t('downloadPdf')}
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => window.print()}
                  className="border-border text-foreground hover:bg-muted/60 flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-colors"
                >
                  <Printer className="size-4" />
                  {t('printCert')}
                </button>
                <button
                  onClick={handleShare}
                  className="border-border text-foreground hover:bg-muted/60 flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-colors"
                >
                  <Share2 className="size-4" />
                  {t('shareCert')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterBottomBar theme="light" />
    </div>
  );
}

// ── Entry point ───────────────────────────────────────────────────────────────

export default function ViewPage() {
  const { id } = useParams<{ id: string }>();
  const cert = getCertById(id);
  if (!cert) return notFound();
  return <ViewPageContent cert={cert} />;
}
