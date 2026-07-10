'use client';

import { motion } from 'motion/react';
import { Check, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { DURATION } from './constants';
import type { PaymentMethodId } from './types';

interface PaymentMethodCardProps {
  readonly id: PaymentMethodId;
  readonly icon: LucideIcon;
  readonly label: string;
  readonly description: string;
  readonly badge?: string;
  readonly selected: boolean;
  readonly onSelect: (id: PaymentMethodId) => void;
}

/**
 * One selectable payment option, styled as a card rather than a radio input —
 * `role="radio"` keeps the semantics (exactly one of a group is checked)
 * while the visual is a full card: icon, label, description, and an optional
 * "Recommended" chip.
 */
export function PaymentMethodCard({
  id,
  icon: Icon,
  label,
  description,
  badge,
  selected,
  onSelect,
}: PaymentMethodCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(id)}
      className={cn(
        'group relative flex w-full items-center gap-3.5 rounded-2xl border p-4 text-left',
        'transition-[border-color,background-color,box-shadow,transform] duration-200',
        'focus-visible:ring-checkout-accent/40 outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'hover:-translate-y-0.5 hover:shadow-md',
        selected
          ? 'border-checkout-accent bg-checkout-accent/5 shadow-sm'
          : 'border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900',
      )}
    >
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200',
          selected
            ? 'bg-checkout-accent text-white'
            : 'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400',
        )}
      >
        <Icon aria-hidden className="size-5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-[15px] font-semibold text-slate-900 dark:text-white">
            {label}
          </span>
          {badge && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
              {badge}
            </span>
          )}
        </span>
        <span className="block text-sm text-slate-500 dark:text-slate-400">
          {description}
        </span>
      </span>

      <span
        aria-hidden
        className={cn(
          'flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200',
          selected
            ? 'border-checkout-accent bg-checkout-accent'
            : 'border-slate-300 bg-transparent dark:border-white/20',
        )}
      >
        {selected && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: DURATION.select }}
          >
            <Check className="size-3.5 text-white" strokeWidth={3} />
          </motion.span>
        )}
      </span>
    </button>
  );
}
