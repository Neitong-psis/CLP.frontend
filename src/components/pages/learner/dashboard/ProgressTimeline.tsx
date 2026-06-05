import { CalendarDays, Flame } from 'lucide-react';

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const WEEKS_TO_SHOW = 24;

function mockMinutes(dayIndex: number): number {
  const v = ((dayIndex * 2654435761 + 1013904223) >>> 0) % 100;
  if (v < 28) return 0;
  if (v < 55) return 10 + (v % 25);
  if (v < 80) return 35 + (v % 40);
  return 80 + (v % 50);
}

type GridDay = { date: Date; minutes: number; inRange: boolean };

function buildGrid() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yearStart = new Date(today.getFullYear(), 0, 1);

  const dow = today.getDay();
  const daysToMon = dow === 0 ? 6 : dow - 1;
  const thisMonday = new Date(today);
  thisMonday.setDate(today.getDate() - daysToMon);

  const gridStart = new Date(thisMonday);
  gridStart.setDate(thisMonday.getDate() - (WEEKS_TO_SHOW - 1) * 7);

  const weeks: GridDay[][] = [];
  const d = new Date(gridStart);

  for (let w = 0; w < WEEKS_TO_SHOW; w++) {
    const week: GridDay[] = [];
    for (let i = 0; i < 7; i++) {
      const current = new Date(d);
      const inRange = current >= yearStart && current <= today;
      const dayIndex = inRange
        ? Math.floor((current.getTime() - yearStart.getTime()) / 86400000)
        : -1;
      week.push({
        date: current,
        minutes: inRange ? mockMinutes(dayIndex) : 0,
        inRange,
      });
      d.setDate(d.getDate() + 1);
    }
    weeks.push(week);
  }

  const monthBreaks: Record<number, string> = {};
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const first = week.find((day) => day.inRange);
    if (first) {
      const m = first.date.getMonth();
      if (m !== lastMonth) {
        monthBreaks[wi] = MONTH_NAMES[m];
        lastMonth = m;
      }
    }
  });

  return { weeks, monthBreaks };
}

function cellClass(minutes: number, inRange: boolean): string {
  if (!inRange) return 'bg-transparent';
  if (minutes === 0) return 'bg-slate-100';
  if (minutes < 30) return 'bg-brand-gold/20';
  if (minutes < 60) return 'bg-brand-gold/45';
  if (minutes < 90) return 'bg-brand-gold/70';
  return 'bg-brand-gold';
}

export default function ProgressTimeline() {
  const { weeks, monthBreaks } = buildGrid();
  const allDays = weeks.flat();
  const activeDays = allDays.filter((d) => d.inRange && d.minutes > 0).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yearStart = new Date(today.getFullYear(), 0, 1);
  let streak = 0;
  const cur = new Date(today);
  while (cur >= yearStart) {
    const dayIndex = Math.floor(
      (cur.getTime() - yearStart.getTime()) / 86400000,
    );
    if (mockMinutes(dayIndex) === 0) break;
    streak++;
    cur.setDate(cur.getDate() - 1);
  }

  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-4">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
          Activity
        </p>
        <div className="flex items-center gap-1">
          <span className="text-[8px] text-slate-400">Less</span>
          {[
            'bg-slate-100',
            'bg-brand-gold/20',
            'bg-brand-gold/50',
            'bg-brand-gold',
          ].map((cls, i) => (
            <div key={i} className={`h-2 w-2 rounded-[1.5px] ${cls}`} />
          ))}
          <span className="text-[8px] text-slate-400">More</span>
        </div>
      </div>

      {/* Heatmap — centred in the remaining flex space */}
      <div className="flex flex-1 items-center">
        <div className="flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              <span className="h-[10px] text-[7px] leading-none font-semibold text-slate-400">
                {monthBreaks[wi] ?? ''}
              </span>
              {week.map((day, di) => (
                <div
                  key={di}
                  title={
                    day.inRange
                      ? `${day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${day.minutes} min`
                      : ''
                  }
                  className={`h-[10px] w-[10px] rounded-[1.5px] ${cellClass(day.minutes, day.inRange)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stats pinned to bottom */}
      <div className="mt-3 flex items-center gap-4 border-t border-slate-100 pt-3">
        <p className="flex items-center gap-1 text-[11px] text-slate-500">
          <CalendarDays className="h-3 w-3" />
          <span className="text-brand-navy font-bold">{activeDays}</span>
          <span>days</span>
        </p>
        <p className="flex items-center gap-1 text-[11px] text-slate-500">
          <Flame className="text-brand-gold h-3 w-3" />
          <span className="text-brand-navy font-bold">{streak}</span>
          <span>streak</span>
        </p>
      </div>
    </div>
  );
}
