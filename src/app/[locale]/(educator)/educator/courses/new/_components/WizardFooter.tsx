'use client';

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Save,
  TriangleAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateCourseT } from '@/i18n';
import { STEP_COUNT } from './StepBar';

export function WizardFooter({
  step,
  canSubmit,
  missingCount,
  onBack,
  onNext,
  onSaveDraft,
  onSubmit,
  submitLabel,
}: {
  step: number;
  canSubmit: boolean;
  missingCount: number;
  onBack: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  submitLabel?: string;
}) {
  const t = useCreateCourseT();
  const isLast = step >= STEP_COUNT;
  const nextStepNum = step + 1;
  const nextTitle =
    !isLast && nextStepNum <= STEP_COUNT ? t(`steps.${nextStepNum}.title`) : '';
  const resolvedSubmitLabel = submitLabel ?? t('footer.submitToAdmin');

  return (
    <div className="border-border bg-card/85 sticky bottom-0 border-t px-6 py-3.5 backdrop-blur-md lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-border text-foreground/80 hover:bg-muted focus-visible:ring-border gap-2 dark:border-white/15 dark:hover:bg-white/[0.07]"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
            {t('footer.back')}
          </Button>

          <div className="hidden leading-tight sm:block">
            {!isLast ? (
              <>
                <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
                  {t('footer.upNext')}
                </p>
                <p className="text-foreground/80 text-sm font-semibold">
                  {nextTitle}
                </p>
              </>
            ) : canSubmit ? (
              <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                <Check className="h-4 w-4" />
                {t('footer.readyToSubmit')}
              </p>
            ) : (
              <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-600">
                <TriangleAlert className="h-4 w-4" />
                {missingCount === 1
                  ? t('footer.fieldToComplete', { count: missingCount })
                  : t('footer.fieldsToComplete', { count: missingCount })}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-border gap-2"
            onClick={onSaveDraft}
          >
            <Save className="h-4 w-4" />
            {t('footer.saveDraft')}
          </Button>
          {!isLast ? (
            <Button
              variant="default"
              className="gap-2 bg-blue-950 hover:bg-blue-900 focus-visible:ring-blue-950 dark:bg-amber-400 dark:text-gray-900 dark:hover:bg-amber-300 dark:focus-visible:ring-amber-400"
              onClick={onNext}
            >
              {t('footer.continue')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="default"
              className="gap-2 bg-blue-950 hover:bg-blue-900 focus-visible:ring-blue-950 disabled:opacity-50 dark:bg-amber-400 dark:text-gray-900 dark:hover:bg-amber-300 dark:focus-visible:ring-amber-400"
              onClick={onSubmit}
              disabled={!canSubmit}
              title={canSubmit ? undefined : t('footer.completeRequired')}
            >
              {resolvedSubmitLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
