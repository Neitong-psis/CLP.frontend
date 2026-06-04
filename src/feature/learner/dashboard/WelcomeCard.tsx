import { Flame, Target, Zap } from 'lucide-react';
import { MOCK_USER, WEEKLY_ACTIVITY } from '@/config/learner';
import { cn } from '@/utils/cn';

const MAX_MINUTES = Math.max(...WEEKLY_ACTIVITY.map((d) => d.minutes));
const XP_PCT = Math.round((MOCK_USER.xp / MOCK_USER.nextLevelXp) * 100);

// Convert JS getDay() (0=Sun) → WEEKLY_ACTIVITY index (0=Mon)
const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

export default function WelcomeCard() {
  return (
    <div className="bg-brand-navy mb-6 overflow-hidden rounded-lg">
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
        {/* Left: hero stat */}
        <div className="flex-1">
          <div className="bg-brand-gold/15 mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1">
            <Flame className="text-brand-gold h-3.5 w-3.5" />
            <span className="text-brand-gold text-xs font-semibold">
              {MOCK_USER.streak}-Day Streak!
            </span>
            <span className="bg-brand-gold/20 text-brand-gold rounded-full px-1.5 py-0.5 text-[10px] font-bold">
              Achieved
            </span>
          </div>

          <div className="mb-1 flex items-baseline gap-2">
            <span className="text-brand-gold text-4xl font-black sm:text-5xl">
              {MOCK_USER.weeklyLearned}
            </span>
            <span className="text-sm font-medium text-white/40">
              learned this week
            </span>
          </div>
          <p className="text-sm text-white/40">
            Keep going — you&apos;re on a roll!
          </p>

          <div className="mt-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white">
              <Target className="text-brand-gold h-3.5 w-3.5" />
              Daily goal: {MOCK_USER.dailyGoal}
            </span>
          </div>
        </div>

        {/* Right: weekly activity bar chart */}
        <div className="shrink-0 rounded-lg border border-white/[0.07] bg-white/[0.04] px-5 pt-4 pb-4">
          <p className="mb-4 text-[10px] font-semibold tracking-widest text-white/30 uppercase">
            Weekly Activity
          </p>
          <div className="flex h-16 items-end gap-1.5">
            {WEEKLY_ACTIVITY.map(({ day, minutes }, i) => {
              const heightPct = Math.max(
                Math.round((minutes / MAX_MINUTES) * 100),
                i <= todayIndex ? 6 : 0,
              );
              const isToday = i === todayIndex;
              const isPast = i < todayIndex;

              return (
                <div
                  key={day}
                  className="flex flex-1 flex-col items-center gap-1.5"
                >
                  <div
                    className={cn(
                      'w-full rounded-sm',
                      isToday
                        ? 'bg-brand-gold'
                        : isPast
                          ? 'bg-brand-gold/45'
                          : 'bg-white/[0.07]',
                    )}
                    style={{ height: `${heightPct}%` }}
                  />
                  <span
                    className={cn(
                      'text-[9px] font-semibold',
                      isToday
                        ? 'text-brand-gold'
                        : isPast
                          ? 'text-white/35'
                          : 'text-white/20',
                    )}
                  >
                    {day[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* XP level progress bar */}
      <div className="border-t border-white/[0.07] px-6 py-3 sm:px-8">
        <div className="mb-2 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 font-semibold text-white/60">
            <Zap className="text-brand-gold h-3 w-3" />
            Level {MOCK_USER.level}
          </span>
          <span className="text-white/35">
            {MOCK_USER.xp.toLocaleString()} /{' '}
            {MOCK_USER.nextLevelXp.toLocaleString()} XP · {XP_PCT}%
          </span>
          <span className="font-semibold text-white/25">
            Level {MOCK_USER.level + 1}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="bg-brand-gold h-full rounded-full"
            style={{ width: `${XP_PCT}%` }}
          />
        </div>
      </div>
    </div>
  );
}
