'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  LogIn,
  UserPlus,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  BookOpen,
  GraduationCap,
  Info,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import Logo from '@/components/common/Logo';
import { HeaderSearch } from '@/components/common/HeaderSearch';
import { NAV_LINKS, type NavLink } from '@/constants/navigation';
import { cn } from '@/utils/cn';

const NAV_ICONS: Record<string, LucideIcon> = {
  Courses: BookOpen,
  Programs: GraduationCap,
  About: Info,
};

function DesktopNavItem({ link }: { link: NavLink }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  if (!link.children?.length) {
    return (
      <Link
        href={link.href}
        className="text-brand-navy/65 after:bg-brand-gold hover:text-brand-navy focus-visible:ring-brand-gold relative rounded py-1 text-sm font-semibold transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:transition-[scale] after:duration-200 hover:after:scale-x-100 focus:outline-none focus-visible:ring-2"
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        closeTimer.current = setTimeout(() => setOpen(false), 180);
      }}
    >
      <Button
        variant="ghost"
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          'h-auto cursor-pointer gap-1 py-1 text-sm font-semibold hover:bg-transparent',
          'transition-colors duration-200',
          open ? 'text-brand-navy' : 'text-brand-navy/65 hover:text-brand-navy',
        )}
      >
        {link.label}
        <ChevronDown
          aria-hidden
          className={cn(
            'h-3.5 w-3.5 transition-[rotate] duration-200',
            open && 'rotate-180',
          )}
        />
      </Button>

      <div
        className={cn(
          'absolute top-full left-1/2 -translate-x-1/2 pt-2',
          'origin-top transition-all duration-200',
          open
            ? 'scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0',
        )}
      >
        <div className="border-brand-navy/10 shadow-brand-navy/10 min-w-45 overflow-hidden rounded-xl border bg-white py-1.5 shadow-lg">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="text-brand-navy/65 hover:bg-brand-navy/4 hover:text-brand-navy block px-4 py-2.5 text-sm font-medium transition-colors duration-100"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const SCROLL_THRESHOLD = 80;

function MobileNavMenu({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const itemBase =
    'flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150';
  const itemDefault =
    'text-brand-navy/65 hover:bg-brand-navy/4 hover:text-brand-navy';

  return (
    <div className="py-1.5">
      {NAV_LINKS.map((link) => {
        const Icon = NAV_ICONS[link.label] ?? Info;
        const hasChildren = !!link.children?.length;
        const isExpanded = expanded === link.href;

        return (
          <div key={link.href}>
            {hasChildren ? (
              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : link.href)}
                className={cn(
                  itemBase,
                  itemDefault,
                  isExpanded && 'text-brand-navy',
                )}
              >
                <Icon aria-hidden className="h-4 w-4 shrink-0 opacity-60" />
                <span className="flex-1 text-left font-medium">
                  {link.label}
                </span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    'h-4 w-4 opacity-40 transition-[rotate] duration-200',
                    isExpanded && 'rotate-180 opacity-70',
                  )}
                />
              </button>
            ) : (
              <Link
                href={link.href}
                onClick={onClose}
                className={cn(itemBase, itemDefault)}
              >
                <Icon aria-hidden className="h-4 w-4 shrink-0 opacity-60" />
                <span className="flex-1 font-medium">{link.label}</span>
                <ChevronRight aria-hidden className="h-4 w-4 opacity-25" />
              </Link>
            )}

            {/* Inline accordion children */}
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-200 ease-out',
                isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="border-brand-navy/10 ml-4 border-l py-0.5">
                  {link.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="text-brand-navy/50 hover:bg-brand-navy/4 hover:text-brand-navy block px-4 py-2 text-sm transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Divider */}
      <div aria-hidden className="bg-brand-navy/8 mx-4 my-1.5 h-px" />

      {/* Auth */}
      <Link
        href="/auth"
        onClick={onClose}
        className={cn(itemBase, itemDefault)}
      >
        <LogIn aria-hidden className="h-4 w-4 shrink-0 opacity-60" />
        <span className="flex-1 font-medium">Login</span>
      </Link>
      <Link
        href="/auth"
        onClick={onClose}
        className={cn(
          itemBase,
          'text-brand-gold font-semibold hover:bg-white/5',
        )}
      >
        <UserPlus aria-hidden className="h-4 w-4 shrink-0" />
        <span className="flex-1">Register</span>
      </Link>
    </div>
  );
}

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    header.style.willChange = 'background-color, backdrop-filter, box-shadow';

    const update = () => {
      const r = Math.min(window.scrollY / SCROLL_THRESHOLD, 1);
      header.style.backgroundColor = `rgba(255,255,255,${1 - r * 0.15})`;

      const blur = `blur(${r * 12}px)`;
      header.style.backdropFilter = blur;
      (
        header.style as CSSStyleDeclaration & { webkitBackdropFilter: string }
      ).webkitBackdropFilter = blur;

      header.style.boxShadow = `0 1px 0 rgba(0,0,62,${0.06 + r * 0.04})`;
    };

    update();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50"
        style={{
          backgroundColor: 'rgba(255,255,255,1)',
          boxShadow: '0 1px 0 rgba(0,0,62,0.06)',
        }}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-4 md:h-20 md:gap-6 md:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="focus-visible:ring-brand-gold shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label="AYLA home"
          >
            <Logo
              size="md"
              className="translate-x-[-9%] [&_img]:w-32 sm:[&_img]:w-36 md:[&_img]:w-40 lg:[&_img]:w-56 xl:[&_img]:w-70"
            />
          </Link>

          {/* Navigation - Desktop */}
          <nav
            className="hidden items-center gap-5 md:flex lg:gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <DesktopNavItem key={link.href} link={link} />
            ))}
          </nav>

          {/* Search & Auth - Desktop */}
          <div className="flex flex-1 items-center justify-end md:justify-center">
            <div className="md:hidden">
              <HeaderSearch compact />
            </div>
            <div className="hidden md:block md:w-full md:max-w-md">
              <HeaderSearch />
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <span aria-hidden className="bg-brand-navy/15 h-5 w-px" />

            <Link
              href="/auth"
              className="group border-brand-navy/20 text-brand-navy hover:border-brand-navy hover:bg-brand-navy focus-visible:ring-brand-gold inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-white focus:outline-none focus-visible:ring-2"
            >
              <LogIn
                aria-hidden
                className="h-4 w-4 transition-[translate] duration-200 group-hover:translate-x-0.5"
              />
              Login
            </Link>

            <Link
              href="/auth"
              className="group bg-brand-gold text-brand-navy focus-visible:ring-brand-gold inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <UserPlus
                aria-hidden
                className="h-4 w-4 transition-[scale] duration-200 group-hover:scale-110"
              />
              Register
            </Link>
          </div>

          <DropdownMenu open={mobileOpen} onOpenChange={setMobileOpen}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className="text-brand-navy hover:bg-brand-navy/4 focus-visible:ring-brand-gold flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 md:hidden"
              >
                {mobileOpen ? (
                  <X aria-hidden className="h-5 w-5" />
                ) : (
                  <Menu aria-hidden className="h-5 w-5" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={10}
              className="border-brand-navy/10 shadow-brand-navy/10 w-64 overflow-hidden rounded-xl border bg-white p-0 shadow-lg"
            >
              <MobileNavMenu onClose={() => setMobileOpen(false)} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="h-14 sm:h-16 md:h-20" aria-hidden="true" />
    </>
  );
}
