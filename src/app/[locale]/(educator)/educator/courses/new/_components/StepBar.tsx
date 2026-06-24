'use client';

import { Fragment } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCreateCourseT } from '@/i18n';

export const STEP_COUNT = 3;

export function StepBar({
  current,
  maxStep,
  onStepClick,
}: {
  current: number;
  maxStep: number;
  onStepClick: (step: number) => void;
}) {
  const t = useCreateCourseT();
  const steps = ([1, 2, 3] as const).map((n) => ({
    title: t(`steps.${n}.title`),
    desc: t(`steps.${n}.desc`),
  }));
  const progress = ((current - 1) / (STEP_COUNT - 1)) * 100;

  return (
    <div className="border-border bg-card rounded-2xl border p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between sm:hidden">
        <span className="text-foreground text-sm font-bold">
          {steps[current - 1]?.title}
        </span>
        <span className="text-muted-foreground text-xs font-medium">
          {t('stepOf', { current, total: STEP_COUNT })}
        </span>
      </div>

      <div className="flex items-center">
        {steps.map((step, i) => {
          const n = i + 1;
          const isActive = current === n;
          const isComplete = n < current;
          const reached = n <= maxStep;
          const navigable = reached && !isActive;

          return (
            <Fragment key={n}>
              <button
                type="button"
                onClick={() => onStepClick(n)}
                disabled={!navigable}
                aria-current={isActive ? 'step' : undefined}
                className={cn(
                  'group flex items-center gap-3 rounded-xl text-left transition disabled:opacity-100',
                  navigable ? 'cursor-pointer' : 'cursor-default',
                )}
              >
                <span
                  className={cn(
                    'relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300',
                    isActive &&
                      'bg-blue-950 text-white ring-4 ring-blue-950/20 dark:bg-amber-400 dark:text-gray-900 dark:ring-amber-400/30',
                    isComplete &&
                      'bg-blue-950 text-white group-hover:bg-blue-900 dark:bg-amber-400 dark:text-gray-900 dark:group-hover:bg-amber-300',
                    reached &&
                      !isActive &&
                      !isComplete &&
                      'bg-blue-950/10 text-blue-950 ring-1 ring-blue-900/40 group-hover:bg-blue-950/15 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/40 dark:group-hover:bg-amber-400/20',
                    !reached &&
                      'bg-muted text-muted-foreground ring-border ring-1',
                  )}
                >
                  {isComplete ? (
                    <Check className="animate-scale-in h-4 w-4" />
                  ) : (
                    n
                  )}
                </span>

                <span className="hidden min-w-0 sm:block">
                  <span
                    className={cn(
                      'block truncate text-sm font-bold transition-colors',
                      reached ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {step.title}
                  </span>
                  <span className="text-muted-foreground block truncate text-[11px]">
                    {step.desc}
                  </span>
                </span>
              </button>

              {i < STEP_COUNT - 1 && (
                <div className="bg-border mx-2 h-0.5 flex-1 overflow-hidden rounded-full sm:mx-4">
                  <div
                    className={cn(
                      'h-full rounded-full bg-blue-950 transition-all duration-500 ease-out dark:bg-amber-400',
                      current > n ? 'w-full' : 'w-0',
                    )}
                  />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      <div className="bg-muted mt-4 hidden h-1 overflow-hidden rounded-full sm:block">
        <div
          className="h-full rounded-full bg-blue-950 transition-all duration-500 ease-out dark:bg-amber-400"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
