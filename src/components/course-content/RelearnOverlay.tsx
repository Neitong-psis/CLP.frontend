'use client';

import { useEffect } from 'react';
import { RotateCcw, BookOpen } from 'lucide-react';

/**
 * Remediation modal shown when a learner exhausts their quiz attempts (3 fails).
 * The lesson's progress has been reset by the caller; this prompts them to
 * relearn it before retrying. Copy is passed in pre-resolved (i18n-agnostic).
 */
export function RelearnOverlay({
  lessonTitle,
  title,
  body,
  reviewCta,
  onReview,
}: {
  lessonTitle: string;
  title: string;
  body: string;
  reviewCta: string;
  onReview: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onReview();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onReview]);

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="bg-card border-border relative w-full max-w-md rounded-2xl border p-8 text-center shadow-2xl">
        <div className="mb-5 flex justify-center">
          <span className="flex size-20 items-center justify-center rounded-full border-2 border-amber-400/25 bg-amber-500/15">
            <RotateCcw className="size-9 text-amber-500" />
          </span>
        </div>

        <h2 className="text-foreground mb-1 text-xl font-bold">{title}</h2>
        <p className="text-muted-foreground mb-1 text-sm font-medium">
          {lessonTitle}
        </p>
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          {body}
        </p>

        <button
          type="button"
          onClick={onReview}
          className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95"
        >
          <BookOpen className="size-4" />
          {reviewCta}
        </button>
      </div>
    </div>
  );
}
