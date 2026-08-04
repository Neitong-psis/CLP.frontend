export const inputCls =
  'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-blue-900 dark:focus:border-amber-400 focus:ring-1 focus:ring-blue-900/20 dark:focus:ring-amber-400/20';

export const labelCls = 'mb-1.5 block text-sm font-semibold text-foreground/80';

export function FormField({
  label,
  children,
  className,
}: {
  label: React.ReactNode;
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
