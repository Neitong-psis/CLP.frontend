'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const THEME_KEY = 'theme';
// Also stored as a non-httpOnly cookie so the server can read it during SSR
// and set the initial `dark` class on <html> — eliminating theme FOUC without
// any inline <script> (which React 19 warns about).
export const THEME_COOKIE = 'qb_theme';
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const VALID_THEMES = ['light', 'dark'] as const;

type Theme = (typeof VALID_THEMES)[number];

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isValidTheme(value: string | null | undefined): value is Theme {
  return VALID_THEMES.includes(value as Theme);
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  const saved = localStorage.getItem(THEME_KEY);
  if (isValidTheme(saved)) return saved;

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function persistTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme);
  // Write to cookie so Next.js server components can read it on next request
  document.cookie = `${THEME_COOKIE}=${theme};path=/;max-age=${THEME_COOKIE_MAX_AGE};samesite=lax`;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Keep the `dark` class on <html> in sync with state
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      persistTheme(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return context;
}
