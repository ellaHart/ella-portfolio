import { useEffect, useRef } from 'react';
import type { ImageAsset } from '../../content/types';
import { useReducedMotion } from '../../hooks/useMediaQuery';
import styles from './AutoScrollGallery.module.css';

type Item = { title: string; detail?: string; image: ImageAsset | null };
type Props = { label: string; items: Item[]; onOpen?: (image: ImageAsset, caption: string) => void };

const SPEED = 28; // px per second: slow enough to read the captions

/**
 * Compact, seamlessly looping strip of screenshot cards.
 *
 * It drifts by nudging `scrollLeft`, not with a CSS transform, so it remains
 * a real scroll container: trackpads, touch swipes and the scrollbar all work,
 * and the auto-drift simply resumes from wherever the visitor left it.
 * Pauses on hover, keyboard focus and touch; off entirely under reduced motion.
 * The track is rendered twice; the copy is hidden from assistive tech.
 */
export function AutoScrollGallery({ label, items, onOpen }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = scroller.current;
    if (!el || reduce) return;
    let raf = 0;
    let last = performance.now();
    let paused = false;
    let carry = 0; // sub-pixel remainder, since scrollLeft rounds
    const pause = () => (paused = true);
    const resume = () => (paused = false);

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!paused) {
        carry += (SPEED * dt) / 1000;
        const step = Math.floor(carry);
        carry -= step;
        if (step) el.scrollLeft += step;
        // Wrap seamlessly once the first set has fully scrolled past: the
        // period is the distance from the first card to the start of the copy.
        const first = el.querySelector<HTMLElement>('li');
        const copy = el.querySelector<HTMLElement>('[data-copy]');
        const period = first && copy ? copy.offsetLeft - first.offsetLeft : 0;
        if (period > 0 && el.scrollLeft >= period) el.scrollLeft -= period;
      }
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener('pointerenter', pause);
    el.addEventListener('pointerleave', resume);
    el.addEventListener('focusin', pause);
    el.addEventListener('focusout', resume);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', resume);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', pause);
      el.removeEventListener('pointerleave', resume);
      el.removeEventListener('focusin', pause);
      el.removeEventListener('focusout', resume);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resume);
    };
  }, [reduce]);

  const card = (item: Item, copy: boolean) => {
    const caption = item.detail ? `${item.title}: ${item.detail}` : item.title;
    const media = item.image ? (
      <img src={item.image.src} alt={copy ? '' : item.image.alt} width={item.image.width} height={item.image.height} loading="lazy" draggable={false} />
    ) : (
      <span className={styles.placeholder} role={copy ? undefined : 'img'} aria-label={copy ? undefined : `${item.title} screenshot pending`}>
        Screenshot pending
      </span>
    );
    return (
      <li key={`${copy ? 'b' : 'a'}-${item.title}`} className={styles.card}>
        {item.image && onOpen ? (
          <button type="button" className={styles.media} onClick={() => onOpen(item.image!, caption)} tabIndex={copy ? -1 : undefined} aria-label={copy ? undefined : `Expand: ${caption}`}>
            {media}
          </button>
        ) : (
          <div className={styles.media}>{media}</div>
        )}
        <p className={styles.caption}>
          <span className={styles.title}>{item.title}</span>
          {item.detail && <span className={styles.detail}>{item.detail}</span>}
        </p>
      </li>
    );
  };

  return (
    <div className={styles.wrap}>
      <div ref={scroller} className={styles.scroller} tabIndex={0} role="region" aria-label={`${label} (scrollable)`} data-static={reduce || undefined}>
        <ul className={styles.track}>
          {items.map((i) => card(i, false))}
          {!reduce && (
            <li className={styles.copy} aria-hidden="true" data-copy>
              <ul className={styles.track}>{items.map((i) => card(i, true))}</ul>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
