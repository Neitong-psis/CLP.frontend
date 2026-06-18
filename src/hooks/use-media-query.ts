'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', handler);
    // Defer initial sync so it isn't a synchronous setState in the effect body
    const id = setTimeout(() => setMatches(media.matches), 0);
    return () => {
      clearTimeout(id);
      media.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}
