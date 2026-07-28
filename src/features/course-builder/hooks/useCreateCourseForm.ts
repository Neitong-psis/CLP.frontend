'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm, type SubmitHandler, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/toast';
import {
  wizardCourseSchema,
  type WizardCourseFormValues,
} from '../schemas/course.schema';
import {
  CourseService,
  type ApiCategory,
  type ApiEducator,
} from '../services/course.service';
import { useWizardSteps } from './useWizardSteps';
import { useAutosave, clearWizardDraft } from './useAutosave';
import { type AdminCourseRow } from '@/constants/admin';

const WORK_STATUS_TO_COURSE_STATUS: Record<string, string> = {
  todo: 'todo',
  writing: 'in_writing',
  published: 'published',
  archived: 'archive',
};

interface UseCreateCourseFormProps {
  role: 'admin' | 'educator';
  course?: AdminCourseRow | null;
  onSave?: (updated: AdminCourseRow) => void;
  onClose: () => void;
}

export function useCreateCourseForm({
  role,
  course,
  onSave,
  onClose,
}: UseCreateCourseFormProps) {
  const { toast } = useToast();

  const [showWarning, setShowWarning] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // API Lists
  const [categoriesList, setCategoriesList] = useState<ApiCategory[]>([]);
  const [educatorsList, setEducatorsList] = useState<ApiEducator[]>([]);
  const [isApiSubmitting, setIsApiSubmitting] = useState(false);
  const [currentAdminUser, setCurrentAdminUser] = useState<ApiEducator | null>(
    null,
  );

  const form = useForm<WizardCourseFormValues>({
    resolver: zodResolver(wizardCourseSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      subtitle: '',
      category: '',
      level: undefined,
      price: 0,
      pricingType: 'paid',
      duration: '',
      visibility: 'draft',
      modules: [],
      thumbnailFile: null,
      thumbnailPath: '',
      assignedEducatorId: '',
      workStatus: 'todo',
      author: '',
      dueDate: '',
      priority: 'medium',
      workProgress: 0,
    },
  });

  const {
    watch,
    getValues,
    setValue,
    trigger,
    reset,
    formState: { isDirty, isSubmitting },
  } = form;

  // 1. Decoupled step controller
  const { step, handleNext, handleBack } = useWizardSteps(trigger);

  // 2. Decoupled local storage autosave draft hook
  useAutosave(watch, reset, isDirty);

  // Load current admin user
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('clp_user');
      if (raw) {
        try {
          const u = JSON.parse(raw);
          setCurrentAdminUser({
            id: u.id,
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
          });
        } catch {}
      }
    }
  }, []);

  // 3. Load API dropdown resources
  useEffect(() => {
    CourseService.fetchCategories()
      .then(setCategoriesList)
      .catch(() => {});
    if (role === 'admin') {
      CourseService.fetchEducators()
        .then((educators) => {
          if (currentAdminUser) {
            const hasCurrent = educators.some(
              (e) =>
                e.id === currentAdminUser.id ||
                e.email === currentAdminUser.email,
            );
            if (!hasCurrent) {
              setEducatorsList([currentAdminUser, ...educators]);
            } else {
              setEducatorsList(educators);
            }
          } else {
            setEducatorsList(educators);
          }
        })
        .catch(() => {
          if (currentAdminUser) {
            setEducatorsList([currentAdminUser]);
          } else {
            setEducatorsList([]);
          }
        });
    }
  }, [role, currentAdminUser]);

  // 3.5. Load course data if in edit mode
  useEffect(() => {
    if (course) {
      const matchingCategory = categoriesList.find(
        (cat) => cat.name.toLowerCase() === course.category.toLowerCase(),
      );
      const matchingEducator = educatorsList.find((edu) => {
        const fullName = `${edu.firstName || ''} ${edu.lastName || ''}`
          .trim()
          .toLowerCase();
        return (
          fullName.includes(course.instructor.toLowerCase()) ||
          course.instructor.toLowerCase().includes(fullName)
        );
      });

      let workStatus = course.workStatus || 'todo';
      if (!course.workStatus) {
        if (course.status === 'Public') workStatus = 'published';
        else if (course.status === 'Archive') workStatus = 'archived';
        else if (course.status === 'Pending') workStatus = 'writing';
      }

      reset({
        title: course.title,
        slug: course.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_]+/g, '-')
          .replace(/^-+|-+$/g, ''),
        description: 'Mock description for ' + course.title,
        subtitle: course.title + ' Subtitle',
        category: matchingCategory?.id || '',
        level: ['beginner', 'intermediate', 'advanced'].includes(
          course.level.toLowerCase(),
        )
          ? (course.level.toLowerCase() as
              'beginner' | 'intermediate' | 'advanced')
          : undefined,
        price: 0,
        pricingType: 'free',
        duration: '12 hours',
        visibility: course.status === 'Public' ? 'published' : 'draft',
        modules: [],
        thumbnailFile: null,
        thumbnailPath: '',
        assignedEducatorId: matchingEducator?.id || '',
        workStatus: workStatus as 'todo' | 'writing' | 'published' | 'archived',
        author: course.instructor,
        dueDate: course.dueDate || '',
        priority: course.priority || 'medium',
        workProgress: course.workProgress || 0,
      });
    }
  }, [course, reset, categoriesList, educatorsList]);

  // 4. Auto-sync title to URL slug
  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const { unsubscribe } = form.watch((values) => {
      const title = values.title;
      if (title) {
        const generatedSlug = title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_]+/g, '-')
          .replace(/^-+|-+$/g, '');
        setValue('slug', generatedSlug, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    });
    return unsubscribe;
  }, [form, setValue]);

  const handleClose = useCallback(() => {
    const values = getValues();
    const modules = values.modules || [];
    const subtitle = values.subtitle;
    const author = values.author;
    const thumbnailFile = values.thumbnailFile;

    if (isDirty || modules.length > 0 || subtitle || author || thumbnailFile) {
      setShowWarning(true);
    } else {
      onClose();
    }
  }, [isDirty, getValues, onClose]);

  // Close overlay on ESC key
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleClose]);

  const assignedEducatorId = watch('assignedEducatorId');
  const workStatus = watch('workStatus');

  const isAssignedToOther = useMemo(() => {
    if (role !== 'admin' || !assignedEducatorId || !currentAdminUser)
      return false;
    const selected = educatorsList.find((e) => e.id === assignedEducatorId);
    if (!selected) return false;
    return (
      selected.id !== currentAdminUser.id &&
      selected.email !== currentAdminUser.email
    );
  }, [role, assignedEducatorId, currentAdminUser, educatorsList]);

  const isPublishWorkflow = !isAssignedToOther || workStatus === 'published';

  const isSubmittingActive = isSubmitting || isApiSubmitting;

  const visibility = watch('visibility');

  const isSubmitDisabled = useMemo(() => {
    if (isSubmittingActive) return true;
    if (role === 'educator') {
      return visibility !== 'published';
    }
    // Admin role
    if (isPublishWorkflow) {
      return workStatus !== 'published';
    }
    return false; // Assignment workflow - not disabled
  }, [isSubmittingActive, role, isPublishWorkflow, workStatus, visibility]);

  const onSubmit: SubmitHandler<WizardCourseFormValues> = async (data) => {
    setIsApiSubmitting(true);
    try {
      if (role === 'admin') {
        const courseStatus =
          WORK_STATUS_TO_COURSE_STATUS[data.workStatus] ?? 'todo';

        let thumbnailUrl = data.thumbnailPath || '';
        if (data.thumbnailFile instanceof File) {
          try {
            thumbnailUrl = await CourseService.uploadThumbnail(
              data.thumbnailFile,
            );
          } catch {
            toast(
              'Failed to upload thumbnail, continuing without it.',
              'error',
            );
          }
        }

        if (course) {
          // Edit mode
          const updatedCourse: AdminCourseRow = {
            id: course.id,
            title: data.title.trim(),
            category:
              categoriesList.find((cat) => cat.id === data.category)?.name ||
              data.category,
            level: data.level
              ? ((data.level.charAt(0).toUpperCase() + data.level.slice(1)) as
                  'Beginner' | 'Intermediate' | 'Advanced')
              : 'Beginner',
            instructor:
              educatorsList.find((e) => e.id === data.assignedEducatorId)
                ?.firstName ||
              data.author ||
              course.instructor,
            enrolled: course.enrolled,
            rating: course.rating,
            status:
              courseStatus === 'published'
                ? 'Public'
                : courseStatus === 'archive'
                  ? 'Archive'
                  : 'Pending',
            createdAt: course.createdAt,
            dueDate: data.dueDate,
            priority: data.priority,
            workProgress: data.workProgress,
          };
          if (onSave) {
            onSave(updatedCourse);
          }
          if (isPublishWorkflow) {
            toast(
              `"${updatedCourse.title}" published successfully.`,
              'success',
            );
          } else {
            toast('Course assigned to educator successfully.', 'success');
          }
        } else {
          // Create mode
          const newCourse = await CourseService.createCourse({
            title: data.title.trim(),
            subtitle: data.subtitle?.trim() || undefined,
            description: data.description.trim() || undefined,
            categoryId: data.category || undefined,
            level: data.level || undefined,
            price: data.pricingType === 'free' ? 0 : data.price || 0,
            status: courseStatus,
            thumbnail: thumbnailUrl || undefined,
            instructorId: data.assignedEducatorId || undefined,
          });

          if (data.modules && data.modules.length > 0) {
            await CourseService.syncCourseCurriculum(newCourse.id, {
              modules: data.modules.map((mod) => ({
                title: mod.title,
                lessons: mod.lessons.map((lesson) => ({
                  title: lesson.title,
                  sections: lesson.sections.map((s) => ({
                    type: s.type,
                    text: s.text || undefined,
                    videoTitle: s.videoTitle || undefined,
                    videoUrl: s.videoUrl || undefined,
                    question: s.question || undefined,
                    answerFormat: s.answerFormat || undefined,
                    options: s.options,
                    assignmentDesc: s.assignmentDesc || undefined,
                    dueDate: s.dueDate || undefined,
                    submissionType: s.submissionType || undefined,
                  })),
                })),
              })),
            });
          }
          if (isPublishWorkflow) {
            toast(`"${newCourse.title}" published successfully.`, 'success');
          } else {
            toast('Course assigned to educator successfully.', 'success');
          }
        }
      } else {
        // Educator Mode Mock Submission
        await new Promise((r) => setTimeout(r, 1500));
        console.log('Course created/edited (Educator mock):', data);
      }

      clearWizardDraft();
      setSubmitSuccess(true);
      setTimeout(onClose, 800);
    } catch (err) {
      toast(
        err instanceof Error ? err.message : 'Failed to save course.',
        'error',
      );
    } finally {
      setIsApiSubmitting(false);
    }
  };

  const onInvalid = useCallback(
    (errors: FieldErrors<WizardCourseFormValues>) => {
      const messages: string[] = [];
      const extractErrors = (
        obj: Record<string, unknown> | null | undefined,
      ) => {
        if (!obj) return;
        if (typeof obj.message === 'string') {
          messages.push(obj.message);
          return;
        }
        for (const key in obj) {
          const val = obj[key];
          if (val && typeof val === 'object') {
            extractErrors(val as Record<string, unknown>);
          }
        }
      };
      extractErrors(errors as unknown as Record<string, unknown>);

      if (messages.length > 0) {
        toast(
          `Validation error: ${messages.slice(0, 3).join(', ')}${
            messages.length > 3 ? '...' : ''
          }`,
          'error',
        );
      } else {
        toast('Form has validation errors. Please check all steps.', 'error');
      }
    },
    [toast],
  );

  return {
    form,
    step,
    handleNext,
    handleBack,
    categoriesList,
    educatorsList,
    isSubmittingActive,
    submitSuccess,
    showWarning,
    setShowWarning,
    handleClose,
    onSubmit,
    onInvalid,
    isDirty,
    isPublishWorkflow,
    isAssignedToOther,
    isSubmitDisabled,
    currentAdminUser,
  };
}
