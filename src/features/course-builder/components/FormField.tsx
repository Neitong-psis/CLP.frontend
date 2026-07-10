import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Field, FieldLabel as UIFieldLabel } from '@/components/ui/Field';
import { Label } from '@/components/ui/Label';

export const LABEL_CLS =
  'text-xs font-semibold tracking-wide text-slate-500 uppercase';

export const SELECT_CLS =
  'border-slate-200 focus-visible:border-brand-gold focus-visible:ring-brand-gold/15 focus-visible:ring-2 aria-invalid:border-red-300 aria-invalid:ring-red-100 aria-invalid:ring-2 h-9 w-full appearance-none rounded-lg border bg-white px-2.5 py-1 text-sm text-slate-800 outline-none transition-colors cursor-pointer';

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  error,
  hint,
  required,
  className,
  children,
}: FormFieldProps) {
  return (
    <Field className={cn('flex flex-col gap-1.5', className)}>
      <UIFieldLabel>
        <Label className={LABEL_CLS}>
          {label}
          {required && <span className="text-brand-gold ml-0.5">*</span>}
        </Label>
      </UIFieldLabel>
      {children}
      {error ? (
        <p className="mt-1 flex items-center gap-1 text-[12px] font-medium text-red-500">
          <AlertTriangle className="h-3 w-3 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1 text-[12px] text-slate-400">{hint}</p>
      ) : null}
    </Field>
  );
}
