import { site } from '../../content/site';
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';
import styles from './Hero.module.css';

/**
 * Asymmetric editorial hero: oversized serif greeting on the left, a tall
 * portrait offset to the right. In Creative Mode the portrait becomes a
 * taped polaroid and handwritten notes appear in the margins.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.meta}>
          <span className="label">Portfolio ©{new Date().getFullYear()}</span>
          <span className={`label ${styles.metaRight}`}>Design · Research · Development</span>
        </div>

        <h1 id="hero-heading" className={styles.heading}>
          <span className={styles.line}>
            <span className={styles.lineInner}>{site.hero.greeting}</span>
          </span>
          <span className={styles.line}>
            <span className={`${styles.lineInner} ${styles.name}`}>{site.hero.name}</span>
          </span>
        </h1>

        <div className={styles.intro}>
          <p className={styles.title}>{site.title}</p>
          <p className={styles.statement}>{site.hero.statement}</p>
          <a href="#selected-work" className={styles.cue}>
            <span>See selected work</span>
            <span className={styles.cueIcon}>
              <Icon name="arrow-down" size={18} />
            </span>
          </a>
        </div>

        <figure className={styles.portrait}>
          <div className={styles.frame}>
            <img
              src="/images/brand/headshot-suit-1000.webp"
              srcSet="/images/brand/headshot-suit-640.webp 640w, /images/brand/headshot-suit-1000.webp 1000w, /images/brand/headshot-suit-1400.webp 1400w"
              sizes="(min-width: 60rem) 34vw, 80vw"
              width={1000}
              height={1500}
              alt="Ella Hartsell in a black suit, seated and smiling"
              fetchPriority="high"
            />
            <span className={styles.tape} aria-hidden="true" />
          </div>
          <figcaption className={styles.caption}>
            <span className={styles.captionText}>Ella Hartsell, designer &amp; developer</span>
            <span className={`hand-note creative-only ${styles.polaroidCaption}`}>that’s me!</span>
          </figcaption>
          <Logo variant="script" decorative className={styles.signature} />
        </figure>

        <p className={`hand-note creative-only ${styles.note}`} aria-hidden="true">
          (try hovering things)
        </p>
      </div>
    </section>
  );
}
