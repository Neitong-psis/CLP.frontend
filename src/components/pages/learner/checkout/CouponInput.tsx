'use client';

import { useId, useState } from 'react';
import { Check, Tag, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Coupon } from './types';
import type { useLearnerCheckoutT } from '@/i18n';

type TFn = ReturnType<typeof useLearnerCheckoutT>;

interface CouponInputProps {
  readonly coupon: Coupon | null;
  readonly applying: boolean;
  readonly error: string | null;
  readonly onApply: (code: string) => void;
  readonly onRemove: () => void;
  readonly t: TFn;
}

/** Coupon code entry — a single input, and only one coupon can ever be active
 *  at a time, so applying a new one always replaces rather than stacks. */
export function CouponInput({
  coupon,
  applying,
  error,
  onApply,
  onRemove,
  t,
}: CouponInputProps) {
  const [code, setCode] = useState('');
  const inputId = useId();
  const errorId = useId();

  if (coupon) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-xl bg-emerald-50 px-3.5 py-2.5 dark:bg-emerald-500/10">
        <span className="flex min-w-0 items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400">
          <Check aria-hidden className="size-4 shrink-0" />
          <span className="truncate">
            {t('couponApplied', {
              code: coupon.code,
              percent: coupon.percentOff,
            })}
          </span>
        </span>
        <button
          type="button"
          onClick={onRemove}
          aria-label={t('couponRemove')}
          className="flex size-6 shrink-0 items-center justify-center rounded-full text-emerald-700/70 transition-colors outline-none hover:bg-emerald-500/15 focus-visible:ring-2 focus-visible:ring-emerald-500/40 dark:text-emerald-400/70"
        >
          <X aria-hidden className="size-3.5" />
        </button>
      </div>
    );
  }

  function submit() {
    const trimmed = code.trim();
    if (trimmed) onApply(trimmed);
  }

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        <Tag aria-hidden className="size-3.5" />
        {t('couponLabel')}
      </label>
      <div className="flex gap-2">
        <input
          id={inputId}
          type="text"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              submit();
            }
          }}
          placeholder={t('couponPlaceholder')}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          className={cn(
            'h-11 flex-1 rounded-xl border bg-white px-3.5 text-sm text-slate-900 transition-colors outline-none',
            'placeholder:text-slate-400 dark:bg-slate-800 dark:text-white',
            'focus:ring-checkout-accent/25 focus:border-checkout-accent focus:ring-2',
            error ? 'border-red-400' : 'border-slate-200 dark:border-white/10',
          )}
        />
        <button
          type="button"
          onClick={submit}
          disabled={applying || code.trim().length === 0}
          className="focus-visible:ring-checkout-accent/40 h-11 shrink-0 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition-colors outline-none hover:bg-slate-50 focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
        >
          {applying ? t('couponApplying') : t('couponApply')}
        </button>
      </div>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 text-xs text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}
