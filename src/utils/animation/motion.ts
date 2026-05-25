import type { CSSProperties } from 'react';
import { cn } from '../cn';

const ENTRANCE_DISTANCES = {
  sm: 'motion-safe:translate-y-4',
  md: 'motion-safe:translate-y-6',
  lg: 'motion-safe:translate-y-8',
} as const;

export type EntranceDistance = keyof typeof ENTRANCE_DISTANCES;

export function entranceClass(
  active: boolean,
  distance: EntranceDistance = 'md',
): string {
  return cn(
    'transition-all duration-700 ease-out',
    active
      ? 'opacity-100 motion-safe:translate-y-0'
      : cn('opacity-0', ENTRANCE_DISTANCES[distance]),
  );
}

export function entranceStyle(active: boolean, delayMs: number): CSSProperties {
  return { transitionDelay: active ? `${delayMs}ms` : '0ms' };
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
