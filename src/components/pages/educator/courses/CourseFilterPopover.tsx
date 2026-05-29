'use client';

import { useState } from 'react';
import { CalendarIcon, SlidersHorizontal, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/Popover';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldLabel } from '@/components/ui/Field';
import { Label } from '@/components/ui/Label';
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from '@/components/ui/combobox';
import type { CourseStatus } from '@/constants/educator';

// ─── Constants ────────────────────────────────────────────────────────────────

export const CATEGORY_ITEMS = [
  { code: 'web', label: 'Web Development' },
  { code: 'prog', label: 'Programming' },
  { code: 'data', label: 'Data Science' },
  { code: 'cloud', label: 'Cloud Computing' },
  { code: 'devops', label: 'DevOps' },
  { code: 'design', label: 'Design' },
] as const;

export type CategoryItem = (typeof CATEGORY_ITEMS)[number];

const STATUS_ITEMS: {
  value: CourseStatus;
  label: string;
  color: string;
  activeColor: string;
}[] = [
  {
    value: 'Published',
    label: 'Published',
    color: 'border-emerald-200 text-emerald-600 hover:bg-emerald-50',
    activeColor: 'border-emerald-500 bg-emerald-500 text-white',
  },
  {
    value: 'Draft',
    label: 'Draft',
    color: 'border-slate-200 text-slate-600 hover:bg-slate-50',
    activeColor: 'border-slate-700 bg-slate-700 text-white',
  },
  {
    value: 'Under Review',
    label: 'Under Review',
    color: 'border-amber-200 text-amber-600 hover:bg-amber-50',
    activeColor: 'border-amber-500 bg-amber-500 text-white',
  },
];

const LABEL_CLS =
  'text-[11px] font-bold tracking-widest text-slate-400 uppercase';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CourseFilters {
  category: CategoryItem | null;
  startedDate: Date | undefined;
  statuses: CourseStatus[];
}

export const EMPTY_FILTERS: CourseFilters = {
  category: null,
  startedDate: undefined,
  statuses: [],
};

interface CourseFilterPopoverProps {
  value: CourseFilters;
  onApply: (filters: CourseFilters) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CourseFilterPopover({
  value,
  onApply,
}: CourseFilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const [draft, setDraft] = useState<CourseFilters>(value);

  const toggleStatus = (status: CourseStatus) =>
    setDraft((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status],
    }));

  const reset = () => setDraft(EMPTY_FILTERS);

  const apply = () => {
    onApply(draft);
    setOpen(false);
  };

  const activeCount =
    (draft.category ? 1 : 0) +
    (draft.startedDate ? 1 : 0) +
    draft.statuses.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          'inline-flex h-9 items-center gap-2 rounded-lg border px-3.5 text-sm font-medium transition-colors focus:outline-none',
          activeCount > 0
            ? 'border-brand-navy bg-brand-navy text-white'
            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
        )}
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filter
        {activeCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">
            {activeCount}
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={8}
        className="w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-xl shadow-slate-900/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
          <p className="text-sm font-bold text-slate-900">Filter</p>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-slate-600"
            >
              <X className="h-3 w-3" /> Clear all
            </button>
          )}
        </div>

        <div className="space-y-5 px-5 py-4">
          {/* Category */}
          <Field>
            <FieldLabel>
              <Label className={LABEL_CLS}>Category</Label>
            </FieldLabel>
            <Combobox
              items={CATEGORY_ITEMS.map((i) => i.label)}
              onValueChange={(val) =>
                setDraft((prev) => ({
                  ...prev,
                  category: CATEGORY_ITEMS.find((i) => i.label === val) ?? null,
                }))
              }
            >
              <ComboboxInput
                placeholder={draft.category?.label ?? 'All categories'}
                className="w-full"
              />
              <ComboboxContent
                align="start"
                className="border border-slate-200 bg-white shadow-md"
              >
                <ComboboxEmpty className="py-4 text-center text-xs text-slate-400">
                  No categories found.
                </ComboboxEmpty>
                <ComboboxList className="p-1">
                  {(item) => (
                    <ComboboxItem
                      key={item}
                      value={item}
                      className="rounded-md px-3 py-2 text-sm text-slate-700 data-highlighted:bg-slate-50 data-highlighted:text-slate-900"
                    >
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>

          {/* Date */}
          <Field>
            <FieldLabel>
              <Label className={LABEL_CLS}>Started Date</Label>
            </FieldLabel>
            <div className="relative">
              <Popover open={calOpen} onOpenChange={setCalOpen}>
                <PopoverTrigger className="inline-flex h-9 w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-left text-sm font-normal text-slate-600 transition-colors hover:bg-slate-50 focus:outline-none">
                  <CalendarIcon className="h-4 w-4 shrink-0 text-slate-400" />
                  <span
                    className={
                      draft.startedDate ? 'text-slate-800' : 'text-slate-400'
                    }
                  >
                    {draft.startedDate
                      ? format(draft.startedDate, 'PPP')
                      : 'Select date'}
                  </span>
                  {draft.startedDate && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDraft((p) => ({ ...p, startedDate: undefined }));
                      }}
                      className="ml-auto text-slate-300 transition hover:text-slate-500"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-auto overflow-hidden bg-white p-0"
                >
                  <Calendar
                    mode="single"
                    selected={draft.startedDate}
                    defaultMonth={draft.startedDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDraft((prev) => ({ ...prev, startedDate: date }));
                      setCalOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </Field>

          {/* Status */}
          <Field>
            <FieldLabel>
              <Label className={LABEL_CLS}>Status</Label>
            </FieldLabel>
            <div className="flex flex-wrap gap-2">
              {STATUS_ITEMS.map(
                ({ value: status, label, color, activeColor }) => {
                  const active = draft.statuses.includes(status);
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => toggleStatus(status)}
                      className={cn(
                        'rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
                        active ? activeColor : color,
                      )}
                    >
                      {label}
                    </button>
                  );
                },
              )}
            </div>
          </Field>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3.5">
          <button
            type="button"
            onClick={reset}
            className="text-xs font-medium text-slate-400 transition-colors hover:text-slate-600"
          >
            Reset
          </button>
          <Button
            size="sm"
            variant="secondary"
            onClick={apply}
            className="rounded-lg px-4 font-bold text-white"
          >
            Apply Now
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
