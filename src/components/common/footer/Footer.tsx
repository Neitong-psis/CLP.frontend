'use client';

import FooterBrand from './FooterBrand';
import FooterLinkColumn from './FooterLinkColumn';
import FooterContact from './FooterContact';
import FooterBottomBar from './FooterBottomBar';
import { FOOTER_QUICK_LINKS, FOOTER_PROGRAMS } from '@/constants/navigation';
import type { FooterTheme } from './types';

export type { FooterTheme };

interface FooterProps {
  theme?: FooterTheme;
}

export default function Footer({ theme = 'blue' }: FooterProps) {
  const isBlue = theme === 'blue';

  return (
    <footer
      className={
        isBlue
          ? 'bg-brand-navy text-white'
          : 'border-t border-slate-200 bg-white text-slate-900'
      }
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:py-16 lg:px-8">
        <div className="grid grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-10 md:grid-cols-12 md:gap-x-8 md:gap-y-0">
          <div className="col-span-3 md:col-span-4">
            <FooterBrand theme={theme} />
          </div>

          <div className="col-span-1 md:col-span-2">
            <FooterLinkColumn
              theme={theme}
              title="Quick Links"
              links={FOOTER_QUICK_LINKS}
            />
          </div>

          <div className="col-span-1 md:col-span-3">
            <FooterLinkColumn
              theme={theme}
              title="Programs"
              links={FOOTER_PROGRAMS}
            />
          </div>

          <div className="col-span-1 md:col-span-3">
            <FooterContact theme={theme} />
          </div>
        </div>
      </div>

      <FooterBottomBar theme={theme} />
    </footer>
  );
}
