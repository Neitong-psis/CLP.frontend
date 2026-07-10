'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, BookOpen, GraduationCap, Zap } from 'lucide-react';
import { ROLE, ROLE_HOME } from '@/constants/roles';
import { isDemoModeActive, setDemoCookie } from '@/lib/demo/demo-mode';

const DEMO_ROLES = [
  {
    id: ROLE.ADMIN,
    label: 'Admin',
    icon: ShieldCheck,
    description: 'Manage platform & users',
  },
  {
    id: ROLE.EDUCATOR,
    label: 'Educator',
    icon: BookOpen,
    description: 'Build & manage courses',
  },
  {
    id: ROLE.LEARNER,
    label: 'Learner',
    icon: GraduationCap,
    description: 'Browse & enrol in courses',
  },
] as const;

function enterDemoAs(roleId: string, push: (href: string) => void): void {
  setDemoCookie();
  push(ROLE_HOME[roleId as keyof typeof ROLE_HOME] ?? '/');
}

export default function DemoRolePicker() {
  const router = useRouter();
  // Lazy initializer: runs only on the client; no useEffect needed.
  const [isDemo] = useState(() => isDemoModeActive());

  if (!isDemo) return null;

  return (
    <div className="mb-4 w-full rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 2xl:mb-5 2xl:rounded-3xl 2xl:px-6 2xl:py-5">
      <div className="mb-3 flex items-center gap-2 2xl:mb-4">
        <Zap className="text-brand-gold h-4 w-4 shrink-0 2xl:h-5 2xl:w-5" />
        <span className="text-brand-navy text-sm font-bold 2xl:text-base">
          Demo Mode — Enter as:
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 2xl:gap-3">
        {DEMO_ROLES.map(({ id, label, icon: Icon, description }) => (
          <button
            key={id}
            type="button"
            onClick={() => enterDemoAs(id, router.push)}
            className="group border-brand-gold/20 hover:border-brand-gold hover:bg-brand-gold flex flex-col items-center gap-1.5 rounded-xl border bg-white px-2 py-3 text-center transition-all duration-150 2xl:rounded-2xl 2xl:px-3 2xl:py-4"
          >
            <Icon className="text-brand-gold h-5 w-5 transition-colors group-hover:text-white 2xl:h-6 2xl:w-6" />
            <span className="text-brand-navy text-xs font-bold transition-colors group-hover:text-white 2xl:text-sm">
              {label}
            </span>
            <span className="text-brand-navy/50 text-[10px] leading-tight transition-colors group-hover:text-white/75 2xl:text-xs">
              {description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
