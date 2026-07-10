import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const STEPS = [
  { title: 'Course Info', desc: 'Details, thumbnail & pricing' },
  { title: 'Course Content', desc: 'Modules & lessons' },
  { title: 'Preview & Publish', desc: 'Review final summary' },
];

interface StepBarProps {
  current: number;
}

export function StepBar({ current }: StepBarProps) {
  return (
    <div className="grid grid-cols-3 gap-3 bg-transparent">
      {STEPS.map((step, i) => {
        const n = i + 1;
        const isActive = current === n;
        const isDone = current > n;
        return (
          <div
            key={n}
            className={cn(
              'flex items-center gap-2.5 rounded-xl border p-3 transition-all',
              isActive
                ? 'border-brand-gold ring-brand-gold/10 bg-white shadow-sm ring-1'
                : 'border-slate-200 bg-white',
            )}
          >
            <div
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all',
                isDone
                  ? 'bg-brand-gold text-white'
                  : isActive
                    ? 'border-brand-gold text-brand-gold border-2 bg-white'
                    : 'bg-slate-100 text-slate-400',
              )}
            >
              {isDone ? <ClipboardCheck className="h-4 w-4" /> : n}
            </div>
            <div className="min-w-0">
              <p
                className={cn(
                  'truncate text-xs font-bold transition-colors',
                  isActive ? 'text-brand-navy' : 'text-slate-500',
                )}
              >
                {step.title}
              </p>
              <p className="truncate text-[10px] text-slate-400">{step.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
