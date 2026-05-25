import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary';

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  icon?: ReactNode;
  iconPosition?: 'leading' | 'trailing';
  className?: string;
  children: ReactNode;
}

const BASE_CLASSES =
  'group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-brand-gold text-brand-navy hover:bg-brand-gold-dark focus-visible:ring-brand-gold',
  secondary:
    'border border-brand-navy/15 bg-white text-brand-navy hover:border-brand-navy/30 hover:bg-brand-navy/[0.03] focus-visible:ring-brand-navy',
};

export function ButtonLink({
  href,
  variant = 'primary',
  icon,
  iconPosition = 'trailing',
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], className)}
    >
      {icon && iconPosition === 'leading' && (
        <span className="transition-[translate] duration-200 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'trailing' && (
        <span className="transition-[translate] duration-200 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </Link>
  );
}
