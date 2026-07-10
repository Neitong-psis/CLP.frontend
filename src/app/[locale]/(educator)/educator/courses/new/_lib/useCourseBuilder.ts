import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useToast } from '@/components/ui/toast';
import { useCourseTasks } from '@/context/CourseTasksContext';
import { useCurrentUser } from '@/hooks/use-current-user';
import { EDUCATOR_COURSE_TASKS } from '@/constants/educator';
import type { CourseInfo, CourseModule } from './types';
import { makeDraftFromTask, makeModule, moveItem } from './builder';

const INITIAL_INFO: CourseInfo = {
  title: '',
  subtitle: '',
  description: '',
  category: '',
  level: '',
  pricingType: 'paid',
  price: '',
  currency: 'USD',
  promoCode: '',
  thumbnail: '',
};

/** When `draftId` matches an existing "In Writing" task, the wizard opens
 *  pre-populated with that draft's info and starter modules. */
export function useCourseBuilder(draftId?: string | null) {
  const router = useRouter();
  const { toast } = useToast();
  const { addTask } = useCourseTasks();
  const currentUser = useCurrentUser();
  const t = useTranslations('educator.createCourse');

  // Seed from the draft (if any). Only consumed by the lazy state initializers
  // below, so it is computed exactly once on mount.
  const seed = useMemo<{ info: CourseInfo; modules: CourseModule[] }>(() => {
    const task = draftId
      ? EDUCATOR_COURSE_TASKS.find((t) => t.id === draftId)
      : undefined;
    return task ? makeDraftFromTask(task) : { info: INITIAL_INFO, modules: [] };
  }, [draftId]);

  const [step, setStep] = useState(1);
  /** Furthest step the user has reached — every step up to here stays revisitable. */
  const [maxStep, setMaxStep] = useState(1);
  const [info, setInfo] = useState<CourseInfo>(() => seed.info);
  const [modules, setModules] = useState<CourseModule[]>(() => seed.modules);

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
            ? info.currency === 'KHR'
              ? `${info.price} KHR`
              : `$${info.price}`
            : 'Paid',
      assignedBy: currentUser.fullName,
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
    /** Raw setter for drag-and-drop reordering, which needs to move lessons
     *  across module boundaries — a shape the per-index callbacks above can't express. */
    setModules,
    goBack,
    goNext,
    goToStep,
    saveDraft,
    submit,
  };
}
