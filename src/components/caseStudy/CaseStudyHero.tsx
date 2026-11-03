import type { CaseStudy, Project } from '../../content/types';
import { ArrowLink } from '../ui/ArrowLink';
import { CaseVideo } from '../ui/CaseVideo';
import { Pending } from '../ui/Pending';
import { ProjectCover } from '../ui/ProjectCover';
import { Tags } from '../ui/Tags';
import styles from './CaseStudy.module.css';

/**
 * 1. Project hero. Same layout for every case study: title, short description,
 * the four standard details (Role, Duration, Tools, Project type) followed by
 * any project-specific ones, then the featured media.
 */
export function CaseStudyHero({ project, cs }: { project: Project; cs: CaseStudy }) {
  const meta = [
    { label: 'Role', value: project.role },
    { label: 'Duration', value: cs.duration },
    { label: 'Tools', value: cs.tools.join(', ') },
    { label: 'Project type', value: cs.projectType },
    ...(cs.meta ?? []),
  ];
  const intro = cs.intro ?? project.summary;

  return (
    <>
      <header className={`container ${styles.hero}`}>
        <ArrowLink to="/work" className={styles.back}>
          All work
        </ArrowLink>
        <p className="label">Case study{cs.organization ? ` · ${cs.organization}` : ''}</p>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.headline}>
          <Pending text={project.headline} />
        </p>
        {(Array.isArray(intro) ? intro : [intro]).map((p) => (
          <p key={p.slice(0, 32)} className={styles.intro}>
            <Pending text={p} />
          </p>
        ))}
        {cs.links && (
          <div className={styles.links}>
            {cs.links.map((l, i) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={i === 0 ? styles.linkPrimary : styles.linkSecondary}>
                {l.label} <span aria-hidden="true">↗</span>
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        )}

        <dl className={styles.meta}>
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="label">{m.label}</dt>
              <dd>
                <Pending text={m.value} />
              </dd>
            </div>
          ))}
        </dl>

        {cs.responsibilities && (
          <div className={styles.responsibilities}>
            <p className="label">Responsibilities</p>
            <Tags items={cs.responsibilities} />
          </div>
        )}
      </header>

      <div className={`container ${styles.heroMedia}`}>
        {/* Featured footage with controls → card preview video → hero image → project cover. */}
        {cs.heroVideo ? (
          <CaseVideo video={cs.heroVideo} eager />
        ) : project.video ? (
          <ProjectCover project={project} allowVideo eager sizes="100vw" />
        ) : cs.heroImage ? (
          <img src={cs.heroImage.src} alt={cs.heroImage.alt} width={cs.heroImage.width} height={cs.heroImage.height} fetchPriority="high" />
        ) : (
          <ProjectCover project={project} sizes="100vw" eager />
        )}
        {cs.disclaimer && <p className={styles.disclaimer}>{cs.disclaimer}</p>}
      </div>
    </>
  );
}
