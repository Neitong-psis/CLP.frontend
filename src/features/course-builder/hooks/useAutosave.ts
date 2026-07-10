import { useEffect, useRef } from 'react';
import type { UseFormReset, UseFormWatch } from 'react-hook-form';
import type { WizardCourseFormValues } from '../schemas/course.schema';

const STORAGE_KEY = 'clp-course-builder-draft';

export function useAutosave(
  watch: UseFormWatch<WizardCourseFormValues>,
  reset: UseFormReset<WizardCourseFormValues>,
  isDirty: boolean,
) {
  const isRestored = useRef(false);

  // Restore draft on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed) {
          reset({
            ...parsed,
            thumbnailFile: null, // Ensure non-serializable File objects remain null
          });
        }
      } catch (err) {
        console.error('Failed to parse course draft:', err);
      }
    }

    // Asynchronously mark restoration as complete so that the reset values
    // are flushed before we allow any localStorage writes.
    const timer = setTimeout(() => {
      isRestored.current = true;
    }, 50);

    return () => clearTimeout(timer);
  }, [reset]);

  const values = watch();

  // Save values on change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only write if restoration has finished and the form is dirty (has user changes)
    if (!isRestored.current || !isDirty) return;

    const cacheableValues = {
      ...values,
      thumbnailFile: null, // Avoid saving binary File reference to localStorage
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cacheableValues));
    } catch (err) {
      console.error('Failed to save course draft:', err);
    }
  }, [values, isDirty]);
}

export function clearWizardDraft() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
