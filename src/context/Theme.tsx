import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { withViewTransition } from '../utils/viewTransition';

type Theme = 'light' | 'dark';

type ThemeValue = {
  theme: Theme;
  isDark: boolean;
  /** Pass the triggering element so the transition can originate from it. */
  toggle: (origin?: HTMLElement | null) => void;
};

const STORAGE_KEY = 'eh:theme';
const META_COLORS: Record<Theme, string> = { light: '#F8F2E8', dark: '#1D1A18' };
const ThemeContext = createContext<ThemeValue | null>(null);

const applyToRoot = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLORS[theme]);
};

/**
 * Light/dark theme, independent of Creative Mode (so there are four looks).
 * The first visit follows the OS setting; an explicit choice is remembered.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // index.html resolves the initial theme before first paint; mirror it.
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'));

  useEffect(() => applyToRoot(theme), [theme]);

  // Follow OS changes until the visitor picks a theme themselves.
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        /* storage unavailable: keep following the OS */
      }
      setTheme(e.matches ? 'dark' : 'light');
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(
    (origin?: HTMLElement | null) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable: choice simply won't persist */
      }
      withViewTransition(
        'theme',
        () => {
          flushSync(() => setTheme(next));
          applyToRoot(next);
        },
        origin,
        next === 'dark' ? 'in' : 'out',
      );
    },
    [theme],
  );

  return <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
