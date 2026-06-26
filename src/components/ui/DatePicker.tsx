'use client';

import { useState } from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';

interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  fromYear?: number;
  toYear?: number;
  disableFuture?: boolean;
  clearLabel?: string;
  todayLabel?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  className,
  fromYear = 1920,
  toYear = new Date().getFullYear(),
  disableFuture = true,
  clearLabel = 'Clear',
  todayLabel = 'Today',
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const parsed = value ? parseISO(value) : undefined;
  const selected = parsed && isValid(parsed) ? parsed : undefined;

  function commit(date: Date | undefined) {
    if (!date) return;
    onChange(format(date, 'yyyy-MM-dd'));
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          'border-border bg-background focus:border-brand-gold focus:ring-brand-gold/10 flex h-11 w-full items-center justify-between gap-2 rounded-xl border px-3 text-left text-sm transition-colors outline-none focus:ring-2',
          className,
        )}
      >
        <span
          className={selected ? 'text-foreground' : 'text-muted-foreground'}
        >
          {selected ? format(selected, 'MMM d, yyyy') : placeholder}
        </span>
        <CalendarIcon className="text-muted-foreground h-4 w-4 shrink-0" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto gap-0 overflow-hidden p-0"
      >
        <Calendar
          mode="single"
          selected={selected}
          onSelect={commit}
          captionLayout="dropdown"
          defaultMonth={selected ?? new Date(2000, 0)}
          startMonth={new Date(fromYear, 0)}
          endMonth={new Date(toYear, 11)}
          disabled={disableFuture ? { after: new Date() } : undefined}
          autoFocus
        />
        <div className="border-border flex items-center justify-between border-t px-3 py-2">
          <button
            type="button"
            onClick={() => {
              onChange('');
              setOpen(false);
            }}
            className="text-muted-foreground text-xs font-medium transition-colors hover:text-rose-500"
          >
            {clearLabel}
          </button>
          <button
            type="button"
            onClick={() => commit(new Date())}
            className="text-brand-gold hover:text-brand-gold-dark text-xs font-semibold transition-colors"
          >
            {todayLabel}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
