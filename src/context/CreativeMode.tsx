import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { withViewTransition } from '../utils/viewTransition';

type Mode = 'professional' | 'creative';

type CreativeModeValue = {
  mode: Mode;
  isCreative: boolean;
  /** Pass the triggering element so the reveal can originate from it. */
  setMode: (mode: Mode, origin?: HTMLElement | null) => void;
  toggle: (origin?: HTMLElement | null) => void;
};

const STORAGE_KEY = 'eh:mode';
const CreativeModeContext = createContext<CreativeModeValue | null>(null);

function readInitialMode(): Mode {
  // index.html already applied the attribute before paint; mirror it.
  return document.documentElement.dataset.mode === 'creative' ? 'creative' : 'professional';
}

export function CreativeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(readInitialMode);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'creative') root.dataset.mode = 'creative';
    else delete root.dataset.mode;
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* storage unavailable: mode simply won't persist */
    }
  }, [mode]);

  const setMode = useCallback((next: Mode, origin?: HTMLElement | null) => {
    // Circle reveal from the toggle.
    withViewTransition(
      'mode',
      () => {
        flushSync(() => setModeState(next));
        // Apply synchronously so the view transition captures the new state.
        if (next === 'creative') document.documentElement.dataset.mode = 'creative';
        else delete document.documentElement.dataset.mode;
      },
      origin,
    );
  }, []);

  const toggle = useCallback(
    (origin?: HTMLElement | null) => setMode(mode === 'creative' ? 'professional' : 'creative', origin),
    [mode, setMode],
  );

  return (
    <CreativeModeContext.Provider value={{ mode, isCreative: mode === 'creative', setMode, toggle }}>
      {children}
    </CreativeModeContext.Provider>
  );
}

export function useCreativeMode() {
  const ctx = useContext(CreativeModeContext);
  if (!ctx) throw new Error('useCreativeMode must be used inside <CreativeModeProvider>');
  return ctx;
}
