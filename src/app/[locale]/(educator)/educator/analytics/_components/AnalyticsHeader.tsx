'use client';

import { useState } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const RANGES = ['7D', '30D', '90D', '1Y'] as const;
type Range = (typeof RANGES)[number];

export function AnalyticsHeader() {
  // Presentational for now — the active range will drive the API query once the
  // analytics endpoints are wired (see CLAUDE.md · Frontend ↔ Backend).
  const [range, setRange] = useState<Range>('7D');

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <p className="text-[11px] font-medium text-slate-500">
          Live · last updated{' '}
          <span className="text-brand-navy font-semibold">Jun 12, 2026</span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Range segmented control */}
        <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-sm">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={cn(
                'rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all duration-200',
                range === r
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600',
              )}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Refresh */}
        <button
          type="button"
          aria-label="Refresh analytics"
          className="group flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
        >
          <RefreshCw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180" />
        </button>

        {/* Export */}
        <button
          type="button"
          className="bg-brand-navy hover:shadow-brand-navy/30 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>
    </div>
  );
}
