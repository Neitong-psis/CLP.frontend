'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNavT, useEducatorT, useAdminT } from '@/i18n';
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Award,
  Users,
  BarChart3,
  DollarSign,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Logo from '@/components/common/Logo';
import ProfileMenu from '@/components/common/sidebar/ProfileMenu';
import { MOCK_USER } from '@/constants/learner';
import { ADMIN_USER } from '@/constants/admin';
import { EDUCATOR_USER } from '@/constants/educator';
import { Button } from '@/components/ui/button';

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
  settingsHref?: string;
  profileHref?: string;
  learnMoreHref?: string;
  logoutHref?: string;
}

export default function Sidebar({ role }: { role: SidebarRole }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const tNav = useNavT();
  const tEducator = useEducatorT();
  const tAdmin = useAdminT();

  const ROLE_CONFIG: Record<SidebarRole, RoleConfig> = {
    learner: {
      navItems: [
        { href: '/dashboard', icon: LayoutDashboard, label: tNav('overview') },
        {
          href: '/my-learning',
          icon: BookOpen,
          label: tNav('myLearning'),
          badge: 3,
        },
        { href: '/certificates', icon: Award, label: tNav('certificates') },
        { href: '/explore', icon: Compass, label: tNav('exploreCourses') },
      ],
      rootHref: '/dashboard',
      roleChip: { label: MOCK_USER.role },
      user: {
        name: MOCK_USER.name,
        email: MOCK_USER.email,
        initials: MOCK_USER.initials,
        level: MOCK_USER.level,
      },
      settingsHref: '/settings',
      profileHref: '/settings',
    },
    educator: {
      navItems: [
        { href: '/educator', icon: LayoutDashboard, label: tNav('dashboard') },
        {
          href: '/educator/courses',
          icon: BookOpen,
          label: tEducator('myCourses'),
          badge: 2,
        },
        {
          href: '/educator/students',
          icon: Users,
          label: tEducator('students'),
        },
        {
          href: '/educator/analytics',
          icon: BarChart3,
          label: tEducator('analytics'),
        },
      ],
      rootHref: '/educator',
      roleChip: { label: EDUCATOR_USER.role, icon: GraduationCap },
      user: EDUCATOR_USER,
      learnMoreHref: '/educator/learn-more',
    },
    admin: {
      navItems: [
        { href: '/admin', icon: LayoutDashboard, label: tAdmin('overview') },
        {
          href: '/admin/courses',
          icon: BookOpen,
          label: tAdmin('courses'),
          badge: 3,
        },
        { href: '/admin/users', icon: Users, label: tAdmin('users') },
        {
          href: '/admin/certifications',
          icon: Award,
          label: tAdmin('certifications'),
        },
        { href: '/admin/revenue', icon: DollarSign, label: tAdmin('revenue') },
      ],
      rootHref: '/admin',
      roleChip: { label: ADMIN_USER.role, icon: ShieldCheck },
      user: ADMIN_USER,
      learnMoreHref: '/admin/learn-more',
      logoutHref: '/admin/login',
    },
  };

  const {
    navItems,
    rootHref,
    roleChip,
    user,
    learnMoreHref,
    logoutHref,
    settingsHref: settingsHrefOverride,
    profileHref: profileHrefOverride,
  } = ROLE_CONFIG[role];
  const settingsHref = settingsHrefOverride ?? `${rootHref}/settings`;
  const profileHref = profileHrefOverride ?? `${rootHref}/profile`;

  return (
    <aside
      className={cn(
        'bg-brand-navy flex flex-col overflow-hidden transition-[width] duration-300 ease-in-out dark:bg-[#071225]',
        collapsed ? 'w-18' : 'w-64',
      )}
    >
      {/* Header — crossfade between expanded and collapsed layouts */}
      <div className="group/header relative flex h-16 shrink-0 items-center border-b border-white/[0.07]">
        {/* Expanded: full logo + collapse button (button fades in on header hover) */}
        <div
          className={cn(
            'absolute inset-x-0 flex items-center justify-between px-4 transition-opacity duration-200',
            collapsed ? 'pointer-events-none opacity-0' : 'opacity-100',
          )}
        >
          <Logo variant="light" size="md" showText />
          <Button
            onClick={() => setCollapsed(true)}
            aria-label="Collapse sidebar"
            variant="ghost"
            size="icon-xs"
            className="shrink-0 text-white/30 opacity-0 transition-all group-hover/header:opacity-100 hover:bg-white/12 hover:text-white/70"
          >
            <PanelLeftClose className="size-4" />
          </Button>
        </div>

        {/* Collapsed: logo crossfades to expand icon on hover */}
        <div
          className={cn(
            'absolute inset-x-0 flex items-center justify-center transition-opacity duration-200',
            collapsed ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <Button
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
            variant="ghost"
            size="icon"
            className="group relative size-10 rounded-lg hover:bg-white/[0.07]"
          >
            <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-0">
              <Logo variant="dark" size="md" />
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-white/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <PanelLeftOpen className="size-4" />
            </span>
          </Button>
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
                  'h-4.5 w-4.5 shrink-0',
                  active
                    ? 'text-brand-navy'
                    : 'text-white/60 group-hover:text-white',
                )}
              />

              <span
                className={cn(
                  'flex-1 overflow-hidden whitespace-nowrap transition-[opacity,max-width] duration-300',
                  collapsed ? 'max-w-0 opacity-0' : 'max-w-50 opacity-100',
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
                      : 'h-5 max-w-8 min-w-5 px-1.5 opacity-100',
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
                      : 'size-4 max-w-4 shrink-0 opacity-100',
                  )}
                />
              )}

              {collapsed && badge != null && (
                <span className="bg-brand-gold absolute top-1 right-1.5 size-2 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-white/[0.07] p-1">
        <ProfileMenu
          user={user}
          roleLabel={roleChip.label}
          settingsHref={settingsHref}
          profileHref={profileHref}
          learnMoreHref={learnMoreHref}
          logoutHref={logoutHref}
          collapsed={collapsed}
        />
      </div>
    </aside>
  );
}
