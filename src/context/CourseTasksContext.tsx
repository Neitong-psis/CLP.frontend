'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { EDUCATOR_COURSE_TASKS, type CourseTask } from '@/constants/educator';

const STORAGE_KEY = 'qb_educator_course_tasks_v2';

interface CourseTasksCtxValue {
  tasks: CourseTask[];
  addTask: (task: CourseTask) => void;
  removeTask: (id: string) => void;
}

const CourseTasksContext = createContext<CourseTasksCtxValue | null>(null);

export function CourseTasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<CourseTask[]>(() => {
    if (typeof window === 'undefined') return [...EDUCATOR_COURSE_TASKS];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as CourseTask[];
    } catch {}
    return [...EDUCATOR_COURSE_TASKS];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  const addTask = useCallback((task: CourseTask) => {
    setTasks((prev) => [task, ...prev]);
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <CourseTasksContext.Provider value={{ tasks, addTask, removeTask }}>
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
