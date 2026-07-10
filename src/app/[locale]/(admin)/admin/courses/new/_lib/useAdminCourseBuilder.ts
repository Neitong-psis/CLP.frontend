import { useEffect, useMemo, useState } from 'react';
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
  deriveAnswerFormat,
} from '@/app/[locale]/(educator)/educator/courses/new/_lib/builder';
import { fetchAllCategories, type Category } from '@/services/categories';
import { fetchAllUsers } from '@/services/users';
import type { AdminUserRow } from '@/constants/admin';
import {
  createCourse,
  syncCourseCurriculum,
  type SyncCurriculumInput,
  type SyncCurriculumSection,
} from '@/services/courses';
import { isApiError } from '@/lib/api/errors';

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

/** The backend accepts one question per "quiz" section, but the wizard now
 *  lets an educator author many questions in a single quiz block — so each
 *  question is expanded into its own quiz section when syncing. */
function toSyncCurriculumInput(modules: CourseModule[]): SyncCurriculumInput {
  return {
    modules: modules.map((m) => ({
      title: m.title,
      lessons: m.lessons.map((l) => ({
        title: l.title,
        sections: l.sections.flatMap((s): SyncCurriculumSection[] => {
          if (s.type === 'quiz') {
            return s.quizQuestions.map((q) => ({
              type: 'quiz',
              question: q.question || undefined,
              answerFormat: deriveAnswerFormat(q.options),
              options: q.options.length
                ? q.options.map((o) => ({ text: o.text, correct: o.correct }))
                : undefined,
            }));
          }
          return [
            {
              type: s.type,
              text: s.text || undefined,
              videoTitle: s.videoTitle || undefined,
              videoUrl: s.videoUrl || undefined,
              assignmentDesc: s.assignmentDesc || undefined,
              dueDate: s.dueDate || undefined,
              submissionType: s.submissionType || undefined,
            },
          ];
        }),
      })),
    })),
  };
}

export function useAdminCourseBuilder() {
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations('educator.createCourse');

  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [info, setInfo] = useState<CourseInfo>(INITIAL_INFO);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [assignedEducator, setAssignedEducator] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [educators, setEducators] = useState<AdminUserRow[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchAllCategories(), fetchAllUsers()])
      .then(([fetchedCategories, users]) => {
        if (cancelled) return;
        setCategories(fetchedCategories);
        setEducators(users.filter((u) => u.role === 'Educator'));
      })
      .catch(() => {
        if (!cancelled) toast(t('toast.loadFailed'), 'error');
      });
    return () => {
      cancelled = true;
    };
  }, [toast, t]);

  const missing = useMemo(() => {
    const list: string[] = [];
    if (!info.title.trim()) list.push('titleRequired');
    if (!info.description.trim()) list.push('descriptionRequired');
    if (!assignedEducator) list.push('educatorRequired');
    if (modules.length === 0) list.push('moduleRequired');
    return list;
  }, [info.title, info.description, assignedEducator, modules.length]);

  const canSubmit = missing.length === 0;

  const educatorName = useMemo(
    () => educators.find((e) => e.id === assignedEducator)?.name ?? '',
    [educators, assignedEducator],
  );

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

  async function submit() {
    if (!canSubmit) {
      setStep(3);
      toast(t('toast.fixMissingAdmin'), 'error');
      return;
    }
    if (submitting) return;

    setSubmitting(true);
    try {
      const categoryId = categories.find((c) => c.name === info.category)?.id;
      const course = await createCourse({
        title: info.title,
        subtitle: info.subtitle || undefined,
        description: info.description || undefined,
        price: info.pricingType === 'free' ? 0 : Number(info.price) || 0,
        thumbnail: info.thumbnail || undefined,
        level: info.level ? info.level.toLowerCase() : undefined,
        categoryId,
        instructorId: assignedEducator || undefined,
      });

      if (modules.length > 0) {
        await syncCourseCurriculum(course.id, toSyncCurriculumInput(modules));
      }

      toast(
        t('toast.created', { title: info.title, educator: educatorName }),
        'success',
      );
      router.push('/admin/courses');
    } catch (error) {
      toast(
        isApiError(error) ? error.message : t('toast.createFailed'),
        'error',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return {
    step,
    maxStep,
    info,
    modules,
    missing,
    canSubmit,
    submitting,
    categories,
    educators,
    educatorName,
    assignedEducator,
    setAssignedEducator,
    setInfoField,
    addModule,
    updateModule,
    deleteModule,
    moveModule,
    setModules,
    goBack,
    goNext,
    goToStep,
    saveDraft,
    submit,
  };
}
