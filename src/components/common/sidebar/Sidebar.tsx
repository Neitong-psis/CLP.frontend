'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Brain,
  TrendingUp,
  Award,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  PanelLeftClose,
  ShieldCheck,
  GraduationCap,
  BadgeCheck,
  Activity,
  DollarSign,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import Logo from '@/components/common/Logo';
import { MOCK_USER } from '@/constants/learner';
import { ADMIN_USER } from '@/constants/admin';
import { EDUCATOR_USER } from '@/constants/educator';

export type SidebarRole = 'learner' | 'educator' | 'admin';

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
}

interface RoleConfig {
  navItems: NavItem[];
  rootHref: string;
  roleChip: { label: string; icon?: React.ElementType };
  user: { name: string; email: string; initials: string; level?: number };
}

const ROLE_CONFIG: Record<SidebarRole, RoleConfig> = {
  learner: {
    navItems: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      {
        href: '/dashboard/my-learning',
        icon: BookOpen,
        label: 'My Learning',
        badge: 3,
      },
      { href: '/dashboard/explore', icon: Compass, label: 'Explore' },
      {
        href: '/dashboard/progress',
        icon: TrendingUp,
        label: 'Progress & Achievements',
      },
      { href: '/dashboard/quizzes', icon: Brain, label: 'Quizzes', badge: 2 },
      { href: '/dashboard/certificates', icon: Award, label: 'Certificates' },
      { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
    ],
    rootHref: '/dashboard',
    roleChip: { label: MOCK_USER.role },
    user: {
      name: MOCK_USER.name,
      email: MOCK_USER.email,
      initials: MOCK_USER.initials,
      level: MOCK_USER.level,
    },
  },
  educator: {
    navItems: [
      { href: '/educator', icon: LayoutDashboard, label: 'Dashboard' },
      {
        href: '/educator/courses',
        icon: BookOpen,
        label: 'My Courses',
        badge: 2,
      },
      { href: '/educator/students', icon: Users, label: 'Students' },
      { href: '/educator/analytics', icon: BarChart3, label: 'Analytics' },
      { href: '/educator/settings', icon: Settings, label: 'Settings' },
    ],
    rootHref: '/educator',
    roleChip: { label: EDUCATOR_USER.role, icon: GraduationCap },
    user: EDUCATOR_USER,
  },
  admin: {
    navItems: [
      { href: '/admin', icon: LayoutDashboard, label: 'Overview' },
      { href: '/admin/users', icon: Users, label: 'Users' },
      { href: '/admin/courses', icon: BookOpen, label: 'Courses', badge: 3 },
      { href: '/admin/certifications', icon: BadgeCheck, label: 'Certifications' },
      { href: '/admin/settings', icon: Settings, label: 'Settings' },
    ],
    rootHref: '/admin',
    roleChip: { label: 'Platform Admin', icon: ShieldCheck },
    user: ADMIN_USER,
  },
};

export default function Sidebar({ role }: { role: SidebarRole }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { navItems, rootHref, user } = ROLE_CONFIG[role];

  return (
    <aside
      className={cn(
        'bg-brand-navy flex flex-col overflow-hidden transition-[width] duration-300 ease-in-out',
        collapsed ? 'w-[72px]' : 'w-64',
      )}
    >
      {/* Header — crossfade between expanded and collapsed layouts */}
      <div className="relative flex h-16 shrink-0 items-center border-b border-white/[0.07]">
        <div
          className={cn(
            'absolute inset-x-0 flex items-center justify-between px-4 transition-opacity duration-200',
            collapsed ? 'pointer-events-none opacity-0' : 'opacity-100',
          )}
        >
          <Logo variant="light" size="xl" className="!w-[150px]" />
          <button
            onClick={() => setCollapsed(true)}
            aria-label="Collapse sidebar"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/[0.12] hover:text-white/70"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        </div>
        <div
          className={cn(
            'absolute inset-x-0 flex items-center justify-center transition-opacity duration-200',
            collapsed ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <button
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
            className="flex items-center justify-center"
          >
            <Logo variant="dark" size="lg" className="!w-10" />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-3">
        {navItems.map(({ href, icon: Icon, label, badge }) => {
          const active =
            pathname === href ||
            (href !== rootHref && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors',
                active
                  ? 'bg-brand-gold text-brand-navy'
                  : 'text-white/60 hover:bg-white/[0.07] hover:text-white',
              )}
            >
              <Icon
                className={cn(
                  'h-[18px] w-[18px] shrink-0',
                  active
                    ? 'text-brand-navy'
                    : 'text-white/60 group-hover:text-white',
                )}
              />

              <span
                className={cn(
                  'flex-1 overflow-hidden whitespace-nowrap transition-[opacity,max-width] duration-300',
                  collapsed ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100',
                )}
              >
                {label}
              </span>

              {badge != null && (
                <span
                  className={cn(
                    'flex items-center justify-center overflow-hidden rounded-full text-[10px] font-bold transition-[opacity,max-width] duration-300',
                    active
                      ? 'bg-brand-navy/20 text-brand-navy'
                      : 'bg-white/10 text-white/70',
                    collapsed
                      ? 'max-w-0 opacity-0'
                      : 'h-5 max-w-[32px] min-w-[20px] px-1.5 opacity-100',
                  )}
                >
                  {badge}
                </span>
              )}

              {active && (
                <ChevronRight
                  className={cn(
                    'text-brand-navy overflow-hidden transition-[opacity,max-width] duration-300',
                    collapsed
                      ? 'max-w-0 opacity-0'
                      : 'h-4 w-4 max-w-[16px] shrink-0 opacity-100',
                  )}
                />
              )}

              {collapsed && badge != null && (
                <span className="bg-brand-gold absolute top-1 right-1.5 h-2 w-2 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User profile — single layout, text fades with the width */}
      <div className="shrink-0 border-t border-white/[0.07] p-1">
        <div className="group/profile relative">
          <div
            className={cn(
              'pointer-events-none absolute right-0 bottom-full left-0 pb-2',
              'opacity-0 transition-opacity duration-150',
              'group-hover/profile:pointer-events-auto group-hover/profile:opacity-100',
            )}
          >
            <div className="bg-brand-navy rounded-lg border border-white/[0.07] p-1.5 shadow-xl">
              <a
                href="/auth"
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-white/50 transition-colors hover:bg-white/[0.07] hover:text-white/80"
              >
                <LogOut className="h-3.5 w-3.5 shrink-0" />
                Sign out
              </a>
            </div>
          </div>

          <div className="flex cursor-default items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/[0.07]">
            <div className="relative shrink-0">
              <div
                className={cn(
                  'bg-brand-gold flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white',
                  user.level != null && 'ring-brand-gold/30 ring-2',
                )}
              >
                {user.initials}
              </div>
              {/* {user.level != null && (
                <span className="text-brand-navy absolute -bottom-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-white px-1 text-[9px] font-black">
                  L{user.level}
                </span>
              )} */}
            </div>
            <div
              className={cn(
                'min-w-0 flex-1 overflow-hidden transition-[opacity,max-width] duration-300',
                collapsed ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100',
              )}
            >
              <p className="truncate text-sm font-semibold whitespace-nowrap text-white">
                {user.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
