import { useEffect, useRef } from 'react';
import type { Certification } from '../../../content/types';
import { Icon } from '../../ui/Icon';
import { Pending, isTodo } from '../../ui/Pending';
import styles from './Desktop.module.css';

type Props = { cert: Certification | null; onClose: () => void };

/**
 * Certificate viewer. A native modal <dialog> gives focus trapping, Esc to
 * close and focus return to the triggering card; clicking the backdrop
 * also closes it. The image is page 1 of the original PDF, which is linked too.
 */
export function CertificatePreview({ cert, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (cert && !el.open) el.showModal();
    if (!cert && el.open) el.close();
  }, [cert]);

  const title = cert && !isTodo(cert.name) ? cert.name : 'Certificate';

  return (
    <dialog
      ref={dialog}
      className={styles.modal}
      aria-labelledby="cert-preview-title"
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && dialog.current?.close()}
    >
      {cert && (
        <div className={styles.modalInner}>
          <div className={styles.modalBar}>
            <span className={styles.mono}>{cert.pdf ? `${cert.slug}.pdf` : cert.slug}</span>
            <button type="button" className={styles.close} onClick={() => dialog.current?.close()} autoFocus>
              <Icon name="close" size={16} />
              <span className="visually-hidden">Close preview</span>
            </button>
          </div>

          <div className={styles.modalBody}>
            {cert.preview ? (
              <img
                src={cert.preview.src}
                alt={cert.preview.alt}
                width={cert.preview.width}
                height={cert.preview.height}
                className={styles.certImage}
              />
            ) : (
              <div className={styles.certPlaceholder} role="img" aria-label="Certificate preview pending">
                <CertIcon />
                <span>Certificate preview pending</span>
              </div>
            )}

            <div className={styles.modalMeta}>
              <h3 id="cert-preview-title" className={styles.gameTitle}>
                {isTodo(cert.name) ? <Pending text={cert.name} /> : title}
              </h3>
              <p className={styles.certIssuer}>
                <Pending text={cert.issuer} />
                {cert.date && ` · ${cert.date}`}
              </p>
              <div className={styles.modalActions}>
                {cert.pdf && (
                  <a href={cert.pdf} target="_blank" rel="noopener" className={styles.cta}>
                    Open original PDF ↗<span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                )}
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className={styles.outline}>
                    Verify on Coursera ↗<span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

/** Ribbon-and-seal glyph used wherever a certificate image is missing. */
export function CertIcon() {
  return (
    <svg viewBox="0 0 32 32" className={styles.certGlyph} aria-hidden="true" focusable="false">
      <rect x="4" y="5" width="24" height="17" rx="1.5" />
      <path d="M9 10h14M9 14h9" />
      <circle cx="21" cy="21" r="4" />
      <path d="m18.5 24-1 5 3.5-1.8 3.5 1.8-1-5" />
    </svg>
  );
}
