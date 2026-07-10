import React from 'react';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface VisibilityToggleProps {
  value: 'draft' | 'published';
  onChange: (v: 'draft' | 'published') => void;
}

export function VisibilityToggle({ value, onChange }: VisibilityToggleProps) {
  const opts = [
    {
      value: 'draft' as const,
      label: 'Draft',
      icon: EyeOff,
      desc: 'Only visible to you',
    },
    {
      value: 'published' as const,
      label: 'Published',
      icon: Eye,
      desc: 'Visible to everyone',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {opts.map((opt) => {
        const Icon = opt.icon;
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-150',
              active
                ? 'border-brand-gold bg-brand-gold/5 ring-brand-gold/30 ring-1'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
            )}
          >
            <div
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                active
                  ? 'bg-brand-gold text-white'
                  : 'bg-slate-100 text-slate-400',
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p
                className={cn(
                  'text-sm font-semibold',
                  active ? 'text-brand-navy' : 'text-slate-700',
                )}
              >
                {opt.label}
              </p>
              <p className="text-[11px] text-slate-400">{opt.desc}</p>
            </div>
            {active && (
              <CheckCircle2 className="text-brand-gold ml-auto h-4 w-4 shrink-0" />
            )}
          </button>
        );
      })}
    </div>
  );
}
