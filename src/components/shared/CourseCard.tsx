/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  thumbnail?: string | null;
  subtitle?: string | null;
  level?: string | null;
  duration?: string | null;
  category?: {
    name: string;
  } | null;
}

interface CourseCardProps {
  course: Course;
  variant?: 'grid' | 'list';
}

export function CourseCard({ course, variant = 'grid' }: CourseCardProps) {
  if (variant === 'list') {
    // Minimal list version for compact views if needed later
    return (
      <Link
        href={`/(learner)/courses/${course.id}`}
        className="flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md"
      >
        <div className="h-16 w-24 shrink-0 overflow-hidden rounded bg-gray-200">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <BookOpen size={20} />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-gray-900">{course.title}</h3>
          <p className="truncate text-xs text-gray-500">
            {course.category?.name || 'General'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-brand-navy text-sm font-bold">
            ${course.price.toFixed(2)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/(learner)/courses/${course.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-200">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <BookOpen size={40} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="text-brand-gold mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
          <span>{course.category?.name || 'General'}</span>
        </div>
        <h3 className="group-hover:text-brand-gold mb-2 line-clamp-1 text-lg font-bold text-gray-900 transition-colors">
          {course.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-500">
          {course.description || course.subtitle || 'No description available.'}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-brand-navy text-sm font-bold">
            ${course.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-400">
            {course.duration || 'N/A'}
          </span>
        </div>
      </div>
    </Link>
  );
}
