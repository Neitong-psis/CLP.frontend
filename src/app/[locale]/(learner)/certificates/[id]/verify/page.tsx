'use client';

import { useState } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useLearnerCertificatesT } from '@/i18n';
import { useToast } from '@/components/ui/toast';
import TopBar from '@/components/pages/learner/TopBar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';
import { MOCK_USER } from '@/config/learner';
import { getCertById } from '../_lib/cert';
import { markCertVerified } from '@/lib/utils/certStorage';

// ── Types ─────────────────────────────────────────────────────────────────────

type VerifyStep = 1 | 2 | 3;

interface VerifyData {
  fullName: string;
  email: string;
  phone: string;
  studentId: string;
  institution: string;
  cohort: string;
}

type Errors = Partial<Record<keyof VerifyData, string>>;

type TFn = ReturnType<typeof useLearnerCertificatesT>;

// ── Validation ────────────────────────────────────────────────────────────────

function validateStep(step: VerifyStep, data: VerifyData): Errors {
  const errs: Errors = {};
  if (step === 1) {
    if (!data.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!data.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = 'Enter a valid email address.';
    }
  }
  if (step === 2) {
    if (!data.phone.trim()) errs.phone = 'Phone number is required.';
    if (!data.studentId.trim()) errs.studentId = 'Student ID is required.';
  }
  return errs;
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepIndicator({ current, t }: { current: VerifyStep; t: TFn }) {
  const steps: { key: VerifyStep; label: string; desc: string }[] = [
    { key: 1, label: t('step1'), desc: t('step1Desc') },
    { key: 2, label: t('step2'), desc: t('step2Desc') },
    { key: 3, label: t('step3'), desc: t('step3Desc') },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {steps.map((step) => {
        const active = step.key === current;
        const done = step.key < current;
        return (
          <div
            key={step.key}
            className={cn(
              'rounded-xl border px-4 py-3 transition-colors',
              active
                ? 'border-brand-gold bg-brand-gold/5'
                : done
                  ? 'border-border bg-muted/30'
                  : 'border-border bg-card',
            )}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                  active
                    ? 'bg-brand-gold text-brand-navy'
                    : done
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-muted text-muted-foreground/50',
                )}
              >
                {step.key}
              </span>
              <div className="min-w-0">
                <p
                  className={cn(
                    'text-sm font-semibold',
                    active ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {step.label}
                </p>
                <p className="text-muted-foreground/70 truncate text-[11px]">
                  {step.desc}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Form field ────────────────────────────────────────────────────────────────

function FormField({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="text-foreground mb-1.5 block text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? '....'}
        className={cn(
          'bg-background text-foreground placeholder:text-muted-foreground/50 w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2',
          error
            ? 'border-red-500 focus:ring-red-500/30'
            : 'border-border focus:ring-brand-gold/30',
        )}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ── Review field ──────────────────────────────────────────────────────────────

function ReviewField({
  label,
  value,
  onEdit,
  t,
}: {
  label: string;
  value: string;
  onEdit: () => void;
  t: TFn;
}) {
  return (
    <div className="border-border rounded-xl border p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs">{label}</p>
          <p className="text-foreground mt-0.5 text-sm font-semibold">
            {value || '....'}
          </p>
        </div>
        <button
          onClick={onEdit}
          className="text-muted-foreground hover:text-foreground shrink-0 text-xs font-medium transition-colors"
        >
          {t('edit')}
        </button>
      </div>
    </div>
  );
}

// ── Confirm modal ─────────────────────────────────────────────────────────────

function ConfirmModal({
  onCancel,
  onConfirm,
  t,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  t: TFn;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden
      />
      <div className="bg-card border-border relative w-full max-w-sm rounded-2xl border p-8 shadow-2xl">
        <div className="bg-brand-gold/10 mx-auto mb-5 flex size-14 items-center justify-center rounded-full">
          <ShieldCheck className="text-brand-gold size-7" />
        </div>
        <h2 className="text-foreground mb-2 text-center text-lg font-bold">
          {t('confirmTitle')}
        </h2>
        <p className="text-muted-foreground mb-8 text-center text-sm leading-relaxed">
          {t('confirmDesc')}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="border-border text-foreground hover:bg-muted/60 flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors"
          >
            {t('cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy flex-1 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors"
          >
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function VerifyPage() {
  const { id } = useParams<{ id: string }>();
  const t = useLearnerCertificatesT();
  const router = useRouter();
  const { toast } = useToast();

  const [step, setStep] = useState<VerifyStep>(1);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [data, setData] = useState<VerifyData>({
    fullName: MOCK_USER.name,
    email: MOCK_USER.email,
    phone: '',
    studentId: '',
    institution: '',
    cohort: '',
  });

  const cert = getCertById(id);
  if (!cert) return notFound();

  function update(field: keyof VerifyData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleNext() {
    const errs = validateStep(step, data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    if (step < 3) setStep((s) => (s + 1) as VerifyStep);
    else setShowModal(true);
  }

  function handleBack() {
    setErrors({});
    if (step > 1) setStep((s) => (s - 1) as VerifyStep);
    else router.push('/certificates');
  }

  function handleConfirm() {
    setShowModal(false);
    markCertVerified(id, data.fullName);
    toast(t('successToast'), 'success');
    router.push(`/certificates/${id}/view`);
  }

  const reviewFields = [
    { label: t('fullName'), value: data.fullName, step: 1 },
    { label: t('verificationEmail'), value: data.email, step: 1 },
    { label: t('phone'), value: data.phone, step: 2 },
    { label: t('studentId'), value: data.studentId, step: 2 },
    { label: t('institution'), value: data.institution, step: 2 },
    { label: t('cohort'), value: data.cohort, step: 2 },
  ];

  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <TopBar
        role="learner"
        title={t('title')}
        subtitle={t('subtitle', { email: MOCK_USER.email })}
      />

      <div className="flex flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex w-full flex-1 flex-col gap-6">
          {/* Header */}
          <div>
            <h2 className="text-foreground text-base font-bold">
              {t('verifyTitle')}
            </h2>
            <p className="text-muted-foreground text-sm">
              {cert.fullTitle} — {t('verifySubtitle')}
            </p>
          </div>

          {/* Step indicator */}
          <StepIndicator current={step} t={t} />

          {/* Form card */}
          <div className="border-border bg-card flex flex-1 flex-col rounded-2xl border p-6">
            {/* Step 1 — Identity */}
            {step === 1 && (
              <div className="flex flex-1 flex-col">
                <h3 className="text-foreground mb-1 font-bold">
                  {t('identitySection')}
                </h3>
                <p className="text-muted-foreground mb-5 text-sm">
                  {t('identitySectionDesc')}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    label={t('fullName')}
                    value={data.fullName}
                    onChange={(v) => update('fullName', v)}
                    required
                    error={errors.fullName}
                  />
                  <FormField
                    label={t('verificationEmail')}
                    value={data.email}
                    onChange={(v) => update('email', v)}
                    required
                    error={errors.email}
                  />
                </div>
              </div>
            )}

            {/* Step 2 — Learner details */}
            {step === 2 && (
              <div className="flex flex-1 flex-col">
                <h3 className="text-foreground mb-1 font-bold">
                  {t('learnerSection')}
                </h3>
                <p className="text-muted-foreground mb-5 text-sm">
                  {t('learnerSectionDesc')}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    label={t('phone')}
                    value={data.phone}
                    onChange={(v) => update('phone', v)}
                    required
                    error={errors.phone}
                  />
                  <FormField
                    label={t('studentId')}
                    value={data.studentId}
                    onChange={(v) => update('studentId', v)}
                    required
                    error={errors.studentId}
                  />
                  <FormField
                    label={t('institution')}
                    value={data.institution}
                    onChange={(v) => update('institution', v)}
                  />
                  <FormField
                    label={t('cohort')}
                    value={data.cohort}
                    onChange={(v) => update('cohort', v)}
                  />
                </div>
              </div>
            )}

            {/* Step 3 — Review */}
            {step === 3 && (
              <div className="flex flex-1 flex-col">
                <h3 className="text-foreground mb-1 font-bold">
                  {t('reviewSection')}
                </h3>
                <p className="text-muted-foreground mb-5 text-sm">
                  {t('reviewSectionDesc')}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {reviewFields.map((f) => (
                    <ReviewField
                      key={f.label}
                      label={f.label}
                      value={f.value}
                      onEdit={() => setStep(f.step as VerifyStep)}
                      t={t}
                    />
                  ))}
                </div>
                <div className="border-brand-gold/20 bg-brand-gold/5 mt-4 rounded-xl border px-4 py-3">
                  <p className="text-foreground/80 text-sm">
                    {t('readyMessage')}
                  </p>
                </div>
              </div>
            )}

            {/* Footer — pinned to bottom */}
            <div className="mt-auto flex items-center justify-between pt-6">
              <button
                onClick={handleBack}
                className="text-muted-foreground hover:text-foreground px-2 py-2 text-sm font-medium transition-colors"
              >
                {t('back')}
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toast(t('saveDraft') + ' ✓', 'success')}
                  className="border-border text-foreground hover:bg-muted/60 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
                >
                  {t('saveDraft')}
                </button>
                <button
                  onClick={handleNext}
                  className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy rounded-xl px-6 py-2.5 text-sm font-bold transition-colors"
                >
                  {step < 3 ? t('next') : t('submitVerification')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterBottomBar theme="light" />

      {showModal && (
        <ConfirmModal
          onCancel={() => setShowModal(false)}
          onConfirm={handleConfirm}
          t={t}
        />
      )}
    </div>
  );
}
