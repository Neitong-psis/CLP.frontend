import Image from 'next/image';
import { GraduationCap, Lock, RotateCcw, ShieldCheck, Zap } from 'lucide-react';
import { CheckoutCard } from './CheckoutCard';
import { CouponInput } from './CouponInput';
import { formatCurrency } from './pricing';
import type { PricingBreakdown } from './types';
import type { Course } from '@/constants/learner';
import type { useLearnerCheckoutT } from '@/i18n';

type TFn = ReturnType<typeof useLearnerCheckoutT>;

interface OrderSummaryProps {
  readonly course: Course;
  readonly totalModules: number;
  readonly totalLessons: number;
  readonly pricing: PricingBreakdown;
  readonly couponApplying: boolean;
  readonly couponError: string | null;
  readonly onApplyCoupon: (code: string) => void;
  readonly onRemoveCoupon: () => void;
  readonly t: TFn;
}

/**
 * The sticky right column. Everything a learner needs to trust the number
 * they're about to pay: what they're buying, how the price broke down, and a
 * short reassurance strip — kept visible the whole way through the form on
 * desktop (see `CheckoutLayout` for the sticky wrapper).
 */
export function OrderSummary({
  course,
  totalModules,
  totalLessons,
  pricing,
  couponApplying,
  couponError,
  onApplyCoupon,
  onRemoveCoupon,
  t,
}: OrderSummaryProps) {
  return (
    <CheckoutCard className="flex flex-col gap-5 p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        {t('orderSummaryHeading')}
      </h2>

      <div className="flex gap-3.5">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-white/5">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt=""
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <span className="flex size-full items-center justify-center text-slate-400">
              <GraduationCap aria-hidden className="size-6" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="truncate text-[15px] font-semibold text-slate-900 dark:text-white"
            title={course.title}
          >
            {course.title}
          </p>
          <p className="truncate text-sm text-slate-500 dark:text-slate-400">
            {t('instructorPrefix')} {course.author}
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-xs text-slate-400 dark:text-slate-500">
            <span>{course.category}</span>
            <span aria-hidden>·</span>
            <span>{course.level}</span>
            <span aria-hidden>·</span>
            <span>{t('moduleCount', { count: totalModules })}</span>
            <span aria-hidden>·</span>
            <span>{t('lessonCount', { count: totalLessons })}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 dark:border-white/10" />

      <CouponInput
        coupon={pricing.coupon}
        applying={couponApplying}
        error={couponError}
        onApply={onApplyCoupon}
        onRemove={onRemoveCoupon}
        t={t}
      />

      <dl className="flex flex-col gap-2 text-sm">
        <PriceRow
          label={t('priceLabel')}
          value={formatCurrency(pricing.price)}
        />
        {pricing.discount > 0 && (
          <PriceRow
            label={t('discountLabel')}
            value={`-${formatCurrency(pricing.discount)}`}
            tone="positive"
          />
        )}
        <PriceRow label={t('taxLabel')} value={formatCurrency(pricing.tax)} />
      </dl>

      <div className="border-t border-slate-100 dark:border-white/10" />

      <div className="flex items-baseline justify-between">
        <dt className="text-[15px] font-semibold text-slate-900 dark:text-white">
          {t('totalLabel')}
        </dt>
        <dd className="text-2xl font-bold text-slate-900 dark:text-white">
          {formatCurrency(pricing.total)}
        </dd>
      </div>

      <ul className="flex flex-col gap-2 border-t border-slate-100 pt-4 dark:border-white/10">
        <TrustRow icon={Lock} text={t('trustSsl')} />
        <TrustRow icon={ShieldCheck} text={t('trustSecure')} />
        <TrustRow icon={RotateCcw} text={t('trustGuarantee')} />
        <TrustRow icon={Zap} text={t('trustInstant')} />
      </ul>
    </CheckoutCard>
  );
}

function PriceRow({
  label,
  value,
  tone = 'default',
}: {
  readonly label: string;
  readonly value: string;
  readonly tone?: 'default' | 'positive';
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-slate-500 dark:text-slate-400">{label}</dt>
      <dd
        className={
          tone === 'positive'
            ? 'font-medium text-emerald-600 dark:text-emerald-400'
            : 'text-slate-700 dark:text-slate-200'
        }
      >
        {value}
      </dd>
    </div>
  );
}

function TrustRow({
  icon: Icon,
  text,
}: {
  readonly icon: typeof Lock;
  readonly text: string;
}) {
  return (
    <li className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
      <Icon
        aria-hidden
        className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
      />
      {text}
    </li>
  );
}
