'use client';

import { ChevronDown } from 'lucide-react';
import { useEducatorSettingsT } from '@/i18n';
import { EDUCATOR_USER } from '@/constants/educator';
import type { ProfileForm } from '../_lib/useProfileForm';

const inputCls =
  'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10';
const labelCls = 'mb-1.5 block text-sm font-medium text-foreground/80';
const sectionLabelCls =
  'sm:col-span-2 border-b border-border/50 pb-2 pt-1 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase';

export function ProfileFields({
  form,
  onChange,
}: {
  form: ProfileForm;
  onChange: (key: keyof ProfileForm, value: string) => void;
}) {
  const t = useEducatorSettingsT();

  return (
    <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
      {/* ── Identity ── */}
      <div className={sectionLabelCls}>{t('identity')}</div>
      <div>
        <label className={labelCls}>{t('fullName')}</label>
        <input
          value={form.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>{t('username')}</label>
        <input
          value={form.username}
          onChange={(e) => onChange('username', e.target.value)}
          className={inputCls}
        />
      </div>

      {/* ── Contact Info ── */}
      <div className={sectionLabelCls}>{t('contactInfo')}</div>
      <div>
        <label className={labelCls}>{t('email')}</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => onChange('email', e.target.value)}
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>{t('phone')}</label>
        <input
          value={form.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          className={inputCls}
        />
      </div>

      {/* ── Personal Details ── */}
      <div className={sectionLabelCls}>{t('personalDetails')}</div>
      <div>
        <label className={labelCls}>{t('gender')}</label>
        <div className="relative">
          <select
            value={form.gender}
            onChange={(e) => onChange('gender', e.target.value)}
            className={`${inputCls} cursor-pointer appearance-none pr-9`}
          >
            <option value="">{t('selectGender')}</option>
            <option>{t('female')}</option>
            <option>{t('male')}</option>
            <option>{t('preferNotToSay')}</option>
          </select>
          <ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
        </div>
      </div>
      <div>
        <label className={labelCls}>{t('dob')}</label>
        <input
          type="date"
          value={form.dob}
          onChange={(e) => onChange('dob', e.target.value)}
          className={`${inputCls} cursor-pointer`}
        />
      </div>
      <div>
        <label className={labelCls}>{t('nationality')}</label>
        <input
          value={form.nationality}
          onChange={(e) => onChange('nationality', e.target.value)}
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>{t('userRole')}</label>
        <input
          value={EDUCATOR_USER.role}
          readOnly
          aria-readonly
          className={`${inputCls} bg-muted text-muted-foreground cursor-not-allowed`}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls}>{t('address')}</label>
        <input
          value={form.address}
          onChange={(e) => onChange('address', e.target.value)}
          className={inputCls}
        />
      </div>

      {/* ── About Me ── */}
      <div className={sectionLabelCls}>{t('aboutMe')}</div>
      <div className="sm:col-span-2">
        <label className={labelCls}>{t('bio')}</label>
        <textarea
          rows={4}
          value={form.bio}
          onChange={(e) => onChange('bio', e.target.value)}
          placeholder={t('bioPlaceholder')}
          className={`${inputCls} resize-none`}
        />
      </div>
    </div>
  );
}
