'use client';

import { useId } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useEducatorAnalyticsMetricsT } from '@/i18n';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/lib/utils/cn';
import { METRICS, type Metric } from '../_lib/metrics';

const METRIC_LABEL_KEYS = [
  'totalEarned',
  'thisMonth',
  'lastMonth',
  'revenuePerStudent',
] as const;

const METRIC_CAPTION_KEYS = [
  'allTime',
  'vsLastMonth',
  'vsPriorMonth',
  'perLearner',
] as const;

const SPARK_W = 120;
const SPARK_H = 40;

/** Build a smooth (catmull-rom-ish) line + closed area path for the sparkline. */
function sparkPaths(data: number[]) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const px = (i: number) => (i / (data.length - 1)) * SPARK_W;
  const py = (v: number) => SPARK_H - 4 - ((v - min) / range) * (SPARK_H - 8);

  const pts = data.map((v, i) => ({ x: px(i), y: py(v) }));
  let line = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cx = (prev.x + curr.x) / 2;
    line += ` C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  const area = `${line} L ${SPARK_W} ${SPARK_H} L 0 ${SPARK_H} Z`;
  return { line, area, last: pts[pts.length - 1] };
}

function Sparkline({
  data,
  stroke,
  active,
}: {
  data: number[];
  stroke: string;
  active: boolean;
}) {
  const gradientId = useId();
  const { line, area, last } = sparkPaths(data);

  return (
    <svg
      viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
      preserveAspectRatio="none"
      className="h-10 w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={area}
        fill={`url(#${gradientId})`}
        className={cn(
          'transition-opacity duration-700',
          active ? 'opacity-100' : 'opacity-0',
        )}
      />
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        className={active ? 'animate-draw-line delay-200' : 'opacity-0'}
      />
      <circle
        cx={last.x}
        cy={last.y}
        r="2.6"
        fill={stroke}
        className={cn(
          'transition-opacity delay-500 duration-500',
          active ? 'opacity-100' : 'opacity-0',
        )}
      />
    </svg>
  );
}

function MetricCard({
  metric,
  index,
  active,
  label,
  caption,
}: {
  metric: Metric;
  index: number;
  active: boolean;
  label: string;
  caption: string;
}) {
  const {
    icon: Icon,
    target,
    decimals = 0,
    prefix,
    suffix,
    change,
    trend,
  } = metric;
  const { tile, glow, stroke } = metric.accent;
  const animated = useCountUp(target, { active, delay: index * 120 });
  const TrendIcon = trend === 'up' ? ArrowUpRight : ArrowDownRight;
  const value = decimals
    ? animated.toFixed(decimals)
    : Math.round(animated).toLocaleString();

  return (
    <div
      className={cn(
        'group animate-fade-in-up border-border bg-card relative h-full overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-transparent hover:shadow-xl',
        glow,
      )}
      style={{ animationDelay: `${index * 90}ms` }}
    >
      {/* Hover wash */}
      <div
        className={cn(
          'pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-linear-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100',
          tile,
        )}
      />

      <div className="relative flex items-start justify-between">
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3',
            tile,
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={cn(
            'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold',
            trend === 'up'
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
              : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
          )}
        >
          <TrendIcon className="h-3 w-3" />
          {change}
        </span>
      </div>

      <div className="relative mt-4">
        <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
          {label}
        </p>
        <p className="text-foreground mt-1 text-3xl font-black tracking-tight tabular-nums">
          {prefix}
          {value}
          {suffix}
        </p>
        <p className="text-muted-foreground/60 mt-0.5 text-[10px]">{caption}</p>
      </div>

      <div className="relative mt-3">
        <Sparkline data={metric.spark} stroke={stroke} active={active} />
      </div>
    </div>
  );
}

export function MetricCards() {
  const t = useEducatorAnalyticsMetricsT();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {METRICS.map((metric, i) => (
        <MetricCard
          key={metric.label}
          metric={metric}
          index={i}
          active={inView}
          label={t(METRIC_LABEL_KEYS[i])}
          caption={t(METRIC_CAPTION_KEYS[i])}
        />
      ))}
    </div>
  );
}
