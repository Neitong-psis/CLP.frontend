'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
          403
        </p>
        <h1 className="text-foreground text-2xl font-bold">Access denied</h1>
        <p className="text-muted-foreground max-w-md text-sm">
          Your account does not have permission to view this page. If you think
          this is a mistake, contact an administrator.
        </p>
      </div>
      <div className="flex gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/auth">Switch account</Link>
        </Button>
      </div>
    </main>
  );
}
