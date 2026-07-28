import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/TextArea';
import { Field, FieldLabel as UIFieldLabel } from '@/components/ui/Field';
import { Label } from '@/components/ui/Label';
import { FormField, LABEL_CLS } from './FormField';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { ThumbnailUpload } from './ThumbnailUpload';
import { CATEGORIES, LEVELS, MAX_DESCRIPTION } from '@/config/course';
import type { ApiCategory } from '../services/course.service';

interface Step1CourseInfoProps {
  role?: 'educator' | 'admin';
  categoriesList?: ApiCategory[];
}

export function Step1CourseInfo({
  role = 'educator',
  categoriesList = [],
}: Step1CourseInfoProps) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const descChars = (watch('description') ?? '').length;
  const pricingType = watch('pricingType') ?? 'paid';
  const hasDynamicCategories = categoriesList && categoriesList.length > 0;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_260px]">
      <div className="space-y-5">
        <FormField
          label="Course Title"
          error={errors.title?.message as string}
          required
        >
          <Input
            {...register('title')}
            type="text"
            placeholder="e.g. Foundations of Khmer Literature"
            autoFocus
            className={cn(
              'h-9',
              errors.title && 'border-red-300 focus-visible:border-red-400',
            )}
          />
        </FormField>

        {role === 'admin' && (
          <Field className="flex flex-col gap-1.5">
            <UIFieldLabel>
              <Label className={LABEL_CLS}>Author</Label>
            </UIFieldLabel>
            <Input
              {...register('author')}
              type="text"
              placeholder="Author name"
              className="h-9"
            />
          </Field>
        )}

        <Field className="flex flex-col gap-1.5">
          <UIFieldLabel>
            <Label className={LABEL_CLS}>Subtitle</Label>
          </UIFieldLabel>
          <Input
            {...register('subtitle')}
            type="text"
            placeholder="Course Subtitle"
            className="h-9"
          />
        </Field>

        <FormField
          label="Description"
          error={errors.description?.message as string}
          required
        >
          <div className="relative">
            <Textarea
              {...register('description')}
              rows={4}
              placeholder="What will students learn? Who is this course for?"
              className={cn(
                'resize-none pb-7',
                errors.description && 'border-red-300',
              )}
            />
            <span
              className={cn(
                'absolute right-3 bottom-2.5 text-[11px] font-medium transition-colors',
                descChars > MAX_DESCRIPTION * 0.9
                  ? descChars >= MAX_DESCRIPTION
                    ? 'text-red-500'
                    : 'text-amber-500'
                  : 'text-slate-400',
              )}
            >
              {descChars}/{MAX_DESCRIPTION}
            </span>
          </div>
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Category"
            error={errors.category?.message as string}
            required
          >
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value ?? ''}
                  onValueChange={(val) => field.onChange(val ?? '')}
                >
                  <SelectTrigger
                    aria-invalid={!!errors.category}
                    className="h-9 w-full rounded-lg bg-white px-2.5 text-sm transition-colors hover:bg-slate-50/50"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent
                    align="start"
                    alignItemWithTrigger={false}
                    className="w-full min-w-[var(--anchor-width)]"
                  >
                    <SelectItem value="">Select category</SelectItem>
                    {hasDynamicCategories
                      ? categoriesList.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))
                      : CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <FormField
            label="Level"
            error={errors.level?.message as string}
            required
          >
            <Controller
              name="level"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value ?? ''}
                  onValueChange={(val) => field.onChange(val ?? '')}
                >
                  <SelectTrigger
                    aria-invalid={!!errors.level}
                    className="h-9 w-full rounded-lg bg-white px-2.5 text-sm transition-colors hover:bg-slate-50/50"
                  >
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent
                    align="start"
                    alignItemWithTrigger={false}
                    className="w-full min-w-[var(--anchor-width)]"
                  >
                    <SelectItem value="">Select level</SelectItem>
                    {LEVELS.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l.charAt(0).toUpperCase() + l.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
        </div>

        <p className="mb-3 text-xs font-bold tracking-wide text-slate-500 uppercase">
          Pricing
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field className="flex flex-col gap-1.5">
            <UIFieldLabel>
              <Label className={LABEL_CLS}>Pricing type</Label>
            </UIFieldLabel>
            <Controller
              name="pricingType"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value ?? 'paid'}
                  onValueChange={(val) => {
                    const t = (val ?? 'paid') as 'paid' | 'free';
                    field.onChange(t);
                    if (t === 'free') {
                      setValue('price', 0);
                    }
                  }}
                >
                  <SelectTrigger className="h-9 w-full rounded-lg bg-white px-2.5 text-sm transition-colors hover:bg-slate-50/50">
                    <SelectValue placeholder="Pricing type" />
                  </SelectTrigger>
                  <SelectContent
                    align="start"
                    alignItemWithTrigger={false}
                    className="w-full min-w-[var(--anchor-width)]"
                  >
                    <SelectItem value="paid">Paid / cost</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <FormField
            label="Enter price"
            error={errors.price?.message as string}
          >
            <div
              className={cn(
                'flex items-center overflow-hidden rounded-lg border bg-white transition-all focus-within:ring-2',
                errors.price
                  ? 'border-red-300 focus-within:ring-red-100'
                  : 'focus-within:border-brand-gold focus-within:ring-brand-gold/15 border-slate-200',
              )}
            >
              <span className="shrink-0 border-r border-slate-200 bg-slate-50 px-3 py-2 text-slate-400">
                <DollarSign className="h-3.5 w-3.5" />
              </span>
              <input
                {...register('price', { valueAsNumber: true })}
                type="number"
                min={0}
                step={0.01}
                placeholder="79"
                disabled={pricingType === 'free'}
                className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none disabled:opacity-40"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              Price shown in USD ($).
            </p>
          </FormField>
        </div>

        <FormField
          label="Duration"
          error={errors.duration?.message as string}
          hint={!errors.duration ? 'e.g. 12 hours, 6 weeks' : undefined}
          required
        >
          <Input
            {...register('duration')}
            type="text"
            placeholder="e.g. 12 hours"
            className={cn('h-9', errors.duration && 'border-red-300')}
          />
        </FormField>
      </div>

      <div className="shrink-0">
        <Field className="flex flex-col gap-1.5">
          <UIFieldLabel>
            <Label className={LABEL_CLS}>Thumbnail</Label>
          </UIFieldLabel>
          <Controller
            name="thumbnailFile"
            control={control}
            render={({ field }) => {
              const pathVal = watch('thumbnailPath');
              return (
                <ThumbnailUpload
                  fileValue={field.value}
                  pathValue={pathVal}
                  onChange={field.onChange}
                />
              );
            }}
          />
          <p className="mt-2 text-[11px] text-slate-400">
            PNG or JPG. Shown on the course card.
          </p>
        </Field>
      </div>
    </div>
  );
}
