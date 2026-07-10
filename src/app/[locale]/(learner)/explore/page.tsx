'use client';

import { useState, useCallback } from 'react';
import { Ticket } from 'lucide-react';
import { useLearnerExploreT } from '@/i18n';
import { EXPLORE_COURSES } from '@/config/learner';
import { useCurrentUser } from '@/hooks/use-current-user';
import TopBar from '@/components/pages/learner/TopBar';
import { PageHero } from '@/components/common/PageHero';
import ExploreFilter from './_components/ExploreFilter';
import { RedeemCodeModal } from './_components/RedeemCodeModal';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';

export default function ExplorePage() {
  const t = useLearnerExploreT();
  const { firstName, email } = useCurrentUser();
  const [redeemOpen, setRedeemOpen] = useState(false);
  // Bumped after a successful redeem so ExploreFilter re-reads localStorage
  // and immediately reflects the new enrollment (e.g. the "Enrolled" badge).
  const [redeemedAt, setRedeemedAt] = useState(0);

  const handleRedeemSuccess = useCallback(() => {
    setRedeemedAt(Date.now());
  }, []);

  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <TopBar
        role="learner"
        title={t('title')}
        subtitle={t('subtitle', { email })}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <PageHero
          className="mb-6"
          title={t('heroTitle', { name: firstName })}
          description={t('heroDesc')}
          action={
            <button
              type="button"
              onClick={() => setRedeemOpen(true)}
              className="border-brand-gold/40 text-brand-gold bg-brand-gold/5 hover:bg-brand-gold/10 flex h-10 shrink-0 items-center gap-1.5 rounded-xl border px-3.5 text-sm font-semibold transition-colors"
            >
              <Ticket className="size-4" />
              {t('redeem.button')}
            </button>
          }
        />
        <ExploreFilter key={redeemedAt} courses={EXPLORE_COURSES} />
      </div>

      <FooterBottomBar theme="light" />

      {redeemOpen && (
        <RedeemCodeModal
          onClose={() => setRedeemOpen(false)}
          onSuccess={handleRedeemSuccess}
        />
      )}
    </div>
  );
}
