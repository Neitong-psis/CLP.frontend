'use client';

import { useState } from 'react';
import { useAdminCoursesEditModalT } from '@/i18n';
import { cn } from '@/lib/utils/cn';
import type { AdminCourseRow, CourseStatus } from '@/constants/admin';
import { Button } from '@/components/ui/button/Button';
import { Modal } from './Modal';
import { STATUS_STYLE, ALL_CATEGORIES, ALL_LEVELS } from '../_lib/constants';

interface EditModalProps {
  course: AdminCourseRow;
  onSave: (updated: AdminCourseRow) => void;
  onClose: () => void;
}

const inputCls =
  'h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/10';

const labelCls = 'text-xs font-semibold text-muted-foreground';

export function EditModal({ course, onSave, onClose }: EditModalProps) {
  const t = useAdminCoursesEditModalT();
  const [title, setTitle] = useState(course.title);
  const [category, setCategory] = useState(course.category);
  const [level, setLevel] = useState(course.level);
  const [status, setStatus] = useState<CourseStatus>(course.status);

  return (
    <Modal
      title={t('title')}
      onClose={onClose}
      footer={
        <>
          <Button
            type="button"
            variant="ghost"
            className="border-border text-foreground hover:bg-muted rounded-xl border px-5"
            onClick={onClose}
          >
            {t('cancel')}
          </Button>
          <Button
            type="submit"
            form="edit-course-form"
            variant="secondary"
            className="rounded-xl px-5"
          >
            {t('save')}
          </Button>
        </>
      }
    >
      <form
        id="edit-course-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ ...course, title, category, level, status });
        }}
        className="space-y-4"
      >
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>{t('titleLabel')}</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={inputCls}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>{t('category')}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={cn(inputCls, 'cursor-pointer')}
            >
              {ALL_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>{t('level')}</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className={cn(inputCls, 'cursor-pointer')}
            >
              {ALL_LEVELS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>{t('status')}</label>
          <div className="flex gap-2">
            {(['Public', 'Pending', 'Archive'] as CourseStatus[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={cn(
                  'flex-1 rounded-lg border py-2 text-xs font-semibold transition-colors',
                  status === s
                    ? STATUS_STYLE[s] + ' ring-1'
                    : 'border-border text-muted-foreground hover:bg-muted',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}
