'use client';

import { User } from 'lucide-react';
import { CourseInfoStep } from '@/app/[locale]/(educator)/educator/courses/new/_components/CourseInfoStep';
import { SelectField } from '@/app/[locale]/(educator)/educator/courses/new/_components/form';
import type { CourseInfo } from '@/app/[locale]/(educator)/educator/courses/new/_lib/types';
import type { AdminUserRow } from '@/constants/admin';

export function AdminCourseInfoStep({
  info,
  onChange,
  assignedEducator,
  onEducatorChange,
  educators,
}: {
  info: CourseInfo;
  onChange: (key: keyof CourseInfo, val: string) => void;
  assignedEducator: string;
  onEducatorChange: (educatorId: string) => void;
  educators: AdminUserRow[];
}) {
  const selectedEducator = educators.find((e) => e.id === assignedEducator);

  return (
    <div className="space-y-6">
      {/* ── Assign Educator (admin-only) ──────────────────────────────── */}
      <section className="border-border bg-card rounded-2xl border p-6">
        <div className="mb-5">
          <h2 className="text-foreground text-sm font-bold">Assign Educator</h2>
          <p className="text-muted-foreground text-xs">
            Choose which educator will own and deliver this course.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-foreground/80 mb-1.5 block text-sm font-semibold">
              Educator
            </label>
            <SelectField value={assignedEducator} onChange={onEducatorChange}>
              <option value="">Select an educator…</option>
              {educators.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </SelectField>
          </div>

          {selectedEducator && (
            <div className="border-border bg-surface flex items-center gap-3 rounded-xl border p-3.5">
              <span className="bg-brand-gold/15 text-brand-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                {selectedEducator.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </span>
              <div className="min-w-0">
                <p className="text-foreground truncate text-sm font-semibold">
                  {selectedEducator.name}
                </p>
                <p className="text-muted-foreground flex items-center gap-1 truncate text-[11px]">
                  <User className="h-3 w-3 shrink-0" />
                  {selectedEducator.email}
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
