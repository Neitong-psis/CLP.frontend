'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useThemeT } from '@/i18n';
import { cn } from '@/lib/utils/cn';

const BASE =
  'inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground';

const subscribe = () => () => {};

function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/**
 * Light/dark toggle. Reads `resolvedTheme` (so `system` resolves to a concrete
 * value and drives the icon correctly) and persists an explicit choice.
 *
 * Renders a same-size placeholder until hydrated, because the resolved theme
 * isn't known on the server — this avoids a hydration mismatch and layout shift.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const t = useThemeT();
  const { theme, toggle } = useTheme();
  const hydrated = useHydrated();

  if (!hydrated) {
    return <span aria-hidden className={cn(BASE, className)} />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('toggle')}
      title={t('toggle')}
      className={cn(BASE, className)}
    >
      {isDark ? (
        <Sun aria-hidden className="h-4 w-4" />
      ) : (
        <Moon aria-hidden className="h-4 w-4" />
      )}
    </button>
  );
}

/** Sliding ON/OFF toggle — same row height as LanguageSwitcher pill.
 *  Only ever rendered inside MobileSidebarDrawer, which is always on a dark
 *  (brand navy) background regardless of theme, so the off-state track uses
 *  a light-on-dark treatment rather than the theme-relative `foreground`
 *  token. */
export function ThemeSwitchToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <span
        aria-hidden
        className={cn(
          'inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent bg-white/20',
          className,
        )}
      />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={toggle}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        isDark
          ? 'bg-brand-gold focus-visible:ring-brand-gold/50'
          : 'bg-white/20 focus-visible:ring-white/30',
        className,
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-md transition-transform duration-200',
          isDark ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </button>
  );
}
