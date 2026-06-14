import { Field, FieldLabel } from '@/components/ui/Field';
import { Label } from '@/components/ui/Label';

const LABEL_CLS =
  'text-xs font-semibold tracking-wide text-muted-foreground uppercase';

interface Props {
  label: string;
  className?: string;
  children: React.ReactNode;
}

export function SettingsField({ label, className, children }: Props) {
  return (
    <Field className={className}>
      <FieldLabel>
        <Label className={LABEL_CLS}>{label}</Label>
      </FieldLabel>
      {children}
    </Field>
  );
}
