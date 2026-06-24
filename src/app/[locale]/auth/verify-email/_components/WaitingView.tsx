import { Fragment } from 'react';
import Link from 'next/link';
import { CheckCircle2, Mail } from 'lucide-react';

// ── Step progress ────────────────────────────────────────────────────────────

type StepState = 'done' | 'active' | 'upcoming';

interface Step {
  label: string;
  state: StepState;
}

const STEPS: Step[] = [
  { label: 'Account created', state: 'done' },
  { label: 'Verify email', state: 'active' },
  { label: 'Start learning', state: 'upcoming' },
];

const CONNECTOR_CLS: Record<StepState, string> = {
  done: 'border-emerald-300',
  active: 'border-slate-200 border-dashed',
  upcoming: 'border-slate-200 border-dashed',
};

function StepNode({ state }: { state: StepState }) {
  if (state === 'done') {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
        <CheckCircle2 className="h-4 w-4 text-white" strokeWidth={2.5} />
      </div>
    );
  }
  if (state === 'active') {
    return (
      <div className="border-brand-gold bg-brand-gold/10 flex h-6 w-6 items-center justify-center rounded-full border-2">
        <span className="bg-brand-gold h-2 w-2 animate-pulse rounded-full" />
      </div>
    );
  }
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-200 bg-slate-50">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
    </div>
  );
}

const LABEL_CLS: Record<StepState, string> = {
  done: 'text-emerald-600',
  active: 'text-brand-gold',
  upcoming: 'text-slate-400',
};

function StepProgress() {
  return (
    <div className="w-full">
      {/* Node row */}
      <div className="flex items-center">
        {STEPS.map((step, i) => (
          <Fragment key={step.label}>
            <StepNode state={step.state} />
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 border-t-2 ${CONNECTOR_CLS[step.state]}`}
              />
            )}
          </Fragment>
        ))}
      </div>
      {/* Label row — three equal columns so labels sit under their nodes */}
      <div className="mt-2 flex">
        {STEPS.map((step, i) => (
          <span
            key={step.label}
            className={`flex-1 text-xs font-medium ${LABEL_CLS[step.state]} ${
              i === 0
                ? 'text-left'
                : i === STEPS.length - 1
                  ? 'text-right'
                  : 'text-center'
            }`}
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Pulsing dots ─────────────────────────────────────────────────────────────

const DOT_DELAYS = [0, 160, 320] as const;

function PulsingDots() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {DOT_DELAYS.map((delay) => (
          <span
            key={delay}
            className="bg-brand-gold h-1.5 w-1.5 animate-bounce rounded-full"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
      <span className="text-xs text-slate-400">Waiting for confirmation</span>
    </div>
  );
}

// ── Main view ────────────────────────────────────────────────────────────────

interface WaitingViewProps {
  email: string | null;
}

export function WaitingView({ email }: WaitingViewProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Floating icon with ping ring */}
      <div className="relative">
        <span className="absolute inset-0 scale-125 animate-ping rounded-full bg-amber-400/15" />
        <div className="bg-brand-gold/10 relative flex h-20 w-20 items-center justify-center rounded-full">
          <Mail className="text-brand-gold animate-float h-10 w-10" />
        </div>
      </div>

      <h1 className="text-brand-navy mt-6 text-2xl font-bold">
        Check your inbox
      </h1>

      {email ? (
        <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-slate-500">
          We sent a confirmation link to{' '}
          <span className="text-brand-navy font-semibold">{email}</span>. Click
          it to activate your account.
        </p>
      ) : (
        <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-slate-500">
          We sent a confirmation link to your email. Click it to activate your
          account.
        </p>
      )}

      <div className="mt-7 w-full">
        <StepProgress />
      </div>

      <div className="mt-7">
        <PulsingDots />
      </div>

      <p className="mt-8 text-xs text-slate-400">
        Already confirmed?{' '}
        <Link
          href="/auth"
          className="text-brand-gold font-semibold hover:underline"
        >
          Go to Login
        </Link>
      </p>
    </div>
  );
}
