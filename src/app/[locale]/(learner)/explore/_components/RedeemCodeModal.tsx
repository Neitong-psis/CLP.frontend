'use client';

import { useState } from 'react';
import { X, Check, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { slugify } from '@/lib/utils/slugify';
import { useLearnerExploreT } from '@/i18n';
import { type Course } from '@/constants/learner';
import { CATALOG } from '@/lib/courses/catalog';
import { isEnrolledIn, addToEnrolled } from '@/lib/utils/enrollment';

const FORM_ID = 'redeem-code-form';

export interface RedeemCodeModalProps {
  onClose: () => void;
  onSuccess: (courseId: string) => void;
}

export function RedeemCodeModal({ onClose, onSuccess }: RedeemCodeModalProps) {
  const t = useLearnerExploreT();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [matched, setMatched] = useState<Course | null>(null);
  // Captured before addEnrolledId() runs, since that call would otherwise
  // make "were they already enrolled?" true for every redemption.
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);

  function handleRedeem(e: React.FormEvent) {
    e.preventDefault();
    const query = code.trim().toUpperCase();
    if (!query) return;

    const course = CATALOG.find((c) => c.code?.toUpperCase() === query);
    if (!course) {
      setError(t('redeem.notFound'));
      return;
    }

    const wasEnrolled = course.enrolled || isEnrolledIn(course.id);
    addToEnrolled(course.id);
    onSuccess(course.id);
    setError(null);
    setAlreadyEnrolled(wasEnrolled);
    setMatched(course);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div className="bg-background relative flex w-full max-w-md flex-col overflow-hidden rounded-t-3xl shadow-2xl sm:rounded-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-start gap-3 px-6 pt-6 pb-2">
          <div className="bg-brand-gold/10 flex size-10 shrink-0 items-center justify-center rounded-full">
            {matched ? (
              <Check className="text-brand-gold size-5" />
            ) : (
              <Ticket className="text-brand-gold size-5" />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-foreground text-base font-bold">
              {matched ? t('redeem.successHeading') : t('redeem.title')}
            </h2>
            {!matched && (
              <p className="text-muted-foreground text-xs">
                {t('redeem.subtitle')}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/60 flex size-8 items-center justify-center rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="border-border mt-3 shrink-0 border-t" />

        {matched ? (
          // ── Success state ──────────────────────────────────────────────────
          <div className="flex flex-1 flex-col items-center gap-4 px-6 py-6">
            <div className="flex size-20 items-center justify-center rounded-full bg-emerald-500/15">
              <Check className="size-10 text-emerald-500" />
            </div>
            <div className="text-center">
              <p className="text-foreground text-sm font-bold">
                {matched.title}
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                {alreadyEnrolled
                  ? t('redeem.alreadyEnrolled', { course: matched.title })
                  : t('redeem.successDesc', { course: matched.title })}
              </p>
            </div>
          </div>
        ) : (
          // ── Entry state ─────────────────────────────────────────────────────
          <form
            id={FORM_ID}
            onSubmit={handleRedeem}
            className="flex flex-1 flex-col gap-3 px-6 py-4"
          >
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(null);
              }}
              placeholder={t('redeem.placeholder')}
              autoFocus
              className="border-border bg-background text-foreground placeholder:text-muted-foreground/50 rounded-xl border px-3 py-2.5 text-sm tracking-wide uppercase outline-none focus:ring-2 focus:ring-amber-400/30"
            />
            {error && (
              <p className="text-xs font-medium text-red-500">{error}</p>
            )}
          </form>
        )}

        {/* Footer actions */}
        <div className="border-border flex shrink-0 items-center justify-end gap-3 border-t px-6 py-4">
          {matched ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                window.location.href = `/learn/${slugify(matched.title)}?mode=resume`;
              }}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy w-full rounded-xl py-3 text-sm font-bold transition-colors"
            >
              {t('redeem.startLearning')}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onClose}
                className="border-border text-foreground hover:bg-muted/60 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors"
              >
                {t('redeem.cancel')}
              </button>
              <button
                type="submit"
                form={FORM_ID}
                disabled={!code.trim()}
                className={cn(
                  'rounded-xl px-5 py-2.5 text-sm font-bold transition-colors',
                  code.trim()
                    ? 'bg-brand-gold hover:bg-brand-gold/90 text-brand-navy'
                    : 'bg-muted text-muted-foreground cursor-not-allowed',
                )}
              >
                {t('redeem.submit')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
