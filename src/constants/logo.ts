import {
  AYLA_LOGO_ALT,
  AYLA_LOGO_DARK,
  AYLA_LOGO_DEFAULT,
  AYLA_LOGO_LIGHT,
} from '@logos';

export const SIZE_CONFIG = {
  sm: {
    image: 'w-60 h-auto max-w-full',
    text: 'text-[clamp(1rem,3vw,1.25rem)]',
    gap: 'gap-1',
  },
  md: {
    image: 'w-70 h-auto max-w-full',
    text: 'text-[clamp(1.25rem,4vw,1.75rem)]',
    gap: 'gap-2',
  },
  lg: {
    image: 'w-80 h-auto max-w-full',
    text: 'text-[clamp(1.5rem,5vw,2.25rem)]',
    gap: 'gap-3',
  },
  xl: {
    image: 'w-90 h-auto max-w-full',
    text: 'text-[clamp(2.25rem,10vw,4.5rem)]',
    gap: 'gap-0',
  },
} as const;

export const VARIANT_CONFIG = {
  default: {
    logo: AYLA_LOGO_DEFAULT,
    textColor: 'text-indigo-500',
    textColor2: 'text-black',
  },
  light: {
    logo: AYLA_LOGO_LIGHT,
    textColor: 'text-white',
    textColor2: 'text-white',
  },
  dark: {
    logo: AYLA_LOGO_DARK,
    textColor: 'text-black',
    textColor2: 'text-black',
  },
  alt: {
    logo: AYLA_LOGO_ALT,
    textColor: 'text-[#00003e]',
    textColor2: 'text-[#00003e]',
  },
} as const;
