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
          ? 'bg-[#00003e] text-white'
          : 'border-t border-slate-200 bg-white text-slate-900'
      }
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <FooterBrand theme={theme} />

          <div className="md:col-span-3 lg:col-span-2">
            <FooterLinkColumn
              theme={theme}
              title="Quick Links"
              links={FOOTER_QUICK_LINKS}
            />
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <FooterLinkColumn
              theme={theme}
              title="Programs"
              links={FOOTER_PROGRAMS}
            />
          </div>

          <FooterContact theme={theme} />
        </div>
      </div>

      <FooterBottomBar theme={theme} />
    </footer>
  );
}
