import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { ResetPasswordCard } from './_card';

export default function ResetPasswordPage() {
  return (
    <main className="bg-brand-navy flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <div className="mb-8">
        <Logo variant="light" size="md" />
      </div>

      <Suspense
        fallback={
          <Loader2 className="text-brand-gold h-12 w-12 animate-spin" />
        }
      >
        <ResetPasswordCard />
      </Suspense>
    </main>
  );
}
