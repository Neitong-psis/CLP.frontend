import dynamic from 'next/dynamic';
import { BRAND } from '@/constants/brand';
import type { FooterTheme } from './types';

const Logo = dynamic(() => import('@/components/common/Logo'));

interface FooterBrandProps {
  theme: FooterTheme;
}

export default function FooterBrand({ theme }: FooterBrandProps) {
  const isBlue = theme === 'blue';

  return (
    <div className="flex flex-col items-center text-center md:col-span-5 lg:col-span-4">
      <div className="flex justify-center">
        <Logo size="md" variant={isBlue ? 'light' : 'alt'} />
      </div>
      <p
        className={`mt-5 max-w-sm text-base leading-relaxed ${isBlue ? 'text-white/70' : 'text-slate-500'}`}
      >
        {BRAND.tagline}
      </p>
    </div>
  );
}
