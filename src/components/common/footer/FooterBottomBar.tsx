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
      className={`border-t ${isBlue ? 'bg-brand-navy/60 border-white/6' : 'border-border bg-surface'}`}
    >
      <div className="flex flex-col items-center gap-3 px-4 py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8">
        {/* Left — copyright */}
        <span
          className={`shrink-0 text-xs ${isBlue ? 'text-white/40' : 'text-muted-foreground'}`}
        >
          {BRAND.poweredBy.name} &copy; {new Date().getFullYear()} All Rights
          Reserved
        </span>

        {/* Centre — legal links */}
        <div
          className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs ${isBlue ? 'text-white/40' : 'text-muted-foreground'}`}
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
                  className={isBlue ? 'text-white/25' : 'text-border'}
                  aria-hidden
                >
                  &middot;
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Right — platform */}
        <div className="shrink-0 sm:text-right">
          <p className="text-brand-gold text-xs font-semibold">
            {BRAND.platform.name}
          </p>
          <p
            className={`text-[10px] ${isBlue ? 'text-white/40' : 'text-muted-foreground'}`}
          >
            {BRAND.platform.description}
          </p>
        </div>
      </div>
    </div>
  );
}
