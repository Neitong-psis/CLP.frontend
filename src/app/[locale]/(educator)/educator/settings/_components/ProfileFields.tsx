'use client';

import { ChevronDown } from 'lucide-react';
import { EDUCATOR_USER } from '@/constants/educator';
import type { ProfileForm } from '../_lib/useProfileForm';

const inputCls =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10';
const labelCls = 'mb-1.5 block text-sm font-medium text-slate-600';

export function ProfileFields({
  form,
  onChange,
}: {
  form: ProfileForm;
  onChange: (key: keyof ProfileForm, value: string) => void;
}) {
  return (
    <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
      <div>
        <label className={labelCls}>Full Name</label>
        <input
          value={form.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>Username</label>
        <input
          value={form.username}
          onChange={(e) => onChange('username', e.target.value)}
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => onChange('email', e.target.value)}
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>Phone Number</label>
        <input
          value={form.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>Gender</label>
        <div className="relative">
          <select
            value={form.gender}
            onChange={(e) => onChange('gender', e.target.value)}
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
          onChange={(e) => onChange('dob', e.target.value)}
          className={`${inputCls} cursor-pointer`}
        />
      </div>
      <div>
        <label className={labelCls}>Nationality</label>
        <input
          value={form.nationality}
          onChange={(e) => onChange('nationality', e.target.value)}
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
          onChange={(e) => onChange('address', e.target.value)}
          className={inputCls}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls}>Bio / About Me</label>
        <textarea
          rows={4}
          value={form.bio}
          onChange={(e) => onChange('bio', e.target.value)}
          placeholder="Tell learners a little about your teaching background…"
          className={`${inputCls} resize-none`}
        />
      </div>
    </div>
  );
}
