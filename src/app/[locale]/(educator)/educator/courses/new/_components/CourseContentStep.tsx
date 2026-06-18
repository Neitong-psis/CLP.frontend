'use client';

import { BookOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CourseModule } from '../_lib/types';
import { ModuleItem } from './ModuleItem';

export function CourseContentStep({
  modules,
  onAddModule,
  onUpdateModule,
  onDeleteModule,
  onMoveModule,
}: {
  modules: CourseModule[];
  onAddModule: () => void;
  onUpdateModule: (index: number, updated: CourseModule) => void;
  onDeleteModule: (index: number) => void;
  onMoveModule: (index: number, dir: 'up' | 'down') => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-foreground text-base font-bold">
            Course Curriculum
          </h2>
          <p className="text-muted-foreground text-xs">
            Build a scalable Course / Module / Lesson / Content / Quiz /
            Assignment structure
          </p>
        </div>
        <Button
          variant="default"
          size="sm"
          className="shrink-0 gap-1.5 bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500"
          onClick={onAddModule}
        >
          <Plus className="h-3.5 w-3.5" /> Add Module
        </Button>
      </div>

      {modules.length === 0 ? (
        <div className="animate-fade-in border-border bg-card rounded-2xl border-2 border-dashed py-16 text-center">
          <BookOpen className="text-muted-foreground/40 mx-auto mb-3 h-8 w-8" />
          <p className="text-muted-foreground text-sm font-semibold">
            No modules yet
          </p>
          <p className="text-muted-foreground/70 mt-1 text-xs">
            Click &ldquo;Add Module&rdquo; to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {modules.map((mod, i) => (
            <ModuleItem
              key={mod.id}
              mod={mod}
              modIndex={i}
              totalModules={modules.length}
              onUpdate={(updated) => onUpdateModule(i, updated)}
              onDelete={() => onDeleteModule(i)}
              onMove={(dir) => onMoveModule(i, dir)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
