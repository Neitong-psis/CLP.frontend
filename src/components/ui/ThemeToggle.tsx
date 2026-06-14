'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils/cn';

const BASE =
  'inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground';

const subscribe = () => () => {};

/**
 * Returns `true` only after client hydration. Implemented with
 * `useSyncExternalStore` (server snapshot `false`, client snapshot `true`) so
 * we get an SSR-safe mount flag without calling `setState` inside an effect.
 */
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
  const t = useTranslations('theme');
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();

  if (!hydrated) {
    return <span aria-hidden className={cn(BASE, className)} />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
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
