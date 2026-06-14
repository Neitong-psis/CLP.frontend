'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Mail, User, UserPlus, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { EDUCATOR_COURSES } from '@/constants/educator';
import type { NewStudentInput } from '../_lib/useStudentFilter';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputCls =
  'focus:border-brand-gold focus:ring-brand-gold/10 h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 transition-colors outline-none focus:ring-2';

export function AddStudentModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (input: NewStudentInput) => void;
}) {
  // Mount the content only while open — state initialises fresh on every
  // open, so no reset-in-effect is needed.
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [touched, setTouched] = useState(false);

  const publishedCourses = EDUCATOR_COURSES.filter(
    (c) => c.status === 'Published',
  );

  const nameError = name.trim().length < 2 ? 'Enter the student name' : null;
  const emailError = !EMAIL_RE.test(email.trim())
    ? 'Enter a valid email address'
    : null;
  const courseError = course === '' ? 'Choose a course' : null;
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
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Add student"
        className="animate-scale-in w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-brand-gold/10 flex h-10 w-10 items-center justify-center rounded-xl">
              <UserPlus className="text-brand-gold h-5 w-5" />
            </span>
            <div>
              <h2 className="text-brand-navy text-base font-bold">
                Add Student
              </h2>
              <p className="text-xs text-slate-400">
                Invite a learner to one of your courses
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Full name
            </label>
            <div className="relative">
              <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dara Chan"
                autoFocus
                className={inputCls}
              />
            </div>
            {touched && nameError && (
              <p className="mt-1 text-[11px] text-rose-500">{nameError}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className={inputCls}
              />
            </div>
            {touched && emailError && (
              <p className="mt-1 text-[11px] text-rose-500">{emailError}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Course
            </label>
            <div className="relative">
              <BookOpen className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className={cn(
                  inputCls,
                  'appearance-none pr-8',
                  course === '' && 'text-slate-400',
                )}
              >
                <option value="" disabled>
                  Select a published course…
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
              className="h-10 flex-1 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={touched && !valid}
              className="bg-brand-gold h-10 flex-1 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send Invite
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-[11px] text-slate-400">
          The student appears as{' '}
          <span className="font-semibold text-slate-500">Inactive</span> until
          they accept the invitation.
        </p>
      </div>
    </div>
  );
}
