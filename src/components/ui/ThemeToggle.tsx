import { useId, useRef } from 'react';
import { useTheme } from '../../context/Theme';
import styles from './ThemeToggle.module.css';

/**
 * Sun/moon toggle. One SVG morphs between states: the sun's rays retract and
 * spin away while a mask circle slides in to carve the crescent.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { isDark, toggle } = useTheme();
  const ref = useRef<HTMLButtonElement>(null);
  const maskId = `moon-${useId().replace(/:/g, '')}`;

  return (
    <button
      ref={ref}
      type="button"
      className={`${styles.toggle} ${className}`}
      aria-pressed={isDark}
      onClick={() => toggle(ref.current)}
      data-dark={isDark || undefined}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="visually-hidden">Dark mode</span>
      <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true" focusable="false">
        <mask id={maskId}>
          <rect width="24" height="24" fill="#fff" />
          <circle className={styles.bite} cx="17" cy="7" r="7" fill="#000" />
        </mask>
        <circle className={styles.core} cx="12" cy="12" r="8" mask={`url(#${maskId})`} />
        <g className={styles.rays}>
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1="12" y1="1.5" x2="12" y2="3.5" transform={`rotate(${i * 45} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  );
}
