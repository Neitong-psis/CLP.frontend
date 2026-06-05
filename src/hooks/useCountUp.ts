'use client';

import { useEffect, useRef, useState } from 'react';
import { easeOutCubic, prefersReducedMotion } from '@/lib/utils/animation';

const DEFAULT_DURATION_MS = 1800;

interface UseCountUpOptions {
  active: boolean;
  duration?: number;
  delay?: number;
}

export function useCountUp(target: number, options: UseCountUpOptions): number {
  const { active, duration = DEFAULT_DURATION_MS, delay = 0 } = options;
  const reducedMotion = prefersReducedMotion();
  const [value, setValue] = useState(() => (reducedMotion ? target : 0));
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current || reducedMotion) return;
    startedRef.current = true;

    let raf = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        setValue(target * easeOutCubic(t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [active, target, duration, delay, reducedMotion]);

  return value;
}
