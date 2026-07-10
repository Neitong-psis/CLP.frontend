'use client';

import React from 'react';
import { PlayCircle, BookOpen, Lock } from 'lucide-react';

interface LessonItemProps {
  title: string;
  contentType: string;
  videoDurationSeconds: number;
  isFree: boolean;
}

export function LessonItem({
  title,
  contentType,
  videoDurationSeconds,
  isFree,
}: LessonItemProps) {
  return (
    <div className="flex items-center justify-between rounded-md bg-white p-3 text-sm text-gray-600 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-3">
        {contentType === 'video' ? (
          <PlayCircle size={18} className="text-brand-navy" />
        ) : (
          <BookOpen size={18} className="text-gray-400" />
        )}
        <span className="font-medium">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        {isFree ? (
          <span className="text-[10px] font-bold text-green-600 uppercase">
            Free
          </span>
        ) : (
          <Lock size={14} className="text-gray-400" />
        )}
        <span className="text-xs text-gray-400">
          {videoDurationSeconds
            ? `${Math.floor(videoDurationSeconds / 60)}m ${videoDurationSeconds % 60}s`
            : 'N/A'}
        </span>
      </div>
    </div>
  );
}
