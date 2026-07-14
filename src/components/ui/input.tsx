import * as React from 'react';

import { cn } from '@/lib/utils/cn';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-brand-gold focus-visible:ring-brand-gold/15 disabled:bg-muted h-9 w-full min-w-0 rounded-lg border px-3 py-1.5 text-sm transition-colors outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-300 aria-invalid:ring-2 aria-invalid:ring-red-100 md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
