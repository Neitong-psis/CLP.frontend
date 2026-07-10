'use client';

import { useFormContext } from 'react-hook-form';
import { FIELD_CONTROL_CLASS, FieldShell } from './FieldShell';
import { formatCardNumber, formatCvv, formatExpiry } from './format';
import type { CheckoutFormValues } from './schemas';
import type { useLearnerCheckoutT } from '@/i18n';

type TFn = ReturnType<typeof useLearnerCheckoutT>;

interface CardPaymentFormProps {
  readonly t: TFn;
}

/**
 * Card number / expiry / CVV / name. Registered on the shared checkout form
 * via `useFormContext` rather than owning its own `useForm` — that's what
 * lets `CheckoutButton` gate on the *whole* form (billing + payment) with one
 * `formState`, not two out-of-sync ones.
 *
 * Each numeric field re-formats on every keystroke (grouping, the MM/YY
 * slash), which is why they bypass `register`'s own `onChange` in favor of an
 * explicit `setValue` — the standard react-hook-form pattern for masked input.
 */
export function CardPaymentForm({ t }: CardPaymentFormProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <FieldShell
          label={t('cardNumberLabel')}
          required
          error={
            errors.cardNumber?.message &&
            t(errors.cardNumber.message as Parameters<TFn>[0])
          }
        >
          {(id, describedBy) => (
            <input
              {...register('cardNumber')}
              id={id}
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              aria-describedby={describedBy}
              aria-invalid={Boolean(errors.cardNumber)}
              className={FIELD_CONTROL_CLASS(Boolean(errors.cardNumber))}
              value={watch('cardNumber')}
              onChange={(event) =>
                setValue('cardNumber', formatCardNumber(event.target.value), {
                  shouldValidate: true,
                })
              }
            />
          )}
        </FieldShell>
      </div>

      <FieldShell
        label={t('cardExpiryLabel')}
        required
        error={
          errors.cardExpiry?.message &&
          t(errors.cardExpiry.message as Parameters<TFn>[0])
        }
      >
        {(id, describedBy) => (
          <input
            {...register('cardExpiry')}
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            aria-describedby={describedBy}
            aria-invalid={Boolean(errors.cardExpiry)}
            className={FIELD_CONTROL_CLASS(Boolean(errors.cardExpiry))}
            value={watch('cardExpiry')}
            onChange={(event) =>
              setValue('cardExpiry', formatExpiry(event.target.value), {
                shouldValidate: true,
              })
            }
          />
        )}
      </FieldShell>

      <FieldShell
        label={t('cardCvvLabel')}
        required
        error={
          errors.cardCvv?.message &&
          t(errors.cardCvv.message as Parameters<TFn>[0])
        }
      >
        {(id, describedBy) => (
          <input
            {...register('cardCvv')}
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            aria-describedby={describedBy}
            aria-invalid={Boolean(errors.cardCvv)}
            className={FIELD_CONTROL_CLASS(Boolean(errors.cardCvv))}
            value={watch('cardCvv')}
            onChange={(event) =>
              setValue('cardCvv', formatCvv(event.target.value), {
                shouldValidate: true,
              })
            }
          />
        )}
      </FieldShell>

      <div className="sm:col-span-2">
        <FieldShell
          label={t('cardNameLabel')}
          required
          error={
            errors.cardName?.message &&
            t(errors.cardName.message as Parameters<TFn>[0])
          }
        >
          {(id, describedBy) => (
            <input
              {...register('cardName')}
              id={id}
              type="text"
              autoComplete="cc-name"
              placeholder={t('cardNamePlaceholder')}
              aria-describedby={describedBy}
              aria-invalid={Boolean(errors.cardName)}
              className={FIELD_CONTROL_CLASS(Boolean(errors.cardName))}
            />
          )}
        </FieldShell>
      </div>
    </div>
  );
}
