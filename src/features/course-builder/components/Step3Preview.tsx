import React, { useState, useMemo, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { AlertTriangle, ChevronUp, ChevronDown } from 'lucide-react';
import { FormField } from './FormField';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/DatePicker';
import type { ApiEducator, ApiCategory } from '../services/course.service';

interface AccordionSectionProps {
  title: string;
  desc: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function AccordionSection({
  title,
  desc,
  defaultOpen = false,
  children,
}: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left transition-colors hover:bg-slate-50/50"
        onClick={() => setOpen((v) => !v)}
      >
        <div>
          <p className="text-brand-navy text-sm font-bold">{title}</p>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
        )}
      </button>
      {open && (
        <div className="border-t border-slate-100 bg-white px-5 py-5">
          {children}
        </div>
      )}
    </div>
  );
}

interface Step3PreviewProps {
  role?: 'educator' | 'admin';
  educatorsList?: ApiEducator[];
  categoriesList?: ApiCategory[];
  currentAdminUser?: ApiEducator | null;
}

export function Step3Preview({
  role = 'educator',
  educatorsList = [],
  categoriesList = [],
  currentAdminUser = null,
}: Step3PreviewProps) {
  const { watch, control } = useFormContext();

  const title = watch('title');
  const description = watch('description');
  const categoryVal = watch('category');
  const level = watch('level');
  const price = watch('price');
  const rawModules = watch('modules');
  const thumbnailFile = watch('thumbnailFile');
  const thumbnailPath = watch('thumbnailPath');
  const author = watch('author');
  const workStatus = watch('workStatus');
  const visibility = watch('visibility');

  const modules = useMemo(
    () =>
      (Array.isArray(rawModules) ? rawModules : []) as Array<{
        id: string;
        title: string;
        lessons: unknown[];
      }>,
    [rawModules],
  );

  const totalLessons = useMemo(() => {
    if (!modules.length) return 0;
    return modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
  }, [modules]);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (thumbnailFile) {
      const url = URL.createObjectURL(thumbnailFile as File);
      setTimeout(() => setPreviewUrl(url), 0);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (thumbnailPath) {
      setTimeout(() => setPreviewUrl(thumbnailPath), 0);
    } else {
      setTimeout(() => setPreviewUrl(null), 0);
    }
  }, [thumbnailFile, thumbnailPath]);

  // Resolve category name from ID
  const categoryName = useMemo(() => {
    if (!categoryVal) return '';
    const matched = categoriesList.find((c) => c.id === categoryVal);
    return matched ? matched.name : categoryVal;
  }, [categoryVal, categoriesList]);

  // Warnings checklist
  const warnings = useMemo(() => {
    const list: string[] = [];
    if (!title?.trim()) {
      list.push('Course title is required.');
    }
    if (!description?.trim()) {
      list.push('Course description is required.');
    }
    if (modules.length === 0) {
      list.push('Curriculum must have at least one module.');
    }
    return list;
  }, [title, description, modules]);

  const [expandedModules, setExpandedModules] = useState<
    Record<string, boolean>
  >({});

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-brand-navy text-base font-bold">
          Step 3. Preview &amp; Publish
        </h2>
        <p className="text-sm text-slate-400">
          Review each section, fix missing details, then save or submit to
          Admin.
        </p>
      </div>

      <AccordionSection
        title="1. Course Preview"
        desc="Thumbnail, title, badges, and description."
        defaultOpen
      >
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="mx-auto shrink-0 sm:mx-0">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Thumbnail"
                className="h-28 w-44 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-28 w-44 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-400">
                No thumbnail
              </div>
            )}
          </div>
          <div className="flex-1 space-y-1 text-center sm:text-left">
            <p className="text-brand-navy text-base font-bold">
              {title || 'Untitled Course'}
            </p>
            {role === 'admin' && author && (
              <p className="text-xs font-medium text-slate-500">by {author}</p>
            )}
            <p className="line-clamp-3 text-xs text-slate-400">
              {description || 'Course Description'}
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2 sm:justify-start">
              {categoryName && (
                <span className="rounded-md border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  {categoryName}
                </span>
              )}
              {level && (
                <span className="rounded-md border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600 capitalize">
                  {level}
                </span>
              )}
              {price === 0 ? (
                <span className="bg-brand-gold/15 text-brand-gold rounded-md px-2.5 py-0.5 text-xs font-semibold">
                  Free
                </span>
              ) : price ? (
                <span className="bg-brand-gold/15 text-brand-gold rounded-md px-2.5 py-0.5 text-xs font-semibold">
                  Paid ${price}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </AccordionSection>

      <AccordionSection
        title="2. Curriculum Preview"
        desc={`${modules.length} module${modules.length !== 1 ? 's' : ''} and ${totalLessons} lesson${totalLessons !== 1 ? 's' : ''}.`}
      >
        {modules.length === 0 ? (
          <p className="text-sm text-slate-400">No modules added.</p>
        ) : (
          <div className="space-y-3">
            {modules.map((mod, i) => {
              const isExpanded = !!expandedModules[mod.id];
              return (
                <div
                  key={mod.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                >
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left transition-all hover:bg-slate-50/50"
                    onClick={() =>
                      setExpandedModules((prev) => ({
                        ...prev,
                        [mod.id]: !isExpanded,
                      }))
                    }
                  >
                    <div>
                      <p className="text-brand-navy text-sm font-bold">
                        Module {i + 1}: {mod.title}
                      </p>
                      <p className="text-xs text-slate-400">
                        {mod.lessons?.length || 0} lesson
                        {(mod.lessons?.length || 0) !== 1 ? 's' : ''}
                      </p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="space-y-2 border-t border-slate-100 bg-slate-50/30 px-5 py-4">
                      {mod.lessons && mod.lessons.length > 0 ? (
                        (
                          mod.lessons as Array<{ id: string; title: string }>
                        ).map((lesson, li) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-2 text-xs text-slate-600"
                          >
                            <span className="text-brand-gold font-semibold">
                              Lesson {li + 1}:
                            </span>
                            <span>{lesson.title}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 italic">
                          No lessons in this module.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </AccordionSection>

      <AccordionSection
        title="3. Publish Settings"
        desc="Educator assignment, work status, and tracking."
      >
        {role === 'admin' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField label="Assign to Educator">
                <Controller
                  name="assignedEducatorId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ?? ''}
                      onValueChange={(val) => field.onChange(val ?? '')}
                    >
                      <SelectTrigger className="h-9 w-full rounded-lg bg-white px-2.5 text-sm transition-colors hover:bg-slate-50/50">
                        <SelectValue placeholder="Select educator..." />
                      </SelectTrigger>
                      <SelectContent
                        align="start"
                        alignItemWithTrigger={false}
                        className="w-full min-w-[var(--anchor-width)]"
                      >
                        <SelectItem value="">Select educator...</SelectItem>
                        {educatorsList.map((e) => {
                          const isMe = currentAdminUser
                            ? e.id === currentAdminUser.id ||
                              e.email === currentAdminUser.email
                            : e.email === 'admin@clp.com' ||
                              e.firstName === 'Sarah';
                          return (
                            <SelectItem key={e.id} value={e.id}>
                              {isMe
                                ? 'Me'
                                : [e.firstName, e.lastName]
                                    .filter(Boolean)
                                    .join(' ') || e.email}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>

              <FormField label="Due Date">
                <Controller
                  name="dueDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value || undefined}
                      onChange={(date) => field.onChange(date ?? '')}
                      placeholder="Select date..."
                    />
                  )}
                />
              </FormField>

              <FormField label="Priority">
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ?? 'medium'}
                      onValueChange={(val) => field.onChange(val ?? 'medium')}
                    >
                      <SelectTrigger className="h-9 w-full rounded-lg bg-white px-2.5 text-sm transition-colors hover:bg-slate-50/50">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent
                        align="start"
                        alignItemWithTrigger={false}
                        className="w-full min-w-[var(--anchor-width)]"
                      >
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Meduim</SelectItem>
                        <SelectItem value="high">Hight</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>

              <FormField label="Work Status">
                <Controller
                  name="workStatus"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ?? 'todo'}
                      onValueChange={(val) => field.onChange(val ?? 'todo')}
                    >
                      <SelectTrigger className="h-9 w-full rounded-lg bg-white px-2.5 text-sm transition-colors hover:bg-slate-50/50">
                        <SelectValue placeholder="Work status" />
                      </SelectTrigger>
                      <SelectContent
                        align="start"
                        alignItemWithTrigger={false}
                        className="w-full min-w-[var(--anchor-width)]"
                      >
                        <SelectItem value="todo">Todo</SelectItem>
                        <SelectItem value="writing">In Writing</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>
            </div>
          </div>
        ) : (
          <FormField label="Course Visibility / Status">
            <div className="max-w-md">
              <Controller
                name="visibility"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? 'draft'}
                    onValueChange={(val) => field.onChange(val ?? 'draft')}
                  >
                    <SelectTrigger className="h-9 w-full rounded-lg bg-white px-2.5 text-sm transition-colors hover:bg-slate-50/50">
                      <SelectValue placeholder="Visibility" />
                    </SelectTrigger>
                    <SelectContent
                      align="start"
                      alignItemWithTrigger={false}
                      className="w-full min-w-[var(--anchor-width)]"
                    >
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </FormField>
        )}
      </AccordionSection>

      <AccordionSection
        title="4. Final Review Summary"
        desc="Module count, level, price, status, and warnings."
        defaultOpen
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Modules', value: String(modules.length) },
              {
                label: 'Level',
                value: level
                  ? level.charAt(0).toUpperCase() + level.slice(1)
                  : '—',
              },
              {
                label: 'Price',
                value: price === 0 ? 'Free' : price ? `$${price}` : '—',
              },
              {
                label: 'Status',
                value:
                  role === 'admin'
                    ? workStatus === 'todo'
                      ? 'Todo'
                      : workStatus === 'writing'
                        ? 'In Writing'
                        : workStatus === 'published'
                          ? 'Published'
                          : workStatus === 'archived'
                            ? 'Archived'
                            : 'Todo'
                    : visibility === 'draft'
                      ? 'Draft'
                      : 'Published',
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3"
              >
                <p className="text-[11px] font-medium text-slate-400">
                  {label}
                </p>
                <p className="text-brand-navy mt-0.5 text-sm font-bold">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {warnings.length > 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <p className="text-sm font-semibold text-amber-700">
                  Missing required fields
                </p>
              </div>
              <ul className="list-disc space-y-0.5 pl-4">
                {warnings.map((w) => (
                  <li key={w} className="text-xs text-amber-600">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </AccordionSection>
    </div>
  );
}
