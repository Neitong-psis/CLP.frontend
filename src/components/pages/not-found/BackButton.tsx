'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 rounded-full border border-[#00003e]/20 px-6 py-2.5 text-sm font-semibold text-[#00003e] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00003e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a300]"
    >
      <ArrowLeft aria-hidden className="h-4 w-4" />
      Go back
    </button>
  );
}
