import { useRef } from 'react';
import { useCreativeMode } from '../../context/CreativeMode';
import styles from './ModeToggle.module.css';

/**
 * Switch between Professional and Creative presentation. Uses role="switch"
 * so assistive tech announces it as on/off rather than as a generic button.
 */
export function ModeToggle({ className = '' }: { className?: string }) {
  const { isCreative, toggle } = useCreativeMode();
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={isCreative}
      onClick={() => toggle(ref.current)}
      className={`${styles.toggle} ${className}`}
      data-on={isCreative || undefined}
    >
      <span className={styles.label}>
        <span className={styles.labelPro} aria-hidden="true">
          Professional
        </span>
        <span className={styles.labelCreative} aria-hidden="true">
          Creative
        </span>
        <span className="visually-hidden">Creative mode</span>
      </span>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb}>
          <svg viewBox="0 0 24 24" className={styles.spark}>
            <path d="M12 2.5c.6 4.6 2.9 6.9 7.5 7.5-4.6.6-6.9 2.9-7.5 7.5-.6-4.6-2.9-6.9-7.5-7.5 4.6-.6 6.9-2.9 7.5-7.5Z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
