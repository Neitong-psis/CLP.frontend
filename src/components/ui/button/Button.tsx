import {
  Children,
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type Ref,
} from 'react';
import { cn } from '@/lib/utils/cn';
import { cvm, type VariantProps } from '@/lib/utils/cva';

export const buttonVariants = cvm(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-brand-navy text-white hover:bg-brand-navy-tint focus-visible:ring-brand-navy dark:bg-brand-gold dark:text-brand-navy dark:hover:bg-brand-gold-dark dark:focus-visible:ring-brand-gold',
        outline:
          'border border-brand-navy/15 bg-transparent text-brand-navy hover:bg-brand-navy/[0.04] focus-visible:ring-brand-navy dark:border-white/25 dark:text-white/80 dark:hover:bg-white/[0.07] dark:hover:text-white',
        ghost:
          'text-brand-navy hover:bg-brand-navy/[0.06] focus-visible:ring-brand-navy dark:text-white/70 dark:hover:bg-white/[0.07] dark:hover:text-white',
        destructive:
          'bg-brand-red text-white hover:bg-brand-red/90 focus-visible:ring-brand-red',
        secondary:
          'bg-brand-gold text-brand-navy hover:bg-brand-gold-dark focus-visible:ring-brand-gold',
        link: 'h-auto p-0 text-brand-navy underline-offset-4 hover:underline focus-visible:ring-brand-navy',
      },
      size: {
        default:
          'h-10 px-4 py-2 has-data-[icon=inline-start]:pl-3 has-data-[icon=inline-end]:pr-3',
        xs: 'h-7 px-2 text-xs has-data-[icon=inline-start]:pl-1.5 has-data-[icon=inline-end]:pr-1.5',
        sm: 'h-9 px-3 has-data-[icon=inline-start]:pl-2 has-data-[icon=inline-end]:pr-2',
        lg: 'h-11 px-6 has-data-[icon=inline-start]:pl-4 has-data-[icon=inline-end]:pr-4',
        icon: 'size-10',
        'icon-xs': 'size-7',
        'icon-sm': 'size-9',
        'icon-lg': 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

type SlottableProps = {
  className?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  ref?: Ref<HTMLElement>;
};

export function Button({
  variant,
  size,
  asChild = false,
  className,
  children,
  type,
  onClick,
  ...props
}: ButtonProps) {
  const classes = buttonVariants({ variant, size, className });

  if (asChild) {
    const child = Children.only(children) as ReactElement<SlottableProps>;
    if (!isValidElement(child)) return null;

    const childOnClick = child.props.onClick;

    return cloneElement(child, {
      ...props,
      className: cn(classes, child.props.className),
      onClick: (event: MouseEvent<HTMLElement>) => {
        childOnClick?.(event);
        if (!event.defaultPrevented)
          onClick?.(event as MouseEvent<HTMLButtonElement>);
      },
    });
  }

  return (
    <button
      type={type ?? 'button'}
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
