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

const STORAGE_KEY = 'qb_educator_course_tasks_v1';

interface CourseTasksCtxValue {
  tasks: CourseTask[];
  addTask: (task: CourseTask) => void;
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

  return (
    <CourseTasksContext.Provider value={{ tasks, addTask }}>
      {children}
    </CourseTasksContext.Provider>
  );
}

export function useCourseTasks(): CourseTasksCtxValue {
  const ctx = useContext(CourseTasksContext);
  if (!ctx)
    throw new Error('useCourseTasks must be used inside CourseTasksProvider');
  return ctx;
}
