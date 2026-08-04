import { Flame, BookOpen, Trophy, Award } from 'lucide-react';
import { MOCK_USER, ENROLLED_COURSES } from '@/constants/learner';

function AvatarRing({ pct, initials }: { pct: number; initials: string }) {
  const size = 72;
  const sw = 3.5;
  const r = (size - sw * 2) / 2;
  const circ = 2 * Math.PI * r;
  const arcLen = circ * 0.75;
  const gapLen = circ * 0.25;
  const progress = (arcLen * Math.min(pct, 100)) / 100;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="absolute inset-0"
        style={{ transform: 'rotate(135deg)' }}
      >
        {/* Track arc — 270° */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={`${arcLen} ${gapLen}`}
          className="text-slate-100"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circ - progress}`}
          className="text-brand-gold"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-brand-gold flex h-[56px] w-[56px] items-center justify-center rounded-full text-base font-black text-white">
          {initials}
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
  iconBg,
  iconFg,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  iconBg: string;
  iconFg: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 px-4 py-4">
      <div className="flex items-center gap-2">
        <div
          className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${iconBg}`}
        >
          <Icon className={`h-3 w-3 ${iconFg}`} />
        </div>
        <span className="text-brand-navy text-xl leading-none font-black">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <p className="text-[10px] font-medium text-slate-400">{label}</p>
    </div>
  );
}

export default function WeeklyStreak() {
  const enrolled = ENROLLED_COURSES.length;
  const completed = ENROLLED_COURSES.filter((c) => c.completed).length;
  const avgProgress = Math.round(
    ENROLLED_COURSES.reduce((s, c) => s + c.progress, 0) / enrolled,
  );

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
      {/* Profile row — flex-1 so it fills extra height when siblings are taller */}
      <div className="flex flex-1 items-center gap-4 px-5 py-5">
        <AvatarRing pct={avgProgress} initials={MOCK_USER.initials} />

        <div className="min-w-0">
          <p className="text-brand-navy truncate text-sm leading-tight font-bold">
            {MOCK_USER.name}
          </p>
          <p className="mt-0.5 truncate text-[11px] text-slate-400">
            Level {MOCK_USER.level} · {MOCK_USER.role}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <Award className="text-brand-gold h-3.5 w-3.5 fill-current" />
            <span className="text-[11px] font-semibold text-slate-600">
              {MOCK_USER.xp.toLocaleString()} Points
            </span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100">
        <Stat
          icon={Flame}
          value={MOCK_USER.streak}
          label="Days Streak"
          iconBg="bg-brand-gold/15"
          iconFg="text-brand-gold"
        />
        <Stat
          icon={BookOpen}
          value={enrolled}
          label="Enrolled"
          iconBg="bg-brand-navy/10"
          iconFg="text-brand-navy"
        />
        <Stat
          icon={Trophy}
          value={completed}
          label="Completed"
          iconBg="bg-brand-gold/20"
          iconFg="text-brand-gold"
        />
      </div>
    </div>
  );
}
