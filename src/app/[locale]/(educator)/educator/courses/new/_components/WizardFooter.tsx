'use client';

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Save,
  TriangleAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WIZARD_STEPS } from './StepBar';

export function WizardFooter({
  step,
  canSubmit,
  missingCount,
  onBack,
  onNext,
  onSaveDraft,
  onSubmit,
  submitLabel = 'Submit to Admin',
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
  const isLast = step >= WIZARD_STEPS.length;
  const nextTitle = WIZARD_STEPS[step]?.title;

  return (
    <div className="border-border bg-card/85 sticky bottom-0 border-t px-6 py-3.5 backdrop-blur-md lg:px-8">
      <div className="flex items-center justify-between gap-4">
        {/* Left: back + live context */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-border text-foreground/80 hover:bg-muted focus-visible:ring-border gap-2 dark:border-white/15 dark:hover:bg-white/[0.07]"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="hidden leading-tight sm:block">
            {!isLast ? (
              <>
                <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
                  Up next
                </p>
                <p className="text-foreground/80 text-sm font-semibold">
                  {nextTitle}
                </p>
              </>
            ) : canSubmit ? (
              <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                <Check className="h-4 w-4" />
                Ready to submit
              </p>
            ) : (
              <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-600">
                <TriangleAlert className="h-4 w-4" />
                {missingCount} field{missingCount !== 1 ? 's' : ''} to complete
              </p>
            )}
          </div>
        </div>

        {/* Right: secondary + primary */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-border gap-2"
            onClick={onSaveDraft}
          >
            <Save className="h-4 w-4" />
            Save draft
          </Button>
          {!isLast ? (
            <Button
              variant="default"
              className="gap-2 bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500"
              onClick={onNext}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="default"
              className="gap-2 bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500 disabled:opacity-50"
              onClick={onSubmit}
              disabled={!canSubmit}
              title={
                canSubmit ? undefined : 'Complete required fields to submit'
              }
            >
              {submitLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
