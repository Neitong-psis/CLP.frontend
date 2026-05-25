'use client';

import { RefreshCw } from 'lucide-react';

interface RetryButtonProps {
  onRetry: () => void;
}

export function RetryButton({ onRetry }: RetryButtonProps) {
  return (
    <button
      onClick={onRetry}
      className="inline-flex items-center gap-2 rounded-full bg-[#f4a300] px-6 py-2.5 text-sm font-semibold text-[#00003e] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e09400] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a300] focus-visible:ring-offset-2"
    >
      <RefreshCw aria-hidden className="h-4 w-4" />
      Try again
    </button>
  );
}
