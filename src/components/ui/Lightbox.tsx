import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import type { ImageAsset } from '../../content/types';
import { Icon } from './Icon';
import styles from './Lightbox.module.css';

type Props = { image: ImageAsset | null; caption?: string; onClose: () => void };

/**
 * Full-screen image viewer for dense boards (journey maps, test plans).
 * Fits the image to the screen by default; clicking the image (or the zoom
 * button) switches to actual size so visitors can pan around the detail.
 * Built on a native modal <dialog>: focus trap, Esc to close, focus return.
 */
export function Lightbox({ image, caption, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const focusPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (image && !el.open) {
      setZoomed(false);
      el.showModal();
    }
    if (!image && el.open) el.close();
  }, [image]);

  // After zooming in, scroll so the point that was clicked stays under the cursor.
  useLayoutEffect(() => {
    const s = stage.current;
    const p = focusPoint.current;
    if (!s || !zoomed || !p) return;
    const img = s.querySelector('img');
    if (!img) return;
    const apply = () => {
      s.scrollLeft = p.x * img.scrollWidth - s.clientWidth / 2;
      s.scrollTop = p.y * img.scrollHeight - s.clientHeight / 2;
    };
    if (img.complete) apply();
    else img.addEventListener('load', apply, { once: true });
  }, [zoomed]);

  const toggleZoom = (e?: MouseEvent<HTMLImageElement>) => {
    if (e && !zoomed) {
      const r = e.currentTarget.getBoundingClientRect();
      focusPoint.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
    } else {
      focusPoint.current = { x: 0.5, y: 0.5 };
    }
    setZoomed((z) => !z);
  };

  return (
    <dialog
      ref={dialog}
      className={styles.lightbox}
      aria-label={image ? `Image viewer: ${image.alt}` : 'Image viewer'}
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && dialog.current?.close()}
    >
      {image && (
        <>
          <div className={styles.bar}>
            <p className={styles.caption}>{caption ?? image.alt}</p>
            <div className={styles.actions}>
              <button type="button" className={styles.button} onClick={() => toggleZoom()} aria-pressed={zoomed}>
                {zoomed ? 'Fit to screen' : 'Zoom in'}
              </button>
              <button type="button" className={styles.button} onClick={() => dialog.current?.close()} autoFocus>
                <Icon name="close" size={18} />
                <span className="visually-hidden">Close image viewer</span>
              </button>
            </div>
          </div>
          <div ref={stage} className={styles.stage} data-zoomed={zoomed || undefined} tabIndex={0} aria-label="Image, scrollable when zoomed">
            <img
              src={zoomed && image.large ? image.large : image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className={styles.image}
              onClick={toggleZoom}
              draggable={false}
            />
          </div>
        </>
      )}
    </dialog>
  );
}
