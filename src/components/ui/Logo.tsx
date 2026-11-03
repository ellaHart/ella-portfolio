import styles from './Logo.module.css';

type Props = { variant?: 'script' | 'circle'; className?: string; decorative?: boolean };

const sources = {
  script: { src: '/images/brand/logo-eh-script.png', width: 900, height: 438 },
  circle: { src: '/images/brand/logo-eh-circle.png', width: 400, height: 400 },
};

/** The EH monogram, used exactly as supplied (recoloured to brand charcoal only). */
export function Logo({ variant = 'script', className = '', decorative = false }: Props) {
  const s = sources[variant];
  return (
    <img
      src={s.src}
      width={s.width}
      height={s.height}
      alt={decorative ? '' : 'Ella Hartsell monogram'}
      className={`${styles.logo} ${styles[variant]} ${className}`}
      draggable={false}
    />
  );
}
