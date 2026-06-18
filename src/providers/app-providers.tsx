'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { AuthProvider } from './auth-provider';
import { LocaleProvider } from './locale-provider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LocaleProvider>{children}</LocaleProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
