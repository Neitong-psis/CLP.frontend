'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TopBar from '@/components/common/TopBar';
import { useCreateCourseT } from '@/i18n';
import { useCourseBuilder } from './_lib/useCourseBuilder';
import { StepBar } from './_components/StepBar';
import { CourseInfoStep } from './_components/CourseInfoStep';
import { CourseContentStep } from './_components/CourseContentStep';
import { PreviewPublishStep } from './_components/PreviewPublishStep';
import { WizardFooter } from './_components/WizardFooter';

export default function NewCoursePage() {
  return (
    <Suspense fallback={null}>
      <NewCourseWizard />
    </Suspense>
  );
}

function NewCourseWizard() {
  const t = useCreateCourseT();
  const searchParams = useSearchParams();
  const builder = useCourseBuilder(
    searchParams.get('draft'),
    searchParams.get('step'),
  );

  return (
    <div className="bg-background flex min-h-full flex-col">
      <TopBar role="educator" title={t('pageTitle')} />

      {/* pb-28 reserves room for the sticky WizardFooter below — without it,
          the footer (position: sticky, no flow height of its own once
          pinned) overlaps the last bit of scrolled content instead of
          sitting cleanly after it, worst on Step 2 where the module list
          can run long. */}
      <div className="flex-1 px-4 py-6 pb-28 sm:px-6 lg:px-8">
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
              onModulesChange={builder.setModules}
            />
          )}
          {builder.step === 3 && (
            <PreviewPublishStep
              info={builder.info}
              modules={builder.modules}
              missing={builder.missing}
              instructor={builder.authorName}
              status={builder.status}
              onStatusChange={builder.setStatus}
            />
          )}
        </div>
      </div>

      <WizardFooter
        step={builder.step}
        canSubmit={builder.canSubmit}
        missingCount={builder.missing.length}
        statusBlocksSubmit={
          builder.missing.length === 0 && builder.status !== 'Under Review'
        }
        onBack={builder.goBack}
        onNext={builder.goNext}
        onSaveDraft={builder.saveDraft}
        onSubmit={builder.submit}
      />
    </div>
  );
}
