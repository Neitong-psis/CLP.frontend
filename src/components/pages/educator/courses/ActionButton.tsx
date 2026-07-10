'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

export type ActionButtonVariant = 'navy' | 'gray' | 'danger' | 'danger-text';

interface ActionButtonProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
  variant?: ActionButtonVariant;
}

const VARIANT_CONFIGS: Record<
  ActionButtonVariant,
  {
    buttonClass: string;
    iconClass: string;
  }
> = {
  navy: {
    buttonClass: 'text-brand-navy border-slate-200 hover:bg-slate-50 px-3.5',
    iconClass: 'text-brand-navy',
  },
  gray: {
    buttonClass: 'text-slate-700 border-slate-200 hover:bg-slate-50 px-3',
    iconClass: 'text-slate-500',
  },
  danger: {
    buttonClass: 'text-red-600 border-red-200 bg-white hover:bg-red-50 px-3',
    iconClass: 'text-red-500',
  },
  'danger-text': {
    buttonClass:
      'text-red-600 border-transparent bg-transparent hover:bg-red-50/50 px-3 shadow-none',
    iconClass: 'text-red-500',
  },
};

export function ActionButton({
  label,
  icon: Icon,
  onClick,
  className = '',
  variant = 'navy',
}: ActionButtonProps) {
  const config = VARIANT_CONFIGS[variant] || VARIANT_CONFIGS.navy;

  return (
    <button
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border py-1.5 text-xs font-bold shadow-sm transition-colors ${config.buttonClass} ${className}`}
    >
      <Icon className={`size-3.5 ${config.iconClass}`} />
      {label}
    </button>
  );
}
