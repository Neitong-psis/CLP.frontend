'use client';

import { Suspense } from 'react';
import EducatorTopBar from '@/components/common/TopBar';
import { useEducatorCoursesT } from '@/i18n';
import { useCurrentUser } from '@/hooks/use-current-user';
import { CourseWorkspace } from '@/components/pages/educator/courses/CourseWorkspace';

export default function EducatorCoursesPage() {
  const t = useEducatorCoursesT();
  const currentUser = useCurrentUser();

  return (
    <div className="bg-background flex min-h-full flex-col">
      <EducatorTopBar
        role="educator"
        title={t('title')}
        subtitle={t('subtitle', { email: currentUser.email })}
      />

      <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
        <Suspense fallback={null}>
          <CourseWorkspace />
        </Suspense>
      </main>
    </div>
  );
}
