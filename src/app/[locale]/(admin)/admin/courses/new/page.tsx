'use client';

import TopBar from '@/components/common/TopBar';
import {
  StepBar,
  WIZARD_STEPS,
} from '@/app/[locale]/(educator)/educator/courses/new/_components/StepBar';
import { CourseContentStep } from '@/app/[locale]/(educator)/educator/courses/new/_components/CourseContentStep';
import { PreviewPublishStep } from '@/app/[locale]/(educator)/educator/courses/new/_components/PreviewPublishStep';
import { WizardFooter } from '@/app/[locale]/(educator)/educator/courses/new/_components/WizardFooter';
import { useAdminCourseBuilder } from './_lib/useAdminCourseBuilder';
import { AdminCourseInfoStep } from './_components/AdminCourseInfoStep';

export default function AdminNewCoursePage() {
  const builder = useAdminCourseBuilder();
  const stepName = WIZARD_STEPS[builder.step - 1]?.title ?? '';

  return (
    <div className="bg-background flex min-h-full flex-col">
      <TopBar
        role="admin"
        title="Create a Course"
        subtitle={`Step ${builder.step} of ${WIZARD_STEPS.length} · ${stepName}`}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <StepBar
          current={builder.step}
          maxStep={builder.maxStep}
          onStepClick={builder.goToStep}
        />

        {/* key remounts the step so each one fades in on navigation */}
        <div key={builder.step} className="animate-fade-in mt-6">
          {builder.step === 1 && (
            <AdminCourseInfoStep
              info={builder.info}
              onChange={builder.setInfoField}
              assignedEducator={builder.assignedEducator}
              onEducatorChange={builder.setAssignedEducator}
            />
          )}
          {builder.step === 2 && (
            <CourseContentStep
              modules={builder.modules}
              onAddModule={builder.addModule}
              onUpdateModule={builder.updateModule}
              onDeleteModule={builder.deleteModule}
              onMoveModule={builder.moveModule}
            />
          )}
          {builder.step === 3 && (
            <PreviewPublishStep
              info={builder.info}
              modules={builder.modules}
              missing={builder.missing}
              instructor={builder.assignedEducator || undefined}
            />
          )}
        </div>
      </div>

      <WizardFooter
        step={builder.step}
        canSubmit={builder.canSubmit}
        missingCount={builder.missing.length}
        onBack={builder.goBack}
        onNext={builder.goNext}
        onSaveDraft={builder.saveDraft}
        onSubmit={builder.submit}
        submitLabel="Create Course"
      />
    </div>
  );
}
