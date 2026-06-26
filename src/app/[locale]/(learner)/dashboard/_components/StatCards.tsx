import Link from 'next/link';
import { Clock } from 'lucide-react';
import { MOCK_USER } from '@/config/learner';
import WeeklyStreak from './WeeklyStreak';

const XP_PCT = Math.round((MOCK_USER.xp / MOCK_USER.nextLevelXp) * 100);

export default function StatCards() {
  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <WeeklyStreak />

      {/* <CourseStatsCard /> */}

      {/* Study time */}
      <Link
        href="/progress"
        className="flex flex-col rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300"
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
              Study time
            </p>
            <p className="text-brand-navy mt-1 text-3xl font-black">
              {MOCK_USER.weeklyLearned}
            </p>
            <p className="text-brand-gold mt-0.5 text-[11px] font-semibold">
              +1h vs last week
            </p>
          </div>
          <div className="bg-brand-navy flex h-9 w-9 items-center justify-center rounded-full">
            <Clock className="h-4 w-4 text-white" />
          </div>
        </div>

        <div className="mb-4 flex gap-6 border-t border-slate-100 pt-3 text-[11px]">
          <div>
            <p className="text-slate-400">Daily goal</p>
            <p className="text-brand-navy font-bold">{MOCK_USER.dailyGoal}</p>
          </div>
          <div>
            <p className="text-slate-400">XP earned</p>
            <p className="text-brand-navy font-bold">
              {MOCK_USER.xp.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <div className="mb-1.5 flex items-center justify-between text-[10px] text-slate-400">
            <span>Level {MOCK_USER.level}</span>
            <span>
              {XP_PCT}% to Level {MOCK_USER.level + 1}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="bg-brand-gold h-full rounded-full"
              style={{ width: `${XP_PCT}%` }}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
