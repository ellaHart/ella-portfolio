import { useState } from 'react';
import { site, socials } from '../../content/site';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import styles from './ContactSection.module.css';

/** Homepage closer: "Let's create something together." The full form lives on /contact. */
export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section className={styles.wrap} aria-labelledby="contact-heading">
      <div className={`container ${styles.contact}`}>
        <p className={`label ${styles.kicker}`}>Contact</p>
        <Reveal as="h2" variant="rise" className={styles.heading}>
          <span id="contact-heading">
            Let’s create something <em>together.</em>
          </span>
        </Reveal>

        <div className={styles.grid}>
          <p className={styles.blurb}>{site.contact.blurb}</p>

          <div className={styles.emailRow}>
            <a href={`mailto:${site.email}?subject=Portfolio%20inquiry`} className={styles.email} data-cursor="Say hi">
              {site.email}
            </a>
            <button type="button" className={styles.copy} onClick={copyEmail} aria-live="polite">
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>

          <ul className={styles.socials} aria-label="Elsewhere">
            {socials
              .filter((s) => s.icon !== 'mail')
              .map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className={styles.social}>
                    <Icon name={s.icon} size={20} />
                    <span className={styles.socialLabel}>{s.label}</span>
                    <Icon name="arrow-up-right" size={16} className={styles.socialArrow} />
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
