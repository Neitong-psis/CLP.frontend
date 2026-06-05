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
import { cn } from '@/lib/utils/cn';

const NAV_ICONS: Record<string, LucideIcon> = {
  Courses: BookOpen,
  Programs: GraduationCap,
  About: Info,
};

const SCROLL_THRESHOLD = 72;

// ─── Desktop nav item ─────────────────────────────────────────────────────────

function DesktopNavItem({
  link,
  scrolled,
}: {
  link: NavLink;
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const base =
    'text-sm font-semibold transition-colors duration-200 focus:outline-none';
  const color = scrolled
    ? 'text-brand-navy/70 hover:text-brand-navy'
    : 'text-white/70 hover:text-white';

  if (!link.children?.length) {
    return (
      <Link
        href={link.href}
        className={cn(
          base,
          color,
          'after:bg-brand-gold relative rounded py-1',
          'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full',
          'after:origin-left after:scale-x-0 after:rounded-full',
          'after:transition-[scale] after:duration-200 hover:after:scale-x-100',
        )}
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
        closeTimer.current = setTimeout(() => setOpen(false), 15);
      }}
    >
      <Button
        variant="ghost"
        size="sm"
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          'gap-1 px-2 font-semibold',
          scrolled
            ? 'text-brand-navy/70 hover:bg-brand-navy/6 hover:text-brand-navy'
            : 'text-white/70 hover:bg-white/8 hover:text-white',
          open && (scrolled ? 'text-brand-navy!' : 'text-white!'),
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

      {/* Dropdown — always dark navy */}
      <div
        className={cn(
          'absolute top-full left-1/2 origin-top -translate-x-1/2 pt-3 transition-all duration-200',
          open
            ? 'scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0',
        )}
      >
        <div className="border-brand-navy/10 shadow-brand-navy/8 min-w-44 overflow-hidden rounded-xl border bg-white py-1.5 shadow-lg">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="text-brand-navy/70 hover:bg-brand-navy/4 hover:text-brand-navy block px-4 py-2.5 text-sm font-medium transition-colors duration-100"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Mobile nav menu ──────────────────────────────────────────────────────────

function MobileNavMenu({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const itemBase =
    'flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors duration-150';
  const itemColor =
    'text-brand-navy/70 hover:bg-brand-navy/5 hover:text-brand-navy';

  return (
    <div className="py-1">
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
                  itemColor,
                  isExpanded && 'text-brand-navy!',
                )}
              >
                <Icon aria-hidden className="h-4 w-4 shrink-0 opacity-50" />
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
                className={cn(itemBase, itemColor)}
              >
                <Icon aria-hidden className="h-4 w-4 shrink-0 opacity-50" />
                <span className="flex-1 font-medium">{link.label}</span>
                <ChevronRight aria-hidden className="h-4 w-4 opacity-20" />
              </Link>
            )}

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
                      className="text-brand-navy/55 hover:bg-brand-navy/4 hover:text-brand-navy block px-4 py-2 text-sm transition-colors"
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

      <div aria-hidden className="bg-brand-navy/10 mx-4 my-1.5 h-px" />

      <Link href="/auth" onClick={onClose} className={cn(itemBase, itemColor)}>
        <LogIn aria-hidden className="h-4 w-4 shrink-0 opacity-50" />
        <span className="flex-1 font-medium">Login</span>
      </Link>
      <Link
        href="/auth"
        onClick={onClose}
        className={cn(
          itemBase,
          'text-brand-gold hover:bg-brand-gold/5 font-semibold',
        )}
      >
        <UserPlus aria-hidden className="h-4 w-4 shrink-0" />
        <span className="flex-1">Register</span>
      </Link>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const update = () => {
      const y = window.scrollY;
      const r = Math.min(y / SCROLL_THRESHOLD, 1);
      const isScrolled = y > SCROLL_THRESHOLD;
      setScrolled(isScrolled);

      if (isScrolled) {
        // White frosted header
        header.style.backgroundColor = 'rgba(255,255,255,0.95)';
        header.style.backdropFilter = 'blur(14px)';
        (
          header.style as CSSStyleDeclaration & { webkitBackdropFilter: string }
        ).webkitBackdropFilter = 'blur(14px)';
        header.style.borderBottom = '1px solid rgba(0,0,62,0.08)';
      } else {
        // Transparent — sits over the dark navy hero
        const alpha = r * 0.5;
        header.style.backgroundColor = `rgba(0,0,62,${alpha})`;
        header.style.backdropFilter = r > 0.1 ? `blur(${r * 8}px)` : 'none';
        (
          header.style as CSSStyleDeclaration & { webkitBackdropFilter: string }
        ).webkitBackdropFilter = r > 0.1 ? `blur(${r * 8}px)` : 'none';
        header.style.borderBottom = '1px solid transparent';
      }
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
    <header
      ref={headerRef}
      className="transition-[background-color,border-color, backdrop-filter] fixed inset-x-0 top-0 z-50 duration-100"
      style={{ backgroundColor: 'rgba(0,0,62,0)' }}
    >
      <div
        className="mx-auto flex max-w-7xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:gap-6 lg:px-8"
        style={{
          height: 'max(3.75rem, calc(3.25rem + env(safe-area-inset-top, 0px)))',
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        {/* Logo — width-constrained so the wide SVG renders correctly */}
        <Link
          href="/"
          className="shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
          aria-label="AYLA home"
        >
          <Logo
            size="md"
            variant={scrolled ? 'default' : 'light'}
            className="[&_img]:h-auto [&_img]:w-24 sm:[&_img]:w-28 md:[&_img]:w-36 lg:[&_img]:w-44"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-5 md:flex lg:gap-7"
          aria-label="Main"
        >
          {NAV_LINKS.map((link) => (
            <DesktopNavItem key={link.href} link={link} scrolled={scrolled} />
          ))}
        </nav>

        {/* Search */}
        <div className="flex flex-1 items-center justify-end md:justify-center">
          <div className="w-32 min-w-0 md:hidden">
            <HeaderSearch compact dark={!scrolled} />
          </div>
          <div className="hidden md:block md:w-full md:max-w-xs lg:max-w-md">
            <HeaderSearch dark={!scrolled} />
          </div>
        </div>

        {/* Desktop auth */}
        <div className="hidden items-center gap-2.5 md:flex">
          <span
            aria-hidden
            className={cn(
              'h-5 w-px transition-colors duration-300',
              scrolled ? 'bg-brand-navy/15' : 'bg-white/15',
            )}
          />
          <Link
            href="/auth"
            className={cn(
              'group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-px focus:outline-none',
              scrolled
                ? 'border-brand-navy/20 text-brand-navy hover:border-brand-navy hover:text-white'
                : 'border-white/25 text-white/80 hover:border-white/50 hover:text-white hover:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]',
            )}
          >
            {/* Fill slides up from bottom on hover */}
            <span
              aria-hidden
              className={cn(
                'absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0',
                scrolled ? 'bg-brand-navy' : 'bg-white/10',
              )}
            />
            <LogIn
              aria-hidden
              className="relative h-4 w-4 transition-[translate] duration-200 group-hover:translate-x-0.5"
            />
            <span className="relative">Login</span>
          </Link>
          <Link
            href="/auth"
            className="group bg-brand-gold text-brand-navy relative inline-flex items-center gap-1.5 overflow-hidden rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-px hover:shadow-[0_0_0_4px_rgba(244,163,0,0.25)] focus:outline-none"
          >
            {/* Brightness sweep left-to-right */}
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-x-0"
            />
            <UserPlus
              aria-hidden
              className="relative h-4 w-4 transition-[scale] duration-200 group-hover:scale-110"
            />
            <span className="relative">Register</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <DropdownMenu open={mobileOpen} onOpenChange={setMobileOpen}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors focus:outline-none md:hidden',
                scrolled
                  ? 'text-brand-navy hover:bg-brand-navy/8'
                  : 'text-white/80 hover:bg-white/10',
              )}
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
            sideOffset={8}
            className="border-brand-navy/8 w-64 overflow-hidden rounded-xl border bg-white p-0 shadow-lg"
          >
            <MobileNavMenu onClose={() => setMobileOpen(false)} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
