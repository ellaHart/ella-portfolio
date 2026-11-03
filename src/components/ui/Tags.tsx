import { isTodo } from './Pending';
import styles from './Tags.module.css';

export function Tags({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`${styles.tags} ${className}`} aria-label="Tags">
      {items
        .filter((t) => !isTodo(t))
        .map((t) => (
          <li key={t} className={styles.tag}>
            {t}
          </li>
        ))}
    </ul>
  );
}
