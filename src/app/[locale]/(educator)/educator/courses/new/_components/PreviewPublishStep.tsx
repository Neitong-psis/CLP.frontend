'use client';

import { useState } from 'react';
import { BookOpen, ChevronDown, Lock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCreateCourseT } from '@/i18n';
import { STATUS_BADGE, type CourseTaskStatus } from '@/constants/educator';
import type { CourseInfo, CourseModule } from '../_lib/types';
import { priceLabel } from '../_lib/builder';
import { FormField } from './form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/** Statuses the educator may set directly from the wizard. "Under Review" is
 *  offered to them as "Publish" instead (see the dedicated SelectItem below) —
 *  picking it is how an educator requests admin review, and the course still
 *  lands in the board's "Under Review" tab under the hood. */
const EDITABLE_STATUSES: CourseTaskStatus[] = [
  'To Do',
  'In Writing',
  'Archived',
];

/** Admin reuses the same 5-value pipeline verbatim, "Under Review" included,
 *  since admin has no equivalent renamed action for it. */
const ADMIN_EDITABLE_STATUSES: CourseTaskStatus[] = [
  'To Do',
  'In Writing',
  'Under Review',
  'Archived',
];

/** Small solid-color dot per status for the dropdown's option rows — a
 *  lighter touch than the full STATUS_BADGE pill, which is reserved for the
 *  live preview badge next to the select. */
const STATUS_DOT: Record<CourseTaskStatus, string> = {
  'To Do': 'bg-muted-foreground/50',
  'In Writing': 'bg-blue-500',
  'Under Review': 'bg-amber-500',
  Published: 'bg-emerald-500',
  Archived: 'bg-muted-foreground/50',
};

/** Marks a field as required, inline next to its live-preview value — the
 *  same red in both themes so it reads as an unambiguous warning either way. */
function RequiredMark() {
  return (
    <span className="text-red-500 dark:text-red-400" aria-hidden="true">
      {' '}
      *
    </span>
  );
}

