'use client';

import { cn } from '@/lib/utils/cn';
import { cvm, type VariantProps } from '@/lib/utils/cva';
import { Field, FieldLabel } from '@/components/ui/Field';
import { Label } from '@/components/ui/Label';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';

const comboFieldVariants = cvm('flex w-full flex-col gap-2', {
  variants: {
    size: {
      default: '',
      sm: 'gap-1',
    },
  },
  defaultVariants: { size: 'default' },
});

const comboLabelVariants = cvm(
  'font-semibold tracking-wide text-muted-foreground uppercase',
  {
    variants: {
      size: {
        default: 'text-xs',
        sm: 'text-[10px]',
      },
    },
    defaultVariants: { size: 'default' },
  },
);

interface ComboFieldProps extends VariantProps<typeof comboFieldVariants> {
  label: string;
  items: readonly string[];
  placeholder?: string;
  className?: string;
  hideLabel?: boolean;
  onValueChange?: (value: string | null) => void;
}

export function ComboField({
  label,
  items,
  placeholder,
  className,
  hideLabel,
  size,
  onValueChange,
}: ComboFieldProps) {
  return (
    <Field className={cn(comboFieldVariants({ size }), className)}>
      {!hideLabel && (
        <FieldLabel>
          <Label className={comboLabelVariants({ size })}>{label}</Label>
        </FieldLabel>
      )}
      <Combobox items={items} onValueChange={onValueChange}>
        <ComboboxInput
          placeholder={placeholder ?? `Select ${label.toLowerCase()}`}
          className="w-full"
        />
        <ComboboxContent
          align="start"
          className="border-border bg-card border shadow-sm"
        >
          <ComboboxEmpty className="text-muted-foreground py-6 text-center text-xs">
            No items found.
          </ComboboxEmpty>
          <ComboboxList className="p-1">
            {(item) => (
              <ComboboxItem
                key={item}
                value={item}
                className="text-foreground data-highlighted:bg-muted data-highlighted:text-foreground rounded-md px-3 py-2 text-sm"
              >
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  );
}
