import { cn } from '@/lib/utils/cn';
import { SIZE_CONFIG, VARIANT_CONFIG } from '@/constants/logo';
import { AYLA_LOGO_DARK } from '@logos';

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

  // default/alt use the navy-fill SVG (Logo-21). Navy disappears on dark
  // backgrounds, so swap to AYLA_LOGO_DARK (Logo-24, white fills) in dark mode.
  const navyFill = variant === 'default' || variant === 'alt';

  return (
    <div
      className={cn(
        'relative flex max-w-full items-center justify-center',
        gap,
        isVertical ? 'flex-col' : 'flex-row',
        isLoading && 'animate-pulse opacity-70',
        className,
      )}
    >
      {navyFill ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo}
            alt="AYLA logo"
            className={cn(image, 'dark:hidden')}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={AYLA_LOGO_DARK}
            alt="AYLA logo"
            className={cn(image, 'hidden dark:block')}
          />
        </>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt="AYLA logo" className={image} />
      )}
      {showText && (
        <div className="flex flex-col items-start justify-center gap-0.5 leading-none">
          <span
            className={cn(
              `${text} font-serif font-bold tracking-[0.12em] whitespace-nowrap uppercase`,
              textColor,
              navyFill && 'dark:text-white',
            )}
          >
            AUSTRALIA YOUNG LEADERS
          </span>
          <span
            className={cn(
              `${text} font-serif font-bold tracking-[0.12em] whitespace-nowrap uppercase`,
              textColor2,
              navyFill && 'dark:text-white',
            )}
          >
            ACADEMY CO., LTD.
          </span>
        </div>
      )}
    </div>
  );
}
