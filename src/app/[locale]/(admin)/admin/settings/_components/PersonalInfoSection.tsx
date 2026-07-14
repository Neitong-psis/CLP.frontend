'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAdminSettingsT } from '@/i18n';
import { DatePicker } from '@/components/ui/DatePicker';
import { useCurrentUser } from '@/hooks/use-current-user';
import { AvatarCard } from './AvatarCard';
import { SettingsSection } from './SettingsSection';

// Field styling (theme-token based, matches educator/learner settings).
const inputCls =
  'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10';
const labelCls = 'mb-1.5 block text-sm font-medium text-foreground/80';
const sectionLabelCls =
  'sm:col-span-2 border-b border-border/50 pb-2 pt-1 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase';

export function PersonalInfoSection() {
  const t = useAdminSettingsT();
  const currentUser = useCurrentUser();
  const [name, setName] = useState(currentUser.fullName);
  const [username, setUsername] = useState('admin');
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState('+855 12 345 678');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('Khmer');
  const [address, setAddress] = useState('Phnom Penh, Cambodia');
  const [bio, setBio] = useState('');
  const [dob, setDob] = useState('');
  // The authenticated profile only loads after the silent auth bootstrap
  // resolves, so re-seed once real data arrives — but stop the moment the
  // admin edits either field, so their in-progress typing isn't clobbered.
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (touched) return;
    const id = setTimeout(() => {
      setName(currentUser.fullName);
      setEmail(currentUser.email);
    }, 0);
    return () => clearTimeout(id);
  }, [currentUser, touched]);

  return (
    <SettingsSection title={t('personalInfo')} subtitle={t('personalInfoDesc')}>
      <AvatarCard name={name} email={email} />

      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        {/* Identity */}
        <div className={sectionLabelCls}>{t('identity')}</div>
        <div>
          <label className={labelCls}>{t('fullName')}</label>
          <input
            value={name}
            onChange={(e) => {
              setTouched(true);
              setName(e.target.value);
            }}
            placeholder={t('fullName')}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>{t('username')}</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            className={inputCls}
          />
        </div>

        {/* Contact Info */}
        <div className={sectionLabelCls}>{t('contactInfo')}</div>
        <div>
          <label className={labelCls}>{t('email')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setTouched(true);
              setEmail(e.target.value);
            }}
            placeholder="admin@gmail.com"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>{t('phoneNumber')}</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+855 12 345 678"
            className={inputCls}
          />
        </div>

        {/* Personal Details */}
        <div className={sectionLabelCls}>{t('personalDetails')}</div>
        <div>
          <label className={labelCls}>{t('gender')}</label>
          <div className="relative">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
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
          <label className={labelCls}>{t('dateOfBirth')}</label>
          <DatePicker
            value={dob}
            onChange={setDob}
            placeholder={t('selectDate')}
            clearLabel={t('pickerClear')}
            todayLabel={t('pickerToday')}
          />
        </div>
        <div>
          <label className={labelCls}>{t('nationality')}</label>
          <input
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            placeholder="Khmer"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>{t('userRole')}</label>
          <input
            value={t('adminLabel')}
            readOnly
            aria-readonly
            className={`${inputCls} bg-muted text-muted-foreground cursor-not-allowed`}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>{t('address')}</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Phnom Penh, Cambodia"
            className={inputCls}
          />
        </div>

        {/* About Me */}
        <div className={sectionLabelCls}>{t('aboutMe')}</div>
        <div className="sm:col-span-2">
          <label className={labelCls}>{t('bio')}</label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder={t('bioPlaceholder')}
            className={`${inputCls} resize-none`}
          />
        </div>
      </div>
    </SettingsSection>
  );
}
