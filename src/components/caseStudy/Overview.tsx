import type { ReactNode } from 'react';
import type { CaseStudy, Project } from '../../content/types';
import { ArrowLink } from '../ui/ArrowLink';
import { Pending } from '../ui/Pending';
import { Reveal } from '../ui/Reveal';
import { pad } from './blocks';
import styles from './CaseStudy.module.css';

/**
 * Shared frame for the standard sections (The problem, My approach, Results,
 * Reflection): a label in the left column and content on the right, so every
 * case study reads with the same rhythm.
 */
export function OverviewSection({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <section className={`container ${styles.split}`} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} className={`label ${styles.splitLabel}`}>
        {label}
      </h2>
      {children}
    </section>
  );
}

/** 2a. The problem: the challenge or need, led by a featured question. */
export function ProblemSection({ problem }: { problem: CaseStudy['problem'] }) {
  return (
    <OverviewSection id="problem" label="The problem">
      <div className={styles.splitBody}>
        {problem.heading && <p className={styles.problemHeading}>{problem.heading}</p>}
        <Reveal as="p" className={styles.question}>
          <Pending text={problem.question} />
        </Reveal>
        {problem.notes && (
          <dl className={styles.annotations}>
            {problem.notes.map((n) => (
              <div key={n.label}>
                <dt className="label">{n.label}</dt>
                <dd>{n.text}</dd>
              </div>
            ))}
          </dl>
        )}
        {problem.body.map((p) => (
          <p key={p.slice(0, 32)} className={styles.lede}>
            <Pending text={p} />
          </p>
        ))}
        {problem.list && (
          <div className={styles.bulletsBlock}>
            {problem.listHeading && <p className="label">{problem.listHeading}</p>}
            <ul className={`${styles.bullets} ${styles.bulletsTwoCol}`}>
              {problem.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </OverviewSection>
  );
}

/** 2b. My approach: my contributions and process as a numbered timeline. */
export function ApproachSection({ steps, intro }: { steps: CaseStudy['approach']; intro?: CaseStudy['approachIntro'] }) {
  return (
    <OverviewSection id="approach" label="My approach">
      {intro && (
        <div className={`${styles.splitBody} ${styles.approachIntro}`}>
          {intro.heading && <p className={styles.problemHeading}>{intro.heading}</p>}
          {intro.body.map((p) => (
            <p key={p.slice(0, 32)} className={styles.lede}>
              {p}
            </p>
          ))}
        </div>
      )}
      <ol className={styles.timeline}>
        {steps.map((step, i) => (
          <Reveal as="li" key={step.title} className={styles.step} delay={i * 70}>
            <span className={styles.stepNum}>{pad(i + 1)}</span>
            <h3 className={styles.stepTitle}>
              <Pending text={step.title} />
            </h3>
            <p>
              <Pending text={step.body} />
            </p>
          </Reveal>
        ))}
      </ol>
    </OverviewSection>
  );
}

/** 2c. Results: real outcomes and deliverables, never invented metrics. */
export function ResultsSection({ results, project }: { results: CaseStudy['results']; project: Project }) {
  return (
    <OverviewSection id="results" label="Results">
      <div className={styles.splitBody}>
        {results.heading && <p className={styles.problemHeading}>{results.heading}</p>}
        <p className={styles.statement}>
          <Pending text={results.statement} />
        </p>
        {results.body?.map((p) => (
          <p key={p.slice(0, 32)} className={styles.lede}>
            {p}
          </p>
        ))}
        {results.image && (
          <figure className={styles.resultsFigure}>
            <img
              src={results.image.src}
              alt={results.image.alt}
              width={results.image.width}
              height={results.image.height}
              loading="lazy"
              decoding="async"
            />
          </figure>
        )}
        {results.metrics && (
          <dl className={styles.metrics}>
            {results.metrics.map((m) => (
              <div key={m.label}>
                <dt className={styles.metricValue}>{m.value}</dt>
                <dd className={styles.metricLabel}>{m.label}</dd>
              </div>
            ))}
          </dl>
        )}
        {results.highlights && (
          <ul className={`${styles.bullets} ${styles.highlights}`}>
            {results.highlights.map((h) => (
              <li key={h}>
                <Pending text={h} />
              </li>
            ))}
          </ul>
        )}
        {results.note && <p className={styles.note}>{results.note}</p>}
        {project.externalLink && (
          <ArrowLink to={project.externalLink.href} icon="arrow-up-right">
            {project.externalLink.label}
          </ArrowLink>
        )}
      </div>
    </OverviewSection>
  );
}

/** 4. Reflection: concise, project-specific takeaways. */
export function ReflectionSection({ reflection }: { reflection: CaseStudy['reflection'] }) {
  return (
    <OverviewSection id="reflection" label="Reflection">
      <div className={styles.splitBody}>
        {reflection.heading && <p className={styles.problemHeading}>{reflection.heading}</p>}
        {reflection.quote && (
          <Reveal as="blockquote" className={styles.reflectionQuote}>
            <p>{reflection.quote}</p>
          </Reveal>
        )}
        {reflection.body.map((p) => (
          <p key={p.slice(0, 32)} className={styles.lede}>
            <Pending text={p} />
          </p>
        ))}
      </div>
    </OverviewSection>
  );
}
