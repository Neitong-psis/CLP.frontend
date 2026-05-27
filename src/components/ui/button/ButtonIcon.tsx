import type { ReactNode } from 'react';
import { Button, type ButtonProps } from './Button';

type IconSize = 'icon-xs' | 'icon-sm' | 'icon' | 'icon-lg';

export interface ButtonIconProps extends Omit<
  ButtonProps,
  'size' | 'children'
> {
  size?: IconSize;
  'aria-label': string;
  children: ReactNode;
}

export function ButtonIcon({
  variant = 'outline',
  size = 'icon',
  children,
  ...props
}: ButtonIconProps) {
  return (
    <Button variant={variant} size={size} {...props}>
      {children}
    </Button>
  );
}
