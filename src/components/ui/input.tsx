import * as React from 'react';

import { cn } from '@/lib/utils/cn';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'focus-visible:border-brand-gold focus-visible:ring-brand-gold/15 h-9 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm transition-colors outline-none placeholder:text-slate-400 focus-visible:ring-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-50 aria-invalid:border-red-300 aria-invalid:ring-2 aria-invalid:ring-red-100 md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
