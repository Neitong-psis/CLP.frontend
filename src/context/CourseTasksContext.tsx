'use client';

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import type { CourseTask } from '@/constants/educator';
import {
  getServerSnapshot,
  getSnapshot,
  setTasks,
  subscribe,
} from './courseTasksStore';

interface CourseTasksCtxValue {
  tasks: CourseTask[];
  addTask: (task: CourseTask) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, patch: Partial<CourseTask>) => void;
  /** Patches the task if `id` already exists, otherwise inserts one built
   *  from `createIfMissing()` — the single funnel autosave/save/submit use
   *  so repeated saves of the same draft never create duplicates. */
  upsertTask: (
    id: string,
    patch: Partial<CourseTask>,
    createIfMissing: () => CourseTask,
  ) => void;
}

const CourseTasksContext = createContext<CourseTasksCtxValue | null>(null);

export function CourseTasksProvider({ children }: { children: ReactNode }) {
  const tasks = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addTask = useCallback((task: CourseTask) => {
    setTasks((prev) => [task, ...prev]);
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateTask = useCallback((id: string, patch: Partial<CourseTask>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }, []);

  const upsertTask = useCallback(
    (
      id: string,
      patch: Partial<CourseTask>,
      createIfMissing: () => CourseTask,
    ) => {
      setTasks((prev) => {
        const exists = prev.some((t) => t.id === id);
        if (exists)
          return prev.map((t) => (t.id === id ? { ...t, ...patch } : t));
        return [createIfMissing(), ...prev];
      });
    },
    [],
  );

  return (
    <CourseTasksContext.Provider
      value={{ tasks, addTask, removeTask, updateTask, upsertTask }}
    >
      {children}
    </CourseTasksContext.Provider>
  );
}

export function useCourseTasks(): CourseTasksCtxValue {
  const context = useContext(CourseTasksContext);
  if (!context)
    throw new Error('useCourseTasks must be used inside CourseTasksProvider');
  return context;
}
