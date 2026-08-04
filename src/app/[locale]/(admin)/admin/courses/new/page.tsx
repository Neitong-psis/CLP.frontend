'use client';

import { useSearchParams } from 'next/navigation';
import TopBar from '@/components/common/TopBar';
import { useCreateCourseT } from '@/i18n';
import type { CourseStatus } from '@/constants/admin';
import { StepBar } from '@/app/[locale]/(educator)/educator/courses/new/_components/StepBar';
import { CourseContentStep } from '@/app/[locale]/(educator)/educator/courses/new/_components/CourseContentStep';
import { PreviewPublishStep } from '@/app/[locale]/(educator)/educator/courses/new/_components/PreviewPublishStep';
import { WizardFooter } from '@/app/[locale]/(educator)/educator/courses/new/_components/WizardFooter';
import {
  useAdminCourseBuilder,
  type AdminCourseEditSeed,
} from './_lib/useAdminCourseBuilder';
import { AdminCourseInfoStep } from './_components/AdminCourseInfoStep';

/** `?edit=<id>` (plus the row's fields carried alongside — see
 *  `buildCourseEditUrl`) switches the wizard into edit mode. There's no
 *  fetch-by-id for course info, so this is the only source of seed data. */
function useEditSeed(): AdminCourseEditSeed | null {
  const params = useSearchParams();
  const id = params.get('edit');
  if (!id) return null;

  const price = params.get('price');
  return {
    id,
    title: params.get('title') ?? '',
    description: params.get('description') ?? undefined,
    price: price != null ? Number(price) : undefined,
    thumbnail: params.get('thumbnail') ?? undefined,
    level: params.get('level') ?? undefined,
    category: params.get('category') ?? undefined,
    instructorId: params.get('instructorId') ?? undefined,
    status: (params.get('status') as CourseStatus | null) ?? undefined,
  };
}

export default function AdminNewCoursePage() {
  const t = useCreateCourseT();
  const searchParams = useSearchParams();
  const editSeed = useEditSeed();
  const builder = useAdminCourseBuilder(editSeed, searchParams.get('step'));

  return (
    <div className="bg-background flex min-h-full flex-col">
      <TopBar
        role="admin"
        title={builder.isEditMode ? t('pageTitleEdit') : t('pageTitle')}
      />

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
            <AdminCourseInfoStep
              info={builder.info}
              onChange={builder.setInfoField}
              assignedAuthor={builder.assignedAuthor}
              onAuthorChange={builder.setAssignedAuthor}
              authorOptions={builder.authorOptions}
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
              instructor={builder.authorName || undefined}
              status={builder.status}
              onStatusChange={builder.setStatus}
              canPublish
            />
          )}
        </div>
      </div>

      <WizardFooter
        step={builder.step}
        canSubmit={builder.canSubmit}
        missingCount={builder.missing.length}
        statusBlocksSubmit={
          builder.missing.length === 0 && builder.status !== 'Published'
        }
        statusBlocksSubmitLabel={t('footer.setStatusToPublish')}
        canSaveDraft={builder.missing.length === 0}
        onBack={builder.goBack}
        onNext={builder.goNext}
        onSaveDraft={builder.saveDraft}
        onSubmit={builder.submit}
        submitLabel={
          builder.isEditMode
            ? t('footer.saveChanges')
            : t('footer.publishCourse')
        }
        submitting={builder.submitting}
      />
    </div>
  );
}
