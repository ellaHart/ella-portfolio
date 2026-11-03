import { useRef, useState } from 'react';
import { certifications } from '../../../content/experience';
import type { Certification } from '../../../content/types';
import { Pending, isTodo } from '../../ui/Pending';
import { CertIcon, CertificatePreview } from './CertificatePreview';
import styles from './Desktop.module.css';

/** Grid of certificate cards; each opens the full certificate in a preview modal. */
export function CertificationGallery() {
  const [open, setOpen] = useState<Certification | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  const close = () => {
    setOpen(null);
    // Return focus to the card that opened the preview.
    trigger.current?.focus();
  };

  return (
    <div className={styles.certs}>
      <ul className={styles.certGrid} aria-label="Certifications">
        {certifications.map((c) => (
          <li key={c.slug}>
            <button type="button" className={styles.certCard} aria-haspopup="dialog" onClick={(e) => {
                trigger.current = e.currentTarget;
                setOpen(c);
              }}
            >
              <span className={styles.certThumb} aria-hidden="true">
                {c.thumbnail ? <img src={c.thumbnail.src} alt="" /> : <CertIcon />}
                <span className={styles.certHover}>Preview</span>
              </span>
              <span className={styles.certTitle}>
                <Pending text={c.name} />
              </span>
              <span className={styles.certIssuer}>
                <Pending text={c.issuer} />
              </span>
              {c.date && <span className={styles.certDate}>{c.date}</span>}
              <span className="visually-hidden">
                , preview {isTodo(c.name) ? 'certificate' : c.name}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <CertificatePreview cert={open} onClose={close} />
    </div>
  );
}
