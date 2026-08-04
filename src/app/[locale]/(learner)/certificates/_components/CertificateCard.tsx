'use client';

import Link from 'next/link';
import { ShieldCheck, ShieldAlert, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Certificate } from '@/constants/learner';
import type { useLearnerCertificatesT } from '@/i18n';
import { CertPreview } from './CertPreview';

type TFn = ReturnType<typeof useLearnerCertificatesT>;

interface CertificateCardProps {
  cert: Certificate;
  t: TFn;
  isVerified: boolean;
  verifiedName?: string;
  active: boolean;
  delay: number;
}

export function CertificateCard({
  cert,
  t,
  isVerified,
  verifiedName,
  active,
  delay,
}: CertificateCardProps) {
  const viewHref = `/certificates/${cert.id}/view`;
  const verifyHref = `/certificates/${cert.id}/verify`;

  return (
    <div
      className={cn(
        'group border-border bg-card cursor-default overflow-hidden rounded-2xl border shadow-sm',
        'transition-all duration-500 ease-out',
        'hover:border-brand-gold/30 hover:-translate-y-1.5 hover:shadow-xl',
        active ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
      )}
      style={{ transitionDelay: active ? `${delay}ms` : '0ms' }}
    >
      {/* Certificate preview — zooms in on hover */}
      <div className="overflow-hidden">
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <CertPreview cert={cert} name={verifiedName} />
        </div>
      </div>

      <div className="px-5 pt-4 pb-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-foreground group-hover:text-brand-gold truncate font-bold transition-colors duration-200">
              {cert.fullTitle}
            </p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              {t('completedOn', { date: cert.completedDate })}
            </p>
            <p className="text-muted-foreground text-xs">
              {t('certId', { id: cert.certificateId })}
            </p>
          </div>

          {/* Verified / unverified shield indicator */}
          {isVerified ? (
            <ShieldCheck
              className="mt-0.5 size-5 shrink-0 text-emerald-500 transition-transform duration-200 group-hover:scale-110"
              aria-label="Verified"
            />
          ) : (
            <ShieldAlert
              className="text-muted-foreground/50 mt-0.5 size-5 shrink-0 transition-transform duration-200 group-hover:scale-110"
              aria-label="Not yet verified"
            />
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* Completion badge */}
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            100%
          </span>

          {isVerified ? (
            /* View Certificate */
            <Link
              href={viewHref}
              className={cn(
                'bg-brand-gold text-brand-navy inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold',
                'transition-all duration-150 hover:scale-105 hover:shadow-md active:scale-95',
              )}
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              {t('view')}
            </Link>
          ) : (
            /* Verify */
            <Link
              href={verifyHref}
              className={cn(
                'border-brand-gold text-brand-gold inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-bold',
                'hover:bg-brand-gold hover:text-brand-navy transition-all duration-150 hover:scale-105 hover:shadow-md active:scale-95',
              )}
            >
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Verify
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
