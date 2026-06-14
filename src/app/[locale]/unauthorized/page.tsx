'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-widest text-slate-400 uppercase">
          403
        </p>
        <h1 className="text-2xl font-bold text-slate-900">Access denied</h1>
        <p className="max-w-md text-sm text-slate-600">
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
