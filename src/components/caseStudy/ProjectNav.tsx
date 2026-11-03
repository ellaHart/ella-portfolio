import { Link } from 'react-router';
import { featuredProjects, projects } from '../../content/projects';
import type { Project } from '../../content/types';
import { ArrowLink } from '../ui/ArrowLink';
import { Icon } from '../ui/Icon';
import { Pending } from '../ui/Pending';
import { ProjectCover } from '../ui/ProjectCover';
import styles from './CaseStudy.module.css';

/**
 * 5. Project navigation: the next case study plus a way back to all work.
 * "Next" cycles through the featured projects; non-featured projects point
 * to the first featured one.
 */
export function ProjectNav({ current }: { current: Project }) {
  const pool = featuredProjects.length > 1 ? featuredProjects : projects;
  const idx = pool.findIndex((p) => p.slug === current.slug);
  const next = pool[(idx + 1) % pool.length]?.slug !== current.slug ? pool[(idx + 1) % pool.length] : pool.find((p) => p.slug !== current.slug);

  return (
    <nav className={`container ${styles.more}`} aria-label="Project navigation">
      <div className={styles.navRow}>
        <p className="label">Next project</p>
        <ArrowLink to="/work" className={styles.back}>
          All work
        </ArrowLink>
      </div>
      {next && (
        <Link to={`/work/${next.slug}`} className={styles.moreCard} data-cursor="View">
          <div className={styles.moreMedia}>
            <ProjectCover project={next} sizes="(min-width: 60rem) 40vw, 100vw" />
          </div>
          <div className={styles.moreText}>
            <span className={styles.moreTitle}>{next.title}</span>
            <span className={styles.moreHeadline}>
              <Pending text={next.headline} />
            </span>
            <span className={styles.moreCta}>
              View case study <Icon name="arrow-right" size={18} />
            </span>
          </div>
        </Link>
      )}
    </nav>
  );
}
