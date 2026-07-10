'use client';

import React from 'react';
import { LessonItem } from './LessonItem';

interface Lesson {
  id: string;
  title: string;
  contentType: string;
  videoDurationSeconds: number;
  isFree: boolean;
}

interface CurriculumModuleProps {
  title: string;
  orderIndex: number;
  isPublished: boolean;
  lessons: Lesson[];
}

export function CurriculumModule({
  title,
  orderIndex,
  lessons,
}: CurriculumModuleProps) {
  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
      <h3 className="mb-4 font-bold text-gray-900">
        <span className="text-brand-gold mr-2">{orderIndex}.</span>
        {title}
      </h3>
      <div className="space-y-2">
        {lessons.map((lesson) => (
          <LessonItem key={lesson.id} {...lesson} />
        ))}
      </div>
    </div>
  );
}
