import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/toast';
import type { CourseInfo, CourseModule } from './types';
import { makeModule, moveItem } from './builder';

const INITIAL_INFO: CourseInfo = {
  title: '',
  subtitle: '',
  description: '',
  category: '',
  level: '',
  pricingType: 'paid',
  price: '',
  thumbnail: '',
};

/**
 * All state and actions for the 3-step course creation wizard.
 * The page component stays a pure composition of step views.
 */
export function useCourseBuilder() {
  const router = useRouter();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  /** Furthest step the user has reached — every step up to here stays revisitable. */
  const [maxStep, setMaxStep] = useState(1);
  const [info, setInfo] = useState<CourseInfo>(INITIAL_INFO);
  const [modules, setModules] = useState<CourseModule[]>([]);

  const missing = useMemo(() => {
    const list: string[] = [];
    if (!info.title.trim()) list.push('Course title is required.');
    if (!info.description.trim()) list.push('Course description is required.');
    if (modules.length === 0) list.push('Add at least one module.');
    return list;
  }, [info.title, info.description, modules.length]);

  const canSubmit = missing.length === 0;

  const setInfoField = (key: keyof CourseInfo, value: string) =>
    setInfo((prev) => ({ ...prev, [key]: value }));

  const addModule = () =>
    setModules((prev) => [...prev, makeModule(prev.length + 1)]);

  const updateModule = (i: number, updated: CourseModule) =>
    setModules((prev) => prev.map((m, j) => (j === i ? updated : m)));

  const deleteModule = (i: number) =>
    setModules((prev) => prev.filter((_, j) => j !== i));

  const moveModule = (i: number, dir: 'up' | 'down') =>
    setModules((prev) => moveItem(prev, i, dir));

  function goBack() {
    if (step === 1) router.push('/educator/courses');
    else setStep((s) => s - 1);
  }

  const goNext = () => {
    const next = Math.min(step + 1, 3);
    setStep(next);
    setMaxStep((m) => Math.max(m, next));
  };

  /** Any step the user has already reached is revisitable, in either direction. */
  const goToStep = (n: number) => {
    if (n >= 1 && n <= maxStep) setStep(n);
  };

  function saveDraft() {
    toast('Draft saved. You can finish it anytime.', 'success');
  }

  function submit() {
    if (!canSubmit) {
      setStep(3);
      toast('Fix the missing fields before submitting.', 'error');
      return;
    }
    toast('Course submitted to admin for review.', 'success');
    router.push('/educator/courses');
  }

  return {
    step,
    maxStep,
    info,
    modules,
    missing,
    canSubmit,
    setInfoField,
    addModule,
    updateModule,
    deleteModule,
    moveModule,
    goBack,
    goNext,
    goToStep,
    saveDraft,
    submit,
  };
}
