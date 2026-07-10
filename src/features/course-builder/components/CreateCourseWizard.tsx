'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Save,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import TopBar from '@/components/common/TopBar';

import { StepBar } from './StepBar';
import { UnsavedWarning } from './UnsavedWarning';

import { Step1CourseInfo } from './Step1CourseInfo';
import { Step2CourseContent } from './Step2CourseContent';
import { Step3Preview } from './Step3Preview';

import { type AdminCourseRow } from '@/constants/admin';
import { useCreateCourseForm } from '../hooks/useCreateCourseForm';

interface CreateCourseWizardProps {
  onClose: () => void;
  role: 'admin' | 'educator';
  course?: AdminCourseRow | null;
  onSave?: (updated: AdminCourseRow) => void;
}

export default function CreateCourseWizard({
  onClose,
  role,
  course,
  onSave,
}: CreateCourseWizardProps) {
  const {
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
    isSubmitDisabled,
    currentAdminUser,
  } = useCreateCourseForm({ role, course, onSave, onClose });

  const { watch } = form;
  watch('assignedEducatorId');
  watch('workStatus');

  if (submitSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="animate-in fade-in zoom-in-95 flex flex-col items-center gap-4 rounded-2xl bg-white p-10 shadow-2xl duration-200">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-900">
              {role === 'admin'
                ? isPublishWorkflow
                  ? 'Course Published!'
                  : 'Course Assigned!'
                : 'Course Created!'}
            </p>
            <p className="mt-1 text-sm text-slate-500">Redirecting you back…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <TopBar
          role={role}
          title={role === 'admin' ? 'Create a Course' : 'New course'}
          subtitle={
            role === 'admin'
              ? `Live workspace synced for ${currentAdminUser?.email || 'admin@clp.com'}`
              : undefined
          }
        />

        <div className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          {/* Step Navigation Bar */}
          <StepBar current={step} />

          <form
            // @ts-expect-error - react-hook-form resolver type compatibility
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            noValidate
            className="space-y-6"
          >
            {/* Main Step Content Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              {step === 1 && (
                <Step1CourseInfo role={role} categoriesList={categoriesList} />
              )}
              {step === 2 && <Step2CourseContent />}
              {step === 3 && (
                <Step3Preview
                  role={role}
                  educatorsList={educatorsList}
                  categoriesList={categoriesList}
                  currentAdminUser={currentAdminUser}
                />
              )}
            </div>

            {/* Footer controls outside card wrapper */}
            <div className="flex items-center justify-between bg-transparent pt-4">
              <div className="flex items-center gap-2">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    onClick={handleBack}
                    disabled={isSubmittingActive}
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    onClick={handleClose}
                    disabled={isSubmittingActive}
                  >
                    Cancel
                  </Button>
                )}
              </div>
              {isDirty && (
                <p className="flex items-center gap-1.5 text-[12px] text-amber-600">
                  <AlertTriangle className="h-3 w-3 shrink-0" /> Unsaved changes
                </p>
              )}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  disabled={isSubmittingActive}
                  onClick={form.handleSubmit(
                    // @ts-expect-error - react-hook-form resolver type compatibility
                    (data) => onSubmit({ ...data, visibility: 'draft' }),
                    onInvalid,
                  )}
                >
                  {isSubmittingActive ? (
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 text-slate-500" />
                  )}
                  Save Draft
                </Button>
                {step < 3 ? (
                  <Button
                    key="next-step-btn"
                    type="button"
                    variant="secondary"
                    className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 gap-2 font-bold"
                    onClick={handleNext}
                    disabled={isSubmittingActive}
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    key="submit-course-btn"
                    type="submit"
                    variant="secondary"
                    disabled={isSubmitDisabled}
                    className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 min-w-32 gap-2 font-bold disabled:pointer-events-none disabled:opacity-50"
                  >
                    {isSubmittingActive ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />{' '}
                        {isPublishWorkflow ? 'Publishing…' : 'Assigning…'}
                      </>
                    ) : (
                      <>
                        {role === 'admin'
                          ? isPublishWorkflow
                            ? 'Publish'
                            : 'Assign to'
                          : 'Submit to Admin'}
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
        {showWarning && (
          <UnsavedWarning
            onKeep={() => setShowWarning(false)}
            onDiscard={onClose}
          />
        )}
      </div>
    </FormProvider>
  );
}
