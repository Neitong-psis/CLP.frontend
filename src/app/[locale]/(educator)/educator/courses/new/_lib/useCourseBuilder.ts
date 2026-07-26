import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useToast } from '@/components/ui/toast';
import { useCourseTasks } from '@/context/CourseTasksContext';
import { useCurrentUser } from '@/hooks/use-current-user';
import {
  STATUS_SLUG,
  type CourseTask,
  type CourseTaskStatus,
} from '@/constants/educator';
import type { CourseInfo, CourseModule } from './types';
import { makeDraftFromTask, makeModule, moveItem, priceLabel } from './builder';
import { loadDraftContent, saveDraftContent } from './draftStorage';

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

let _idSeq = 0;
const generateTaskId = () => `ct-${Date.now()}-${++_idSeq}`;

const formatToday = () =>
  new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

/** Coerces a `?step=` value into a valid step number, defaulting to 1. Powers
 *  fast-path entry points (Course Review's "Resubmit" → Step 3, "Edit whole
 *  course" → Step 2) without any other change to wizard behavior. */
function clampStep(value?: string | null): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return 1;
  return Math.min(Math.max(Math.trunc(n), 1), 3);
}

/** When `draftId` matches an existing task, the wizard opens pre-populated
 *  with that draft's real saved content (from `draftStorage`) or, failing
 *  that, a fixture-based placeholder for the pre-seeded mock "In Writing" rows.
 *  `initialStep` jumps straight to a later step (unlocking everything up to
 *  it in the StepBar) instead of always starting at Step 1. */
