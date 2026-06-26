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

export const VARIANT_CONFIG = {
  default: {
    logo: AYLA_LOGO_ALT,
    textColor: 'text-[#00003e]',
    textColor2: 'text-[#00003e]',
  },
  light: {
    logo: AYLA_LOGO_DARK,
    textColor: 'text-white',
    textColor2: 'text-white',
  },
  dark: {
    logo: AYLA_LOGO_DARK,
    textColor: 'text-[#00003e]',
    textColor2: 'text-[#00003e]',
  },
  alt: {
    logo: AYLA_LOGO_ALT,
    textColor: 'text-[#00003e]',
    textColor2: 'text-[#00003e]',
  },
} as const;
