'use client';

import { useState } from 'react';
import { Upload, Camera, GraduationCap } from 'lucide-react';
import { EDUCATOR_USER } from '@/constants/educator';
import EducatorTopBar from '@/components/common/TopBar';

const inputCls =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10';

const labelCls = 'mb-1.5 block text-sm font-medium text-slate-600';

export default function EducatorSettingsPage() {
  const [name, setName] = useState(EDUCATOR_USER.name);
  const [email, setEmail] = useState(EDUCATOR_USER.email);
  const [bio, setBio] = useState(
    'Web developer and educator with 10+ years of experience.',
  );
  const [website, setWebsite] = useState('https://angelayu.dev');

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <EducatorTopBar
        role="educator"
        title="Settings"
        subtitle={`Profile & preferences · ${EDUCATOR_USER.email}`}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          {/* Educator profile */}
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-5">
              <div className="bg-brand-gold/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <GraduationCap className="text-brand-gold h-4 w-4" />
              </div>
              <div>
                <h3 className="text-brand-navy text-base font-bold">
                  Educator Profile
                </h3>
                <p className="mt-0.5 text-sm text-slate-500">
                  Update your public educator profile information.
                </p>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-4">
              <div className="bg-brand-gold ring-brand-gold/20 flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white ring-4">
                {EDUCATOR_USER.initials}
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
                <label className={labelCls}>Full Name</label>
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
              <div className="sm:col-span-2">
                <label className={labelCls}>Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className={`${inputCls} resize-none`}
                />
              </div>
              <div>
                <label className={labelCls}>Website</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button className="bg-brand-navy hover:bg-brand-navy-tint rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-colors">
                Save Profile
              </button>
            </div>
          </section>

          {/* Teaching Preferences */}
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-5 border-b border-slate-100 pb-5">
              <h3 className="text-brand-navy text-base font-bold">
                Teaching Preferences
              </h3>
              <p className="mt-0.5 text-sm text-slate-500">
                Configure defaults for your courses and notifications.
              </p>
            </div>

            <div className="mb-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Default Course Language</label>
                <input
                  type="text"
                  defaultValue="English"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Payout Email</label>
                <input
                  type="email"
                  defaultValue={EDUCATOR_USER.email}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button className="bg-brand-gold hover:bg-brand-gold-dark rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-colors">
                Save Preferences
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
