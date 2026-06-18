'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface BottomNavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

interface MobileBottomNavProps {
  items: BottomNavItem[];
  rootHref: string;
}

export function MobileBottomNav({ items, rootHref }: MobileBottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="bg-brand-navy fixed right-0 bottom-0 left-0 z-40 flex border-t border-white/[0.07] lg:hidden">
      {items.map(({ href, icon: Icon, label }) => {
        const active =
          pathname === href || (href !== rootHref && pathname.startsWith(href));

        return (
          <Link
            key={href}
            href={href}
            className="flex flex-1 flex-col items-center gap-1 pt-2 pb-4"
          >
            {/* Top accent line */}
            <span
              className={cn(
                'mb-1 h-0.5 w-8 rounded-full transition-all duration-300',
                active ? 'bg-brand-gold opacity-100' : 'opacity-0',
              )}
            />

            {/* Icon */}
            <div
              className={cn(
                'flex h-8 w-12 items-center justify-center rounded-xl transition-all duration-200',
                active ? 'bg-brand-gold/15' : '',
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5 transition-colors duration-200',
                  active ? 'text-brand-gold' : 'text-white/40',
                )}
              />
            </div>

            {/* Label */}
            <span
              className={cn(
                'text-[10px] font-semibold tracking-wide transition-colors duration-200',
                active ? 'text-brand-gold' : 'text-white/40',
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
