import { useEffect, useRef } from 'react';
import { useCreativeMode } from '../../context/CreativeMode';
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery';
import styles from './CursorFollower.module.css';

/**
 * Creative Mode only: a soft dot trails the pointer and grows into a labelled
 * bubble over elements with [data-cursor="Label"]. Purely decorative: the
 * native cursor stays visible, and it is skipped on touch or reduced motion.
 */
export function CursorFollower() {
  const { isCreative } = useCreativeMode();
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const enabled = isCreative && fine && !reduce;

  useEffect(() => {
    const el = dot.current;
    if (!enabled || !el) return;
    let x = -100;
    let y = -100;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = (e.target as Element).closest<HTMLElement>('[data-cursor]');
      el.dataset.label = target?.dataset.cursor ?? '';
      el.toggleAttribute('data-active', Boolean(target));
    };
    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={dot} className={styles.cursor} aria-hidden="true" />;
}
