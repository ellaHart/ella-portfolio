import { site } from '../../content/site';
import styles from './Marquee.module.css';

/** Slow ticker of disciplines that bridges the hero into Selected Work. */
export function Marquee() {
  const items = [...site.disciplines, ...site.disciplines];
  return (
    <div className={styles.marquee}>
      <p className="visually-hidden">Disciplines: {site.disciplines.join(', ')}</p>
      <div className={styles.track} aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul key={copy} className={styles.group}>
            {items.map((d, i) => (
              <li key={`${copy}-${i}`} className={styles.item}>
                {d}
                <span className={styles.star}>✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
