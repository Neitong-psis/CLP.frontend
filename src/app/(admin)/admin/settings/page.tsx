'use client';

import { useState } from 'react';
import { Sparkles, Moon, Upload, Camera, ShieldCheck } from 'lucide-react';
import { ADMIN_USER } from '@/constants/admin';
import AdminTopBar from '@/components/pages/admin/AdminTopBar';

const inputCls =
  'w-full rounded-lg border border-white/[0.12] bg-white/[0.05] px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-brand-gold/60 focus:ring-1 focus:ring-brand-gold/20';

export default function AdminSettingsPage() {
  const [name, setName] = useState(ADMIN_USER.name);
  const [email, setEmail] = useState(ADMIN_USER.email);
  const [siteName, setSiteName] = useState('Content Learning Platform');
  const [maxUsers, setMaxUsers] = useState('2000');

  return (
    <div className="flex min-h-full flex-col">
      <AdminTopBar
        title="Settings"
        subtitle={`Platform configuration · ${ADMIN_USER.email}`}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-xl font-bold text-white">Settings</h2>

        <div className="flex flex-col gap-4">
          {/* Appearance */}
          <section className="rounded-lg border border-white/[0.07] bg-white/[0.04] p-6">
            <div className="mb-1 flex items-center gap-2.5">
              <Sparkles className="text-brand-gold h-5 w-5" />
              <h3 className="text-base font-bold text-white">Appearance</h3>
            </div>
            <p className="mb-5 text-sm text-white/50">
              Choose how the admin workspace is displayed.
            </p>
            <div className="flex items-center gap-2.5 text-white/60">
              <Moon className="h-4 w-4" />
              <span className="text-sm font-medium">Dark mode</span>
            </div>
          </section>

          {/* Admin profile */}
          <section className="rounded-lg border border-white/[0.07] bg-white/[0.04] p-6">
            <h3 className="mb-1 text-base font-bold text-white">
              Admin Profile
            </h3>
            <p className="mb-6 text-sm text-white/50">
              Update your administrator account information.
            </p>

            <div className="mb-6 flex flex-wrap items-center gap-4">
              <div className="bg-brand-navy flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white">
                {ADMIN_USER.initials}
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="flex items-center gap-2 rounded-lg border border-white/20 px-3.5 py-2 text-sm text-white/70 transition-colors hover:bg-white/[0.07] hover:text-white">
                  <Upload className="h-4 w-4" />
                  Upload picture
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-white/20 px-3.5 py-2 text-sm text-white/70 transition-colors hover:bg-white/[0.07] hover:text-white">
                  <Camera className="h-4 w-4" />
                  Use camera
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/60">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/60">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>
          </section>

          {/* Platform config */}
          <section className="rounded-lg border border-white/[0.07] bg-white/[0.04] p-6">
            <div className="mb-1 flex items-center gap-2.5">
              <ShieldCheck className="text-brand-gold h-5 w-5" />
              <h3 className="text-base font-bold text-white">
                Platform Configuration
              </h3>
            </div>
            <p className="mb-5 text-sm text-white/50">
              Global platform settings visible to all users.
            </p>

            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/60">
                  Platform Name
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/60">
                  Max Users
                </label>
                <input
                  type="number"
                  value={maxUsers}
                  onChange={(e) => setMaxUsers(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            <button className="bg-brand-gold hover:bg-brand-gold-dark rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-colors">
              Save Changes
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
