import * as React from 'react';

import { cn } from '@/lib/utils/cn';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-brand-gold focus-visible:ring-brand-gold/15 disabled:bg-muted flex min-h-16 w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-300 aria-invalid:ring-2 aria-invalid:ring-red-100 md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
