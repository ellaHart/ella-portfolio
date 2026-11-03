import { useEffect, useRef, useState } from 'react';
import { site, socials } from '../content/site';
import { Icon } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import page from './Page.module.css';
import styles from './Contact.module.css';

/** Copies text, falling back to a hidden textarea where the Clipboard API is unavailable. */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

/** "https://www.linkedin.com/in/x/" → "linkedin.com/in/x" */
const displayUrl = (href: string) => href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

/**
 * Contact page: a compact two-column invitation. The heading sits on the left,
 * a thin divider in the middle, and the email (with copy button) and profile
 * links stacked on the right. On phones the columns stack and the divider
 * turns horizontal.
 */
export default function Contact() {
  useDocumentTitle('Contact');
  const [copied, setCopied] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<number | undefined>(undefined);
  const links = socials.filter((s) => s.icon !== 'mail');

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    const ok = await copyText(site.email);
    setCopied(ok ? 'copied' : 'failed');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied('idle'), 2200);
  };

  return (
    <div className={`container ${page.page}`}>
      <section className={styles.contact} aria-labelledby="contact-heading">
        <h1 id="contact-heading" className={styles.title}>
          Let’s create <em>something</em> together.
        </h1>

        <span className={styles.divider} aria-hidden="true" />

        <Reveal className={styles.details}>
          <ul className={styles.list}>
            <li className={styles.row}>
              <span className={styles.label}>Email</span>
              <span className={styles.value}>
                <a href={`mailto:${site.email}`} className={styles.link}>
                  {site.email}
                </a>
                <button type="button" className={styles.copy} onClick={onCopy} data-state={copied}>
                  <Icon name={copied === 'copied' ? 'check' : 'copy'} size={15} />
                  <span>{copied === 'copied' ? 'Copied!' : 'Copy'}</span>
                  <span className="visually-hidden"> email address</span>
                </button>
              </span>
              {copied === 'failed' && <span className={styles.hint}>Couldn’t copy automatically. Select the address to copy it.</span>}
            </li>
            {links.map((s) => (
              <li key={s.label} className={styles.row}>
                <span className={styles.label}>{s.label}</span>
                <span className={styles.value}>
                  <a href={s.href} target="_blank" rel="noreferrer" className={styles.link}>
                    {displayUrl(s.href)}
                    <Icon name="arrow-up-right" size={14} className={styles.ext} />
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </span>
              </li>
            ))}
          </ul>
          <p className="visually-hidden" role="status" aria-live="polite">
            {copied === 'copied' ? 'Email address copied to clipboard.' : ''}
          </p>
        </Reveal>
      </section>
    </div>
  );
}
