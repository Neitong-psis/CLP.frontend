import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import {
  SIZE_CONFIG,
  SCHEME_CONFIG,
  VARIANT_TO_SCHEME,
  type LogoScheme,
} from '@/constants/logo';

interface LogoProps {
  size?: 'xl' | 'lg' | 'md' | 'sm';
  isVertical?: boolean;
  isLoading?: boolean;
  /**
   * Controls which emblem and text colour to render:
   *
   * 'auto'     — Colored emblem in light mode, white emblem in CSS dark mode (default).
   *              Use on backgrounds that follow the theme.
   *
   * 'on-dark'  — Always white/inverted emblem + white text.
   *              Use on permanently dark or navy backgrounds.
   *
   * 'on-light' — Always colored emblem + navy text; ignores dark mode.
   *              Use when the surface is always light (certificates, print).
   */
  scheme?: LogoScheme;
  /** @deprecated Use `scheme` instead. Mapped automatically for backward compatibility. */
  variant?: 'default' | 'light' | 'dark' | 'alt';
  showText?: boolean;
  className?: string;
}

export default function Logo({
  isVertical = false,
  size = 'xl',
  isLoading = false,
  scheme,
  variant,
  showText = false,
  className = '',
}: LogoProps) {
  const resolvedScheme: LogoScheme =
    scheme ?? (variant ? (VARIANT_TO_SCHEME[variant] ?? 'auto') : 'auto');
  const config = SCHEME_CONFIG[resolvedScheme];
  const { image, text, gap } = SIZE_CONFIG[size];

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
      {config.autoSwap ? (
        <>
          <Image
            src={config.lightLogo}
            alt="AYLA logo"
            className={cn(image, className, 'dark:hidden')}
            width={0}
            height={0}
            sizes="100vw"
          />
          <Image
            src={config.darkLogo}
            alt="AYLA logo"
            className={cn(image, className, 'hidden dark:block')}
            width={0}
            height={0}
            sizes="100vw"
          />
        </>
      ) : (
        <Image
          src={config.lightLogo}
          alt="AYLA logo"
          className={cn(image, className)}
          width={0}
          height={0}
          sizes="100vw"
        />
      )}

      {showText && (
        <div className="flex flex-col items-start justify-center gap-0.5 leading-none">
          <span
            className={cn(
              text,
              'font-serif font-bold tracking-[0.12em] whitespace-nowrap uppercase',
              config.textColor,
            )}
          >
            AUSTRALIA YOUNG LEADERS
          </span>
          <span
            className={cn(
              text,
              'font-serif font-bold tracking-[0.12em] whitespace-nowrap uppercase',
              config.textColor,
            )}
          >
            ACADEMY CO., LTD.
          </span>
        </div>
      )}
    </div>
  );
}
