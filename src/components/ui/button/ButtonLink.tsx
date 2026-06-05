import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { cvm, type VariantProps } from '@/lib/utils/cva';

const buttonLinkVariants = cvm(
  'group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-gold text-brand-navy hover:bg-brand-gold-dark focus-visible:ring-brand-gold',
        secondary:
          'border border-brand-navy/15 bg-white text-brand-navy hover:border-brand-navy/30 hover:bg-brand-navy/[0.03] focus-visible:ring-brand-navy',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
);

export interface ButtonLinkProps
  extends ComponentProps<typeof Link>, VariantProps<typeof buttonLinkVariants> {
  icon?: ReactNode;
  iconPosition?: 'leading' | 'trailing';
}

export function ButtonLink({
  variant,
  icon,
  iconPosition = 'trailing',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonLinkVariants({ variant }), className)} {...props}>
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
