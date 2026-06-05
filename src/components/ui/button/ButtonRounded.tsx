import { cn } from '@/lib/utils/cn';
import { Button, type ButtonProps } from './Button';

export function ButtonRounded({ className, ...props }: ButtonProps) {
  return <Button className={cn('rounded-full', className)} {...props} />;
}
