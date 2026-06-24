'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { EMAIL_CONFIRMED_CHANNEL } from '@/lib/auth/constants';
import { WaitingView } from './WaitingView';
import { ConfirmedView } from './ConfirmedView';

type Status = 'waiting' | 'confirmed';

/**
 * Stateful card that drives the verify-email experience:
 *  - "waiting"   → user has registered but not yet clicked the email link
 *  - "confirmed" → BroadcastChannel message received from /confirm-email
 *
 * The `key={status}` on the inner div re-mounts the view on every transition,
 * so each state's entrance animation fires cleanly from scratch.
 */
export function VerifyEmailCard() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [status, setStatus] = useState<Status>('waiting');

  useEffect(() => {
    if (!('BroadcastChannel' in window)) return;
    const channel = new BroadcastChannel(EMAIL_CONFIRMED_CHANNEL);
    channel.onmessage = () => setStatus('confirmed');
    return () => channel.close();
  }, []);

  return (
    <div className="animate-fade-in w-full max-w-md rounded-2xl bg-white px-8 py-10 shadow-2xl shadow-black/40">
      <div key={status} className="animate-fade-in">
        {status === 'waiting' ? (
          <WaitingView email={email} />
        ) : (
          <ConfirmedView />
        )}
      </div>
    </div>
  );
}
