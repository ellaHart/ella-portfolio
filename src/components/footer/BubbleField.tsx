import { useCallback, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useCreativeMode } from '../../context/CreativeMode';
import styles from './BubbleField.module.css';

type Bubble = { id: number; x: number; size: number; duration: number; delay: number; drift: number; popped: boolean };

let nextId = 0;
const makeBubble = (): Bubble => ({
  id: nextId++,
  x: 4 + Math.random() * 92,
  size: 22 + Math.random() * 46,
  duration: 9 + Math.random() * 9,
  delay: -Math.random() * 14,
  drift: (Math.random() - 0.5) * 60,
  popped: false,
});

/**
 * "Pop the Bubbles": moved from the old hero into the footer as an optional
 * detail. Bubbles are real buttons with a single roving tab stop, so the
 * group costs keyboard users one Tab, not twenty.
 */
export function BubbleField() {
  const { isCreative } = useCreativeMode();
  const count = isCreative ? 16 : 7;
  const [bubbles, setBubbles] = useState<Bubble[]>(() => Array.from({ length: 16 }, makeBubble));
  const [score, setScore] = useState(0);
  const field = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => bubbles.slice(0, count), [bubbles, count]);
  const firstAlive = visible.find((b) => !b.popped)?.id;

  const pop = useCallback((id: number, viaKeyboard: boolean) => {
    setScore((s) => s + 1);
    setBubbles((list) => list.map((b) => (b.id === id ? { ...b, popped: true } : b)));
    // Respawn after the pop animation so the field never empties.
    setTimeout(() => setBubbles((list) => list.map((b) => (b.id === id ? makeBubble() : b))), 650);
    if (viaKeyboard) {
      requestAnimationFrame(() => field.current?.querySelector<HTMLButtonElement>('button:not([data-popped])')?.focus());
    }
  }, []);

  return (
    <section className={styles.wrap} aria-labelledby="bubbles-label">
      <div className={`container ${styles.header}`}>
        <p id="bubbles-label" className={styles.label}>
          <span className={styles.hand}>psst, pop the bubbles</span>
        </p>
        <p className={styles.score} aria-live="polite">
          {score > 0 ? `${score} popped` : ' '}
        </p>
      </div>
      <div ref={field} className={styles.field} role="group" aria-label="Bubbles">
        {visible.map((b) => (
          <button
            key={b.id}
            type="button"
            className={styles.bubble}
            data-popped={b.popped || undefined}
            tabIndex={b.id === firstAlive ? 0 : -1}
            aria-label="Pop bubble"
            disabled={b.popped}
            onClick={(e) => pop(b.id, e.detail === 0)}
            style={{ '--x': `${b.x}%`, '--size': `${b.size}px`, '--dur': `${b.duration}s`, '--delay': `${b.delay}s`, '--drift': `${b.drift}px` } as CSSProperties}
          />
        ))}
      </div>
    </section>
  );
}
