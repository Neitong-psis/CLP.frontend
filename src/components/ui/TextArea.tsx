import * as React from 'react';

import { cn } from '@/lib/utils/cn';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'focus-visible:border-brand-gold focus-visible:ring-brand-gold/15 flex min-h-16 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm transition-colors outline-none placeholder:text-slate-400 focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-50 aria-invalid:border-red-300 aria-invalid:ring-2 aria-invalid:ring-red-100 md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
