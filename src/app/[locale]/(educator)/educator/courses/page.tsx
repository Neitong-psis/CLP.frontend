import { getTranslations } from 'next-intl/server';
import EducatorTopBar from '@/components/common/TopBar';
import { CourseWorkspace } from '@/components/pages/educator/courses/CourseWorkspace';

export default async function EducatorCoursesPage() {
  const t = await getTranslations('educator.coursesPage');

  return (
    <div className="bg-background flex min-h-full flex-col">
      <EducatorTopBar
        role="educator"
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
        <CourseWorkspace />
      </main>
    </div>
  );
}
