'use client';

import { Eye, EyeOff } from 'lucide-react';
import type { AnyFieldApi } from '@tanstack/form-core';
import { Button } from '@/components/ui/button';
import {
  Field as UiField,
  FieldError,
  FieldLabel,
} from '@/components/ui/Field';

export const inputCls =
  'w-full bg-transparent py-0 pl-10 pr-4 text-sm text-brand-navy placeholder:text-slate-400 outline-none 2xl:text-base 3xl:text-lg';

export function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="3xl:text-lg text-brand-navy block text-sm font-semibold 2xl:text-base"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export function InputWrapper({
  icon,
  suffix,
  children,
}: {
  icon: React.ReactNode;
  suffix?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="3xl:py-4 focus-within:border-brand-gold focus-within:ring-brand-gold/20 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-3 transition focus-within:ring-2 2xl:rounded-2xl 2xl:px-4 2xl:py-3.5">
      <span className="shrink-0">{icon}</span>
      {children}
      {suffix && <span className="ml-auto shrink-0">{suffix}</span>}
    </div>
  );
}

export function PasswordToggle({
  show,
  onToggle,
}: {
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="text-slate-400 transition-colors hover:text-slate-600"
      aria-label={show ? 'Hide password' : 'Show password'}
    >
      {show ? (
        <EyeOff className="h-4.5 w-4.5 2xl:h-5 2xl:w-5" />
      ) : (
        <Eye className="h-4.5 w-4.5 2xl:h-5 2xl:w-5" />
      )}
    </button>
  );
}

export interface FormFieldProps {
  field: AnyFieldApi;
  label: string;
  icon: React.ReactNode;
  suffix?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function FormField({
  field,
  label,
  icon,
  suffix,
  inputProps,
}: FormFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <UiField data-invalid={isInvalid}>
      <FieldLabel
        htmlFor={field.name as string}
        className="3xl:text-lg text-brand-navy text-sm font-semibold 2xl:text-base"
      >
        {label}
      </FieldLabel>
      <InputWrapper icon={icon} suffix={suffix}>
        <input
          id={field.name as string}
          name={field.name as string}
          value={field.state.value as string}
          onBlur={field.handleBlur}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${field.name}-error` : undefined}
          className={inputCls}
          {...inputProps}
        />
      </InputWrapper>
      {isInvalid && (
        <FieldError
          id={`${field.name}-error`}
          errors={field.state.meta.errors.map((e) => ({ message: String(e) }))}
        />
      )}
    </UiField>
  );
}

export function SubmitBtn({
  label,
  disabled,
}: {
  label: string;
  disabled?: boolean;
}) {
  return (
    <Button
      type="submit"
      variant="secondary"
      disabled={disabled}
      className="3xl:py-5 3xl:text-lg shadow-brand-gold/30 hover:shadow-brand-gold/40 h-auto w-full rounded-xl py-3.5 text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.98] 2xl:rounded-2xl 2xl:py-4 2xl:text-base"
    >
      {label}
    </Button>
  );
}
