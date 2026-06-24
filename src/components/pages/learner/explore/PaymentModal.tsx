'use client';

import { useState, useCallback } from 'react';
import {
  X,
  Check,
  Wallet,
  CreditCard,
  QrCode,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useLearnerExploreT } from '@/i18n';
import type { Course } from '@/constants/learner';

// ── Types ─────────────────────────────────────────────────────────────────────

type PaymentStep = 'method' | 'scan' | 'success';
type PaymentMethod = 'aba' | 'acleda' | 'chipmong' | 'khqr';

export interface PaymentModalProps {
  course: Course;
  onClose: () => void;
  onSuccess: (courseId: string) => void;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const PROMO_CODES: Record<string, number> = {
  SAVE10: 10,
  WELCOME: 20,
  QBTECH50: 50,
};

const PAYMENT_METHODS: { id: PaymentMethod; color: string; bg: string }[] = [
  { id: 'aba', color: 'text-[#E94F1C]', bg: 'bg-[#E94F1C]/10' },
  { id: 'acleda', color: 'text-[#003DA5]', bg: 'bg-[#003DA5]/10' },
  { id: 'chipmong', color: 'text-[#008545]', bg: 'bg-[#008545]/10' },
  { id: 'khqr', color: 'text-[#8B1A1A]', bg: 'bg-[#8B1A1A]/10' },
];

const METHOD_LABEL: Record<PaymentMethod, string> = {
  aba: 'ABA',
  acleda: 'ACLEDA',
  chipmong: 'Chip Mong',
  khqr: 'KHQR Bakong',
};

// ── Mock QR code ──────────────────────────────────────────────────────────────

const QR_PATTERN = [
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
];

function MockQR() {
  return (
    <div className="border-border inline-block rounded-xl border bg-white p-3">
      <div
        className="grid gap-px"
        style={{ gridTemplateColumns: 'repeat(21, 1fr)' }}
      >
        {QR_PATTERN.flat().map((cell, i) => (
          <div
            key={i}
            className={cn(
              'size-3 rounded-[1px]',
              cell ? 'bg-[#1a1a2e]' : 'bg-white',
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepTabs({
  step,
  t,
}: {
  step: PaymentStep;
  t: ReturnType<typeof useLearnerExploreT>;
}) {
  const steps: { id: PaymentStep; label: string }[] = [
    { id: 'method', label: t('payment.tabMethod') },
    { id: 'scan', label: t('payment.tabScan') },
    { id: 'success', label: t('payment.tabSuccess') },
  ];
  const idx = steps.findIndex((s) => s.id === step);

  return (
    <div className="grid grid-cols-3 gap-3 px-6 pt-4">
      {steps.map((s, i) => (
        <div key={s.id}>
          <div
            className={cn(
              'mb-1.5 h-1 rounded-full transition-colors',
              i <= idx ? 'bg-brand-gold' : 'bg-border',
            )}
          />
          <p
            className={cn(
              'text-xs font-semibold',
              i <= idx ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── Payment method option ─────────────────────────────────────────────────────

function MethodOption({
  id,
  selected,
  onSelect,
  t,
}: {
  id: PaymentMethod;
  selected: boolean;
  onSelect: () => void;
  t: ReturnType<typeof useLearnerExploreT>;
}) {
  const cfg = PAYMENT_METHODS.find((m) => m.id === id)!;

  const icons: Record<PaymentMethod, React.ReactNode> = {
    aba: <Wallet className="size-5" />,
    acleda: <CreditCard className="size-5" />,
    chipmong: <CreditCard className="size-5" />,
    khqr: <QrCode className="size-5" />,
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all',
        selected
          ? 'border-brand-gold bg-brand-gold/5'
          : 'border-border hover:border-brand-gold/40',
      )}
    >
      <div
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full',
          cfg.bg,
          cfg.color,
        )}
      >
        {icons[id]}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-foreground text-sm font-bold">
          {t(`payment.${id}` as Parameters<typeof t>[0])}
        </p>
        <p className="text-muted-foreground text-xs">
          {t(`payment.${id}Desc` as Parameters<typeof t>[0])}
        </p>
      </div>
      <span
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          selected ? 'border-brand-gold bg-brand-gold' : 'border-border',
        )}
      >
        {selected && <span className="size-2 rounded-full bg-white" />}
      </span>
    </button>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────

export function PaymentModal({
  course,
  onClose,
  onSuccess,
}: PaymentModalProps) {
  const t = useLearnerExploreT();
  const price = course.price ?? 49;

  const [step, setStep] = useState<PaymentStep>('method');
  const [method, setMethod] = useState<PaymentMethod>('aba');
  const [promoInput, setPromoInput] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState<{
    text: string;
    ok: boolean;
  } | null>(null);

  const total = Math.max(0, price - discount);

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    const off = PROMO_CODES[code];
    if (off !== undefined) {
      setDiscount(off);
      setPromoMsg({
        text: t('payment.promoApplied', { amount: String(off) }),
        ok: true,
      });
    } else {
      setDiscount(0);
      setPromoMsg({ text: t('payment.promoInvalid'), ok: false });
    }
  }

  const handleConfirm = useCallback(() => {
    setStep('success');
    onSuccess(course.id);
  }, [course.id, onSuccess]);

  // ── Step: method ────────────────────────────────────────────────────────────
  const methodTitle =
    step === 'success' ? t('payment.successHeading') : t('payment.title');
  const methodSub =
    step === 'scan'
      ? t('payment.subtitleScan')
      : step === 'success'
        ? t('payment.successSub')
        : t('payment.subtitleMethod');

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div className="bg-background relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl shadow-2xl sm:max-h-[90dvh] sm:rounded-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-start gap-3 px-6 pt-6 pb-2">
          <div className="bg-brand-gold/10 flex size-10 shrink-0 items-center justify-center rounded-full">
            {step === 'success' ? (
              <Check className="text-brand-gold size-5" />
            ) : (
              <Wallet className="text-brand-gold size-5" />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-foreground text-base font-bold">
              {methodTitle}
            </h2>
            <p className="text-muted-foreground text-xs">{methodSub}</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/60 flex size-8 items-center justify-center rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Step tabs */}
        {step !== 'success' && <StepTabs step={step} t={t} />}
        {step === 'success' && (
          <div className="grid shrink-0 grid-cols-3 gap-3 px-6 pt-4">
            {[
              t('payment.tabMethod'),
              t('payment.tabScan'),
              t('payment.tabSuccess'),
            ].map((label) => (
              <div key={label}>
                <div className="bg-brand-gold mb-1.5 h-1 rounded-full" />
                <p className="text-foreground text-xs font-semibold">{label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="border-border mt-3 shrink-0 border-t" />

        {/* ── Step: method ── */}
        {step === 'method' && (
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-4">
            {/* Course summary */}
            <div className="border-border flex items-center gap-3 rounded-2xl border p-3">
              <div className="bg-brand-navy flex size-14 shrink-0 items-center justify-center rounded-xl">
                <span className="text-brand-gold text-2xl">📖</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground text-[10px] font-semibold tracking-wide uppercase">
                  {course.courseType === 'text-image'
                    ? t('textImageCourse')
                    : t('mixedCourse')}
                </p>
                <p className="text-foreground truncate text-sm font-bold">
                  {course.title}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-xs">
                    {t('payment.coursePrice')}
                  </p>
                  <p className="text-foreground text-sm font-bold">
                    ${price}.00
                  </p>
                </div>
              </div>
            </div>

            {/* Payment methods */}
            <div>
              <p className="text-foreground mb-2 text-sm font-bold">
                {t('payment.paymentMethod')}
              </p>
              <div className="flex flex-col gap-2">
                {PAYMENT_METHODS.map((m) => (
                  <MethodOption
                    key={m.id}
                    id={m.id}
                    selected={method === m.id}
                    onSelect={() => setMethod(m.id)}
                    t={t}
                  />
                ))}
              </div>
            </div>

            {/* Promo code */}
            <div className="border-border rounded-2xl border p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-brand-gold text-sm">🏷</span>
                <p className="text-foreground text-sm font-bold">
                  {t('payment.promoCode')}{' '}
                  <span className="text-muted-foreground font-normal">
                    {t('payment.promoOptional')}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value);
                    setPromoMsg(null);
                  }}
                  placeholder={t('payment.promoPlaceholder')}
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground/50 flex-1 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400/30"
                />
                <button
                  onClick={applyPromo}
                  className="text-foreground border-border hover:bg-muted/60 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors"
                >
                  {t('payment.promoApply')}
                </button>
              </div>
              {promoMsg && (
                <p
                  className={cn(
                    'mt-1.5 text-xs font-medium',
                    promoMsg.ok ? 'text-emerald-500' : 'text-red-500',
                  )}
                >
                  {promoMsg.text}
                </p>
              )}
            </div>

            {/* Enrollment note */}
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 shrink-0 text-emerald-500" />
              <p className="text-muted-foreground text-xs">
                {t('payment.enrollNote')}
              </p>
            </div>
          </div>
        )}

        {/* ── Step: scan ── */}
        {step === 'scan' && (
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-4">
            {/* Course + price summary */}
            <div className="border-border flex items-center gap-3 rounded-2xl border p-3">
              <div className="bg-brand-navy flex size-14 shrink-0 items-center justify-center rounded-xl">
                <span className="text-brand-gold text-2xl">📖</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-foreground truncate text-sm font-bold">
                  {course.title}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-xs">
                    {t('payment.coursePrice')}
                  </p>
                  <p className="text-foreground text-sm font-bold">
                    ${price}.00
                  </p>
                </div>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="bg-muted/40 space-y-1 rounded-2xl p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {t('payment.amount')}
                </span>
                <span className="text-foreground">${price}.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {t('payment.discount')}
                </span>
                <span className="text-muted-foreground">-${discount}.00</span>
              </div>
              <div className="border-border mt-2 border-t pt-2">
                <div className="flex justify-between">
                  <span className="text-foreground font-bold">
                    {t('payment.total')}
                  </span>
                  <span className="text-foreground font-bold">${total}.00</span>
                </div>
              </div>
            </div>

            {/* QR area */}
            <div className="border-border flex flex-col items-center rounded-2xl border p-6">
              <p className="text-brand-navy dark:text-foreground mb-4 text-sm font-bold">
                {t('payment.scanTitle')}
              </p>
              <MockQR />
              <p className="text-muted-foreground mt-3 text-center text-xs">
                {t('payment.scanDesc')}
              </p>
              <button className="border-border text-foreground hover:bg-muted/60 mt-3 rounded-xl border px-5 py-2 text-sm font-semibold transition-colors">
                {t('payment.openApp')}
              </button>
              <div className="bg-brand-gold/20 text-brand-gold mt-3 animate-pulse rounded-full px-4 py-1.5 text-xs font-semibold">
                {t('payment.waitingConfirm')}
              </div>
            </div>
          </div>
        )}

        {/* ── Step: success ── */}
        {step === 'success' && (
          <div className="flex flex-1 flex-col items-center gap-4 overflow-y-auto px-6 py-6">
            <div className="flex size-20 items-center justify-center rounded-full bg-emerald-500/15">
              <Check className="size-10 text-emerald-500" />
            </div>
            <div className="text-center">
              <h3 className="text-foreground text-xl font-bold">
                {t('payment.successHeading')}
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {t('payment.successEnrolled', { course: course.title })}
              </p>
              <p className="text-muted-foreground text-sm">
                {t('payment.successReadyDesc')}
              </p>
            </div>
            <div className="bg-muted/40 flex w-full items-center justify-between rounded-2xl p-4">
              <p className="text-muted-foreground text-sm">
                {t('payment.paidWith', { method: METHOD_LABEL[method] })}
              </p>
              <p className="text-foreground font-bold">${total}.00</p>
            </div>
          </div>
        )}

        {/* ── Footer actions ── */}
        <div className="border-border flex shrink-0 items-center justify-end gap-3 border-t px-6 py-4">
          {step === 'method' && (
            <>
              <button
                onClick={onClose}
                className="border-border text-foreground hover:bg-muted/60 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors"
              >
                {t('payment.cancel')}
              </button>
              <button
                onClick={() => setStep('scan')}
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy rounded-xl px-5 py-2.5 text-sm font-bold transition-colors"
              >
                {t('payment.nextScan')}
              </button>
            </>
          )}
          {step === 'scan' && (
            <>
              <button
                onClick={() => setStep('method')}
                className="border-border text-foreground hover:bg-muted/60 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors"
              >
                {t('payment.back')}
              </button>
              <button
                onClick={handleConfirm}
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy rounded-xl px-5 py-2.5 text-sm font-bold transition-colors"
              >
                {t('payment.confirmPayment')}
              </button>
            </>
          )}
          {step === 'success' && (
            <button
              onClick={() => {
                onClose();
                window.location.href = '/my-learning';
              }}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy w-full rounded-xl py-3 text-sm font-bold transition-colors"
            >
              {t('payment.startLearning')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
