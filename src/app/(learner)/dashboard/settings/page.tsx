'use client';

import { useState } from 'react';
import { User, BookOpen, Bell, Shield, Upload, Camera } from 'lucide-react';
import { MOCK_USER } from '@/config/learner';
import TopBar from '@/components/pages/learner/TopBar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';

const inputCls =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10';

const labelCls = 'mb-1.5 block text-sm font-medium text-slate-600';

function SectionCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-5">
        <div className="bg-brand-gold/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
          <Icon className="text-brand-gold h-4 w-4" />
        </div>
        <div>
          <h3 className="text-brand-navy text-base font-bold">{title}</h3>
          <p className="mt-0.5 text-sm text-slate-500">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export default function SettingsPage() {
  const [name, setName] = useState(MOCK_USER.name);
  const [email, setEmail] = useState(MOCK_USER.email);
  const [dailyGoal, setDailyGoal] = useState(MOCK_USER.dailyGoal);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <TopBar
        title="Settings"
        subtitle={`Live workspace synced for ${MOCK_USER.email}`}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5">
          {/* ── Profile ── */}
          <SectionCard
            icon={User}
            title="Profile"
            description="Update your name, email, and profile picture."
          >
            {/* Avatar row */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <div className="bg-brand-gold ring-brand-gold/20 flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white ring-4">
                {MOCK_USER.initials}
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900">
                  <Upload className="h-4 w-4" />
                  Upload picture
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900">
                  <Camera className="h-4 w-4" />
                  Use camera
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button className="bg-brand-navy hover:bg-brand-navy-tint rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-colors">
                Save Profile
              </button>
            </div>
          </SectionCard>

          {/* ── Learning Preferences ── */}
          <SectionCard
            icon={BookOpen}
            title="Learning Preferences"
            description="Customize your daily learning goals and pace."
          >
            <div className="mb-5">
              <label className={labelCls}>Daily Learning Goal</label>
              <input
                type="text"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(e.target.value)}
                placeholder="e.g. 1h"
                className={inputCls}
              />
              <p className="mt-1.5 text-xs text-slate-400">
                Set a daily target to build a consistent learning habit.
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button className="bg-brand-gold hover:bg-brand-gold-dark rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-colors">
                Save Preferences
              </button>
            </div>
          </SectionCard>

          {/* ── Notifications ── */}
          <SectionCard
            icon={Bell}
            title="Notifications"
            description="Control which updates you receive."
          >
            <div className="flex flex-col divide-y divide-slate-100">
              {[
                {
                  label: 'Email notifications',
                  desc: 'Receive course updates and announcements via email.',
                  value: emailNotifs,
                  set: setEmailNotifs,
                },
                {
                  label: 'Deadline reminders',
                  desc: 'Get reminded 24 hours before a quiz or assignment is due.',
                  value: deadlineReminders,
                  set: setDeadlineReminders,
                },
              ].map(({ label, desc, value, set }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="text-brand-navy text-sm font-semibold">
                      {label}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">{desc}</p>
                  </div>
                  <button
                    role="switch"
                    aria-checked={value}
                    onClick={() => set((v) => !v)}
                    className={`focus-visible:ring-brand-gold relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      value ? 'bg-brand-gold' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        value ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ── Account ── */}
          <SectionCard
            icon={Shield}
            title="Account"
            description="Manage your password and account access."
          >
            <div className="flex flex-wrap gap-3">
              <button className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900">
                Change password
              </button>
              <button className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:border-red-300 hover:bg-red-50">
                Delete account
              </button>
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="mt-6">
        <FooterBottomBar theme="light" />
      </div>
    </div>
  );
}
