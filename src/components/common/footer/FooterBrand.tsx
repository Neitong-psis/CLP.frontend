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
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <div className="flex justify-center md:justify-start">
        <Logo
          size="sm"
          variant={isBlue ? 'light' : 'alt'}
          className="[&_img]:w-100 sm:[&_img]:w-100 md:[&_img]:w-100"
        />
      </div>
      <p
        className={`mt-3 max-w-sm text-sm leading-relaxed sm:mt-4 sm:text-base ${isBlue ? 'text-white/70' : 'text-muted-foreground'}`}
      >
        {BRAND.tagline}
      </p>
    </div>
  );
}
