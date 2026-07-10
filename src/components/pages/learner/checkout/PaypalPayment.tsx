import { Wallet } from 'lucide-react';
import type { useLearnerCheckoutT } from '@/i18n';

/**
 * PayPal's own hosted flow does the actual authentication — nothing to
 * collect here beyond the learner's confirmation, which the shared
 * `CheckoutButton` already provides ("Continue with PayPal" replaces
 * "Complete Purchase" as its label — see `CheckoutPage`).
 */
export function PaypalPayment({
  t,
}: {
  readonly t: ReturnType<typeof useLearnerCheckoutT>;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-white/5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0070ba]/10 text-[#0070ba] dark:bg-[#0070ba]/20">
        <Wallet aria-hidden className="size-5" />
      </span>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        {t('paypalDesc')}
      </p>
    </div>
  );
}
