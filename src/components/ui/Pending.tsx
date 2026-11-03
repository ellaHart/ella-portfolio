import styles from './Pending.module.css';

export const isTodo = (value?: string | null) => !value || value.startsWith('TODO:');

/**
 * Renders content from the data files. Missing content ("TODO: …") shows up as a
 * clearly marked placeholder so gaps are obvious in review and never ship silently.
 */
export function Pending({ text, fallback = 'Content pending' }: { text?: string | null; fallback?: string }) {
  if (!isTodo(text)) return <>{text}</>;
  const note = text ? text.replace(/^TODO:\s*/, '') : fallback;
  return (
    <span className={styles.pending} title="Placeholder: content to be provided">
      {note}
    </span>
  );
}

export function ImagePlaceholder({ label, ratio = '4 / 3', className = '' }: { label: string; ratio?: string; className?: string }) {
  return (
    <div className={`${styles.image} ${className}`} style={{ aspectRatio: ratio }} role="img" aria-label={`Image placeholder: ${label}`}>
      <span className={styles.imageLabel}>{label}</span>
    </div>
  );
}
