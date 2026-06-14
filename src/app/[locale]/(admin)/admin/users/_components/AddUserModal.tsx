'use client';

import { useCallback, useState } from 'react';
import {
  X,
  UserRound,
  Eye,
  EyeOff,
  Copy,
  Check,
  RefreshCw,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils/cn';
import type { UserRole } from '@/constants/admin';
import { generateUserPassword, type SaveUserInput } from '@/features/users';

// ─── Constants ────────────────────────────────────────────────────────────────

const ROLES: UserRole[] = ['Learner', 'Educator', 'Admin'];

const ROLE_PILL: Record<UserRole, string> = {
  Learner: 'border-blue-500/20 bg-blue-500/10 text-blue-500',
  Educator: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500',
  Admin: 'border-violet-500/20 bg-violet-500/10 text-violet-500',
};

const ROLE_AVATAR: Record<
  UserRole,
  { border: string; bg: string; text: string }
> = {
  Learner: { border: '#93c5fd', bg: '#eff6ff', text: '#2563eb' },
  Educator: { border: '#6ee7b7', bg: '#ecfdf5', text: '#059669' },
  Admin: { border: '#c4b5fd', bg: '#f5f3ff', text: '#7c3aed' },
};

function initials(first: string, last: string): string {
  return [first, last]
    .map((s) => s.trim()[0]?.toUpperCase() ?? '')
    .filter(Boolean)
    .join('');
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const labelCls =
  'mb-1.5 block text-xs font-semibold tracking-wide text-muted-foreground uppercase';
const inputCls =
  'h-10 w-full rounded-xl border border-border bg-muted px-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground transition-colors focus:border-brand-gold/50 focus:bg-background focus:ring-2 focus:ring-brand-gold/10';
const inputErrorCls =
  'border-rose-400 bg-rose-50/30 focus:border-rose-400 focus:ring-rose-100';

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-500">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AddUserModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (input: SaveUserInput) => void;
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(() => generateUserPassword());
  const [role, setRole] = useState<UserRole>('Learner');
  const [showPwd, setShowPwd] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const avatar = initials(firstName, lastName);
  const tone = ROLE_AVATAR[role];

  const regenerate = useCallback(() => {
    setPassword(generateUserPassword());
    setCopied(false);
  }, []);

  const copyPassword = useCallback(() => {
    void navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [password]);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = 'Required.';
    if (!email.trim()) next.email = 'Required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Invalid email.';
    if (password.length < 6) next.password = 'Minimum 6 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onCreate({
      name: [firstName.trim(), lastName.trim()].filter(Boolean).join(' '),
      email: email.trim().toLowerCase(),
      password,
      role,
      status: 'Active',
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card ring-border flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl shadow-2xl ring-1"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header — intentionally dark gradient for visual hierarchy ────────── */}
        <div className="relative overflow-hidden bg-linear-to-br from-slate-900 to-slate-700 px-8 py-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-5">
            {/* Live avatar preview — inline styles intentional for dynamic color */}
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 transition-colors duration-300"
              style={{ borderColor: tone.border, backgroundColor: tone.bg }}
            >
              {avatar ? (
                <span
                  className="text-xl font-bold transition-colors duration-300"
                  style={{ color: tone.text }}
                >
                  {avatar}
                </span>
              ) : (
                <UserRound
                  className="h-7 w-7 transition-colors duration-300"
                  style={{ color: tone.border }}
                />
              )}
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                {firstName || lastName
                  ? [firstName, lastName].filter(Boolean).join(' ')
                  : 'New User'}
              </h2>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={cn(
                    'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-colors duration-200',
                    ROLE_PILL[role],
                  )}
                >
                  {role}
                </span>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-500">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ────────────────────────────────────────────────────────────── */}
        <div className="overflow-y-auto px-8 py-6">
          <div className="space-y-5">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="First Name" error={errors.firstName}>
                <input
                  type="text"
                  placeholder="Sarah"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setErrors((p) => ({
                      ...p,
                      firstName: undefined as unknown as string,
                    }));
                  }}
                  className={cn(inputCls, errors.firstName && inputErrorCls)}
                />
              </Field>
              <Field label="Last Name">
                <input
                  type="text"
                  placeholder="Wilson"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>

            {/* Email */}
            <Field label="Email Address" error={errors.email}>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((p) => ({
                    ...p,
                    email: undefined as unknown as string,
                  }));
                }}
                className={cn(inputCls, errors.email && inputErrorCls)}
              />
            </Field>

            {/* Password */}
            <Field label="Temporary Password" error={errors.password}>
              <div className="relative flex items-center gap-2">
                <div className="relative min-w-0 flex-1">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setCopied(false);
                      setErrors((p) => ({
                        ...p,
                        password: undefined as unknown as string,
                      }));
                    }}
                    className={cn(
                      inputCls,
                      'pr-10 font-mono tracking-wide',
                      errors.password && inputErrorCls,
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                    tabIndex={-1}
                  >
                    {showPwd ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Copy */}
                <button
                  type="button"
                  onClick={copyPassword}
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors',
                    copied
                      ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
                      : 'border-border bg-muted text-muted-foreground hover:bg-background hover:text-foreground',
                  )}
                  title="Copy password"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>

                {/* Regenerate */}
                <button
                  type="button"
                  onClick={regenerate}
                  className="border-border bg-muted text-muted-foreground hover:bg-background hover:text-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors"
                  title="Generate new password"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              <p className="text-muted-foreground mt-2 flex items-center gap-1.5 text-[11px]">
                <Info className="h-3 w-3 shrink-0" />
                Copy and share this password — the user can change it after
                first login.
              </p>
            </Field>

            <div className="border-border border-t" />

            {/* Role */}
            <div>
              <label className={labelCls}>Role</label>
              <div className="flex gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={cn(
                      'flex-1 rounded-xl border py-2.5 text-xs font-semibold transition-all duration-200',
                      role === r
                        ? ROLE_PILL[r] + ' shadow-sm'
                        : 'border-border bg-muted text-muted-foreground hover:bg-card hover:text-foreground',
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────────── */}
        <div className="border-border bg-surface/50 flex items-center justify-between border-t px-8 py-4">
          <p className="text-muted-foreground text-xs">
            Fields marked <span className="text-rose-400">*</span> are required.
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="border-border text-foreground hover:bg-muted rounded-xl border px-5"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              className="rounded-xl px-6 font-semibold"
              onClick={handleSubmit}
            >
              Create User
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
