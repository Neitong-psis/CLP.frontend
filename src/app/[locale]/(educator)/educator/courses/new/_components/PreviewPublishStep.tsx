'use client';

import { useState } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { CourseInfo, CourseModule } from '../_lib/types';
import { priceLabel } from '../_lib/builder';
import { FormField, SelectField } from './form';

function AccordionSection({
  title,
  desc,
  defaultOpen = false,
  children,
}: {
  title: string;
  desc: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-border bg-card overflow-hidden rounded-xl border">
      <button
        type="button"
        className="hover:bg-muted/40 flex w-full items-center justify-between px-5 py-4 text-left transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <div>
          <p className="text-foreground text-sm font-bold">{title}</p>
          <p className="text-muted-foreground text-xs">{desc}</p>
        </div>
        <ChevronDown
          className={cn(
            'text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>
      {open && (
        <div className="animate-fade-in border-border/50 border-t px-5 py-5">
          {children}
        </div>
      )}
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-border bg-card rounded-xl border p-3.5">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="text-foreground mt-0.5 text-sm font-bold">{value}</p>
    </div>
  );
}

export function PreviewPublishStep({
  info,
  modules,
  missing,
  instructor,
}: {
  info: CourseInfo;
  modules: CourseModule[];
  missing: string[];
  instructor?: string;
}) {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const ready = missing.length === 0;

  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <div className="mb-5">
        <h2 className="text-foreground text-base font-bold">
          Step 3. Preview &amp; Publish
        </h2>
        <p className="text-muted-foreground text-sm">
          Review each section, fix missing details, then save or publish.
        </p>
      </div>

      <div className="space-y-4">
        <AccordionSection
          title="1. Course Preview"
          desc="Thumbnail, title, badges, and description."
          defaultOpen
        >
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="border-border bg-muted/30 text-muted-foreground relative flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg border text-xs sm:w-44">
              {info.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={info.thumbnail}
                  alt="Course thumbnail"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                'No thumbnail uploaded'
              )}
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-foreground text-base font-bold">
                {info.title || 'Untitled Course'}
              </p>
              {info.subtitle && (
                <p className="text-muted-foreground text-sm">{info.subtitle}</p>
              )}
              {instructor && (
                <p className="text-muted-foreground text-xs">
                  Instructor:{' '}
                  <span className="text-foreground font-medium">
                    {instructor}
                  </span>
                </p>
              )}
              <p className="text-muted-foreground text-sm">
                {info.description || 'No course description added yet.'}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {info.category && (
                  <span className="border-border text-foreground/80 rounded-md border px-2.5 py-0.5 text-xs font-medium">
                    {info.category}
                  </span>
                )}
                {info.level && (
                  <span className="border-border text-foreground/80 rounded-md border px-2.5 py-0.5 text-xs font-medium">
                    {info.level}
                  </span>
                )}
                <span className="rounded-md bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                  {info.pricingType === 'free'
                    ? 'Free'
                    : `Paid ${priceLabel(info)}`}
                </span>
              </div>
            </div>
          </div>
        </AccordionSection>

        <AccordionSection
          title="2. Curriculum Preview"
          desc={`${modules.length} module${modules.length !== 1 ? 's' : ''} and ${totalLessons} lesson${totalLessons !== 1 ? 's' : ''}.`}
        >
          {modules.length === 0 ? (
            <p className="text-muted-foreground text-sm">No modules added.</p>
          ) : (
            <div className="space-y-2">
              {modules.map((mod, i) => (
                <div key={mod.id} className="flex items-center gap-2 text-sm">
                  <BookOpen className="text-muted-foreground h-4 w-4" />
                  <span className="text-foreground font-medium">
                    Module {i + 1}: {mod.title}
                  </span>
                  <span className="text-muted-foreground">
                    — {mod.lessons.length} lesson
                    {mod.lessons.length !== 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </AccordionSection>

        <AccordionSection
          title="3. Publish Settings"
          desc="Visibility, draft behavior, and final action."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Visibility">
              <SelectField>
                <option>Public</option>
                <option>Private</option>
                <option>Unlisted</option>
              </SelectField>
            </FormField>
            <FormField label="Draft behavior">
              <div className="flex items-center gap-3 pt-1.5">
                <span className="relative inline-flex h-5 w-9 items-center rounded-full bg-blue-600">
                  <span className="absolute top-0.5 left-0.5 h-4 w-4 translate-x-4 rounded-full bg-white shadow transition-transform" />
                </span>
                <span className="text-muted-foreground text-xs">
                  Keep as draft until submitted
                </span>
              </div>
            </FormField>
          </div>
        </AccordionSection>

        <AccordionSection
          title="4. Final Review Summary"
          desc="Module count, level, price, status, and warnings."
          defaultOpen
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <SummaryStat label="Modules" value={String(modules.length)} />
            <SummaryStat label="Level" value={info.level || '—'} />
            <SummaryStat label="Price" value={priceLabel(info)} />
            <SummaryStat label="Status" value="To Do" />
          </div>

          <div
            className={cn(
              'mt-4 rounded-xl border p-4',
              ready
                ? 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-500/10'
                : 'border-amber-200 bg-amber-50/60 dark:border-amber-500/30 dark:bg-amber-500/10',
            )}
          >
            {ready ? (
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                Course is ready for the selected publish action.
              </p>
            ) : (
              <>
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                  Missing required fields
                </p>
                <ul className="mt-2 space-y-1">
                  {missing.map((m) => (
                    <li
                      key={m}
                      className="text-sm text-amber-700 dark:text-amber-400"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </AccordionSection>
      </div>
    </div>
  );
}
