import type { ReactNode } from 'react';
import { useId } from 'react';
import { cn } from '@/lib/utils/cn';

interface FieldShellProps {
  readonly label: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly children: (
    fieldId: string,
    describedBy: string | undefined,
  ) => ReactNode;
}

/**
 * Label + input slot + inline error, shared by every field in the checkout.
 * Takes a render-prop for the control itself (rather than cloning a single
 * child) so it works identically for a plain `<input>` and a native
 * `<select>` without either one needing to know about this wrapper.
 */
export function FieldShell({
  label,
  error,
  required,
  children,
}: FieldShellProps) {
  const fieldId = useId();
  const errorId = useId();
  const describedBy = error ? errorId : undefined;

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
        {required && (
          <span aria-hidden className="ml-0.5 text-red-500">
            *
          </span>
        )}
      </label>
      {children(fieldId, describedBy)}
      {error && (
        <p
          id={errorId}
          role="alert"
          className={cn('mt-1.5 text-xs text-red-600 dark:text-red-400')}
        >
          {error}
        </p>
      )}
    </div>
  );
}

/** Shared input/select styling — the visual half of what `FieldShell` composes. */
export const FIELD_CONTROL_CLASS = (hasError: boolean) =>
  cn(
    'h-12 w-full rounded-xl border bg-white px-3.5 text-[15px] text-slate-900 outline-none transition-colors',
    'placeholder:text-slate-400 dark:bg-slate-800 dark:text-white',
    'focus:ring-2 focus:ring-checkout-accent/25 focus:border-checkout-accent',
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
      : 'border-slate-200 dark:border-white/10',
  );
