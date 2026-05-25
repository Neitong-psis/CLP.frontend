'use client';

import { useState, useCallback, type ChangeEvent } from 'react';

interface UseSearchReturn {
  query: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  clear: () => void;
}

export function useSearch(initialQuery = ''): UseSearchReturn {
  const [query, setQuery] = useState(initialQuery);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const clear = useCallback(() => setQuery(''), []);

  return { query, handleChange, clear };
}
