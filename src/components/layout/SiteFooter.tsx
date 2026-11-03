import { Link } from 'react-router';
import { BubbleField } from '../footer/BubbleField';
import { Logo } from '../ui/Logo';
import styles from './SiteFooter.module.css';

/** Global footer: the optional bubble game plus a compact site index. */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <BubbleField />

      <div className={`container ${styles.bottom}`}>
        <Link to="/" aria-label="Home" className={styles.bottomLogo}>
          <Logo variant="circle" decorative />
        </Link>
        <p className={styles.meta}>© {new Date().getFullYear()} Ella Hartsell. Designed &amp; developed by me.</p>
        <nav aria-label="Footer" className={styles.bottomNav}>
          <Link to="/work">Work</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/dance">Dance</Link>
          <a href="#main">Back to top ↑</a>
        </nav>
      </div>
    </footer>
  );
}
