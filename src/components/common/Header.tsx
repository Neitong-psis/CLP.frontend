'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  LogIn,
  UserPlus,
  BookOpen,
  GraduationCap,
  Info,
  ChevronDown,
} from 'lucide-react';
import Logo from '@/components/common/Logo';
import { HeaderSearch } from '@/components/common/HeaderSearch';
import { NAV_LINKS, type NavLink } from '@/constants/navigation';
import { cn } from '@/utils/cn';

function NavItem({ link }: { link: NavLink }) {
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
        className="relative rounded py-1 text-sm font-semibold text-[#00003e]/65 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-[#f4a300] after:transition-[scale] after:duration-200 hover:text-[#00003e] hover:after:scale-x-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a300]"
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
      <button
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          'flex cursor-pointer items-center gap-1 border-0 bg-transparent py-1 text-sm font-semibold outline-none',
          'transition-colors duration-200',
          open ? 'text-[#00003e]' : 'text-[#00003e]/65 hover:text-[#00003e]',
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
      </button>

      {/* Panel — sits directly below, no portal gap */}
      <div
        className={cn(
          'absolute top-full left-1/2 -translate-x-1/2 pt-2',
          'origin-top transition-all duration-200',
          open
            ? 'scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0',
        )}
      >
        <div className="min-w-[180px] overflow-hidden rounded-xl bg-[#00003e] py-1.5 shadow-lg shadow-[#00003e]/20">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2.5 text-sm font-medium text-white/60 transition-colors duration-100 hover:bg-white/[0.07] hover:text-white"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const MOBILE_TABS = [
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/programs', label: 'Programs', icon: GraduationCap },
  { href: '/about', label: 'About', icon: Info },
  { href: '/auth/login', label: 'Login', icon: LogIn },
] as const;

const SCROLL_THRESHOLD = 80;

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Hint the compositor — only paint/composite work, no layout
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
        {/* ── Main row ── */}
        <div className="mx-auto flex h-20 max-w-[1280px] items-center gap-6 px-6 lg:px-8">
          {/* Logo — translate-x compensates for the SVG's 9% left whitespace
              so the icon aligns flush with the page content edge */}
          <Link
            href="/"
            className="flex-shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a300] focus-visible:ring-offset-2"
            aria-label="AYLA home"
          >
            <Logo size="md" className="-translate-x-[9%]" />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <NavItem key={link.href} link={link} />
            ))}
          </nav>

          {/* Always-visible search — centered, max-width clamped */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            <HeaderSearch />
          </div>

          {/* Auth */}
          <div className="hidden items-center gap-3 md:flex">
            <span aria-hidden className="h-5 w-px bg-[#00003e]/15" />

            <Link
              href="/auth"
              className="group inline-flex items-center gap-1.5 rounded-full border border-[#00003e]/20 px-4 py-2 text-sm font-semibold text-[#00003e] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#00003e] hover:bg-[#00003e] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a300]"
            >
              <LogIn
                aria-hidden
                className="h-4 w-4 transition-[translate] duration-200 group-hover:translate-x-0.5"
              />
              Login
            </Link>

            <Link
              href="/auth"
              className="group inline-flex items-center gap-1.5 rounded-full bg-[#f4a300] px-4 py-2 text-sm font-semibold text-[#00003e] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#e09400] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a300] focus-visible:ring-offset-2"
            >
              <UserPlus
                aria-hidden
                className="h-4 w-4 transition-[scale] duration-200 group-hover:scale-110"
              />
              Register
            </Link>
          </div>

          {/* Mobile right — compact register only */}
          <div className="ml-auto flex items-center gap-2 md:hidden">
            <Link
              href="/auth"
              className="rounded-full bg-[#f4a300] px-3.5 py-2 text-xs font-semibold text-[#00003e] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#e09400] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a300]"
            >
              Register
            </Link>
          </div>
        </div>

        {/* ── Mobile search row (always visible) ── */}
        <div className="border-t border-[#00003e]/[0.06] px-6 py-2.5 md:hidden">
          <HeaderSearch />
        </div>
      </header>

      {/* Spacer — taller on mobile to account for the search row */}
      <div className="h-[136px] md:h-20" aria-hidden="true" />

      {/* ── Mobile bottom tab nav ── */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-[#00003e]/10 bg-white/90 backdrop-blur-lg md:hidden"
        aria-label="Mobile navigation"
      >
        <div className="flex h-16 items-center justify-around px-2">
          {MOBILE_TABS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-[#00003e]/55 transition-colors hover:text-[#00003e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a300]"
            >
              <Icon
                aria-hidden
                className="h-5 w-5 transition-[translate,scale] duration-200 group-hover:-translate-y-0.5 group-hover:scale-110"
              />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Prevents bottom tab from overlapping content on mobile */}
      <div className="h-16 md:hidden" aria-hidden="true" />
    </>
  );
}
