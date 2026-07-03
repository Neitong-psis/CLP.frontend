import { AYLA_LOGO_ALT, AYLA_LOGO_DARK } from '@logos';

// image: height-driven so square emblems maintain 1:1 aspect ratio naturally.
// text: compact size for the two-line academy name label.
export const SIZE_CONFIG = {
  sm: {
    image: 'h-8 w-auto max-w-full object-contain',
    text: 'text-[0.45rem]',
    gap: 'gap-1.5',
  },
  md: {
    image: 'h-10 w-auto max-w-full object-contain',
    text: 'text-[0.5rem]',
    gap: 'gap-2',
  },
  lg: {
    image: 'h-12 w-auto max-w-full object-contain',
    text: 'text-[0.55rem]',
    gap: 'gap-2.5',
  },
  xl: {
    image: 'h-16 w-auto max-w-full object-contain',
    text: 'text-[0.6rem]',
    gap: 'gap-3',
  },
} as const;

/**
 * Three rendering schemes, each controlling which emblem SVG(s) to show
 * and what text colour to apply.
 *
 * 'auto'     — Colored emblem in light mode; automatically swaps to the
 *              white/inverted emblem when the `dark` CSS class is active.
 *              Use wherever the background follows the theme (dashboards,
 *              content pages, course players).
 *
 * 'on-dark'  — Always the white/inverted emblem + white text.
 *              Use on permanently dark/navy backgrounds: sidebar, hero,
 *              auth pages, footer, dark fixed-header state.
 *
 * 'on-light' — Always the colored emblem + navy text; ignores dark mode.
 *              Use when the background is always light regardless of theme
 *              (print/certificate exports, light-only UI panels).
 */
export const SCHEME_CONFIG = {
  auto: {
    lightLogo: AYLA_LOGO_ALT,
    darkLogo: AYLA_LOGO_DARK,
    autoSwap: true,
    textColor: 'text-[#00003e] dark:text-white',
  },
  'on-dark': {
    lightLogo: AYLA_LOGO_DARK,
    darkLogo: AYLA_LOGO_DARK,
    autoSwap: false,
    textColor: 'text-white',
  },
  'on-light': {
    lightLogo: AYLA_LOGO_ALT,
    darkLogo: AYLA_LOGO_ALT,
    autoSwap: false,
    textColor: 'text-[#00003e]',
  },
} as const;

export type LogoScheme = keyof typeof SCHEME_CONFIG;

// Maps the legacy `variant` prop to a LogoScheme so all existing callers
// continue to work without any changes.
export const VARIANT_TO_SCHEME: Record<string, LogoScheme> = {
  default: 'auto',
  alt: 'on-light',
  light: 'on-dark',
  dark: 'on-light', // was broken: white logo + navy text → now correctly shows colored logo
};
