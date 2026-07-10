'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useLearnerCheckoutT } from '@/i18n';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useToast } from '@/components/ui/toast';
import { slugify } from '@/lib/utils/slugify';
import { addToEnrolled, isEnrolledIn } from '@/lib/utils/enrollment';
import type { Course } from '@/constants/learner';
import { BillingForm } from './BillingForm';
import { CardPaymentForm } from './CardPaymentForm';
import { CheckoutButton } from './CheckoutButton';
import { CheckoutCard } from './CheckoutCard';
import { CheckoutLayout } from './CheckoutLayout';
import { KHQRPayment } from './KHQRPayment';
import { OrderSummary } from './OrderSummary';
import { PaymentSelector } from './PaymentSelector';
import { PaypalPayment } from './PaypalPayment';
import { DEFAULT_COUNTRY_CODE, MOCK_SUBMIT_DELAY_MS } from './constants';
import { computePricing, formatCurrency, resolveCoupon } from './pricing';
import { checkoutFormSchema, type CheckoutFormValues } from './schemas';
import type { CheckoutStatus, Coupon } from './types';

/** Matches `CoursePreview`'s own fallback so the price a learner sees on the
 *  course page and on checkout can never disagree. */
const DEFAULT_PRICE = 49;
const COUPON_LOOKUP_DELAY_MS = 400;
/** How long the success checkmark holds before the redirect fires. */
const SUCCESS_HOLD_MS = 900;

interface CheckoutPageProps {
  readonly course: Course;
  readonly totalModules: number;
  readonly totalLessons: number;
}

export default function CheckoutPage({
  course,
  totalModules,
  totalLessons,
}: CheckoutPageProps) {
  const t = useLearnerCheckoutT();
  const router = useRouter();
  const { toast } = useToast();
  const currentUser = useCurrentUser();
  const slug = slugify(course.title);

  // localStorage is unavailable during SSR; the enrollment check runs after
  // mount so the server render and the first client render always agree (the
  // same pattern used throughout the learner surface — see CoursePreview).
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(course.enrolled);
  useEffect(() => {
    const id = setTimeout(() => {
      if (isEnrolledIn(course.id)) setAlreadyEnrolled(true);
    }, 0);
    return () => clearTimeout(id);
  }, [course.id]);

  const price = course.price ?? DEFAULT_PRICE;

  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponApplying, setCouponApplying] = useState(false);
  const [status, setStatus] = useState<CheckoutStatus>('idle');

  const pricing = useMemo(() => computePricing(price, coupon), [price, coupon]);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: currentUser.fullName,
      email: currentUser.email,
      country: DEFAULT_COUNTRY_CODE,
      paymentMethod: 'card',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      cardName: '',
      termsAccepted: false,
    },
  });
  // `useWatch` rather than `form.watch()` — the latter is an imperative
  // escape hatch React Compiler can't safely memoize around.
  const paymentMethod = useWatch({
    control: form.control,
    name: 'paymentMethod',
  });

  const handleApplyCoupon = useCallback(
    (code: string) => {
      setCouponApplying(true);
      setCouponError(null);
      const id = setTimeout(() => {
        const found = resolveCoupon(code);
        if (found) {
          setCoupon(found);
        } else {
          setCoupon(null);
          setCouponError(t('couponInvalid'));
        }
        setCouponApplying(false);
      }, COUPON_LOOKUP_DELAY_MS);
      return () => clearTimeout(id);
    },
    [t],
  );

  const handleRemoveCoupon = useCallback(() => {
    setCoupon(null);
    setCouponError(null);
  }, []);

  const onSubmit = form.handleSubmit(() => {
    setStatus('submitting');
    setTimeout(() => {
      addToEnrolled(course.id);
      setStatus('success');
      toast(t('successHeading'), 'success');
      setTimeout(() => {
        router.push(`/learn/${slug}?mode=resume`);
      }, SUCCESS_HOLD_MS);
    }, MOCK_SUBMIT_DELAY_MS);
  });

  if (alreadyEnrolled) {
    return <AlreadyEnrolled course={course} slug={slug} t={t} />;
  }

  const ctaLabel =
    pricing.total === 0
      ? t('ctaFree')
      : t('ctaPaid', { amount: formatCurrency(pricing.total) });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate>
        <CheckoutLayout
          main={
            <div className="flex flex-col gap-6">
              <CheckoutHeader t={t} slug={slug} />

              <CheckoutCard>
                <h2 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
                  {t('billingHeading')}
                </h2>
                <BillingForm t={t} />
              </CheckoutCard>

              <CheckoutCard>
                <h2 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
                  {t('paymentHeading')}
                </h2>
                <PaymentSelector
                  selected={paymentMethod}
                  onSelect={(id) =>
                    form.setValue('paymentMethod', id, { shouldValidate: true })
                  }
                  t={t}
                />
                <div className="mt-5">
                  {paymentMethod === 'card' && <CardPaymentForm t={t} />}
                  {paymentMethod === 'paypal' && <PaypalPayment t={t} />}
                  {paymentMethod === 'khqr' && <KHQRPayment t={t} />}
                </div>
              </CheckoutCard>

              <TermsRow t={t} />

              <div>
                <CheckoutButton
                  label={ctaLabel}
                  loadingLabel={t('ctaLoading')}
                  status={status}
                  disabled={!form.formState.isValid}
                />
                <p className="mt-3 text-center text-xs text-slate-400 dark:text-slate-500">
                  {t('securedNote')}
                </p>
              </div>
            </div>
          }
          summary={
            <OrderSummary
              course={course}
              totalModules={totalModules}
              totalLessons={totalLessons}
              pricing={pricing}
              couponApplying={couponApplying}
              couponError={couponError}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              t={t}
            />
          }
        />
      </form>
    </FormProvider>
  );
}

