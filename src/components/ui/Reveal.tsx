import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import styles from './Reveal.module.css';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'rise' | 'fade' | 'mask';
};

/** Fades/raises content in once it enters the viewport. A no-op under reduced motion (CSS). */
export function Reveal({ as: Tag = 'div', children, className = '', delay = 0, variant = 'rise' }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.revealed = 'true';
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`${styles.reveal} ${styles[variant]} ${className}`} style={{ '--delay': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
