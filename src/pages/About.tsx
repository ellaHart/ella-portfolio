import { certifications } from '../content/experience';
import { site, socials } from '../content/site';
import { ArrowLink } from '../components/ui/ArrowLink';
import { Icon } from '../components/ui/Icon';
import { Pending } from '../components/ui/Pending';
import { Reveal } from '../components/ui/Reveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import page from './Page.module.css';
import styles from './About.module.css';

/** Biography, photos, approach, certifications, resume and links. */
export default function About() {
  useDocumentTitle('About');
  const { about } = site;
  const links = socials.filter((s) => s.icon !== 'mail');

  return (
    <div className={`container ${page.page}`}>
      {/* ---------- Intro: two columns ---------- */}
      <section className={styles.intro} aria-labelledby="about-heading">
        <figure className={styles.photo}>
          <Reveal variant="mask" className={styles.photoFrame}>
            <img
              src="/images/brand/headshot-laptop-1125.webp"
              srcSet="/images/brand/headshot-laptop-720.webp 720w, /images/brand/headshot-laptop-1125.webp 1125w"
              sizes="(min-width: 60rem) 40vw, 100vw"
              width={1125}
              height={2000}
              alt="Ella Hartsell sitting on a stool with a laptop on her lap, smiling"
            />
          </Reveal>
          <figcaption className={styles.caption}>
            <span className={`hand-note creative-only ${styles.hand}`}>hi again ✦</span>
          </figcaption>
        </figure>

        <div className={styles.copy}>
          <p className="label">About</p>
          <h1 id="about-heading" className={styles.heading}>
            {about.heading}
          </h1>

          <div className={styles.bio}>
            {about.bio.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <blockquote className={styles.philosophy}>
            <p>{about.philosophy}</p>
          </blockquote>

          <div className={styles.interests}>
            <p className="label">Currently interested in</p>
            <ul>
              {about.interests.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>

          <div className={styles.actions}>
            <ArrowLink to={site.resumeHref} icon="download" variant="solid">
              Download resume (PDF)
            </ArrowLink>
            <ul className={styles.links} aria-label="Elsewhere">
              {links.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className={styles.link}>
                    <Icon name={s.icon} size={18} />
                    {s.label}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Approach ---------- */}
      <section aria-labelledby="approach-h" className={styles.block}>
        <h2 id="approach-h" className={page.sectionTitle}>
          How I work
        </h2>
        <ol className={styles.approach}>
          {about.approach.map((step, i) => (
            <Reveal as="li" key={step.title} className={styles.step} delay={i * 80}>
              <span className={styles.stepIndex}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p>{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------- Certifications ---------- */}
      <section aria-labelledby="cert-h" className={styles.block}>
        <h2 id="cert-h" className={page.sectionTitle}>
          Certifications
        </h2>
        {certifications.length ? (
          <ul className={styles.certs}>
            {certifications.map((c) => (
              <li key={c.slug} className={styles.cert}>
                <span className={styles.certName}>
                  <Pending text={c.name} />
                </span>
                <span>
                  <Pending text={c.issuer} />
                </span>
                <span>{c.date}</span>
                {c.credentialUrl && (
                  <ArrowLink to={c.credentialUrl} icon="arrow-up-right">
                    Credential
                  </ArrowLink>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className={page.notice}>Certifications pending. Add them in src/content/experience.ts.</p>
        )}
      </section>
    </div>
  );
}
