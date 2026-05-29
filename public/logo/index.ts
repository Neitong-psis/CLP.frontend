// AYLA logos — use variant numbers to pick the right one
// -11: full colour (default)  -21: dark  -24: alt  -25: white/light
export const AYLA_LOGO_DEFAULT = '/logo/ayla-logo/AYLA%20All%20Logo-11.svg';
export const AYLA_LOGO_ALT = '/logo/ayla-logo/AYLA%20All%20Logo-21.svg';
export const AYLA_LOGO_DARK = '/logo/ayla-logo/AYLA%20All%20Logo-24.svg';
export const AYLA_LOGO_LIGHT = '/logo/ayla-logo/AYLA%20All%20Logo-25.svg';

// QBTech logos — 29/31 are typically dark, 30/32 typically light
export const QBTECH_LOGO_1 = '/logo/qb-tech-logo/qbtechlogo-29.svg';
export const QBTECH_LOGO_2 = '/logo/qb-tech-logo/qbtechlogo-30.svg';
export const QBTECH_LOGO_3 = '/logo/qb-tech-logo/qbtechlogo-31.svg';
export const QBTECH_LOGO_4 = '/logo/qb-tech-logo/qbtechlogo-32.svg';

// Favicons — 11 is default, 21 is dark, 24 is alt, 25 is light
export const FAVICON_DEFAULT = '/logo/ico/AYLA_favicon.ico';
export const FAVICON_LIGHT = '/logo/ico/AYLA_favicon_light.ico';

// Grouped for convenience
export const aylaLogos = {
  default: AYLA_LOGO_DEFAULT,
  alt: AYLA_LOGO_ALT,
  dark: AYLA_LOGO_DARK,
  light: AYLA_LOGO_LIGHT,
} as const;

export const qbtechLogos = {
  logo1: QBTECH_LOGO_1,
  logo2: QBTECH_LOGO_2,
  logo3: QBTECH_LOGO_3,
  logo4: QBTECH_LOGO_4,
} as const;

export const favicons = {
  default: FAVICON_DEFAULT,
  light: FAVICON_LIGHT,
} as const;

