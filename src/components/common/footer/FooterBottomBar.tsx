import Link from 'next/link';
import { BRAND } from '@/constants/brand';
import { FOOTER_LEGAL_LINKS } from '@/constants/navigation';
import type { FooterTheme } from './types';

interface FooterBottomBarProps {
  theme: FooterTheme;
}

export default function FooterBottomBar({ theme }: FooterBottomBarProps) {
  const isBlue = theme === 'blue';

  return (
    <div
      className={`border-t ${isBlue ? 'bg-brand-navy/60 border-white/10' : 'border-slate-200 bg-slate-50'}`}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <span
          className={`text-xs whitespace-nowrap ${isBlue ? 'text-white/40' : 'text-slate-400'}`}
        >
          {BRAND.poweredBy.name} &copy; {new Date().getFullYear()} All Rights
          Reserved
        </span>

        <div
          className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs ${isBlue ? 'text-white/40' : 'text-slate-400'}`}
        >
          {FOOTER_LEGAL_LINKS.map((link, idx) => (
            <span key={link.href} className="flex items-center gap-3">
              <Link
                href={link.href}
                className="hover:text-brand-gold transition-colors"
              >
                {link.label}
              </Link>
              {idx < FOOTER_LEGAL_LINKS.length - 1 && (
                <span
                  className={isBlue ? 'text-white/25' : 'text-slate-300'}
                  aria-hidden
                >
                  &middot;
                </span>
              )}
            </span>
          ))}
        </div>

        <div className="text-right whitespace-nowrap">
          <p className="text-brand-gold text-xs">{BRAND.platform.name}</p>
          <p
            className={`text-[10px] ${isBlue ? 'text-white/40' : 'text-slate-400'}`}
          >
            {BRAND.platform.description}
          </p>
        </div>
      </div>
    </div>
  );
}
