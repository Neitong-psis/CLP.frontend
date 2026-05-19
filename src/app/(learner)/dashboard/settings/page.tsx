import { Bell, Moon, User, Lock, Globe, BellRing, Shield, LogOut, ChevronRight } from "lucide-react";
import { MOCK_USER } from "@/config/learner";

const SECTIONS = [
  {
    title: "Account",
    icon: User,
    items: [
      { label: "Full Name",         value: MOCK_USER.name,  type: "text"  },
      { label: "Email Address",     value: MOCK_USER.email, type: "email" },
      { label: "Role",              value: MOCK_USER.role,  type: "text", readonly: true  },
    ],
  },
] as const;

export default function SettingsPage() {
  return (
    <div className="min-h-full">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3.5 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-lg font-bold text-[#00003e] sm:text-xl">Settings</h1>
          <p className="text-xs text-slate-400">Manage your account, preferences, and security</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100">
            <Moon className="h-4 w-4" />
          </button>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#f4a300]" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-5">

          {/* Profile */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-4">
              <User className="h-4 w-4 text-[#f4a300]" />
              <h2 className="font-bold text-[#00003e]">Profile</h2>
            </div>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f4a300] text-xl font-black text-[#00003e]">
                {MOCK_USER.initials}
              </div>
              <div>
                <p className="font-semibold text-[#00003e]">{MOCK_USER.name}</p>
                <p className="text-sm text-slate-400">{MOCK_USER.email}</p>
                <button className="mt-1.5 text-xs font-semibold text-[#f4a300] hover:underline">Change avatar</button>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Full Name",  value: MOCK_USER.name  },
                { label: "Email",      value: MOCK_USER.email },
                { label: "Role",       value: MOCK_USER.role, readonly: true },
              ].map(({ label, value, readonly }) => (
                <div key={label}>
                  <label className="mb-1 block text-xs font-semibold text-slate-500">{label}</label>
                  <input
                    type="text"
                    defaultValue={value}
                    readOnly={readonly}
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm text-[#00003e] outline-none transition focus:border-[#f4a300] focus:ring-2 focus:ring-[#f4a300]/20 ${
                      readonly ? "border-slate-100 bg-slate-50 text-slate-400" : "border-slate-200 bg-white"
                    }`}
                  />
                </div>
              ))}
            </div>
            <button className="mt-4 rounded-lg bg-[#f4a300] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#e09400]">
              Save Changes
            </button>
          </section>

          {/* Notifications */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-4">
              <BellRing className="h-4 w-4 text-[#f4a300]" />
              <h2 className="font-bold text-[#00003e]">Notifications</h2>
            </div>
            <ul className="space-y-4">
              {[
                { label: "Email notifications",   sub: "Receive updates and reminders by email",    defaultOn: true  },
                { label: "Quiz reminders",         sub: "Get reminded before quiz deadlines",        defaultOn: true  },
                { label: "Weekly digest",          sub: "Weekly summary of your learning activity",  defaultOn: false },
                { label: "New course alerts",      sub: "Notify when new courses are available",     defaultOn: false },
              ].map(({ label, sub, defaultOn }) => (
                <li key={label} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#00003e]">{label}</p>
                    <p className="text-xs text-slate-400">{sub}</p>
                  </div>
                  <button
                    className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors ${
                      defaultOn ? "bg-[#f4a300]" : "bg-slate-200"
                    }`}
                    aria-label={label}
                  >
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                      defaultOn ? "left-4" : "left-0.5"
                    }`} />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Security */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Shield className="h-4 w-4 text-[#f4a300]" />
              <h2 className="font-bold text-[#00003e]">Security</h2>
            </div>
            <ul className="divide-y divide-slate-100">
              {[
                { label: "Change Password",         sub: "Update your account password"         },
                { label: "Two-Factor Authentication", sub: "Add an extra layer of security"     },
                { label: "Active Sessions",           sub: "View and manage active login sessions" },
              ].map(({ label, sub }) => (
                <li key={label}>
                  <button className="flex w-full items-center justify-between gap-3 py-3 text-left transition hover:opacity-70">
                    <div>
                      <p className="text-sm font-semibold text-[#00003e]">{label}</p>
                      <p className="text-xs text-slate-400">{sub}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Danger zone */}
          <section className="rounded-xl border border-red-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 border-b border-red-50 pb-4">
              <LogOut className="h-4 w-4 text-red-500" />
              <h2 className="font-bold text-red-600">Danger Zone</h2>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#00003e]">Sign out</p>
                <p className="text-xs text-slate-400">Sign out from your current session</p>
              </div>
              <a href="/auth/login" className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100">
                Sign Out
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
