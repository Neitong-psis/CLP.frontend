'use client';

import { useState } from 'react';
import { Upload, Camera, Activity } from 'lucide-react';
import { ADMIN_USER } from '@/constants/admin';
import TopBar from '@/components/common/TopBar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/TextArea';
import { Field, FieldLabel } from '@/components/ui/Field';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/button/Button';
import { ComboField } from '@/components/ui/ComboField';

const LABEL_CLS =
  'text-xs font-semibold tracking-wide text-slate-500 uppercase';

export default function AdminSettingsPage() {
  const [name, setName] = useState(ADMIN_USER.name);
  const [username, setUsername] = useState('admin');
  const [email, setEmail] = useState(ADMIN_USER.email);
  const [phone, setPhone] = useState('+855 12 345 678');
  const [nationality, setNationality] = useState('Khmer');
  const [address, setAddress] = useState('Phnom Penh, Cambodia');
  const [bio, setBio] = useState('');
  const [platformName, setPlatformName] = useState(
    'CLP - Content Learning Platform',
  );
  const [supportEmail, setSupportEmail] = useState('support@clp.io');

  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        role="admin"
        title="Platform Settings"
        subtitle={`Live workspace synced for ${ADMIN_USER.email}`}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {/* Personal Information */}
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-bold text-slate-900">
              Personal Information
            </h3>
            <p className="mt-0.5 mb-6 text-sm text-slate-500">
              Manage the profile details used across your CLP workspace.
            </p>

            {/* Avatar card */}
            <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="bg-brand-gold flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white">
                  {ADMIN_USER.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{name}</p>
                  <p className="text-xs text-slate-400">{email}</p>
                  <span className="mt-1 inline-block rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-500">
                    Admin
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50">
                  <Upload className="h-3.5 w-3.5" />
                  Upload picture
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50">
                  <Camera className="h-3.5 w-3.5" />
                  Use camera
                </button>
              </div>
            </div>

            {/* Form grid */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Full Name</Label>
                </FieldLabel>
                <Input
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  placeholder="Sarah Wilson"
                  className="h-9"
                />
              </Field>

              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Username</Label>
                </FieldLabel>
                <Input
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                  }
                  placeholder="admin"
                  className="h-9"
                />
              </Field>

              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Email</Label>
                </FieldLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  placeholder="admin@gmail.com"
                  className="h-9"
                />
              </Field>

              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Phone Number</Label>
                </FieldLabel>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPhone(e.target.value)
                  }
                  placeholder="+855 12 345 678"
                  className="h-9"
                />
              </Field>

              <ComboField label="Gender" items={['Male', 'Female', 'Other']} />

              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Date of Birth</Label>
                </FieldLabel>
                <Input type="date" className="h-9" />
              </Field>

              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Nationality</Label>
                </FieldLabel>
                <Input
                  value={nationality}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNationality(e.target.value)
                  }
                  placeholder="Khmer"
                  className="h-9"
                />
              </Field>

              <ComboField
                label="User Role"
                items={['Admin', 'Educator', 'Learner']}
              />

              <Field className="col-span-2">
                <FieldLabel>
                  <Label className={LABEL_CLS}>Address</Label>
                </FieldLabel>
                <Input
                  value={address}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAddress(e.target.value)
                  }
                  placeholder="Phnom Penh, Cambodia"
                  className="h-9"
                />
              </Field>

              <Field className="col-span-2">
                <FieldLabel>
                  <Label className={LABEL_CLS}>Bio / About Me</Label>
                </FieldLabel>
                <Textarea
                  value={bio}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setBio(e.target.value)
                  }
                  placeholder="Add a short profile note..."
                  className="min-h-20 resize-none"
                />
              </Field>
            </div>
          </section>

          {/* General */}
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-bold text-slate-900">General</h3>

            <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4">
              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Platform Name</Label>
                </FieldLabel>
                <Input
                  value={platformName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPlatformName(e.target.value)
                  }
                  className="h-9"
                />
              </Field>

              <Field>
                <FieldLabel>
                  <Label className={LABEL_CLS}>Support Email</Label>
                </FieldLabel>
                <Input
                  type="email"
                  value={supportEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSupportEmail(e.target.value)
                  }
                  className="h-9"
                />
              </Field>

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

            {/* Info cards */}
            <div className="mt-5 grid grid-cols-3 gap-4">
              {[
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
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-sm font-semibold text-slate-700">
                    {title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
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
          </section>

          {/* System Health */}
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-bold text-slate-900">
              System Health
            </h3>
            <p className="mt-0.5 mb-5 text-sm text-slate-500">
              Review operational status only when you need detailed diagnostics.
            </p>

            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-emerald-600">
                  Current status: Operational
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Server, API, storage, and database checks are available in the
                  health modal.
                </p>
              </div>
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                <Activity className="h-3.5 w-3.5 text-slate-400" />
                View System Health
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
