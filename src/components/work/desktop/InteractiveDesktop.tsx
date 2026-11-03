import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/ibm-plex-sans/latin-400.css';
import '@fontsource/ibm-plex-sans/latin-500.css';
import { certifications } from '../../../content/experience';
import { games } from '../../../content/games';
import { site } from '../../../content/site';
import { CertificationGallery } from './CertificationGallery';
import { DesktopWindow, type WindowState } from './DesktopWindow';
import { FolderNav, type Folder } from './FolderNav';
import { GameGallery } from './GameGallery';
import { PixelIcon, type PixelIconName } from './PixelIcon';
import styles from './Desktop.module.css';

type FolderId = 'games' | 'certifications';
type IconId = FolderId | 'resume';

const FOLDERS: Folder<FolderId>[] = [
  { id: 'games', label: 'Games', icon: 'games' },
  { id: 'certifications', label: 'Certifications', icon: 'certificate' },
];
const ICONS: { id: IconId; label: string; icon: PixelIconName }[] = [
  ...FOLDERS,
  { id: 'resume', label: 'Resume', icon: 'resume' },
];
const ID = 'desk';
/** Height of the menu bar; the window can't be dragged above it. */
const MENUBAR = 32;

const openResume = () => window.open(site.resumeHref, '_blank', 'noopener');

