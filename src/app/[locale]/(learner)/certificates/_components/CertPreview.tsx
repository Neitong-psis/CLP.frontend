'use client';

import { ShieldCheck, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { type Certificate } from '@/config/learner';
import { useCurrentUser } from '@/hooks/use-current-user';

export const THEME_CONFIG = {
  navy: {
    card: 'bg-brand-navy',
    certTitle: 'text-white',
    completion: 'text-brand-gold',
    name: 'text-white',
    subtitle: 'text-white/50',
    corner: 'border-brand-gold',
  },
  blue: {
    card: 'bg-white dark:bg-card border border-blue-100 dark:border-blue-900/40',
    certTitle: 'text-blue-700 dark:text-blue-300',
    completion: 'text-brand-gold',
    name: 'text-slate-800 dark:text-foreground',
    subtitle: 'text-slate-400 dark:text-muted-foreground',
    corner: 'border-blue-300 dark:border-blue-700',
  },
  red: {
    card: 'bg-white dark:bg-card border border-red-100 dark:border-red-900/40',
    certTitle: 'text-red-600 dark:text-red-400',
    completion: 'text-brand-gold',
    name: 'text-slate-800 dark:text-foreground',
    subtitle: 'text-slate-400 dark:text-muted-foreground',
    corner: 'border-red-300 dark:border-red-700',
  },
  teal: {
    card: 'bg-white dark:bg-card border border-emerald-100 dark:border-emerald-900/40',
    certTitle: 'text-emerald-600 dark:text-emerald-400',
    completion: 'text-brand-gold',
    name: 'text-slate-800 dark:text-foreground',
    subtitle: 'text-slate-400 dark:text-muted-foreground',
    corner: 'border-emerald-300 dark:border-emerald-700',
  },
} as const;

export function CornerAccents({ className }: { className: string }) {
  return (
    <>
      <span
        className={cn(
          'absolute top-3 right-3 size-6 border-t-2 border-r-2',
          className,
        )}
      />
      <span
        className={cn(
          'absolute bottom-3 left-3 size-6 border-b-2 border-l-2',
          className,
        )}
      />
    </>
  );
}

export function CertPreview({
  cert,
  name,
}: {
  cert: Certificate;
  name?: string;
}) {
  const s = THEME_CONFIG[cert.theme];
  const currentUser = useCurrentUser();
  const displayName = name ?? currentUser.fullName;
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl px-6 py-5 text-center',
        s.card,
      )}
    >
      <CornerAccents className={s.corner} />

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="bg-brand-gold/20 flex size-6 items-center justify-center rounded-md">
            <BookOpen className="text-brand-gold size-3" />
          </div>
          <span className={cn('text-xs font-bold', s.certTitle)}>QBTECH</span>
        </div>
        <ShieldCheck className={cn('size-5', s.completion)} />
      </div>

      <p
        className={cn(
          'text-2xl font-black tracking-[0.18em] uppercase',
          s.certTitle,
        )}
      >
        CERTIFICATE
      </p>
      <p
        className={cn(
          'text-[10px] font-semibold tracking-widest uppercase',
          s.completion,
        )}
      >
        OF COMPLETION
      </p>

      <p
        className={cn('mt-3 text-[9px] tracking-widest uppercase', s.subtitle)}
      >
        THIS CERTIFICATE IS PROUDLY
        <br />
        PRESENTED TO
      </p>

      <p className={cn('mt-2 font-serif text-lg font-bold italic', s.name)}>
        {displayName}
      </p>

      <p className={cn('mt-2 text-xs font-semibold', s.name)}>
        {cert.fullTitle}
      </p>
    </div>
  );
}
