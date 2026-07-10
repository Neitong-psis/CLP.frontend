'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { CheckoutStatus } from './types';

interface CheckoutButtonProps {
  readonly label: string;
  readonly loadingLabel: string;
  readonly status: CheckoutStatus;
  readonly disabled: boolean;
}

/**
 * The single, unambiguous "do the thing" button — 56px tall, full width,
 * blue. Disabled whenever the form can't validly submit yet (no payment
 * method, or a card field failing validation); no separate error alert, the
 * disabled state plus each field's own inline message is the feedback.
 */
export function CheckoutButton({
  label,
  loadingLabel,
  status,
  disabled,
}: CheckoutButtonProps) {
  const isSubmitting = status === 'submitting';
  const isSuccess = status === 'success';

  return (
    <motion.button
      type="submit"
      disabled={disabled || isSubmitting || isSuccess}
      whileTap={disabled || isSubmitting ? undefined : { scale: 0.98 }}
      className={cn(
        'flex h-14 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold text-white',
        'focus-visible:ring-checkout-accent/40 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        isSuccess
          ? 'bg-emerald-600'
          : 'bg-checkout-accent hover:bg-checkout-accent-hover disabled:cursor-not-allowed disabled:opacity-50',
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isSuccess ? (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <Check aria-hidden className="size-5" strokeWidth={3} />
          </motion.span>
        ) : isSubmitting ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Loader2 aria-hidden className="size-4 animate-spin" />
            {loadingLabel}
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
