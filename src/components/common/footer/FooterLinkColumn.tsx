'use client';

import Link from 'next/link';
import type { FooterTheme } from './types';

interface NavLink {
  readonly label: string;
  readonly href: string;
}

interface FooterLinkColumnProps {
  theme: FooterTheme;
  title: string;
  links: readonly NavLink[];
}

export default function FooterLinkColumn({
  theme,
  title,
  links,
}: FooterLinkColumnProps) {
  const isBlue = theme === 'blue';

  return (
    <div>
      <h4 className="text-brand-gold mb-4 text-[11px] font-bold tracking-[0.18em] uppercase sm:mb-5">
        {title}
      </h4>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`inline-flex items-center text-sm transition-all duration-200 ease-out hover:translate-x-1 ${
                isBlue
                  ? 'text-white/60 hover:text-white'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
