'use client';

import { Fragment } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const WIZARD_STEPS = [
  { title: 'Course Info', desc: 'Details, thumbnail & pricing' },
  { title: 'Course Content', desc: 'Modules & lessons' },
  { title: 'Preview & Publish', desc: 'Review final summary' },
];

export function StepBar({
  current,
  maxStep,
  onStepClick,
}: {
  current: number;
  /** Furthest step reached; every step up to here is navigable. */
  maxStep: number;
  /** Called with a step number; reached steps are navigable in either direction. */
  onStepClick: (step: number) => void;
}) {
  const progress = ((current - 1) / (WIZARD_STEPS.length - 1)) * 100;

  return (
    <div className="border-border bg-card rounded-2xl border p-4 shadow-sm sm:p-5">
      {/* Compact progress meta */}
      <div className="mb-4 flex items-center justify-between sm:hidden">
        <span className="text-foreground text-sm font-bold">
          {WIZARD_STEPS[current - 1]?.title}
        </span>
        <span className="text-muted-foreground text-xs font-medium">
          Step {current} of {WIZARD_STEPS.length}
        </span>
      </div>

      <div className="flex items-center">
        {WIZARD_STEPS.map((step, i) => {
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
                {/* Step circle */}
                <span
                  className={cn(
                    'relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300',
                    isActive &&
                      'bg-blue-600 text-white ring-4 ring-blue-600/20',
                    isComplete &&
                      'bg-blue-600 text-white group-hover:bg-blue-700',
                    reached &&
                      !isActive &&
                      !isComplete &&
                      'bg-blue-50 text-blue-600 ring-1 ring-blue-200 group-hover:bg-blue-100 dark:bg-blue-500/10 dark:ring-blue-500/30 dark:group-hover:bg-blue-500/20',
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

                {/* Label */}
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

              {/* Connector rail that fills as steps complete */}
              {i < WIZARD_STEPS.length - 1 && (
                <div className="bg-border mx-2 h-0.5 flex-1 overflow-hidden rounded-full sm:mx-4">
                  <div
                    className={cn(
                      'h-full rounded-full bg-blue-600 transition-all duration-500 ease-out',
                      current > n ? 'w-full' : 'w-0',
                    )}
                  />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      {/* Slim overall progress bar (desktop) */}
      <div className="bg-muted mt-4 hidden h-1 overflow-hidden rounded-full sm:block">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
