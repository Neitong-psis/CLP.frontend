import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface CheckoutCardProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/** The one card shell every section of the checkout shares: white, rounded-2xl,
 *  a hairline border, and a barely-there shadow — never more than `shadow-sm`. */
export function CheckoutCard({ children, className }: CheckoutCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8',
        'dark:border-white/10 dark:bg-slate-900',
        className,
      )}
    >
      {children}
    </div>
  );
}
