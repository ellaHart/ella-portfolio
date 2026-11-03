import { forwardRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import styles from './Desktop.module.css';

export type WindowState = 'open' | 'minimized' | 'closed';

type Props = {
  /** Shown centred in the title bar, like the open folder's name. */
  title: string;
  /** Path shown in the address bar, e.g. "~/Desktop/Games". */
  path: string;
  state: WindowState;
  maximized: boolean;
  style?: CSSProperties;
  nav: { canBack: boolean; canForward: boolean; onBack: () => void; onForward: () => void };
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  /** Starts a drag when the title bar (not a control) is pressed. */
  onTitlePointerDown?: (e: PointerEvent<HTMLDivElement>) => void;
  sidebar?: ReactNode;
  status?: { left: string; right?: string };
  children: ReactNode;
};

/**
 * Finder-style window chrome: traffic-light controls, title, back/forward
 * toolbar with an address bar, sidebar, content and status bar. Hidden
 * windows stay mounted (for the open/close animation) but are `inert`.
 */
export const DesktopWindow = forwardRef<HTMLDivElement, Props>(function DesktopWindow(
  { title, path, state, maximized, style, nav, onClose, onMinimize, onToggleMaximize, onTitlePointerDown, sidebar, status, children },
  ref,
) {
  const hidden = state !== 'open';
  return (
    <section
      ref={ref}
      className={styles.window}
      data-state={state}
      data-maximized={maximized || undefined}
      style={style}
      aria-label={`${title} window`}
      aria-hidden={hidden || undefined}
      inert={hidden}
      tabIndex={-1}
    >
      <div className={styles.titlebar} onPointerDown={onTitlePointerDown} onDoubleClick={(e) => e.target === e.currentTarget && onToggleMaximize()}>
        <div className={styles.controls}>
          <button type="button" className={styles.ctlClose} onClick={onClose} aria-label="Close window" />
          <button type="button" className={styles.ctlMin} onClick={onMinimize} aria-label="Minimize window" />
          <button
            type="button"
            className={styles.ctlMax}
            onClick={onToggleMaximize}
            aria-label={maximized ? 'Restore window size' : 'Maximize window'}
            aria-pressed={maximized}
          />
        </div>
        <span className={styles.windowTitle}>{title}</span>
      </div>

      <div className={styles.toolbar}>
        <button type="button" className={styles.navBtn} onClick={nav.onBack} disabled={!nav.canBack} aria-label="Back">
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M10 3 5 8l5 5" />
          </svg>
        </button>
        <button type="button" className={styles.navBtn} onClick={nav.onForward} disabled={!nav.canForward} aria-label="Forward">
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="m6 3 5 5-5 5" />
          </svg>
        </button>
        <p className={styles.address}>
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" />
          </svg>
          <span className="visually-hidden">Location: </span>
          <span className={styles.mono}>{path}</span>
        </p>
      </div>

      <div className={styles.body}>
        {sidebar}
        <div className={styles.content}>{children}</div>
      </div>

      {status && (
        <div className={styles.statusbar} aria-hidden="true">
          <span className={styles.mono}>{status.left}</span>
          {status.right && <span className={styles.mono}>{status.right}</span>}
        </div>
      )}
    </section>
  );
});
