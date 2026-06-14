'use client';

import type { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * Single source of truth for theme configuration. Wraps `next-themes` so the
 * rest of the app depends on this module — not the library — for theme state.
 *
 * - `attribute="class"` toggles `.dark` on <html> (matches the `@variant dark`
 *   selector in globals.css).
 * - `defaultTheme="system"` + `enableSystem` honor the OS preference first.
 * - `disableTransitionOnChange` prevents color transitions from animating on
 *   theme switch (avoids a flash of half-transitioned colors).
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
