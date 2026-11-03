import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { site } from '../../content/site';
import { useCreativeMode } from '../../context/CreativeMode';
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';
import { ModeToggle } from '../ui/ModeToggle';
import { ThemeToggle } from '../ui/ThemeToggle';
import styles from './SiteHeader.module.css';

type NavItem = { label: string; to: string; creativeOnly?: boolean };

const NAV: NavItem[] = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Dance', to: '/dance', creativeOnly: true },
];

export function SiteHeader() {
  const { isCreative } = useCreativeMode();
  const location = useLocation();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  // Hide on scroll down, reveal on scroll up: keeps the canvas clear while reading.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 240 && y > last);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => {
    dialog.current?.close();
  }, [location]);

  const items = NAV.filter((i) => !i.creativeOnly || isCreative);
  const isActive = (to: string) => location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <header className={styles.header} data-hidden={hidden || undefined} data-scrolled={scrolled || undefined}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label={`${site.name}, home`}>
          <Logo variant="script" decorative className={styles.mark} />
          <span className={styles.wordmark}>{site.name}</span>
        </Link>

        <nav aria-label="Primary" className={styles.desktopNav}>
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={styles.link}
                  aria-current={isActive(item.to) ? 'page' : undefined}
                  data-creative={item.creativeOnly || undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className={styles.divider} aria-hidden="true" />
          <ThemeToggle />
          <ModeToggle />
        </nav>

        <div className={styles.mobileActions}>
          <ThemeToggle />
          <button type="button" className={styles.menuButton} onClick={() => dialog.current?.showModal()} aria-haspopup="dialog">
            <span>Menu</span>
            <Icon name="menu" size={22} />
          </button>
        </div>
      </div>

      {/* Mobile menu: native <dialog> gives us focus trapping and Esc-to-close for free. */}
      <dialog ref={dialog} className={styles.sheet} aria-label="Site menu" onClick={(e) => e.target === dialog.current && dialog.current?.close()}>
        <div className={styles.sheetInner}>
          <div className={styles.sheetTop}>
            <Logo variant="circle" decorative />
            <button type="button" className={styles.menuButton} onClick={() => dialog.current?.close()}>
              <span>Close</span>
              <Icon name="close" size={22} />
            </button>
          </div>
          <nav aria-label="Primary">
            <ol className={styles.sheetList}>
              <li>
                <Link to="/" className={styles.sheetLink}>
                  <span className={styles.sheetIndex}>00</span>Home
                </Link>
              </li>
              {items.map((item, i) => (
                <li key={item.to}>
                  <Link to={item.to} className={styles.sheetLink} aria-current={isActive(item.to) ? 'page' : undefined}>
                    <span className={styles.sheetIndex}>{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <div className={styles.sheetFooter}>
            <ModeToggle />
            <a href={`mailto:${site.email}`} className={styles.sheetEmail}>
              {site.email}
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
