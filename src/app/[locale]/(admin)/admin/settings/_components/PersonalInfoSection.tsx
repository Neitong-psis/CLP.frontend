'use client';

import { useState } from 'react';
import { useAdminSettingsT } from '@/i18n';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/TextArea';
import { ComboField } from '@/components/ui/ComboField';
import { DatePicker } from '@/components/ui/DatePicker';
import { ADMIN_USER } from '@/constants/admin';
import { AvatarCard } from './AvatarCard';
import { SettingsField } from './SettingsField';
import { SettingsSection } from './SettingsSection';

export function PersonalInfoSection() {
  const t = useAdminSettingsT();
  const [name, setName] = useState(ADMIN_USER.name);
  const [username, setUsername] = useState('admin');
  const [email, setEmail] = useState(ADMIN_USER.email);
  const [phone, setPhone] = useState('+855 12 345 678');
  const [nationality, setNationality] = useState('Khmer');
  const [address, setAddress] = useState('Phnom Penh, Cambodia');
  const [bio, setBio] = useState('');
  const [dob, setDob] = useState('');

  return (
    <SettingsSection title={t('personalInfo')} subtitle={t('personalInfoDesc')}>
      <AvatarCard name={name} email={email} />

      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        <SettingsField label={t('fullName')}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Sarah Wilson"
            className="h-9"
          />
        </SettingsField>

        <SettingsField label={t('username')}>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            className="h-9"
          />
        </SettingsField>

        <SettingsField label={t('email')}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@gmail.com"
            className="h-9"
          />
        </SettingsField>

        <SettingsField label={t('phoneNumber')}>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+855 12 345 678"
            className="h-9"
          />
        </SettingsField>

        <ComboField label={t('gender')} items={['Male', 'Female', 'Other']} />

        <SettingsField label={t('dateOfBirth')}>
          <DatePicker
            value={dob}
            onChange={setDob}
            placeholder={t('selectDate')}
            clearLabel={t('pickerClear')}
            todayLabel={t('pickerToday')}
            className="h-9"
          />
        </SettingsField>

        <SettingsField label={t('nationality')}>
          <Input
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            placeholder="Khmer"
            className="h-9"
          />
        </SettingsField>

        <ComboField
          label={t('userRole')}
          items={['Admin', 'Educator', 'Learner']}
        />

        <SettingsField label={t('address')} className="sm:col-span-2">
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Phnom Penh, Cambodia"
            className="h-9"
          />
        </SettingsField>

        <SettingsField label={t('bioAboutMe')} className="sm:col-span-2">
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder={t('bioPlaceholder')}
            className="min-h-20 resize-none"
          />
        </SettingsField>
      </div>
    </SettingsSection>
  );
}
