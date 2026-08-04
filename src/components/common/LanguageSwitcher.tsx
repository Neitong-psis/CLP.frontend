'use client';

import { Globe, Check } from 'lucide-react';
import { useLocale } from 'next-intl';
import { routing, type Locale } from '@/i18n/routing';
import { useLocalePreference } from '@/providers/locale-provider';
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

interface LanguageSwitcherProps {
  scrolled?: boolean;
}

export function LanguageSwitcher({ scrolled }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const { switchLocale } = useLocalePreference();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Change language"
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none',
            scrolled === undefined
              ? 'border-foreground/15 text-foreground/70 hover:border-foreground/30 hover:text-foreground'
              : scrolled
                ? 'border-brand-navy/20 text-brand-navy/80 hover:border-brand-navy hover:text-brand-navy'
                : 'border-white/25 text-white/80 hover:border-white/50 hover:text-white',
          )}
        >
          <Globe aria-hidden className="h-4 w-4" />
          <span lang={locale}>
            {locale === 'km' ? LOCALE_LABELS.km : locale.toUpperCase()}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        theme="light"
        className="min-w-36 py-1.5"
      >
        {routing.locales.map((option) => (
          <DropdownMenuItem
            key={option}
            theme="light"
            onClick={() => switchLocale(option)}
            className="flex items-center justify-between"
          >
            <span lang={option}>{LOCALE_LABELS[option]}</span>
            {option === locale && (
              <Check aria-hidden className="text-brand-gold h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
