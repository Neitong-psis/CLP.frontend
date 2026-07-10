'use client';

import { CreditCard, QrCode, Wallet } from 'lucide-react';
import { PaymentMethodCard } from './PaymentMethodCard';
import { PAYMENT_METHOD_IDS } from './constants';
import type { PaymentMethodId } from './types';
import type { useLearnerCheckoutT } from '@/i18n';

type TFn = ReturnType<typeof useLearnerCheckoutT>;

const ICON: Record<PaymentMethodId, typeof CreditCard> = {
  card: CreditCard,
  paypal: Wallet,
  khqr: QrCode,
};

interface PaymentSelectorProps {
  readonly selected: PaymentMethodId;
  readonly onSelect: (id: PaymentMethodId) => void;
  readonly t: TFn;
}

/** The "credit card / PayPal / KHQR" card group. Exactly one is ever checked. */
export function PaymentSelector({
  selected,
  onSelect,
  t,
}: PaymentSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label={t('paymentHeading')}
      className="flex flex-col gap-3"
    >
      {PAYMENT_METHOD_IDS.map((id) => (
        <PaymentMethodCard
          key={id}
          id={id}
          icon={ICON[id]}
          label={t(`payment${capitalize(id)}` as Parameters<TFn>[0])}
          description={t(`payment${capitalize(id)}Desc` as Parameters<TFn>[0])}
          badge={id === 'card' ? t('paymentCardBadge') : undefined}
          selected={selected === id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function capitalize<S extends string>(value: S): Capitalize<S> {
  return (value.charAt(0).toUpperCase() + value.slice(1)) as Capitalize<S>;
}