/** Menu-bar clock, refreshed every 30 seconds. */
function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(t);
  }, []);
  const day = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).replace(',', '');
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${day}  ${time}`;
}

/**
 * Work-page desktop: a pixel-art campus wallpaper with desktop icons and a
 * Finder-style window. Games and Certifications open in the window; Resume
 * opens the PDF in a new tab. With a mouse, icons select on click and open on
 * double-click; touch and keyboard open them directly. On wider screens the
 * window can be dragged (kept inside the desktop), minimized, maximized or
 * closed; on phones it's a simple, always-open file browser.
 */
export function InteractiveDesktop() {
  const [history, setHistory] = useState<{ stack: FolderId[]; index: number }>({ stack: ['games'], index: 0 });
  const active = history.stack[history.index];
  const [win, setWin] = useState<WindowState>('open');
  const [maximized, setMaximized] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [selected, setSelected] = useState<IconId | null>(null);
  const clock = useClock();

  const desktopRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const pointerType = useRef('mouse');
  const iconRefs = useRef<Partial<Record<IconId, HTMLButtonElement | null>>>({});

  const navigate = (id: FolderId) =>
    setHistory((h) => (h.stack[h.index] === id ? h : { stack: [...h.stack.slice(0, h.index + 1), id], index: h.index + 1 }));

  const open = (id: IconId) => {
    setSelected(id);
    if (id === 'resume') return openResume();
    navigate(id);
    const wasHidden = win !== 'open';
    setWin('open');
    if (wasHidden) requestAnimationFrame(() => windowRef.current?.focus());
  };

  const hide = (state: 'minimized' | 'closed') => {
    setWin(state);
    // Hand focus back to the desktop icon for the folder that was open.
    iconRefs.current[active]?.focus();
  };

  /* ---------- Desktop icons: click selects (mouse), double-click opens ---------- */
  const onIconClick = (id: IconId) => (e: MouseEvent) => {
    // Keyboard activation (detail 0) and taps open straight away.
    if (e.detail === 0 || pointerType.current !== 'mouse') open(id);
    else setSelected(id);
  };

  /* ---------- Dragging, clamped to the desktop ---------- */
  const clamp = useCallback((x: number, y: number) => {
    const desk = desktopRef.current;
    const w = windowRef.current;
    if (!desk || !w) return { x, y };
    const maxX = Math.max(0, desk.clientWidth - w.offsetWidth);
    const maxY = Math.max(MENUBAR, desk.clientHeight - w.offsetHeight);
    return { x: Math.min(Math.max(0, x), maxX), y: Math.min(Math.max(MENUBAR, y), maxY) };
  }, []);

  const onTitlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const w = windowRef.current;
    if (!w || maximized || e.button !== 0 || (e.target as HTMLElement).closest('button')) return;
    if (!window.matchMedia('(min-width: 48rem)').matches) return;
    const start = { x: e.clientX, y: e.clientY, left: w.offsetLeft, top: w.offsetTop };
    const bar = e.currentTarget;
    bar.setPointerCapture(e.pointerId);
    w.dataset.dragging = '';
    const move = (ev: globalThis.PointerEvent) => setPos(clamp(start.left + ev.clientX - start.x, start.top + ev.clientY - start.y));
    const up = () => {
      delete w.dataset.dragging;
      bar.removeEventListener('pointermove', move);
      bar.removeEventListener('pointerup', up);
      bar.removeEventListener('pointercancel', up);
    };
    bar.addEventListener('pointermove', move);
    bar.addEventListener('pointerup', up);
    bar.addEventListener('pointercancel', up);
  };

  // Keep a dragged window reachable when the desktop resizes.
  useEffect(() => {
    const desk = desktopRef.current;
    if (!desk) return;
    const ro = new ResizeObserver(() => {
      if (!window.matchMedia('(min-width: 48rem)').matches) return setPos(null);
      setPos((p) => (p ? clamp(p.x, p.y) : p));
    });
    ro.observe(desk);
    return () => ro.disconnect();
  }, [clamp]);

  const title = FOLDERS.find((f) => f.id === active)!.label;
  const status =
    active === 'games'
      ? { left: `${games.length} items`, right: 'double-click to open' }
      : { left: `${certifications.length} items`, right: 'click to preview' };

  return (
    <div
      ref={desktopRef}
      className={styles.desktop}
      onPointerDown={(e) => {
        pointerType.current = e.pointerType;
        // Clicking empty wallpaper clears the icon selection, like a real desktop.
        if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.wallpaper !== undefined) setSelected(null);
      }}
    >
      <picture className={styles.wallpaper} data-wallpaper="">
        <source media="(max-width: 47.99rem)" srcSet="/images/desktop/umiami-pixel-wallpaper-sm.webp" />
        <img
          src="/images/desktop/umiami-pixel-wallpaper.webp"
          alt=""
          width={2688}
          height={1520}
          loading="lazy"
          decoding="async"
          data-wallpaper=""
        />
      </picture>

      <div className={styles.menubar} aria-hidden="true">
        <span className={styles.menuLeft}>
          <img src="/images/brand/logo-eh-circle.png" alt="" width={18} height={18} className={styles.menuLogo} />
          <b>Finder</b>
          <span className={styles.menuItems}>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Go</span>
            <span>Window</span>
            <span>Help</span>
          </span>
        </span>
        <span className={styles.menuRight}>
          <svg viewBox="0 0 16 16" className={styles.menuGlyph}>
            <path d="M2 6.5a9 9 0 0 1 12 0M4.2 9a6 6 0 0 1 7.6 0M6.4 11.4a3 3 0 0 1 3.2 0" />
          </svg>
          <svg viewBox="0 0 22 12" className={styles.menuBattery}>
            <rect x="1" y="1" width="17" height="10" rx="2" />
            <rect x="3" y="3" width="11" height="6" rx="1" className={styles.menuBatteryFill} />
            <path d="M20 4.5v3" />
          </svg>
          <span>{clock}</span>
        </span>
      </div>

      <ul className={styles.desktopIcons} aria-label="Desktop">
        {ICONS.map((icon) => (
          <li key={icon.id}>
            <button
              ref={(el) => {
                iconRefs.current[icon.id] = el;
              }}
              type="button"
              className={styles.deskIcon}
              aria-pressed={selected === icon.id}
              aria-describedby={`${ID}-icon-hint`}
              onClick={onIconClick(icon.id)}
              onDoubleClick={() => open(icon.id)}
            >
              <span className={styles.deskIconArt}>
                <PixelIcon name={icon.icon} size={48} />
              </span>
              <span className={styles.deskIconLabel}>{icon.label}</span>
              {icon.id === 'resume' && <span className="visually-hidden"> (PDF, opens in a new tab)</span>}
            </button>
          </li>
        ))}
      </ul>
      <p id={`${ID}-icon-hint`} className="visually-hidden">
        Press Enter to open. With a mouse, double-click to open.
      </p>

      <DesktopWindow
        ref={windowRef}
        title={title}
        path={`~/Desktop/${title}`}
        state={win}
        maximized={maximized}
        style={pos && !maximized ? { left: pos.x, top: pos.y } : undefined}
        nav={{
          canBack: history.index > 0,
          canForward: history.index < history.stack.length - 1,
          onBack: () => setHistory((h) => ({ ...h, index: Math.max(0, h.index - 1) })),
          onForward: () => setHistory((h) => ({ ...h, index: Math.min(h.stack.length - 1, h.index + 1) })),
        }}
        onClose={() => hide('closed')}
        onMinimize={() => hide('minimized')}
        onToggleMaximize={() => setMaximized((m) => !m)}
        onTitlePointerDown={onTitlePointerDown}
        status={status}
        sidebar={
          <FolderNav
            folders={FOLDERS}
            active={active}
            onSelect={navigate}
            idBase={ID}
            extra={
              <div className={styles.resumeLinks}>
                <a href={site.resumeHref} target="_blank" rel="noopener" className={styles.folder}>
                  <PixelIcon name="resume" size={22} />
                  <span className={styles.folderLabel}>Resume</span>
                  <span className="visually-hidden"> (PDF, opens in a new tab)</span>
                </a>
                <a href={site.resumeHref} download className={styles.download}>
                  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                    <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
                  </svg>
                  <span className={styles.downloadLabel}>Download</span>
                  <span className="visually-hidden"> resume (PDF)</span>
                </a>
              </div>
            }
          />
        }
      >
        {FOLDERS.map((f) => (
          <div
            key={f.id}
            role="tabpanel"
            id={`${ID}-panel-${f.id}`}
            aria-labelledby={`${ID}-tab-${f.id}`}
            hidden={active !== f.id}
            className={styles.panel}
          >
            {f.id === 'games' ? <GameGallery /> : <CertificationGallery />}
          </div>
        ))}
      </DesktopWindow>

      <div className={styles.dock} aria-live="polite">
        {win === 'minimized' && (
          <button type="button" className={styles.dockChip} onClick={() => open(active)}>
            <PixelIcon name={FOLDERS.find((f) => f.id === active)!.icon} size={20} />
            Restore {title}
          </button>
        )}
        {win === 'closed' && <p className={styles.dockNote}>Window closed. Open a folder to bring it back.</p>}
      </div>
    </div>
  );
}
