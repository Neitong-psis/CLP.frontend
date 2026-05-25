import { SIZE_CONFIG, VARIANT_CONFIG } from '@/constants/logo';

interface LogoProps {
  size?: 'xl' | 'lg' | 'md' | 'sm';
  isVertical?: boolean;
  isLoading?: boolean;
  variant?: 'default' | 'light' | 'dark' | 'alt';
  showText?: boolean;
  className?: string;
}

export default function Logo({
  isVertical = false,
  size = 'xl',
  isLoading = false,
  variant = 'default',
  showText = false,
  className = '',
}: LogoProps) {
  const { image, text, gap } = SIZE_CONFIG[size];
  const { logo, textColor, textColor2 } = VARIANT_CONFIG[variant];

  return (
    <div
      className={`relative flex max-w-full items-center justify-center ${gap} ${isVertical ? 'flex-col' : 'flex-row'} ${isLoading ? 'animate-pulse opacity-70' : ''} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo} alt="AYLA logo" className={`${image} object-contain`} />
      {showText && (
        <div className="flex items-center justify-center gap-0">
          <span
            className={`${text} font-extrabold tracking-tight ${textColor}`}
          >
            AY
          </span>
          <span
            className={`${text} font-extrabold tracking-tight ${textColor2}`}
          >
            LA
          </span>
        </div>
      )}
    </div>
  );
}
