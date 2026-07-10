import type { ReactNode } from 'react';

interface CheckoutLayoutProps {
  readonly main: ReactNode;
  readonly summary: ReactNode;
}

/**
 * The two-column shell: 60/40 on desktop, 70/30 on tablet, a single stacked
 * column on mobile (the order summary drops below the form there — see
 * `summary`'s own sticky behaviour, which only engages at `lg`).
 *
 * `fixed inset-0 z-50` covers the learner app's persistent nav shell rather
 * than routing around it — the `(learner)` route group's layout always
 * renders that sidebar, and a distraction-free checkout can't share the
 * screen with it. `LearnerCoursePlayer` (the lesson player) uses the same
 * trick for the same reason.
 */
export function CheckoutLayout({ main, summary }: CheckoutLayoutProps) {
  return (
    <div className="bg-checkout-surface fixed inset-0 z-50 overflow-y-auto">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-4 py-8 sm:px-6 md:grid-cols-[70%_30%] md:gap-10 lg:grid-cols-[60%_40%] lg:gap-12 lg:px-8 lg:py-12">
        <div className="min-w-0">{main}</div>
        <div className="min-w-0 lg:sticky lg:top-6 lg:self-start">
          {summary}
        </div>
      </div>
    </div>
  );
}
