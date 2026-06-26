'use client';

import { Award } from 'lucide-react';
import { RECENT_ACHIEVEMENTS } from '@/constants/learner';
import { useLearnerDashboardT } from '@/i18n';
import { useInView } from '@/hooks/useInView';
import { entranceClass, entranceStyle } from '@/lib/utils/animation';
import { cn } from '@/lib/utils/cn';

export default function RecentAchievements() {
  const t = useLearnerDashboardT();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn(
        'border-border bg-card rounded-2xl border p-5 shadow-sm transition-all duration-500 ease-out',
        entranceClass(inView, 'sm'),
      )}
      style={entranceStyle(inView, 160)}
    >
      <h3 className="text-foreground mb-4 text-base font-bold">
        {t('recentAchievements')}
      </h3>

      <div className="space-y-3">
        {RECENT_ACHIEVEMENTS.map((achievement, i) => (
          <div
            key={achievement.id}
            className={cn(
              'group flex cursor-default items-center gap-3 rounded-xl p-1.5 transition-all duration-500 ease-out hover:bg-amber-50/60 dark:hover:bg-amber-950/30',
              entranceClass(inView, 'sm'),
            )}
            style={entranceStyle(inView, 200 + i * 60)}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 transition-transform duration-200 group-hover:scale-110 dark:bg-amber-500/20">
              <Award
                className="text-brand-gold h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
                aria-hidden
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-foreground group-hover:text-brand-gold text-sm leading-tight font-bold transition-colors duration-150">
                {t(`achievements.${achievement.id}.title`)}
              </p>
              <p className="text-muted-foreground mt-0.5 truncate text-xs">
                {t(`achievements.${achievement.id}.description`)}
              </p>
            </div>

            <span className="text-brand-gold bg-brand-gold/10 dark:bg-brand-gold/20 shrink-0 rounded-full px-2.5 py-1 text-xs font-bold transition-all duration-150 group-hover:scale-105">
              +{achievement.xp}&thinsp;{t('xpSuffix')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
