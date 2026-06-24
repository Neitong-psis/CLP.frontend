'use client';

import TopBar from '@/components/common/TopBar';
import { useCreateCourseT } from '@/i18n';
import { useCourseBuilder } from './_lib/useCourseBuilder';
import { StepBar, STEP_COUNT } from './_components/StepBar';
import { CourseInfoStep } from './_components/CourseInfoStep';
import { CourseContentStep } from './_components/CourseContentStep';
import { PreviewPublishStep } from './_components/PreviewPublishStep';
import { WizardFooter } from './_components/WizardFooter';

export default function NewCoursePage() {
  const t = useCreateCourseT();
  const builder = useCourseBuilder();
  const stepName = t(`steps.${builder.step}.title`);

  return (
    <div className="bg-background flex min-h-full flex-col">
      <TopBar
        role="educator"
        title={t('pageTitle')}
        subtitle={`${t('stepOf', { current: builder.step, total: STEP_COUNT })} · ${stepName}`}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <StepBar
          current={builder.step}
          maxStep={builder.maxStep}
          onStepClick={builder.goToStep}
        />

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
