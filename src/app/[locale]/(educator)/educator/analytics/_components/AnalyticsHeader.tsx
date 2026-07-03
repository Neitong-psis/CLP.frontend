'use client';

import { Download } from 'lucide-react';
import { useEducatorAnalyticsT } from '@/i18n';

export function AnalyticsHeader() {
  const t = useEducatorAnalyticsT();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <p className="text-muted-foreground text-[11px] font-medium">
          {t('liveLastUpdated')}{' '}
          <span className="text-foreground font-semibold">Jun 12, 2026</span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="bg-brand-navy hover:shadow-brand-navy/30 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{t('export')}</span>
        </button>
      </div>
    </div>
  );
}
