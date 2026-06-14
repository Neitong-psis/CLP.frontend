interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function SettingsSection({ title, subtitle, children }: Props) {
  return (
    <section className="border-border bg-card rounded-xl border p-6">
      <h3 className="text-foreground text-base font-bold">{title}</h3>
      {subtitle && (
        <p className="text-muted-foreground mt-0.5 mb-6 text-sm">{subtitle}</p>
      )}
      {children}
    </section>
  );
}
