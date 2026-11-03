import { useEffect, useState } from 'react';
import type { CaseStudyChapter } from '../../content/types';
import { Block, pad, type OpenImage } from './blocks';
import styles from './CaseStudy.module.css';

/**
 * 3. A closer look: the project-specific story, as numbered chapters with a
 * sticky index that tracks where the reader is.
 */
export function CloserLook({ chapters, onOpen }: { chapters: CaseStudyChapter[]; onOpen: OpenImage }) {
  const [active, setActive] = useState(chapters[0]?.id);

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(`ch-${c.id}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id.replace(/^ch-/, ''));
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);

  return (
    <section className={`container ${styles.closer}`} aria-labelledby="closer-h">
      <header className={styles.sectionHead}>
        <h2 id="closer-h" className={styles.sectionTitle}>
          A closer <em>look</em>
        </h2>
      </header>

      <div className={styles.closerBody}>
        <nav className={styles.index} aria-label="Case study chapters">
          <ol>
            {chapters.map((c, i) => (
              <li key={c.id}>
                <a href={`#ch-${c.id}`} aria-current={active === c.id ? 'true' : undefined}>
                  <span className={styles.indexNum}>{pad(i + 1)}</span>
                  {c.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.chapters}>
          {chapters.map((c, i) => (
            <section key={c.id} id={`ch-${c.id}`} className={styles.chapter} aria-labelledby={`ch-${c.id}-h`}>
              <header className={styles.chapterHead}>
                <span className={styles.chapterNum}>{pad(i + 1)}</span>
                <h3 id={`ch-${c.id}-h`} className={styles.chapterTitle}>
                  {c.title}
                </h3>
              </header>
              <div className={styles.blocks}>
                {c.blocks.map((b, j) => (
                  <Block key={j} block={b} onOpen={onOpen} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
