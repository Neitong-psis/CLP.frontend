'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Mail, User, UserPlus, X } from 'lucide-react';
import { useEducatorStudentsModalT } from '@/i18n';
import { cn } from '@/lib/utils/cn';
import { EDUCATOR_COURSES } from '@/constants/educator';
import type { NewStudentInput } from '../_lib/useStudentFilter';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputCls =
  'focus:border-brand-gold focus:ring-brand-gold/10 h-10 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors outline-none focus:ring-2';

export function AddStudentModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (input: NewStudentInput) => void;
}) {
  if (!open) return null;
  return <AddStudentModalContent onClose={onClose} onAdd={onAdd} />;
}

function AddStudentModalContent({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (input: NewStudentInput) => void;
}) {
  const t = useEducatorStudentsModalT();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [touched, setTouched] = useState(false);

  const publishedCourses = EDUCATOR_COURSES.filter(
    (c) => c.status === 'Published',
  );

  const nameError = name.trim().length < 2 ? t('errorName') : null;
  const emailError = !EMAIL_RE.test(email.trim()) ? t('errorEmail') : null;
  const courseError = course === '' ? t('errorCourse') : null;
  const valid = !nameError && !emailError && !courseError;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    onAdd({ name: name.trim(), email: email.trim(), course });
    onClose();
  }

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Add student"
        className="animate-scale-in bg-card w-full max-w-md rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-brand-gold/10 flex h-10 w-10 items-center justify-center rounded-xl">
              <UserPlus className="text-brand-gold h-5 w-5" />
            </span>
            <div>
              <h2 className="text-brand-navy text-base font-bold">
                {t('title')}
              </h2>
              <p className="text-muted-foreground text-xs">{t('subtitle')}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg p-1.5 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="text-foreground/80 mb-1.5 block text-xs font-semibold">
              {t('fullName')}
            </label>
            <div className="relative">
              <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('namePlaceholder')}
                autoFocus
                className={inputCls}
              />
            </div>
            {touched && nameError && (
              <p className="mt-1 text-[11px] text-rose-500">{nameError}</p>
            )}
          </div>

          <div>
            <label className="text-foreground/80 mb-1.5 block text-xs font-semibold">
              {t('email')}
            </label>
            <div className="relative">
              <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                className={inputCls}
              />
            </div>
            {touched && emailError && (
              <p className="mt-1 text-[11px] text-rose-500">{emailError}</p>
            )}
          </div>

          <div>
            <label className="text-foreground/80 mb-1.5 block text-xs font-semibold">
              {t('course')}
            </label>
            <div className="relative">
              <BookOpen className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className={cn(
                  inputCls,
                  'appearance-none pr-8',
                  course === '' && 'text-muted-foreground',
                )}
              >
                <option value="" disabled>
                  {t('selectCourse')}
                </option>
                {publishedCourses.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
            {touched && courseError && (
              <p className="mt-1 text-[11px] text-rose-500">{courseError}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border-border text-foreground/80 hover:bg-muted h-10 flex-1 rounded-xl border text-sm font-semibold transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={touched && !valid}
              className="bg-brand-gold h-10 flex-1 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t('sendInvite')}
            </button>
          </div>
        </form>

        <p className="text-muted-foreground mt-4 text-center text-[11px]">
          {t('pendingNote1')}{' '}
          <span className="text-foreground/70 font-semibold">
            {t('inactive')}
          </span>{' '}
          {t('pendingNote2')}
        </p>
      </div>
    </div>
  );
}
