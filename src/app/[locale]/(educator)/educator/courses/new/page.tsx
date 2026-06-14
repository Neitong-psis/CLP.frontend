'use client';

import { useCourseBuilder } from './_lib/useCourseBuilder';
import { StepBar, WIZARD_STEPS } from './_components/StepBar';
import { CourseInfoStep } from './_components/CourseInfoStep';
import { CourseContentStep } from './_components/CourseContentStep';
import { PreviewPublishStep } from './_components/PreviewPublishStep';
import { WizardFooter } from './_components/WizardFooter';

export default function NewCoursePage() {
  const builder = useCourseBuilder();

  return (
    <div className="flex min-h-full flex-col bg-[#f5f5f7]">
      <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
              New course
            </p>
            <h1 className="mt-0.5 text-2xl font-bold tracking-[-0.01em] text-zinc-900">
              Create a Course
            </h1>
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-bold text-zinc-900">
              Step {builder.step} of {WIZARD_STEPS.length}
            </p>
            <p className="text-xs text-zinc-400">
              {WIZARD_STEPS[builder.step - 1]?.title}
            </p>
          </div>
        </div>

        <StepBar
          current={builder.step}
          maxStep={builder.maxStep}
          onStepClick={builder.goToStep}
        />

        {/* key remounts the step so each one fades in on navigation */}
        <div key={builder.step} className="animate-fade-in mt-6">
          {builder.step === 1 && (
            <CourseInfoStep
              info={builder.info}
              onChange={builder.setInfoField}
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
      />
    </div>
  );
}
