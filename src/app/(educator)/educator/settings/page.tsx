'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Upload, Camera, ChevronDown } from 'lucide-react';
import { EDUCATOR_USER } from '@/constants/educator';
import EducatorTopBar from '@/components/common/TopBar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';

const inputCls =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10';
const labelCls = 'mb-1.5 block text-sm font-medium text-slate-600';

interface ProfileForm {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  nationality: string;
  address: string;
  bio: string;
}

const INITIAL: ProfileForm = {
  fullName: EDUCATOR_USER.name,
  username: 'devid',
  email: EDUCATOR_USER.email,
  phone: '+855 12 345 678',
  gender: '',
  dob: '',
  nationality: 'Cambodian',
  address: 'Phnom Penh, Cambodia',
  bio: '',
};

export default function EducatorSettingsPage() {
  const { toast } = useToast();
  const [form, setForm] = useState<ProfileForm>(INITIAL);
  const [avatar, setAvatar] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const avatarUrl = useMemo(
    () => (avatar ? URL.createObjectURL(avatar) : null),
    [avatar],
  );
  useEffect(() => {
    if (!avatarUrl) return;
    return () => URL.revokeObjectURL(avatarUrl);
  }, [avatarUrl]);

  const dirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(INITIAL) || avatar !== null,
    [form, avatar],
  );

  const set = (key: keyof ProfileForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function handleSave() {
    toast('Your profile has been updated.', 'success');
  }

  function handleReset() {
    setForm(INITIAL);
    setAvatar(null);
  }

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <EducatorTopBar
        role="educator"
        title="Settings"
        subtitle="Live workspace synced from your account"
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-brand-navy text-base font-bold">
              Personal Information
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Manage the profile details used across your CLP workspace.
            </p>
          </div>

          {/* Profile header */}
          <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="ring-brand-gold/15 size-16 shrink-0 overflow-hidden rounded-full ring-4">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="bg-brand-gold flex h-full w-full items-center justify-center text-xl font-bold text-white">
                    {EDUCATOR_USER.initials}
                  </div>
                )}
              </div>
              <div>
                <p className="text-brand-navy text-base font-bold">
                  {form.fullName || 'Your name'}
                </p>
                <p className="text-sm text-slate-500">{form.email}</p>
                <span className="mt-1.5 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600">
                  {EDUCATOR_USER.role}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              >
                <Upload className="h-4 w-4" />
                Upload picture
              </button>
              <button
                type="button"
                onClick={() =>
                  toast('Camera capture is not available in preview.', 'error')
                }
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              >
                <Camera className="h-4 w-4" />
                Use camera
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>

          {/* Fields */}
          <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Full Name</label>
              <input
                value={form.fullName}
                onChange={(e) => set('fullName', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Username</label>
              <input
                value={form.username}
                onChange={(e) => set('username', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Phone Number</label>
              <input
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Gender</label>
              <div className="relative">
                <select
                  value={form.gender}
                  onChange={(e) => set('gender', e.target.value)}
                  className={`${inputCls} cursor-pointer appearance-none pr-9`}
                >
                  <option value="">Select gender</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Prefer not to say</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Date of Birth</label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => set('dob', e.target.value)}
                className={`${inputCls} cursor-pointer`}
              />
            </div>
            <div>
              <label className={labelCls}>Nationality</label>
              <input
                value={form.nationality}
                onChange={(e) => set('nationality', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>User Role</label>
              <input
                value={EDUCATOR_USER.role}
                readOnly
                aria-readonly
                className={`${inputCls} cursor-not-allowed bg-slate-50 text-slate-500`}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Address</label>
              <input
                value={form.address}
                onChange={(e) => set('address', e.target.value)}
                className={inputCls}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Bio / About Me</label>
              <textarea
                rows={4}
                value={form.bio}
                onChange={(e) => set('bio', e.target.value)}
                placeholder="Tell learners a little about your teaching background…"
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-5">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={!dirty}
              className="disabled:opacity-40"
            >
              Reset
            </Button>
            <Button onClick={handleSave} disabled={!dirty}>
              Save changes
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