export function useCourseBuilder(
  draftId?: string | null,
  initialStep?: string | null,
) {
  const router = useRouter();
  const { toast } = useToast();
  const { tasks, upsertTask } = useCourseTasks();
  const currentUser = useCurrentUser();
  const t = useTranslations('educator.createCourse');

  // Snapshot of the task this draft started from, taken once at mount — used
  // to resolve the original admin assignment and as a one-time content
  // fallback. Deliberately not reactive: re-reading the live list on every
  // change would stomp in-progress edits with whatever's currently stored.
  const [seedTask] = useState<CourseTask | undefined>(() =>
    draftId ? tasks.find((task) => task.id === draftId) : undefined,
  );

  const [activeId] = useState(() => draftId ?? generateTaskId());

  const seed = useMemo<{ info: CourseInfo; modules: CourseModule[] }>(() => {
    const saved = draftId ? loadDraftContent(draftId) : null;
    if (saved) return saved;
    // "To Do" opens empty even once assigned — the fixture-placeholder
    // fallback below is only for the pre-seeded mock "In Writing" rows.
    if (seedTask && seedTask.status !== 'To Do') {
      return makeDraftFromTask(seedTask);
    }
    return { info: INITIAL_INFO, modules: [] };
    // Computed once from the mount-time snapshot above — not re-derived as
    // `draftId`/`seedTask` are stable for the life of this wizard instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [step, setStep] = useState(() => clampStep(initialStep));
  /** Furthest step the user has reached — every step up to here stays revisitable. */
  const [maxStep, setMaxStep] = useState(() => clampStep(initialStep));
  const [info, setInfo] = useState<CourseInfo>(() => seed.info);
  const [modules, setModules] = useState<CourseModule[]>(() => seed.modules);
  const [status, setStatus] = useState<CourseTaskStatus>(
    () => seedTask?.status ?? 'To Do',
  );

  // The first real edit to content while status is still "To Do" claims the
  // draft — auto-advancing it to "In Writing". Adjusted during render (React's
  // sanctioned pattern for state derived from other state) rather than in an
  // effect: `setInfoField`/`addModule`/etc. are the only things that ever
  // produce a new `info`/`modules` reference, so comparing against what was
  // seen on the previous render is a safe, idempotent no-op otherwise — including
  // through React Strict Mode's double-render in development.
  const [seenInfo, setSeenInfo] = useState(info);
  const [seenModules, setSeenModules] = useState(modules);
  if (info !== seenInfo || modules !== seenModules) {
    setSeenInfo(info);
    setSeenModules(modules);
    if (status === 'To Do') setStatus('In Writing');
  }

  const missing = useMemo(() => {
    const list: string[] = [];
    if (!info.title.trim()) list.push('titleRequired');
    if (!info.description.trim()) list.push('descriptionRequired');
    if (modules.length === 0) list.push('moduleRequired');
    return list;
  }, [info.title, info.description, modules.length]);

  /** Submitting to admin needs both complete content and an explicit
   *  "Under Review" selection — the sole path into that status. */
  const canSubmit = missing.length === 0 && status === 'Under Review';

  // Author shown in Step 3: the admin who assigned it while still untouched
  // ("To Do"); the moment it's owned by the educator (or when it was never
  // admin-assigned at all), it reads as the educator's own name.
  const authorName =
    status === 'To Do' && seedTask?.assignedBy
      ? seedTask.assignedBy
      : currentUser.fullName;

  function buildTaskPatch(nextStatus: CourseTaskStatus): Partial<CourseTask> {
    return {
      title: info.title,
      description:
        info.description || info.subtitle || seedTask?.description || '',
      category: info.category || seedTask?.category || 'General',
      price: priceLabel(info),
      status: nextStatus,
    };
  }

  function createTask(nextStatus: CourseTaskStatus): CourseTask {
    return {
      id: activeId,
      title: info.title,
      description:
        info.description || info.subtitle || 'New course submission.',
      category: info.category || 'General',
      price: priceLabel(info),
      assignedBy: currentUser.fullName,
      status: nextStatus,
      priority: 'Medium',
      dueDate: formatToday(),
    };
  }

  /** Writes the current wizard state to storage — draft content + task
   *  metadata — without touching routing. Every save path (autosave, Back,
   *  Save Draft, Submit) funnels through this so nothing is ever lost. */
  function persistNow(
    nextStatus: CourseTaskStatus,
    extraPatch?: Partial<CourseTask>,
  ) {
    saveDraftContent(activeId, { info, modules });
    upsertTask(
      activeId,
      { ...buildTaskPatch(nextStatus), ...extraPatch },
      () => ({ ...createTask(nextStatus), ...extraPatch }),
    );
  }

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

  // Autosave — debounced, and only once the draft has actually started
  // (nothing worth persisting for an untouched "To Do" card).
  useEffect(() => {
    if (status === 'To Do') return;
    const timer = setTimeout(() => persistNow(status), 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info, modules, status]);

  /** Back to the board, opened on the tab this course actually lives in now
   *  — the board otherwise always lands on "To Do", which reads as if the
   *  course reverted instead of staying wherever it was just left. */
  function goToBoard(landingStatus: CourseTaskStatus) {
    router.push(`/educator/courses?tab=${STATUS_SLUG[landingStatus]}`);
  }

  function goBack() {
    if (status !== 'To Do') persistNow(status);
    if (step === 1) goToBoard(status);
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
    // Save Draft always lands as a safe draft — it never doubles as a
    // submission, so a stray "Under Review" selection resets to "In Writing".
    const nextStatus: CourseTaskStatus =
      status === 'Under Review' ? 'In Writing' : status;
    if (nextStatus !== status) setStatus(nextStatus);
    persistNow(nextStatus);
    goToBoard(nextStatus);
  }

  function submit() {
    if (missing.length > 0) {
      setStep(3);
      toast(t('toast.fixMissing'), 'error');
      return;
    }
    if (status !== 'Under Review') {
      setStep(3);
      toast(t('footer.setStatusToSubmit'), 'error');
      return;
    }
    persistNow('Under Review', {
      reviewState: 'Under Review',
      // A fresh submission supersedes whatever the last decision was.
      reviewFeedback: undefined,
      submittedAgo: 'Just now',
    });
    toast(t('toast.submitted'), 'success');
    goToBoard('Under Review');
  }

  return {
    step,
    maxStep,
    info,
    modules,
    missing,
    canSubmit,
    status,
    setStatus,
    authorName,
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
