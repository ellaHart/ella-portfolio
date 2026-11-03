import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { PixelIcon, type PixelIconName } from './PixelIcon';
import styles from './Desktop.module.css';

export type Folder<T extends string> = { id: T; label: string; icon: PixelIconName };

type Props<T extends string> = {
  folders: Folder<T>[];
  active: T;
  onSelect: (id: T) => void;
  /** id prefix shared with the panels (`${idBase}-tab-…` / `${idBase}-panel-…`). */
  idBase: string;
  /** Extra items after the folders, e.g. a link that opens elsewhere. */
  extra?: ReactNode;
};

/**
 * Finder-style sidebar. Folders that swap the window's content are WAI-ARIA
 * tabs (arrow keys move between them); `extra` items sit below as ordinary links.
 */
export function FolderNav<T extends string>({ folders, active, onSelect, idBase, extra }: Props<T>) {
  const refs = useRef<Partial<Record<T, HTMLButtonElement | null>>>({});

  const onKeyDown = (e: KeyboardEvent) => {
    const i = folders.findIndex((f) => f.id === active);
    const next = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: folders.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const id = folders[(next + folders.length) % folders.length].id;
    onSelect(id);
    refs.current[id]?.focus();
  };

  return (
    <nav className={styles.folders} aria-label="Desktop folders">
      <p className={styles.sidebarLabel} aria-hidden="true">
        Favorites
      </p>
      <div role="tablist" aria-orientation="vertical" aria-label="Folders" className={styles.folderList} onKeyDown={onKeyDown}>
        {folders.map((f) => (
          <button
            key={f.id}
            ref={(el) => {
              refs.current[f.id] = el;
            }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${f.id}`}
            aria-selected={active === f.id}
            aria-controls={`${idBase}-panel-${f.id}`}
            tabIndex={active === f.id ? 0 : -1}
            className={styles.folder}
            onClick={() => onSelect(f.id)}
          >
            <PixelIcon name={f.icon} size={22} />
            <span className={styles.folderLabel}>{f.label}</span>
          </button>
        ))}
      </div>
      {extra}
    </nav>
  );
}