// ── Header ─────────────────────────────────────────────────────────────────────

function CheckoutHeader({
  t,
  slug,
}: {
  readonly t: ReturnType<typeof useLearnerCheckoutT>;
  readonly slug: string;
}) {
  return (
    <div>
      <Link
        href={`/explore/${slug}`}
        className="focus-visible:ring-checkout-accent/40 mb-3 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-slate-500 transition-colors outline-none hover:text-slate-900 focus-visible:ring-2 dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowLeft aria-hidden className="size-4" />
        {t('back')}
      </Link>
      <h1 className="text-[32px] leading-tight font-bold text-slate-900 dark:text-white">
        {t('title')}
      </h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {t('subtitle')}
      </p>
    </div>
  );
}

// ── Terms row ──────────────────────────────────────────────────────────────────

function TermsRow({
  t,
}: {
  readonly t: ReturnType<typeof useLearnerCheckoutT>;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  return (
    <div>
      <label className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
        <input
          {...register('termsAccepted')}
          type="checkbox"
          className="accent-checkout-accent mt-0.5 size-4 shrink-0"
        />
        <span>
          {t.rich('termsLabel', {
            terms: (chunks) => (
              <Link
                href="/terms"
                target="_blank"
                className="text-checkout-accent underline-offset-2 hover:underline"
              >
                {chunks}
              </Link>
            ),
            refund: (chunks) => (
              <Link
                href="/terms"
                target="_blank"
                className="text-checkout-accent underline-offset-2 hover:underline"
              >
                {chunks}
              </Link>
            ),
            privacy: (chunks) => (
              <Link
                href="/privacy"
                target="_blank"
                className="text-checkout-accent underline-offset-2 hover:underline"
              >
                {chunks}
              </Link>
            ),
          })}
        </span>
      </label>
      {errors.termsAccepted?.message && (
        <p
          role="alert"
          className="mt-1.5 ml-6.5 text-xs text-red-600 dark:text-red-400"
        >
          {t(errors.termsAccepted.message as Parameters<typeof t>[0])}
        </p>
      )}
    </div>
  );
}

// ── Already-enrolled guard ───────────────────────────────────────────────────

function AlreadyEnrolled({
  course,
  slug,
  t,
}: {
  readonly course: Course;
  readonly slug: string;
  readonly t: ReturnType<typeof useLearnerCheckoutT>;
}) {
  return (
    <div className="bg-checkout-surface fixed inset-0 z-50 flex items-center justify-center px-4">
      <CheckoutCard className="flex max-w-sm flex-col items-center gap-3 text-center">
        <span className="bg-checkout-accent/10 text-checkout-accent flex size-12 items-center justify-center rounded-full">
          <GraduationCap aria-hidden className="size-6" />
        </span>
        <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
          {t('alreadyEnrolledHeading')}
        </h1>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {course.title}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t('alreadyEnrolledDesc')}
        </p>
        <Link
          href={`/learn/${slug}`}
          className="bg-checkout-accent hover:bg-checkout-accent-hover mt-2 flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold text-white transition-colors"
        >
          {t('alreadyEnrolledCta')}
        </Link>
      </CheckoutCard>
    </div>
  );
}
