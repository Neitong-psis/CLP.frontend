'use client';

import { useFormContext } from 'react-hook-form';
import { FIELD_CONTROL_CLASS, FieldShell } from './FieldShell';
import { COUNTRIES } from './constants';
import type { CheckoutFormValues } from './schemas';
import type { useLearnerCheckoutT } from '@/i18n';

type TFn = ReturnType<typeof useLearnerCheckoutT>;

/**
 * Name, email, country — nothing else. No address, city, postal code, or
 * phone: none of this app's payment methods need them, and every extra field
 * is friction between a learner and the course they already decided to buy.
 */
export function BillingForm({ t }: { readonly t: TFn }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FieldShell
        label={t('fullNameLabel')}
        required
        error={
          errors.fullName?.message &&
          t(errors.fullName.message as Parameters<TFn>[0])
        }
      >
        {(id, describedBy) => (
          <input
            {...register('fullName')}
            id={id}
            type="text"
            autoComplete="name"
            placeholder={t('fullNamePlaceholder')}
            aria-describedby={describedBy}
            aria-invalid={Boolean(errors.fullName)}
            className={FIELD_CONTROL_CLASS(Boolean(errors.fullName))}
          />
        )}
      </FieldShell>

      <FieldShell
        label={t('emailLabel')}
        required
        error={
          errors.email?.message && t(errors.email.message as Parameters<TFn>[0])
        }
      >
        {(id, describedBy) => (
          <input
            {...register('email')}
            id={id}
            type="email"
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            aria-describedby={describedBy}
            aria-invalid={Boolean(errors.email)}
            className={FIELD_CONTROL_CLASS(Boolean(errors.email))}
          />
        )}
      </FieldShell>

      <div className="sm:col-span-2">
        <FieldShell
          label={t('countryLabel')}
          required
          error={
            errors.country?.message &&
            t(errors.country.message as Parameters<TFn>[0])
          }
        >
          {(id, describedBy) => (
            <select
              {...register('country')}
              id={id}
              autoComplete="country"
              aria-describedby={describedBy}
              aria-invalid={Boolean(errors.country)}
              className={FIELD_CONTROL_CLASS(Boolean(errors.country))}
            >
              <option value="" disabled>
                {t('countryPlaceholder')}
              </option>
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          )}
        </FieldShell>
      </div>
    </div>
  );
}
