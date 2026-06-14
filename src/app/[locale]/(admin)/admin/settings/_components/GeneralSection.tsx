'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ComboField } from '@/components/ui/ComboField';
import { Button } from '@/components/ui/button/Button';
import { SettingsField } from './SettingsField';
import { SettingsSection } from './SettingsSection';

const INFO_CARDS = [
  {
    title: 'Security',
    desc: 'Admin sessions, profile updates, and sensitive actions use confirmation prompts.',
  },
  {
    title: 'Notifications',
    desc: 'Course approvals, certificates, enrollment changes, and system alerts stay synced in the header.',
  },
  {
    title: 'Learn More',
    desc: 'CLP workspace guidance, support contact, and operating details are kept in Settings for review.',
  },
];

export function GeneralSection() {
  const [platformName, setPlatformName] = useState(
    'CLP - Content Learning Platform',
  );
  const [supportEmail, setSupportEmail] = useState('support@clp.io');

  return (
    <SettingsSection title="General">
      <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4">
        <SettingsField label="Platform Name">
          <Input
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            className="h-9"
          />
        </SettingsField>

        <SettingsField label="Support Email">
          <Input
            type="email"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            className="h-9"
          />
        </SettingsField>

        <ComboField
          label="Default Language"
          items={['English', 'Khmer', 'French', 'Chinese']}
        />
        <ComboField
          label="Time Zone"
          items={[
            'Asia/Phnom_Penh (UTC+7)',
            'UTC',
            'America/New_York',
            'Europe/London',
          ]}
        />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4">
        {INFO_CARDS.map(({ title, desc }) => (
          <div
            key={title}
            className="border-border bg-surface rounded-lg border p-4"
          >
            <p className="text-foreground text-sm font-semibold">{title}</p>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              {desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button
          variant="secondary"
          className="rounded-lg px-5 py-2.5 text-sm font-bold text-white"
        >
          Save Settings
        </Button>
      </div>
    </SettingsSection>
  );
}
