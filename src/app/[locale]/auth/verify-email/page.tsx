import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { VerifyEmailCard } from './_components/VerifyEmailCard';

export default function VerifyEmailPage() {
  return (
    <main className="bg-brand-navy flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <div className="mb-8">
        <Logo variant="light" size="md" />
      </div>

      {/* VerifyEmailCard reads searchParams → must live inside Suspense */}
      <Suspense
        fallback={
          <Loader2 className="text-brand-gold h-12 w-12 animate-spin" />
        }
      >
        <VerifyEmailCard />
      </Suspense>
    </main>
  );
}
