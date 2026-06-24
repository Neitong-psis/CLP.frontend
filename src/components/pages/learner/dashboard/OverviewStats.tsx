'use client';

import { BookOpen, Zap, Flame, Trophy } from 'lucide-react';
import { MOCK_USER } from '@/config/learner';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { entranceClass, entranceStyle } from '@/lib/utils/animation';
import { cn } from '@/lib/utils/cn';

interface StatDef {
  icon: React.ElementType;
  iconBg: string;
  iconFg: string;
  value: number;
  label: string;
  sub: string;
  format: (n: number) => string;
  countDelay: number;
}

const STATS: StatDef[] = [
  {
    icon: BookOpen,
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    iconFg: 'text-blue-500',
    value: MOCK_USER.lessonsCompleted,
    label: 'Lessons Completed',
    sub: `${MOCK_USER.lessonsThisWeek} this week`,
    format: (n) => String(Math.round(n)),
    countDelay: 0,
  },
  {
    icon: Zap,
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    iconFg: 'text-brand-gold',
    value: MOCK_USER.xp,
    label: 'Total XP',
    sub: `${MOCK_USER.xpThisWeek.toLocaleString()} this week`,
    format: (n) => Math.round(n).toLocaleString(),
    countDelay: 80,
  },
  {
    icon: Flame,
    iconBg: 'bg-orange-500/10 dark:bg-orange-500/20',
    iconFg: 'text-orange-500',
    value: MOCK_USER.streak,
    label: 'Current Streak',
    sub: `Best: ${MOCK_USER.personalBestStreak} days`,
    format: (n) => `${Math.round(n)} Days`,
    countDelay: 160,
  },
  {
    icon: Trophy,
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    iconFg: 'text-emerald-500',
    value: 18,
    label: 'Rank',
    sub: 'Among all learners',
    format: (n) => `Top ${Math.round(n)}%`,
    countDelay: 240,
  },
];

interface StatCardProps {
  stat: StatDef;
  active: boolean;
  entranceDelay: number;
}

function StatCard({ stat, active, entranceDelay }: StatCardProps) {
  const count = useCountUp(stat.value, { active, delay: stat.countDelay });
  const Icon = stat.icon;

  return (
    <div
      className={cn(
        'transition-all duration-700 ease-out',
        entranceClass(active, 'sm'),
      )}
      style={entranceStyle(active, entranceDelay)}
    >
      <div className="border-border bg-card group/card flex h-full cursor-default items-start gap-4 rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover/card:scale-110',
            stat.iconBg,
          )}
        >
          <Icon className={cn('h-5 w-5', stat.iconFg)} aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="text-foreground text-2xl leading-none font-black tabular-nums">
            {stat.format(count)}
          </p>
          <p className="text-foreground mt-1 text-sm font-semibold">
            {stat.label}
          </p>
          <p className="text-muted-foreground mt-0.5 text-xs">{stat.sub}</p>
        </div>
      </div>
    </div>
  );
}

export default function OverviewStats() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div ref={ref} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat, i) => (
        <StatCard
          key={stat.label}
          stat={stat}
          active={inView}
          entranceDelay={i * 80}
        />
      ))}
    </div>
  );
}
