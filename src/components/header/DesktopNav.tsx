'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { NAV_LINKS, type NavLink } from '@/constants/navigation';
import { scrolledTheme } from '@/components/header/scrolledTheme';

function DesktopNavItem({
  link,
  scrolled,
}: {
  link: NavLink;
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const theme = scrolledTheme(scrolled);

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
        className={cn(
          'text-sm font-semibold transition-colors duration-200 focus:outline-none',
          theme.text,
          theme.hoverText,
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
        closeTimer.current = setTimeout(() => setOpen(false), 150);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          'inline-flex h-9 items-center gap-1 rounded px-2 text-sm font-semibold',
          'transition-colors duration-200 focus:outline-none',
          open ? theme.openText : theme.text,
          theme.hoverBg,
          theme.hoverText,
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

export function DesktopNav({ scrolled }: { scrolled: boolean }) {
  return (
    <nav
      className="hidden items-center gap-5 md:flex lg:gap-7"
      aria-label="Main"
    >
      {NAV_LINKS.map((link) => (
        <DesktopNavItem key={link.href} link={link} scrolled={scrolled} />
      ))}
    </nav>
  );
}
