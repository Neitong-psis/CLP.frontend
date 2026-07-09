'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { getSavedLocale, saveLocale } from '@/lib/i18n/locale-prefs';
import { setLocale as setApiLocale } from '@/lib/i18n/locale-store';
import { useAuth } from '@/hooks/use-auth';

// ─── Context ─────────────────────────────────────────────────────────────────

interface LocaleContextValue {
  /**
   * Switch the active locale for the current user.
   * - Saves the preference to localStorage keyed by user ID (authenticated only).
   * - Updates the NEXT_LOCALE cookie and refreshes the page content; the URL
   *   does not change because localePrefix is set to 'never'.
   */
  switchLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocalePreference(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error(
      'useLocalePreference must be used within <LocaleProvider>.',
    );
  }
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  // Stable refs so the login effect never captures stale values
  const localeRef = useRef(locale);
  const routerRef = useRef(router);
  const pathnameRef = useRef(pathname);
  useEffect(() => {
    localeRef.current = locale;
  });
  useEffect(() => {
    routerRef.current = router;
  });
  useEffect(() => {
    pathnameRef.current = pathname;
  });

  // Keep the module-level locale store in sync so axios can read it
  useEffect(() => {
    setApiLocale(locale);
  }, [locale]);

  // Track which user id we've already restored the locale for, to ensure we
  // run the restore exactly once per login — not on every navigation or re-render.
  const restoredForRef = useRef<string | null>(null);

  useEffect(() => {
    if (!user) {
      // User logged out — reset so the next login triggers a fresh restore
      restoredForRef.current = null;
      return;
    }

    if (restoredForRef.current === user.id) return;
    restoredForRef.current = user.id;

    const saved = getSavedLocale(user.id);
    if (saved && saved !== localeRef.current) {
      routerRef.current.replace(pathnameRef.current, { locale: saved });
    }
  }, [user]);

  const switchLocale = useCallback(
    (newLocale: Locale) => {
      if (user) {
        saveLocale(user.id, newLocale);
      }
      router.replace(pathname, { locale: newLocale });
    },
    [user, router, pathname],
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ switchLocale }),
    [switchLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
