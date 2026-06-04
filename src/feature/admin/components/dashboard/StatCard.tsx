import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface StatCardProps {
  label: string;
  value: string;
  change: string;
  variant?: 'plain' | 'accent';
  icon?: LucideIcon;
  spark?: readonly number[];
}

// ─── Change badge ─────────────────────────────────────────────────────────────

function ChangeBadge({ change }: { change: string }) {
  const neg = change.startsWith('-');
  const Icon = neg ? ArrowDownRight : ArrowUpRight;
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-medium tabular-nums',
        neg ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600',
      )}
    >
      <Icon className="size-3" aria-hidden="true" />
      {change}
    </span>
  );
}

// ─── Sparkline ────────────────────────────────────────────────────────────────

function Sparkline({ data }: { data: readonly number[] }) {
  const W = 80;
  const H = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => {
    const x = data.length > 1 ? (i / (data.length - 1)) * W : 0;
    const y = H - 2 - ((v - min) / range) * (H - 4);
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  });
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p}`).join(' ');
  const area = `${line} L${W} ${H} L0 ${H} Z`;

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      className="text-accent-blue shrink-0"
      aria-hidden="true"
    >
      <path d={area} fill="currentColor" fillOpacity={0.12} />
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

const changeTone = (change: string) =>
  change.startsWith('-') ? 'text-rose-600' : 'text-emerald-600';

export function StatCard({
  label,
  value,
  change,
  variant = 'plain',
  icon: Icon,
  spark,
}: StatCardProps) {
  if (variant === 'accent') {
    return (
      <div className="from-accent-blue to-accent-indigo group flex flex-col rounded-2xl bg-linear-to-br p-5 text-white transition-transform duration-200 hover:-translate-y-0.5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[13px] text-white/80">{label}</p>
          <span
            className="flex size-7 items-center justify-center rounded-full bg-white/15 transition-colors duration-200 group-hover:bg-white/25"
            aria-hidden="true"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>
        <p className="mt-4 text-[28px] leading-none font-semibold tabular-nums">
          {value}
        </p>
        <p className="mt-2 text-[11px] text-white/70">
          <span className="font-medium text-white/90">{change}</span> vs last
          month
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-2xl border-[0.5px] border-slate-200 bg-white p-5 transition-[transform,border-color] duration-150 hover:-translate-y-0.5 hover:border-slate-300">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] text-slate-500">{label}</p>
        {Icon && (
          <span
            className="bg-accent-blue-soft text-accent-blue flex size-7 shrink-0 items-center justify-center rounded-full"
            aria-hidden="true"
          >
            <Icon className="size-3.5" />
          </span>
        )}
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="text-[28px] leading-none font-semibold text-slate-900 tabular-nums">
          {value}
        </p>
        {spark ? <Sparkline data={spark} /> : <ChangeBadge change={change} />}
      </div>
      <p className="mt-2 text-[11px] text-slate-400">
        {spark && (
          <span className={cn('font-medium', changeTone(change))}>
            {change}{' '}
          </span>
        )}
        vs last month
      </p>
    </div>
  );
}
