import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './cn';

export { cva, type VariantProps };

export function cvm<T>(
  ...args: Parameters<typeof cva<T>>
): (props?: Parameters<ReturnType<typeof cva<T>>>[0]) => string {
  const variants = cva<T>(...args);
  return (props) => cn(variants(props));
}
