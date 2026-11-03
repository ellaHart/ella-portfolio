import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { Icon, type IconName } from './Icon';
import styles from './ArrowLink.module.css';

type Props = {
  to: string;
  children: ReactNode;
  icon?: IconName;
  variant?: 'line' | 'solid';
  className?: string;
  download?: boolean;
};

const isExternal = (to: string) => /^(https?:|mailto:)/.test(to) || to.endsWith('.pdf');

/** Text link with an animated underline and an arrow that nudges on hover. */
export function ArrowLink({ to, children, icon = 'arrow-right', variant = 'line', className = '', download }: Props) {
  const cls = `${styles.link} ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span className={styles.text}>{children}</span>
      <Icon name={icon} size={18} className={styles.icon} />
    </>
  );

  if (isExternal(to)) {
    const newTab = to.startsWith('http');
    return (
      <a href={to} className={cls} download={download} {...(newTab ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {inner}
        {newTab && <span className="visually-hidden"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  );
}
