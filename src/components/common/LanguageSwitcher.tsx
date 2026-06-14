'use client';

import { Globe, Check } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  km: 'ខ្មែរ',
};

/**
 * Locale picker. Uses the locale-aware `useRouter`/`usePathname` from
 * `@/i18n/navigation` so switching keeps the user on the same page while
 * swapping (or adding/removing) the locale prefix.
 */
export function LanguageSwitcher({ scrolled = true }: { scrolled?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Change language"
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none',
            scrolled
              ? 'border-brand-navy/20 text-brand-navy/80 hover:border-brand-navy hover:text-brand-navy'
              : 'border-white/25 text-white/80 hover:border-white/50 hover:text-white',
          )}
        >
          <Globe aria-hidden className="h-4 w-4" />
          <span className="uppercase">{locale}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-36 border border-slate-200/80 bg-white py-1.5 shadow-lg"
      >
        {routing.locales.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={async () => {
              try {
                // build a locale-aware pathname and navigate to it
                const existingPrefix = routing.locales.find(
                  (l) => pathname === `/${l}` || pathname?.startsWith(`/${l}/`),
                );
                const pathWithout = existingPrefix
                  ? // remove leading `/${existingPrefix}`
                    pathname!.slice(existingPrefix.length + 1) || '/'
                  : pathname;

                const target =
                  option === routing.defaultLocale
                    ? pathWithout
                    : pathWithout === '/'
                      ? `/${option}`
                      : `/${option}${pathWithout}`;

                // debug logging
                console.log('LanguageSwitcher: click', {
                  option,
                  pathname,
                  target,
                });
                await router.replace(target);
                console.log(
                  'LanguageSwitcher: router.replace finished',
                  option,
                  target,
                );
              } catch (err) {
                console.error('LanguageSwitcher: router.replace error', err);
                alert('Could not switch language — see console for details.');
              }
            }}
            className="text-brand-navy/70 focus:text-brand-navy flex items-center justify-between focus:bg-slate-50"
          >
            {LOCALE_LABELS[option]}
            {option === locale && (
              <Check aria-hidden className="text-brand-gold h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
