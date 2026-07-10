'use client';

import { useEffect, useState } from 'react';
import { QrCode, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { KHQR_EXPIRY_SECONDS } from './constants';
import type { useLearnerCheckoutT } from '@/i18n';

type TFn = ReturnType<typeof useLearnerCheckoutT>;

/** A fixed-looking but per-mount pseudo-random 15×15 grid — decorative only;
 *  this demo has no real payment gateway behind it to encode into a real QR. */
function useMockQrPattern(seed: number): boolean[] {
  return Array.from({ length: 15 * 15 }, (_, i) => {
    const x = ((seed + i) * 2654435761) % 2 ** 32;
    return (x >>> 12) % 3 !== 0;
  });
}

function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function KHQRPayment({ t }: { readonly t: TFn }) {
  const [secondsLeft, setSecondsLeft] = useState(KHQR_EXPIRY_SECONDS);
  const [seed, setSeed] = useState(0);
  const pattern = useMockQrPattern(seed);
  const expired = secondsLeft <= 0;

  useEffect(() => {
    if (expired) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [expired]);

  function handleRefresh() {
    setSecondsLeft(KHQR_EXPIRY_SECONDS);
    setSeed((s) => s + 1);
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl bg-slate-50 p-6 text-center dark:bg-white/5">
      <div>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {t('khqrTitle')}
        </p>
        <p className="mt-1 max-w-xs text-xs text-slate-500 dark:text-slate-400">
          {t('khqrDesc')}
        </p>
      </div>

      <div
        className={cn(
          'relative inline-block rounded-xl border border-slate-200 bg-white p-3 transition-opacity',
          expired && 'opacity-30',
        )}
      >
        <div
          aria-hidden
          className="grid gap-px"
          style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' }}
        >
          {pattern.map((filled, i) => (
            <div
              key={i}
              className={cn('size-3', filled ? 'bg-slate-900' : 'bg-white')}
            />
          ))}
        </div>
      </div>

      {expired ? (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            {t('khqrExpired')}
          </p>
          <button
            type="button"
            onClick={handleRefresh}
            className="focus-visible:ring-checkout-accent/40 flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors outline-none hover:bg-slate-100 focus-visible:ring-2 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
          >
            <RefreshCw aria-hidden className="size-3.5" />
            {t('khqrRefresh')}
          </button>
        </div>
      ) : (
        <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <QrCode aria-hidden className="size-3.5" />
          {t('khqrExpiresLabel')}{' '}
          <span
            className="text-checkout-accent font-mono font-semibold tabular-nums"
            role="timer"
            aria-live="off"
          >
            {formatCountdown(secondsLeft)}
          </span>
        </p>
      )}
    </div>
  );
}