function AccordionSection({
  title,
  desc,
  defaultOpen = false,
  invalid = false,
  children,
}: {
  title: string;
  desc: string;
  defaultOpen?: boolean;
  /** Red outline instead of the default border — this section has at least
   *  one incomplete/invalid field. */
  invalid?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={cn(
        'bg-card overflow-hidden rounded-xl border',
        invalid ? 'border-red-300 dark:border-red-400/40' : 'border-border',
      )}
    >
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
        <div
          className={cn(
            'animate-fade-in border-t px-5 py-5',
            invalid
              ? 'border-red-200/70 dark:border-red-400/20'
              : 'border-border/50',
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function SummaryStat({
  label,
  value,
  invalid = false,
}: {
  label: string;
  value: string;
  invalid?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border p-3.5',
        invalid
          ? 'border-red-300 bg-red-50/40 dark:border-red-400/40 dark:bg-red-500/5'
          : 'border-border bg-card',
      )}
    >
      <p
        className={cn(
          'text-xs',
          invalid ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground',
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'mt-0.5 text-sm font-bold',
          invalid ? 'text-red-600 dark:text-red-400' : 'text-foreground',
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function PreviewPublishStep({
  info,
  modules,
  missing,
  instructor,
  status,
  onStatusChange,
  canPublish = false,
}: {
  info: CourseInfo;
  modules: CourseModule[];
  missing: string[];
  instructor?: string;
  /** Educator wizard only — the admin wizard has no To Do/In Writing/Under
   *  Review pipeline, so it omits both and the status controls hide. */
  status?: CourseTaskStatus;
  onStatusChange?: (status: CourseTaskStatus) => void;
  /** Admin wizard only — admin can publish a course directly from Step 3, so
   *  "Published" is a selectable option instead of the educator's locked one. */
  canPublish?: boolean;
}) {
  const t = useCreateCourseT();
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  // Single source of truth for every red-outline/asterisk indicator below —
  // each mirrors exactly what actually blocks Save Draft / Submit, so the
  // preview never shows a warning that doesn't also gate the buttons (or
  // vice versa).
  const titleInvalid = missing.includes('titleRequired');
  const descriptionInvalid = missing.includes('descriptionRequired');
  const thumbnailInvalid = missing.includes('thumbnailRequired');
  const levelInvalid = missing.includes('levelRequired');
  const priceInvalid = missing.includes('priceRequired');
  const moduleInvalid = missing.includes('moduleRequired');
  const authorInvalid = missing.includes('authorRequired');
  const coursePreviewInvalid =
    titleInvalid || descriptionInvalid || thumbnailInvalid || priceInvalid;

  const mWord =
    modules.length !== 1 ? t('publish.modules') : t('publish.module');
  const lWord = totalLessons !== 1 ? t('publish.lessons') : t('publish.lesson');
  const curriculumDesc = `${modules.length} ${mWord} ${t('publish.and')} ${totalLessons} ${lWord}.`;

  return (
    <div className="border-border bg-card rounded-2xl border p-6">
      <div className="mb-5">
        <h2 className="text-foreground text-base font-bold">
          {t('publish.heading')}
        </h2>
        <p className="text-muted-foreground text-sm">
          {t('publish.headingDesc')}
        </p>
      </div>

      <div className="space-y-4">
        <AccordionSection
          title={t('publish.coursePreview')}
          desc={t('publish.coursePreviewDesc')}
          defaultOpen
          invalid={coursePreviewInvalid}
        >
          <div className="flex flex-col gap-5 sm:flex-row">
            <div
              className={cn(
                'relative flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg border text-xs sm:w-44',
                thumbnailInvalid
                  ? 'border-red-300 bg-red-50/40 text-red-500 dark:border-red-400/40 dark:bg-red-500/5 dark:text-red-400'
                  : 'border-border bg-muted/30 text-muted-foreground',
              )}
            >
              {info.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={info.thumbnail}
                  alt="Course thumbnail"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                t('publish.noThumbnail')
              )}
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-foreground text-base font-bold">
                {info.title || t('publish.untitledCourse')}
                {titleInvalid && <RequiredMark />}
              </p>
              {info.subtitle && (
                <p className="text-muted-foreground text-sm">{info.subtitle}</p>
              )}
              {instructor && (
                <p className="text-muted-foreground text-xs">
                  {t('publish.instructorLabel')}{' '}
                  <span className="text-foreground font-medium">
                    {instructor}
                  </span>
                </p>
              )}
              <p className="text-muted-foreground text-sm">
                {info.description || t('publish.noDescription')}
                {descriptionInvalid && <RequiredMark />}
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
                <span
                  className={cn(
                    'rounded-md px-2.5 py-0.5 text-xs font-semibold text-white',
                    priceInvalid
                      ? 'bg-red-500 dark:bg-red-500'
                      : 'bg-blue-950 dark:bg-amber-400',
                  )}
                >
                  {info.pricingType === 'free'
                    ? t('publish.freeBadge')
                    : `${t('publish.paidBadge')} ${priceLabel(info)}`}
                </span>
              </div>
            </div>
          </div>
        </AccordionSection>

        <AccordionSection
          title={t('publish.curriculum')}
          desc={curriculumDesc}
          invalid={moduleInvalid}
        >
          {modules.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t('publish.noModules')}
            </p>
          ) : (
            <div className="space-y-2">
              {modules.map((mod, i) => (
                <div key={mod.id} className="flex items-center gap-2 text-sm">
                  <BookOpen className="text-muted-foreground h-4 w-4" />
                  <span className="text-foreground font-medium">
                    {t('publish.modulePrefix', { n: i + 1 })} {mod.title}
                  </span>
                  <span className="text-muted-foreground">
                    — {mod.lessons.length}{' '}
                    {mod.lessons.length !== 1
                      ? t('publish.lessons')
                      : t('publish.lesson')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </AccordionSection>

        <AccordionSection
          title={t('publish.publishSettings')}
          desc={t('publish.publishSettingsDesc')}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {status && onStatusChange && (
              <FormField label={t('publish.currentStatusLabel')}>
                <div className="flex items-center gap-2">
                  <Select
                    value={status}
                    onValueChange={(v) =>
                      v && onStatusChange(v as CourseTaskStatus)
                    }
                  >
                    <SelectTrigger className="h-9 w-full rounded-lg text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      align="start"
                      alignItemWithTrigger={false}
                      className="w-full min-w-[var(--anchor-width)]"
                    >
                      {(canPublish
                        ? ADMIN_EDITABLE_STATUSES
                        : EDITABLE_STATUSES
                      ).map((s) => (
                        <SelectItem key={s} value={s}>
                          <span
                            className={cn(
                              'size-1.5 shrink-0 rounded-full',
                              STATUS_DOT[s],
                            )}
                          />
                          {s}
                        </SelectItem>
                      ))}
                      {canPublish ? (
                        <SelectItem value="Published">
                          <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
                          {t('publish.publishedOption')}
                        </SelectItem>
                      ) : (
                        <SelectItem value="Under Review">
                          <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
                          {t('publish.publishOption')}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <span
                    className={cn(
                      'shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold',
                      STATUS_BADGE[status],
                    )}
                  >
                    {status}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1.5 text-xs">
                  {canPublish
                    ? t('publish.currentStatusHintAdmin')
                    : t('publish.currentStatusHint')}
                </p>
              </FormField>
            )}
            <FormField
              label={
                <>
                  {t('publish.authorLabel')}
                  {authorInvalid && <RequiredMark />}
                </>
              }
              className={!status ? 'sm:col-span-2' : undefined}
            >
              <div
                className={cn(
                  'flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm',
                  authorInvalid
                    ? 'border-red-300 bg-red-50/40 text-red-600 dark:border-red-400/40 dark:bg-red-500/5 dark:text-red-400'
                    : 'border-border bg-muted/40 text-foreground',
                )}
              >
                <Lock
                  className={cn(
                    'h-3.5 w-3.5 shrink-0',
                    authorInvalid
                      ? 'text-red-500 dark:text-red-400'
                      : 'text-muted-foreground',
                  )}
                />
                <span className="truncate">{instructor || '—'}</span>
              </div>
              <p className="text-muted-foreground mt-1.5 text-xs">
                {t('publish.authorLocked')}
              </p>
            </FormField>
          </div>
        </AccordionSection>

        <AccordionSection
          title={t('publish.reviewSummary')}
          desc={t('publish.reviewSummaryDesc')}
          defaultOpen
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <SummaryStat
              label={t('publish.modulesLabel')}
              value={String(modules.length)}
              invalid={moduleInvalid}
            />
            <SummaryStat
              label={t('publish.levelLabel')}
              value={info.level || '—'}
              invalid={levelInvalid}
            />
            <SummaryStat
              label={t('publish.priceLabel')}
              value={priceLabel(info)}
              invalid={priceInvalid}
            />
            {status && (
              <SummaryStat label={t('publish.statusLabel')} value={status} />
            )}
          </div>
        </AccordionSection>
      </div>
    </div>
  );
}
