'use client';

import { useState } from 'react';
import { X, UserRound, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button/Button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { cn } from '@/utils/cn';
import {
  type AdminUserRow,
  type UserRole,
  type UserStatus,
} from '@/constants/admin';

const ROLES: UserRole[] = ['Learner', 'Educator', 'Admin'];
const STATUSES: UserStatus[] = ['Active', 'Inactive', 'Achieved'];

const ROLE_STYLE: Record<UserRole, string> = {
  Learner: 'border-blue-200 bg-blue-50 text-blue-600',
  Educator: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  Admin: 'border-violet-200 bg-violet-50 text-violet-600',
};

const ROLE_AVATAR: Record<
  UserRole,
  { border: string; bg: string; text: string }
> = {
  Learner: { border: '#bfdbfe', bg: '#eff6ff', text: '#2563eb' },
  Educator: { border: '#a7f3d0', bg: '#ecfdf5', text: '#059669' },
  Admin: { border: '#ddd6fe', bg: '#f5f3ff', text: '#7c3aed' },
};

const STATUS_STYLE: Record<UserStatus, string> = {
  Active: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  Inactive: 'border-orange-200 bg-orange-50 text-orange-600',
  Suspended: 'border-rose-200 bg-rose-50 text-rose-600',
  Achieved: 'border-amber-200 bg-amber-50 text-amber-600',
};

const labelCls = 'mb-1.5 block text-xs font-semibold text-slate-500';
const inputCls =
  'h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/10';

export default function AddUserModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (user: AdminUserRow) => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('Learner');
  const [status, setStatus] = useState<UserStatus>('Active');
  const [joinDate, setJoinDate] = useState<Date | undefined>();
  const [joinOpen, setJoinOpen] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  function handleCreate() {
    const next: { name?: string; email?: string } = {};
    if (!name.trim()) next.name = 'Full name is required.';
    if (!email.trim()) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Enter a valid email.';
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    const today = joinDate
      ? joinDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });

    onCreate({
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      role,
      status,
      enrolled: 0,
      joined: today,
      lastActive: 'just now',
    });
  }

  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900">Add New User</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-5">
          {/* Avatar zone */}
          <div className="mb-6 flex flex-col items-center gap-2">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed transition-colors duration-200"
              style={{
                borderColor: ROLE_AVATAR[role].border,
                backgroundColor: ROLE_AVATAR[role].bg,
              }}
            >
              {initials ? (
                <span
                  className="text-xl font-bold transition-colors duration-200"
                  style={{ color: ROLE_AVATAR[role].text }}
                >
                  {initials}
                </span>
              ) : (
                <UserRound
                  className="h-7 w-7 transition-colors duration-200"
                  style={{ color: ROLE_AVATAR[role].border }}
                />
              )}
            </div>
            <p className="flex items-center gap-1.5 text-xs text-slate-400">
              {name || 'New user'}
              <span className="text-slate-300">·</span>
              <span
                className={cn(
                  'rounded-full border px-2 py-0.5 text-[11px] font-semibold transition-colors duration-200',
                  ROLE_STYLE[role],
                )}
              >
                {role}
              </span>
            </p>
          </div>

          <div className="space-y-4">
            {/* Name + Email */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Full Name</label>
                <input
                  type="text"
                  placeholder="Sarah Wilson"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((p) => ({ ...p, name: undefined }));
                  }}
                  className={cn(
                    inputCls,
                    errors.name &&
                      'border-rose-400 focus:border-rose-400 focus:ring-rose-100',
                  )}
                />
                {errors.name && (
                  <p className="mt-1 text-[11px] text-rose-500">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  className={cn(
                    inputCls,
                    errors.email &&
                      'border-rose-400 focus:border-rose-400 focus:ring-rose-100',
                  )}
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] text-rose-500">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Phone + Join date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Phone</label>
                <input
                  type="tel"
                  placeholder="+855 12 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Join Date</label>
                <Popover open={joinOpen} onOpenChange={setJoinOpen}>
                  <PopoverTrigger
                    render={
                      <button
                        type="button"
                        className={cn(
                          inputCls,
                          'flex items-center gap-2 text-left',
                          !joinDate && 'text-slate-400',
                        )}
                      >
                        <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        {joinDate
                          ? format(joinDate, 'MMM d, yyyy')
                          : 'Pick a date'}
                      </button>
                    }
                  />
                  <PopoverContent
                    className="w-auto overflow-hidden bg-white p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={joinDate}
                      defaultMonth={joinDate}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setJoinDate(date);
                        setJoinOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

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
                      'flex-1 rounded-lg border py-2 text-xs font-semibold transition-colors duration-200',
                      role === r
                        ? ROLE_STYLE[r]
                        : 'border-slate-200 text-slate-400 hover:bg-slate-50',
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className={labelCls}>Status</label>
              <div className="flex gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={cn(
                      'flex-1 rounded-lg border py-2 text-xs font-semibold transition-colors duration-200',
                      status === s
                        ? STATUS_STYLE[s]
                        : 'border-slate-200 text-slate-400 hover:bg-slate-50',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4">
          <Button
            variant="ghost"
            className="rounded-xl border border-slate-200 px-5 text-slate-600 hover:bg-slate-50"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            className="rounded-xl px-5"
            onClick={handleCreate}
          >
            Create User
          </Button>
        </div>
      </div>
    </div>
  );
}
