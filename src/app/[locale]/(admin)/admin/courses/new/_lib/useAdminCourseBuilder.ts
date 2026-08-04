import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useToast } from '@/components/ui/toast';
import { useAuth } from '@/hooks/use-auth';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useResourceStore } from '@/lib/cache/createResourceStore';
import type {
  CourseInfo,
  CourseModule,
} from '@/app/[locale]/(educator)/educator/courses/new/_lib/types';
import {
  makeModule,
  moveItem,
  deriveAnswerFormat,
} from '@/app/[locale]/(educator)/educator/courses/new/_lib/builder';
import { categoriesStore } from '@/services/categories';
import { usersStore } from '@/services/users';
import type { AdminUserRow, CourseStatus } from '@/constants/admin';
import type { CourseTaskStatus } from '@/constants/educator';
import {
  createCourse,
  syncCourseCurriculum,
  updateCourse,
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

/** Everything the admin course table already has in memory for a row — no
 *  fetch-by-id endpoint exists for a course's info, so this is carried over
 *  query params (see `buildCourseEditUrl`) rather than loaded here. */
export interface AdminCourseEditSeed {
  id: string;
  title: string;
  description?: string;
  price?: number;
  thumbnail?: string;
  level?: string;
  category?: string;
  instructorId?: string;
  status?: CourseStatus;
}

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

/** Coerces a `?step=` value into a valid step number, defaulting to 1 — lets
 *  entry points like the archived-course preview's "Edit" action jump
 *  straight to Step 3 instead of always starting at Step 1. */
function clampStep(value?: string | null): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return 1;
  return Math.min(Math.max(Math.trunc(n), 1), 3);
}

export function useAdminCourseBuilder(
  editSeed?: AdminCourseEditSeed | null,
  initialStep?: string | null,
) {
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations('educator.createCourse');
  const { user } = useAuth();
  const currentAdmin = useCurrentUser();

  const isEditMode = Boolean(editSeed);

  const [step, setStep] = useState(() => clampStep(initialStep));
  const [maxStep, setMaxStep] = useState(() => clampStep(initialStep));
  const [info, setInfo] = useState<CourseInfo>(() =>
    editSeed
      ? {
          ...INITIAL_INFO,
          title: editSeed.title,
          description: editSeed.description ?? '',
          category: editSeed.category ?? '',
          level: editSeed.level ?? '',
          pricingType: editSeed.price === 0 ? 'free' : 'paid',
          price: editSeed.price != null ? String(editSeed.price) : '',
          thumbnail: editSeed.thumbnail ?? '',
        }
      : INITIAL_INFO,
  );
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [assignedAuthor, setAssignedAuthor] = useState(
    editSeed?.instructorId ?? '',
  );
  // Editing an already-published course should re-submit without forcing the
  // admin to re-pick "Published" in Step 3 — every other starting status
  // (new course, or editing a Pending/Archived one) still requires an
  // explicit decision, same as create mode always has.
  const [status, setStatus] = useState<CourseTaskStatus>(
    editSeed?.status === 'Public' ? 'Published' : 'To Do',
  );
  const [submitting, setSubmitting] = useState(false);

  const { data: categoriesData } = useResourceStore(categoriesStore);
  const { data: users } = useResourceStore(usersStore);
  const categories = categoriesData ?? [];

  const authorOptions = useMemo<AdminUserRow[]>(() => {
    const educators = (users ?? []).filter((u) => u.role === 'Educator');
    if (!user?.id) return educators;
    const self: AdminUserRow = {
      id: String(user.id),
      name: currentAdmin.fullName,
      email: currentAdmin.email,
      role: 'Admin',
      status: 'Active',
      inviteStatus: 'Approved',
      enrolled: 0,
      joined: '—',
      lastActive: '—',
    };
    return [self, ...educators];
  }, [users, user, currentAdmin.fullName, currentAdmin.email]);

  const missing = useMemo(() => {
    const list: string[] = [];
    if (!info.title.trim()) list.push('titleRequired');
    if (!info.description.trim()) list.push('descriptionRequired');
    if (!info.thumbnail) list.push('thumbnailRequired');
    if (!info.level) list.push('levelRequired');
    // A "paid" course with no real price isn't paid — it just hasn't been
    // priced yet, so it still needs fixing before it can go live.
    if (info.pricingType === 'paid' && (!info.price || Number(info.price) <= 0))
      list.push('priceRequired');
    if (!assignedAuthor) list.push('authorRequired');
    // Edit mode never loads the existing curriculum (no fetch-by-id for it
    // yet — see `AdminCourseEditSeed`), and Step 2 here always starts empty.
    // Requiring a module would incorrectly flag a course that already has
    // content, so this check only applies to a brand-new course.
    if (!isEditMode && modules.length === 0) list.push('moduleRequired');
    return list;
  }, [
    info.title,
    info.description,
    info.thumbnail,
    info.level,
    info.pricingType,
    info.price,
    assignedAuthor,
    modules.length,
    isEditMode,
  ]);

  const canSubmit = missing.length === 0 && status === 'Published';

  const authorName = useMemo(
    () => authorOptions.find((a) => a.id === assignedAuthor)?.name ?? '',
    [authorOptions, assignedAuthor],
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
      const price = info.pricingType === 'free' ? 0 : Number(info.price) || 0;
      const level = info.level ? info.level.toLowerCase() : undefined;

      if (isEditMode && editSeed) {
        // No curriculum sync here — Step 2 always starts empty in edit mode
        // (see `missing` above), so syncing now would wipe the course's real
        // saved content instead of leaving it untouched.
        await updateCourse(editSeed.id, {
          title: info.title,
          description: info.description || undefined,
          price,
          thumbnail: info.thumbnail || undefined,
          level,
          categoryId,
          instructorId: assignedAuthor || undefined,
          status: 'published',
        });
        toast(t('toast.updated', { title: info.title }), 'success');
      } else {
        const course = await createCourse({
          title: info.title,
          subtitle: info.subtitle || undefined,
          description: info.description || undefined,
          price,
          thumbnail: info.thumbnail || undefined,
          level,
          categoryId,
          instructorId: assignedAuthor || undefined,
        });

        if (modules.length > 0) {
          await syncCourseCurriculum(course.id, toSyncCurriculumInput(modules));
        }

        // `status` is only ever 'Published' when `submit()` is reachable
        // (see `canSubmit` above) — `createCourse` has no status field, so
        // this is what actually makes the course live.
        await updateCourse(course.id, { status: 'published' });

        toast(
          t('toast.created', { title: info.title, educator: authorName }),
          'success',
        );
      }
      router.push('/admin/courses');
    } catch (error) {
      const fallback = isEditMode
        ? t('toast.updateFailed')
        : t('toast.createFailed');
      toast(isApiError(error) ? error.message : fallback, 'error');
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
    isEditMode,
    categories,
    authorOptions,
    authorName,
    assignedAuthor,
    setAssignedAuthor,
    status,
    setStatus,
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
