'use client';

import { useRouter } from 'next/navigation';
import Logo from '@/components/common/Logo';
import { setDemoCookie } from '@/lib/demo/demo-mode';

const DEMO_USERS = [
  {
    initials: 'SW',
    name: 'Sarah Wilson',
    role: 'Platform Admin',
    description: 'Manage users, courses, analytics and platform settings.',
    color: 'bg-amber-500',
    home: '/admin',
  },
  {
    initials: 'AY',
    name: 'Dr. Angela Yu',
    role: 'Educator',
    description: 'Build and publish courses, track student progress.',
    color: 'bg-emerald-600',
    home: '/educator',
  },
  {
    initials: 'JD',
    name: 'John Doe',
    role: 'Learner',
    description: 'Browse courses, track learning progress and certificates.',
    color: 'bg-blue-600',
    home: '/dashboard',
  },
] as const;

function enterAs(home: string, push: (href: string) => void) {
  setDemoCookie();
  push(home);
}

export default function DemoPage() {
  const router = useRouter();

  return (
    <main className="bg-brand-navy flex min-h-screen flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="mb-10">
        <Logo variant="light" size="lg" className="w-52!" />
      </div>

      {/* Heading */}
      <div className="mb-10 text-center">
        <p className="text-brand-gold mb-2 text-xs font-bold tracking-[0.2em] uppercase">
          Demo Mode
        </p>
        <h1 className="text-3xl font-bold text-white">Choose a demo account</h1>
        <p className="mt-2 text-sm text-white/50">
          Select a role to explore the platform without signing in.
        </p>
      </div>

      {/* User cards */}
      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        {DEMO_USERS.map(
          ({ initials, name, role, description, color, home }) => (
            <button
              key={role}
              type="button"
              onClick={() => enterAs(home, router.push)}
              className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:shadow-xl"
            >
              {/* Avatar */}
              <div
                className={`${color} mb-4 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white shadow-lg`}
              >
                {initials}
              </div>

              <p className="text-base font-bold text-white">{name}</p>
              <p className="text-brand-gold mt-0.5 text-xs font-semibold">
                {role}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-white/45">
                {description}
              </p>

              <span className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/70 transition-colors group-hover:border-white/30 group-hover:text-white">
                Enter as {role.split(' ').at(-1)}
              </span>
            </button>
          ),
        )}
      </div>
    </main>
  );
}
