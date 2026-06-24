import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useToast } from '@/components/ui/toast';
import { useCourseTasks } from '@/context/CourseTasksContext';
import { EDUCATOR_USER } from '@/constants/educator';
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

export function useCourseBuilder() {
  const router = useRouter();
  const { toast } = useToast();
  const { addTask } = useCourseTasks();
  const t = useTranslations('educator.createCourse');

  const [step, setStep] = useState(1);
  /** Furthest step the user has reached — every step up to here stays revisitable. */
  const [maxStep, setMaxStep] = useState(1);
  const [info, setInfo] = useState<CourseInfo>(INITIAL_INFO);
  const [modules, setModules] = useState<CourseModule[]>([]);

  const missing = useMemo(() => {
    const list: string[] = [];
    if (!info.title.trim()) list.push('titleRequired');
    if (!info.description.trim()) list.push('descriptionRequired');
    if (modules.length === 0) list.push('moduleRequired');
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
    toast(t('toast.draftSaved'), 'success');
  }

  function submit() {
    if (!canSubmit) {
      setStep(3);
      toast(t('toast.fixMissing'), 'error');
      return;
    }
    addTask({
      id: `ct-${Date.now()}`,
      title: info.title,
      description:
        info.description || info.subtitle || 'New course submission.',
      category: info.category || 'General',
      price:
        info.pricingType === 'free'
          ? 'Free'
          : info.price
            ? `$${info.price}`
            : 'Paid',
      assignedBy: EDUCATOR_USER.name,
      status: 'Under Review',
      priority: 'Medium',
      dueDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    });
    toast(t('toast.submitted'), 'success');
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
