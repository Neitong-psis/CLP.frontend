'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/TextArea';
import { ComboField } from '@/components/ui/ComboField';
import { ADMIN_USER } from '@/constants/admin';
import { AvatarCard } from './AvatarCard';
import { SettingsField } from './SettingsField';
import { SettingsSection } from './SettingsSection';

export function PersonalInfoSection() {
  const [name, setName] = useState(ADMIN_USER.name);
  const [username, setUsername] = useState('admin');
  const [email, setEmail] = useState(ADMIN_USER.email);
  const [phone, setPhone] = useState('+855 12 345 678');
  const [nationality, setNationality] = useState('Khmer');
  const [address, setAddress] = useState('Phnom Penh, Cambodia');
  const [bio, setBio] = useState('');

  return (
    <SettingsSection
      title="Personal Information"
      subtitle="Manage the profile details used across your CLP workspace."
    >
      <AvatarCard name={name} email={email} />

      <div className="grid grid-cols-2 gap-x-5 gap-y-4">
        <SettingsField label="Full Name">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Sarah Wilson"
            className="h-9"
          />
        </SettingsField>

        <SettingsField label="Username">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            className="h-9"
          />
        </SettingsField>

        <SettingsField label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@gmail.com"
            className="h-9"
          />
        </SettingsField>

        <SettingsField label="Phone Number">
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+855 12 345 678"
            className="h-9"
          />
        </SettingsField>

        <ComboField label="Gender" items={['Male', 'Female', 'Other']} />

        <SettingsField label="Date of Birth">
          <Input type="date" className="h-9" />
        </SettingsField>

        <SettingsField label="Nationality">
          <Input
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            placeholder="Khmer"
            className="h-9"
          />
        </SettingsField>

        <ComboField
          label="User Role"
          items={['Admin', 'Educator', 'Learner']}
        />

        <SettingsField label="Address" className="col-span-2">
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Phnom Penh, Cambodia"
            className="h-9"
          />
        </SettingsField>

        <SettingsField label="Bio / About Me" className="col-span-2">
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Add a short profile note..."
            className="min-h-20 resize-none"
          />
        </SettingsField>
      </div>
    </SettingsSection>
  );
}
