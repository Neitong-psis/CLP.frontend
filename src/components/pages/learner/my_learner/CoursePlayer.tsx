'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  ChevronDown,
  Clock,
  Brain,
  CheckCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Course, CourseContent, Lesson } from '@/constants/learner';

interface CoursePlayerProps {
  course: Course;
  content: CourseContent;
}

export default function CoursePlayer({ course, content }: CoursePlayerProps) {
  const allLessons = content.sections.flatMap((s) => s.lessons);
  const firstIncomplete = allLessons.find((l) => !l.completed);
  const [activeLessonId, setActiveLessonId] = useState(
    firstIncomplete?.id ?? allLessons[0]?.id,
  );
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    () => new Set(content.sections.map((s) => s.id)),
  );

  const activeLesson = allLessons.find((l) => l.id === activeLessonId);
  const completedCount = allLessons.filter((l) => l.completed).length;
  const totalCount = allLessons.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  function toggleSection(id: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/my-learning"
            className="hover:text-brand-navy flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
            aria-label="Back to My Learning"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-0.5">
              <p className="text-brand-navy truncate text-sm font-bold">
                {course.title}
              </p>
              <p className="shrink-0 text-xs text-slate-400">
                {completedCount} / {totalCount} lessons &middot; {progressPct}%
                complete
              </p>
            </div>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="bg-brand-gold h-full rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 flex-col lg:h-[calc(100vh-61px)] lg:flex-row lg:overflow-hidden">
        {/* Video panel */}
        <section className="flex flex-col px-4 py-5 sm:px-6 lg:flex-1 lg:overflow-y-auto">
          {activeLesson && (
            <>
              {/* Lesson meta */}
              <div className="mb-3 flex items-center gap-2">
                <span className="bg-brand-gold/15 text-brand-gold rounded-full px-2.5 py-0.5 text-[11px] font-bold">
                  {activeLesson.type === 'video' ? 'Video' : 'Quiz'}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  {activeLesson.duration}
                </span>
              </div>

              <h1 className="text-brand-navy mb-4 text-lg font-bold sm:text-xl">
                {activeLesson.title}
              </h1>

              {/* Video player */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    aria-label="Play lesson"
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30"
                  >
                    <Play className="h-8 w-8 text-white" />
                  </button>
                </div>
              </div>

              {/* Completion banner */}
              {activeLesson.completed && (
                <div className="border-brand-gold/40 bg-brand-gold/10 mt-4 flex items-center gap-2 rounded-lg border px-4 py-3">
                  <CheckCheck className="text-brand-gold h-5 w-5 shrink-0" />
                  <p className="text-brand-gold text-sm font-semibold">
                    Lesson complete
                  </p>
                </div>
              )}

              {/* Next lesson button */}
              {!activeLesson.completed && (
                <button className="bg-brand-gold hover:bg-brand-gold-dark mt-4 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold text-white transition-colors">
                  <CheckCheck className="h-4 w-4" />
                  Mark as complete
                </button>
              )}
            </>
          )}
        </section>

        {/* Course content sidebar */}
        <aside className="flex flex-col border-t border-slate-200 bg-white lg:w-80 lg:shrink-0 lg:border-t-0 lg:border-l xl:w-96">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-brand-navy text-sm font-bold">
              Course Content
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-400">
              {completedCount} of {totalCount} lessons completed
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {content.sections.map((section) => {
              const isOpen = expandedSections.has(section.id);
              const sectionCompleted = section.lessons.every(
                (l) => l.completed,
              );

              return (
                <div key={section.id} className="border-b border-slate-100">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex w-full items-center justify-between gap-2 px-5 py-3.5 text-left transition-colors hover:bg-slate-50"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      {sectionCompleted && (
                        <CheckCircle2 className="text-brand-gold h-4 w-4 shrink-0" />
                      )}
                      <span
                        className={cn(
                          'truncate text-sm font-semibold',
                          sectionCompleted
                            ? 'text-brand-gold'
                            : 'text-brand-navy',
                        )}
                      >
                        {section.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200',
                        isOpen && 'rotate-180',
                      )}
                    />
                  </button>

                  {isOpen && (
                    <ul className="pb-1">
                      {section.lessons.map((lesson) => (
                        <LessonRow
                          key={lesson.id}
                          lesson={lesson}
                          isActive={lesson.id === activeLessonId}
                          onSelect={() => setActiveLessonId(lesson.id)}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}

function LessonRow({
  lesson,
  isActive,
  onSelect,
}: {
  lesson: Lesson;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        onClick={onSelect}
        className={cn(
          'flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors',
          isActive
            ? 'bg-brand-gold/10 border-brand-gold border-l-2'
            : 'hover:bg-slate-50',
        )}
      >
        {/* Status icon */}
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          {lesson.completed ? (
            <CheckCircle2 className="text-brand-gold h-4.5 w-4.5" />
          ) : lesson.type === 'quiz' ? (
            <Brain
              className={cn(
                'h-4 w-4',
                isActive ? 'text-brand-gold' : 'text-slate-400',
              )}
            />
          ) : (
            <Play
              className={cn(
                'h-4 w-4',
                isActive ? 'text-brand-gold' : 'text-slate-400',
              )}
            />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              'truncate text-xs font-medium',
              isActive ? 'text-brand-navy' : 'text-slate-600',
              lesson.completed && 'text-slate-400',
            )}
          >
            {lesson.title}
          </p>
          <p className="text-[10px] text-slate-400">{lesson.duration}</p>
        </div>
      </button>
    </li>
  );
}
