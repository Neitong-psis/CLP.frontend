'use client';

import { useMemo } from 'react';
import { User } from 'lucide-react';
import { CourseInfoStep } from '@/app/[locale]/(educator)/educator/courses/new/_components/CourseInfoStep';
import type { CourseInfo } from '@/app/[locale]/(educator)/educator/courses/new/_lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AdminUserRow } from '@/constants/admin';
import { useAdminCoursesAssignAuthorT } from '@/i18n';
import { useAuth } from '@/hooks/use-auth';

export function AdminCourseInfoStep({
  info,
  onChange,
  assignedAuthor,
  onAuthorChange,
  authorOptions,
}: {
  info: CourseInfo;
  onChange: (key: keyof CourseInfo, val: string) => void;
  assignedAuthor: string;
  onAuthorChange: (authorId: string) => void;
  authorOptions: AdminUserRow[];
}) {
  const t = useAdminCoursesAssignAuthorT();
  const { user } = useAuth();
  const selectedAuthor = authorOptions.find((a) => a.id === assignedAuthor);

  const authorLabel = (a: AdminUserRow) =>
    a.id === String(user?.id ?? '') ? `${a.name} ${t('you')}` : a.name;

  // Base UI's <Select.Value> can only resolve a value to its label once the
  // matching <Select.Item> has mounted (i.e. after the popup has opened at
  // least once) — without `items`, picking an author before ever opening the
  // list once would show the raw id instead of the name.
  const authorItems = useMemo(
    () => Object.fromEntries(authorOptions.map((a) => [a.id, authorLabel(a)])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authorOptions, user?.id, t],
  );

  return (
    <div className="space-y-6">
      {/* ── Assign Author (admin-only) ────────────────────────────────── */}
      <section className="border-border bg-card rounded-2xl border p-6">
        <div className="mb-5">
          <h2 className="text-foreground text-sm font-bold">{t('heading')}</h2>
          <p className="text-muted-foreground text-xs">{t('desc')}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-foreground/80 mb-1.5 block text-sm font-semibold">
              {t('label')}
            </label>
            <Select
              items={authorItems}
              value={assignedAuthor || undefined}
              onValueChange={(v) => onAuthorChange(v ?? '')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {authorOptions.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {authorLabel(a)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedAuthor && (
            <div className="border-border bg-surface flex items-center gap-3 rounded-xl border p-3.5">
              <span className="bg-brand-gold/15 text-brand-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                {selectedAuthor.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </span>
              <div className="min-w-0">
                <p className="text-foreground truncate text-sm font-semibold">
                  {selectedAuthor.name}
                </p>
                <p className="text-muted-foreground flex items-center gap-1 truncate text-[11px]">
                  <User className="h-3 w-3 shrink-0" />
                  {selectedAuthor.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Educator's CourseInfoStep (unmodified) ────────────────────── */}
      <CourseInfoStep info={info} onChange={onChange} />
    </div>
  );
}
