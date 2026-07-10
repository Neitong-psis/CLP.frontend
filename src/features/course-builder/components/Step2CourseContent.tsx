import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModuleItem } from './ModuleItem';

export function Step2CourseContent() {
  const { control } = useFormContext();

  const {
    fields: modules,
    append,
    remove,
    move,
  } = useFieldArray({
    control,
    name: 'modules',
  });

  const handleAddModule = () => {
    append({
      id: crypto.randomUUID(),
      title: `Module ${modules.length + 1}`,
      expanded: true,
      lessons: [],
    });
  };

  const handleMoveModule = (index: number, dir: 'up' | 'down') => {
    const targetIndex = dir === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < modules.length) {
      move(index, targetIndex);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-brand-navy text-base font-bold">
            Course Curriculum
          </h2>
          <p className="text-xs text-slate-400">
            Build a scalable Module / Lesson / Content / Quiz / Assignment
            structure
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 shrink-0 gap-1.5 font-bold"
          onClick={handleAddModule}
          type="button"
        >
          <Plus className="h-3.5 w-3.5" /> Add Module
        </Button>
      </div>

      {modules.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-16 text-center">
          <p className="text-sm font-bold text-slate-500">No modules yet.</p>
          <p className="mt-1 text-xs text-slate-400">
            Add a module, then add lessons and lesson content inside it.
          </p>
          <Button
            type="button"
            variant="secondary"
            className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 mt-4 gap-1.5 font-bold"
            onClick={handleAddModule}
          >
            <Plus className="h-4 w-4" /> Add Module
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {modules.map((mod, i) => (
            <ModuleItem
              key={mod.id}
              modIndex={i}
              totalModules={modules.length}
              onDelete={() => remove(i)}
              onMove={(dir) => handleMoveModule(i, dir)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
