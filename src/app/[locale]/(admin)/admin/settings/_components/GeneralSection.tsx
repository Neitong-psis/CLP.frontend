'use client';

import { useState } from 'react';
import { useAdminSettingsT } from '@/i18n';
import { Input } from '@/components/ui/input';
import { ComboField } from '@/components/ui/ComboField';
import { Button } from '@/components/ui/button/Button';
import { SettingsField } from './SettingsField';
import { SettingsSection } from './SettingsSection';

export function GeneralSection() {
  const t = useAdminSettingsT();
  const [platformName, setPlatformName] = useState(
    'CLP - Content Learning Platform',
  );
  const [supportEmail, setSupportEmail] = useState('support@clp.io');

  const INFO_CARDS = [
    {
      title: t('infoSecurity'),
      desc: t('infoSecurityDesc'),
    },
    {
      title: t('infoNotifications'),
      desc: t('infoNotificationsDesc'),
    },
    {
      title: t('infoLearnMore'),
      desc: t('infoLearnMoreDesc'),
    },
  ];

  return (
    <SettingsSection title={t('general')}>
      <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        <SettingsField label={t('platformName')}>
          <Input
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            className="h-9"
          />
        </SettingsField>

        <SettingsField label={t('supportEmail')}>
          <Input
            type="email"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            className="h-9"
          />
        </SettingsField>

        <ComboField
          label={t('defaultLanguage')}
          items={['English', 'Khmer', 'French', 'Chinese']}
        />
        <ComboField
          label={t('timeZone')}
          items={[
            'Asia/Phnom_Penh (UTC+7)',
            'UTC',
            'America/New_York',
            'Europe/London',
          ]}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
          {t('saveSettings')}
        </Button>
      </div>
    </SettingsSection>
  );
}
