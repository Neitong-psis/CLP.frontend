'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  align?: 'start' | 'center' | 'end';
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Select option',
  className,
  triggerClassName,
  align = 'start',
}: CustomSelectProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val || '')}>
      <SelectTrigger
        className={cn(
          'focus:border-brand-gold/50 focus:ring-brand-gold/10 !h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 transition-colors outline-none placeholder:text-slate-400 hover:bg-slate-50/50 focus:ring-2',
          triggerClassName,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        align={align}
        className={cn(
          'z-50 rounded-lg border border-slate-200 bg-white p-1 shadow-md',
          className,
        )}
      >
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className="cursor-pointer rounded px-2.5 py-1.5 text-xs text-slate-700 outline-none hover:bg-slate-50 focus:bg-slate-50 focus:text-slate-900"
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
