import { GraduationCap, BadgeCheck, Clock } from 'lucide-react';
import { ENROLLED_COURSES } from '@/config/learner';

const totalEnrolled = ENROLLED_COURSES.length;
const completed = ENROLLED_COURSES.filter((c) => c.completed).length;
const hoursSpent = Math.round(
  ENROLLED_COURSES.reduce((sum, c) => sum + (c.hours * c.progress) / 100, 0),
);
const avgProgressPct = Math.round(
  ENROLLED_COURSES.reduce((sum, c) => sum + c.progress, 0) /
    ENROLLED_COURSES.length,
);
const completionRatePct = Math.round((completed / totalEnrolled) * 100);

function Ring({ pct, value }: { pct: number; value: string | number }) {
  const size = 44;
  const sw = 3.5;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (pct / 100) * circ;

  return (
    <div
      className="text-brand-gold relative shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={sw}
          strokeOpacity={0.1}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circ - filled}`}
        />
      </svg>
      <span className="text-brand-navy absolute inset-0 flex items-center justify-center text-[11px] font-black">
        {value}
      </span>
    </div>
  );
}

export default function CourseStatsCard() {
  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-5">
      <p className="mb-4 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
        Course overview
      </p>

      <div className="flex flex-1 flex-col justify-between divide-y divide-slate-100">
        {/* Total enrolled */}
        <div className="flex items-center gap-3 py-3 pt-0">
          <div className="bg-brand-navy flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <p className="text-brand-navy min-w-0 flex-1 text-sm font-semibold">
            Total enroll courses
          </p>
          <Ring pct={avgProgressPct} value={totalEnrolled} />
        </div>

        {/* Completed */}
        <div className="flex items-center gap-3 py-3">
          <div className="bg-brand-navy flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
            <BadgeCheck className="h-4 w-4 text-white" />
          </div>
          <p className="text-brand-navy min-w-0 flex-1 text-sm font-semibold">
            Course completed
          </p>
          <Ring pct={completionRatePct} value={completed} />
        </div>

        {/* Hours spent */}
        <div className="flex items-center gap-3 py-3 pb-0">
          <div className="bg-brand-navy flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
            <Clock className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-brand-navy text-sm font-semibold">Hours spent</p>
          </div>
          <span className="text-brand-navy shrink-0 text-sm font-bold">
            {hoursSpent}h
          </span>
        </div>
      </div>
    </div>
  );
}
