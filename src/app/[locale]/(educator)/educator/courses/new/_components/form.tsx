import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const inputCls =
  'w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20';

export const selectCls = cn(inputCls, 'appearance-none cursor-pointer pr-8');

export const labelCls = 'mb-1.5 block text-sm font-semibold text-zinc-700';

export function FormField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

/** Native select with the shared chevron affordance. */
export function SelectField({
  value,
  onChange,
  children,
  className,
}: {
  /** Omit to render an uncontrolled select. */
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="relative flex-1">
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(selectCls, className)}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
    </div>
  );
}
