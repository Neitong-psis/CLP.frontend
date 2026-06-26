'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { TODAY_PLAN } from '@/constants/learner';
import { useLearnerDashboardT } from '@/i18n';
import { useInView } from '@/hooks/useInView';
import { entranceClass, entranceStyle } from '@/lib/utils/animation';
import { cn } from '@/lib/utils/cn';

const UNIT_KEY: Record<string, string> = {
  min: 'unitMin',
  lesson: 'unitLesson',
  '%': 'unitPercent',
};

export default function TodaysPlan() {
  const t = useLearnerDashboardT();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setBarsVisible(true), 200);
    return () => clearTimeout(id);
  }, [inView]);

  return (
    <div
      ref={ref}
      className={cn(
        'border-border bg-card rounded-2xl border p-5 shadow-sm',
        entranceClass(inView, 'sm'),
      )}
      style={entranceStyle(inView, 0)}
    >
      <h3 className="text-foreground mb-4 text-base font-bold">
        {t('todaysPlan')}
      </h3>

      <div className="space-y-4">
        {TODAY_PLAN.map((goal, i) => {
          const pct = Math.min(
            100,
            Math.round((goal.current / goal.target) * 100),
          );

          return (
            <div key={goal.id}>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  {goal.done ? (
                    <CheckCircle2
                      className="text-brand-gold h-4 w-4 shrink-0"
                      aria-label="Done"
                    />
                  ) : (
                    <Circle
                      className="text-brand-gold/30 h-4 w-4 shrink-0"
                      aria-label="Pending"
                    />
                  )}
                  <span
                    className={cn(
                      'truncate text-sm font-medium',
                      goal.done ? 'text-muted-foreground' : 'text-foreground',
                    )}
                  >
                    {t(`plan.${goal.id}`)}
                  </span>
                </div>
                <span className="text-muted-foreground shrink-0 text-xs font-semibold">
                  {goal.current}&thinsp;/&thinsp;{goal.target}&thinsp;
                  {t(UNIT_KEY[goal.unit] ?? 'unitMin')}
                </span>
              </div>

              <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                <div
                  className={cn(
                    'h-full rounded-full transition-[width] duration-700 ease-out',
                    goal.done ? 'bg-brand-gold/60' : 'bg-brand-gold',
                  )}
                  style={{
                    width: barsVisible ? `${pct}%` : '0%',
                    transitionDelay: `${i * 120}ms`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
