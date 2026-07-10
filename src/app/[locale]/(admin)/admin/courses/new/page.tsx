'use client';

import TopBar from '@/components/common/TopBar';
import { useCreateCourseT } from '@/i18n';
import { StepBar } from '@/app/[locale]/(educator)/educator/courses/new/_components/StepBar';
import { CourseContentStep } from '@/app/[locale]/(educator)/educator/courses/new/_components/CourseContentStep';
import { PreviewPublishStep } from '@/app/[locale]/(educator)/educator/courses/new/_components/PreviewPublishStep';
import { WizardFooter } from '@/app/[locale]/(educator)/educator/courses/new/_components/WizardFooter';
import { useAdminCourseBuilder } from './_lib/useAdminCourseBuilder';
import { AdminCourseInfoStep } from './_components/AdminCourseInfoStep';

export default function AdminNewCoursePage() {
  const t = useCreateCourseT();
  const builder = useAdminCourseBuilder();

  return (
    <div className="bg-background flex min-h-full flex-col">
      <TopBar role="admin" title={t('pageTitle')} />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <StepBar
          current={builder.step}
          maxStep={builder.maxStep}
          onStepClick={builder.goToStep}
        />

        <div key={builder.step} className="animate-fade-in mt-6">
          {builder.step === 1 && (
            <AdminCourseInfoStep
              info={builder.info}
              onChange={builder.setInfoField}
              assignedEducator={builder.assignedEducator}
              onEducatorChange={builder.setAssignedEducator}
              educators={builder.educators}
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
              instructor={builder.educatorName || undefined}
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
        submitLabel={t('footer.createCourse')}
        submitting={builder.submitting}
      />
    </div>
  );
}
