'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Award,
  DollarSign,
  Compass,
  Settings,
  HelpCircle,
  LogOut,
  GraduationCap,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { ThemeSwitchToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { LogoutConfirmModal } from '@/components/common/LogoutConfirmModal';
import { useMobileSidebar } from '@/context/MobileSidebarContext';
import { useAuth } from '@/hooks/use-auth';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useNavT, useEducatorT, useAdminT } from '@/i18n';
import { MOCK_USER } from '@/constants/learner';
import { ADMIN_USER } from '@/constants/admin';
import { EDUCATOR_USER } from '@/constants/educator';
import type { SidebarRole } from '@/components/common/sidebar/Sidebar';

// ── Types ─────────────────────────────────────────────────────────────────────

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
}

interface MobileRoleConfig {
  navItems: NavItem[];
  rootHref: string;
  roleLabel: string;
  roleIcon: LucideIcon;
  user: { name: string; email: string; initials: string };
  learnMoreHref?: string;
  logoutHref: string;
  settingsHref?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function MobileSidebarDrawer({ role }: { role: SidebarRole }) {
  const { open, close } = useMobileSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const { logout, isLoggingOut } = useAuth();
  const currentUser = useCurrentUser();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const tNav = useNavT();
  const tEducator = useEducatorT();
  const tAdmin = useAdminT();

  const MOBILE_CONFIG: Record<SidebarRole, MobileRoleConfig> = {
    learner: {
      navItems: [
        { href: '/dashboard', icon: LayoutDashboard, label: tNav('overview') },
        {
          href: '/my-learning',
          icon: BookOpen,
          label: tNav('myLearning'),
        },
        { href: '/certificates', icon: Award, label: tNav('certificates') },
        { href: '/explore', icon: Compass, label: tNav('exploreCourses') },
      ],
      rootHref: '/dashboard',
      roleLabel: MOCK_USER.role,
      roleIcon: BookOpen,
      user: {
        name: currentUser.fullName,
        email: currentUser.email,
        initials: currentUser.initials,
      },
      logoutHref: '/auth?tab=login&role=learner',
      settingsHref: '/settings',
      learnMoreHref: '/learn-more',
    },
    educator: {
      navItems: [
        { href: '/educator', icon: LayoutDashboard, label: tNav('dashboard') },
        {
          href: '/educator/courses',
          icon: BookOpen,
          label: tEducator('myCourses'),
        },
        {
          href: '/educator/students',
          icon: Users,
          label: tEducator('learners'),
        },
        {
          href: '/educator/earnings',
          icon: BarChart3,
          label: tEducator('earnings'),
        },
      ],
      rootHref: '/educator',
      roleLabel: EDUCATOR_USER.role,
      roleIcon: GraduationCap,
      user: {
        name: currentUser.fullName,
        email: currentUser.email,
        initials: currentUser.initials,
      },
      learnMoreHref: '/educator/learn-more',
      logoutHref: '/auth?tab=login&role=educator',
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
      roleLabel: ADMIN_USER.role,
      roleIcon: ShieldCheck,
      user: {
        name: currentUser.fullName,
        email: currentUser.email,
        initials: currentUser.initials,
      },
      learnMoreHref: '/admin/learn-more',
      logoutHref: '/admin/login',
    },
  };

  const {
    navItems,
    rootHref,
    roleLabel,
    roleIcon: RoleIcon,
    user,
    learnMoreHref,
    logoutHref,
    settingsHref: settingsHrefOverride,
  } = MOBILE_CONFIG[role];

  const settingsHref = settingsHrefOverride ?? `${rootHref}/settings`;

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, close]);

  async function handleLogout() {
    try {
      await logout();
    } finally {
      close();
      router.replace(logoutHref);
    }
  }

  return (
    <>
      {/* Transparent backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        onClick={close}
        aria-hidden
      />

      {/* Dropdown card — brand navy in both modes (matches the desktop
          sidebar's own always-navy background), so this stays visibly "ours"
          instead of a generic white popover in light mode. */}
      <div
        className={cn(
          'bg-brand-navy fixed top-14 right-3 z-50 w-76 origin-top-right overflow-hidden rounded-2xl shadow-2xl ring-1 shadow-black/20 ring-white/10 transition-all duration-200 sm:top-16 sm:right-5 lg:hidden dark:bg-[#071225] dark:shadow-none',
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-2 scale-95 opacity-0',
        )}
        aria-hidden={!open}
      >
        {/* ── Profile header ── */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3.5">
          <div className="bg-brand-gold ring-brand-gold/20 flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ring-2">
            {user.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {user.name}
            </p>
            <p className="truncate text-[12px] text-white/45">{user.email}</p>
          </div>
          <span className="border-brand-gold/25 bg-brand-gold/10 text-brand-gold inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold">
            <RoleIcon className="h-2.5 w-2.5" />
            {roleLabel}
          </span>
        </div>

        {/* ── Nav items ── */}
        <nav className="px-2 pb-2">
          <p className="px-3 pt-1 pb-1.5 text-[10px] font-semibold tracking-wider text-white/30 uppercase">
            {tNav('menu')}
          </p>
          <div className="flex flex-col gap-0.5">
            {(() => {
              const bestMatchHref = navItems
                .filter(({ href }) =>
                  href === rootHref
                    ? pathname === href
                    : pathname === href || pathname.startsWith(href + '/'),
                )
                .sort((a, b) => b.href.length - a.href.length)[0]?.href;

              return navItems.map(({ href, icon: Icon, label, badge }) => {
                const active = href === bestMatchHref;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={close}
                    className={cn(
                      'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150',
                      active
                        ? 'bg-brand-gold text-brand-navy font-semibold'
                        : 'font-medium text-white/55 hover:bg-white/4 hover:text-white/90',
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-4.5 w-4.5 shrink-0',
                        active
                          ? 'text-brand-navy'
                          : 'text-white/40 group-hover:text-white/70',
                      )}
                    />
                    <span className="flex-1">{label}</span>
                    {badge != null && (
                      <span
                        className={cn(
                          'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold',
                          active
                            ? 'bg-brand-navy/15 text-brand-navy'
                            : 'bg-white/10 text-white/70',
                        )}
                      >
                        {badge}
                      </span>
                    )}
                  </Link>
                );
              });
            })()}
          </div>
        </nav>

        {/* ── Preferences + secondary actions — unified, no dividers between them ── */}
        <div className="border-t border-white/[0.07] px-2 py-2">
          {/* Theme */}
          <div className="flex items-center justify-between rounded-lg px-3 py-2">
            <span className="text-sm font-medium text-white/55">
              {tNav('theme')}
            </span>
            <ThemeSwitchToggle />
          </div>
          {/* Language */}
          <div className="flex items-center justify-between rounded-lg px-3 py-2">
            <span className="text-sm font-medium text-white/55">
              {tNav('language')}
            </span>
            <LanguageSwitcher scrolled={false} />
          </div>
          {/* Settings */}
          <Link
            href={settingsHref}
            onClick={close}
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/55 transition-colors hover:bg-white/4 hover:text-white/90"
          >
            <Settings className="h-4.5 w-4.5 shrink-0 text-white/40 group-hover:text-white/70" />
            {tNav('settings')}
          </Link>
          {/* Help */}
          <Link
            href={learnMoreHref ?? '#'}
            onClick={close}
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/55 transition-colors hover:bg-white/4 hover:text-white/90"
          >
            <HelpCircle className="h-4.5 w-4.5 shrink-0 text-white/40 group-hover:text-white/70" />
            {tNav('help')}
          </Link>
        </div>

        {/* ── Log out ── */}
        <div className="border-t border-white/[0.07] p-2">
          <button
            type="button"
            onClick={() => {
              close();
              setShowLogoutConfirm(true);
            }}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-400/90 transition-colors hover:bg-rose-500/10 hover:text-rose-400 disabled:opacity-50"
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" />
            {isLoggingOut ? tNav('signingOut') : tNav('logout')}
          </button>
        </div>
      </div>

      {showLogoutConfirm && (
        <LogoutConfirmModal
          isLoggingOut={isLoggingOut}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={() => {
            setShowLogoutConfirm(false);
            void handleLogout();
          }}
        />
      )}
    </>
  );
}
