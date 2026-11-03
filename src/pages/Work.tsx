import { Link } from 'react-router';
import { projects } from '../content/projects';
import { ArrowLink } from '../components/ui/ArrowLink';
import { Pending } from '../components/ui/Pending';
import { ProjectCover, mediaFrameProps } from '../components/ui/ProjectCover';
import { Reveal } from '../components/ui/Reveal';
import { Tags } from '../components/ui/Tags';
import { InteractiveDesktop } from '../components/work/desktop/InteractiveDesktop';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import page from './Page.module.css';
import styles from './Work.module.css';

/** Vertical index of every project: calmer and more scannable than the homepage gallery. */
export default function Work() {
  useDocumentTitle('Work');
  return (
    <>
      <div className={`container ${page.page}`}>
      <header className={page.pageHeader}>
        <p className="label">Work ({String(projects.length).padStart(2, '0')})</p>
        <h1 className={page.pageTitle}>
          Selected <em>work</em>
        </h1>
        <p className={page.lede}>Product design, UX research, and development, each framed by the problem it set out to solve.</p>
      </header>

      <ol className={styles.list}>
        {projects.map((p, i) => (
          <li key={p.slug} className={styles.item}>
            <Reveal className={styles.row}>
              <Link to={`/work/${p.slug}`} className={styles.media} {...mediaFrameProps(p)} data-cursor="View" tabIndex={-1} aria-hidden="true">
                <ProjectCover project={p} allowVideo sizes="(min-width: 60rem) 55vw, 100vw" />
              </Link>
              <div className={styles.info}>
                <p className={styles.index}>{String(i + 1).padStart(2, '0')}</p>
                <h2 className={styles.title}>
                  <Link to={`/work/${p.slug}`}>{p.title}</Link>
                </h2>
                <p className={styles.headline}>
                  <Pending text={p.headline} />
                </p>
                <dl className={styles.facts}>
                  <div>
                    <dt className="label">{p.category ? 'Category' : 'Industry'}</dt>
                    <dd>
                      <Pending text={p.category ?? p.industry} />
                    </dd>
                  </div>
                  <div>
                    <dt className="label">Role</dt>
                    <dd>
                      <Pending text={p.role} />
                    </dd>
                  </div>
                  {p.duration && (
                    <div>
                      <dt className="label">Duration</dt>
                      <dd>{p.duration}</dd>
                    </div>
                  )}
                </dl>
                <Tags items={p.tags} />
                <ArrowLink to={`/work/${p.slug}`}>
                  View case study<span className="visually-hidden">: {p.title}</span>
                </ArrowLink>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
      </div>

      <section className={styles.games} aria-labelledby="games-heading">
        <div className={`container ${styles.gamesHeader}`}>
          <p className="label">Also in the portfolio</p>
          <h2 id="games-heading" className={styles.gamesTitle}>
            The <em>desktop</em>
          </h2>
          <p className={styles.gamesLede}>
            Browse the games I’ve built at jams, in research labs, and on my own, preview my certifications, or open my resume.
          </p>
        </div>
        <div className={`container ${styles.gamesDesk}`}>
          <InteractiveDesktop />
        </div>
      </section>
    </>
  );
}
