import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware navigation helpers. Use these instead of `next/link` and
 * `next/navigation` whenever a link/redirect must preserve the active locale
 * (they automatically add the `/km` prefix when the Khmer locale is active).
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
