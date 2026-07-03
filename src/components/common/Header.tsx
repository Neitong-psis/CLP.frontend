'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useHeaderT } from '@/i18n';
import Logo from '@/components/common/Logo';
import { HeaderSearch } from '@/components/common/HeaderSearch';
import { useScrollHeader } from '@/hooks/useScrollHeader';
import { scrolledTheme } from '@/components/header/scrolledTheme';
import { DesktopNav } from '@/components/header/DesktopNav';
import { MobileNav } from '@/components/header/MobileNav';
import { AuthMenu } from '@/components/header/AuthMenu';

export default function Header() {
  const t = useHeaderT();
  const { scrolled, headerRef } = useScrollHeader();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = scrolledTheme(scrolled);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-100"
      style={{ backgroundColor: 'rgba(0,0,62,0)' }}
    >
      <div
        className="mx-auto flex max-w-7xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:gap-6 lg:px-8"
        style={{
          height: 'max(3.75rem, calc(3.25rem + env(safe-area-inset-top, 0px)))',
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <Link
          href="/"
          className="shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
          aria-label="AYLA home"
        >
          <Logo
            size="md"
            scheme={scrolled ? 'on-light' : 'on-dark'}
            showText
            className="[&_img]:h-9 [&_img]:w-auto sm:[&_img]:h-10 lg:[&_img]:h-11"
          />
        </Link>

        <DesktopNav scrolled={scrolled} />

        <div className="flex flex-1 items-center justify-end md:justify-center">
          <div className="w-32 min-w-0 md:hidden">
            <HeaderSearch compact dark={!scrolled} />
          </div>
          <div className="hidden md:block md:w-full md:max-w-xs lg:max-w-md">
            <HeaderSearch dark={!scrolled} />
          </div>
        </div>

        <AuthMenu scrolled={scrolled} />

        <button
          type="button"
          aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors focus:outline-none md:hidden',
            theme.hamburger,
          )}
        >
          {mobileOpen ? (
            <X aria-hidden className="h-5 w-5" />
          ) : (
            <Menu aria-hidden className="h-5 w-5" />
          )}
        </button>
      </div>

      <div
        aria-hidden={!mobileOpen}
        className={cn(
          'border-brand-navy/8 absolute inset-x-0 top-full border-t bg-white shadow-xl transition-[opacity,transform] duration-200 ease-out md:hidden',
          mobileOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0',
        )}
      >
        <div className="max-h-[calc(100svh-3.75rem)] overflow-y-auto">
          <MobileNav onClose={() => setMobileOpen(false)} />
        </div>
      </div>
    </header>
  );
}
