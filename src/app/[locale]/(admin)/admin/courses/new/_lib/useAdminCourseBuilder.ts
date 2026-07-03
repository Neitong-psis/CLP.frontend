import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useToast } from '@/components/ui/toast';
import type {
  CourseInfo,
  CourseModule,
} from '@/app/[locale]/(educator)/educator/courses/new/_lib/types';
import {
  makeModule,
  moveItem,
} from '@/app/[locale]/(educator)/educator/courses/new/_lib/builder';

const INITIAL_INFO: CourseInfo = {
  title: '',
  subtitle: '',
  description: '',
  category: '',
  level: '',
  pricingType: 'paid',
  price: '',
  promoCode: '',
  thumbnail: '',
};

export function useAdminCourseBuilder() {
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations('educator.createCourse');

  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [info, setInfo] = useState<CourseInfo>(INITIAL_INFO);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [assignedEducator, setAssignedEducator] = useState('');

  const missing = useMemo(() => {
    const list: string[] = [];
    if (!info.title.trim()) list.push('titleRequired');
    if (!info.description.trim()) list.push('descriptionRequired');
    if (!assignedEducator) list.push('educatorRequired');
    if (modules.length === 0) list.push('moduleRequired');
    return list;
  }, [info.title, info.description, assignedEducator, modules.length]);

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
    if (step === 1) router.push('/admin/courses');
    else setStep((s) => s - 1);
  }

  const goNext = () => {
    const next = Math.min(step + 1, 3);
    setStep(next);
    setMaxStep((m) => Math.max(m, next));
  };

  const goToStep = (n: number) => {
    if (n >= 1 && n <= maxStep) setStep(n);
  };

  function saveDraft() {
    toast(t('toast.draftSaved'), 'success');
  }

  function submit() {
    if (!canSubmit) {
      setStep(3);
      toast(t('toast.fixMissingAdmin'), 'error');
      return;
    }
    toast(
      t('toast.created', { title: info.title, educator: assignedEducator }),
      'success',
    );
    router.push('/admin/courses');
  }

  return {
    step,
    maxStep,
    info,
    modules,
    missing,
    canSubmit,
    assignedEducator,
    setAssignedEducator,
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
