'use client';

import type { ReactNode } from 'react';
import { ThemeProvider as CustomThemeProvider } from '@/hooks/useTheme';

/**
 * Thin re-export of the custom ThemeProvider.
 *
 * We deliberately avoid `next-themes` here: its ThemeProvider renders a
 * `<script>` element inside the React component tree, which triggers a React 19
 * warning ("Encountered a script tag while rendering React component").
 *
 * FOUC prevention is handled via a `qb_theme` cookie — the root layout reads
 * it server-side and sets the initial `dark` class on `<html>` before the
 * page reaches the client. No inline scripts needed.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <CustomThemeProvider>{children}</CustomThemeProvider>;
}
