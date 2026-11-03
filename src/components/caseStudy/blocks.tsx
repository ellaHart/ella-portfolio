import type { CaseStudyBlock, ImageAsset } from '../../content/types';
import { AutoScrollGallery } from '../ui/AutoScrollGallery';
import { CaseVideo } from '../ui/CaseVideo';
import { Icon } from '../ui/Icon';
import { Pending } from '../ui/Pending';
import styles from './CaseStudy.module.css';

/*
 * Content blocks for "A closer look". Each case study composes its own
 * chapters from these, so pages share components and styling while telling
 * different stories.
 */

export type OpenImage = (image: ImageAsset, caption?: string) => void;

export const pad = (n: number) => String(n).padStart(2, '0');

/* ---------- Blocks ---------- */

export function ExpandableImage({ image, caption, onOpen, sizes }: { image: ImageAsset; caption?: string; onOpen: OpenImage; sizes?: string }) {
  return (
    <button type="button" className={styles.expand} onClick={() => onOpen(image, caption)} aria-label={`Expand image: ${image.alt}`}>
      <img src={image.src} alt="" width={image.width} height={image.height} loading="lazy" decoding="async" sizes={sizes} />
      <span className={styles.expandHint} aria-hidden="true">
        <Icon name="arrow-up-right" size={14} /> Expand
      </span>
    </button>
  );
}

export function Block({ block, onOpen }: { block: CaseStudyBlock; onOpen: OpenImage }) {
  switch (block.kind) {
    case 'text':
      return (
        <div className={styles.text}>
          {block.heading && <h4 className={styles.subheading}>{block.heading}</h4>}
          {block.body.map((p) => (
            <p key={p.slice(0, 32)}>
              <Pending text={p} />
            </p>
          ))}
        </div>
      );

    case 'figure':
      return (
        <figure className={styles.figure} data-count={block.images.length}>
          <div className={styles.figureImages}>
            {block.images.map((img) =>
              block.expandable ? (
                <ExpandableImage key={img.src} image={img} caption={block.caption} onOpen={onOpen} />
              ) : (
                <img key={img.src} src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" />
              ),
            )}
          </div>
          {block.caption && <figcaption className={styles.caption}>{block.caption}</figcaption>}
        </figure>
      );

    case 'cards':
      return (
        <ol className={styles.cards}>
          {block.items.map((item, i) => (
            <li key={item.title} className={styles.card}>
              <span className={styles.cardIndex}>{String.fromCharCode(65 + i)}</span>
              <h4 className={styles.cardTitle}>{item.title}</h4>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      );

    case 'palette':
      return (
        <figure className={styles.paletteBlock}>
          <ul className={styles.palette} aria-label="Colour palette">
            {block.items.map((c) => (
              <li key={c.hex} className={styles.swatch}>
                <span className={styles.swatchChip} style={{ background: c.hex }} aria-hidden="true" />
                <span className={styles.swatchName}>{c.name}</span>
                <span className={styles.swatchHex}>{c.hex}</span>
                <span className={styles.swatchUse}>{c.use}</span>
              </li>
            ))}
          </ul>
          {block.note && <figcaption className={styles.caption}>{block.note}</figcaption>}
        </figure>
      );

    case 'progression':
      return (
        <section className={styles.progression} aria-label={block.title}>
          <div className={styles.progressionText}>
            <h4 className={styles.subheading}>{block.title}</h4>
            <p>{block.body}</p>
            {block.points && (
              <ul className={styles.points}>
                {block.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
          </div>
          <ol className={styles.stages} aria-label={`${block.title}: evolution from wireframe to final design`}>
            {block.stages.map((s, i) => (
              <li key={s.label} className={styles.stage} data-final={i === block.stages.length - 1 || undefined}>
                <span className={styles.stageLabel}>
                  <span className={styles.stageIndex}>{pad(i + 1)}</span>
                  {s.label}
                </span>
                <ExpandableImage image={s.image} caption={`${block.title}: ${s.label}`} onOpen={onOpen} sizes="(min-width: 60rem) 30vw, 100vw" />
              </li>
            ))}
          </ol>
        </section>
      );

    case 'tradeoffs':
      return (
        <ul className={styles.tradeoffs}>
          {block.items.map((t) => (
            <li key={t.a} className={styles.tradeoff}>
              <span className={styles.tradeA}>{t.a}</span>
              <span className={styles.tradeVs} aria-label="versus">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 9h15l-4-4M20 15H5l4 4" />
                </svg>
              </span>
              <span className={styles.tradeB}>{t.b}</span>
              {t.body && <p className={styles.tradeBody}>{t.body}</p>}
            </li>
          ))}
        </ul>
      );

    case 'quote':
      return (
        <blockquote className={styles.quote}>
          <p>{block.text}</p>
        </blockquote>
      );

    case 'aside':
      return (
        <div className={styles.aside}>
          <div className={styles.text}>
            {block.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <figure className={styles.asideFigure}>
            <div className={styles.asideMedia}>
              <img src={block.image.src} alt={block.image.alt} width={block.image.width} height={block.image.height} loading="lazy" decoding="async" />
              {block.reference && <span className={styles.referenceTag}>{block.reference}</span>}
            </div>
            {block.caption && <figcaption className={styles.caption}>{block.caption}</figcaption>}
          </figure>
        </div>
      );

    case 'bullets':
      return (
        <div className={styles.bulletsBlock}>
          {block.heading && <p className="label">{block.heading}</p>}
          <ul className={styles.bullets}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      );

    case 'comparison':
      return (
        <figure className={styles.comparison}>
          <div className={styles.compareGrid}>
            {block.items.map((item, i) => (
              <div key={item.label} className={styles.compareItem}>
                <span className={styles.stageLabel}>
                  <span className={styles.stageIndex}>{pad(i + 1)}</span>
                  {item.label}
                </span>
                <ExpandableImage image={item.image} caption={item.label} onOpen={onOpen} sizes="(min-width: 48rem) 45vw, 100vw" />
                <ul className={styles.points}>
                  {item.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {block.caption && <figcaption className={styles.caption}>{block.caption}</figcaption>}
        </figure>
      );

    case 'marquee':
      return (
        <div className={styles.marquee}>
          <p className="label">{block.label}</p>
          <AutoScrollGallery label={block.label} items={block.items} onOpen={onOpen} />
        </div>
      );

    case 'callout':
      return <p className={styles.callout}>{block.text}</p>;

    case 'video':
      return (
        <div className={styles.videoBlock}>
          <CaseVideo video={block.video} />
          {block.caption && <p className={styles.caption}>{block.caption}</p>}
        </div>
      );

    case 'screens':
      return (
        <div className={styles.screensBlock}>
          <ul className={styles.screens} aria-label="Interface screens">
            {block.items.map((s, i) => (
              <li key={s.title} className={styles.screen}>
                <ExpandableImage image={s.image} caption={`${s.title}: ${s.caption}`} onOpen={onOpen} sizes="16rem" />
                <p className={styles.screenTitle}>
                  <span className={styles.stageIndex}>{pad(i + 1)}</span> {s.title}
                </p>
                <p className={styles.screenCaption}>{s.caption}</p>
              </li>
            ))}
          </ul>
          {block.board && (
            <figure className={styles.board}>
              <ExpandableImage image={block.board.image} caption={block.board.label} onOpen={onOpen} />
              <figcaption className={styles.caption}>{block.board.label}</figcaption>
            </figure>
          )}
        </div>
      );

    case 'proscons':
      return (
        <div className={styles.proscons}>
          {block.items.map((item) => (
            <section key={item.title} className={styles.prosconsCol} aria-label={item.title}>
              <h4 className={styles.subheading}>{item.title}</h4>
              <p className="label">Advantages</p>
              <ul className={`${styles.bullets} ${styles.pros}`}>
                {item.pros.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="label">Challenges</p>
              <ul className={`${styles.bullets} ${styles.cons}`}>
                {item.cons.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      );

    case 'flow':
      return (
        <figure className={styles.flowBlock}>
          <ol className={styles.flow}>
            {block.steps.map((step, i) => (
              <li key={step} className={styles.flowStep}>
                <span className={styles.flowNum}>{pad(i + 1)}</span>
                <span className={styles.flowText}>{step}</span>
              </li>
            ))}
          </ol>
          {block.note && <figcaption className={styles.caption}>{block.note}</figcaption>}
        </figure>
      );

    case 'pairs':
      return (
        <div className={styles.pairs}>
          <p className={`label ${styles.pairsLabel}`}>{block.label}</p>
          {block.items.map((pair) => (
            <figure key={pair.title} className={styles.pair}>
              <div className={styles.pairImages}>
                <div className={styles.pairSide}>
                  <span className={styles.pairTag}>Design exploration</span>
                  <ExpandableImage image={pair.design} caption={`${pair.title}: design exploration`} onOpen={onOpen} />
                </div>
                <span className={styles.pairArrow} aria-hidden="true">
                  →
                </span>
                <div className={styles.pairSide}>
                  <span className={styles.pairTag}>In-game interface</span>
                  <ExpandableImage image={pair.built} caption={`${pair.title}: in-game interface`} onOpen={onOpen} />
                </div>
              </div>
              <figcaption className={styles.pairCaption}>
                <strong>{pair.title}.</strong> {pair.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      );

    case 'findings':
      return (
        <div className={styles.findingsBlock}>
          <ol className={styles.findings}>
            {block.items.map((f, i) => (
              <li key={f.title} className={styles.finding}>
                <details open={i === 0}>
                  <summary className={styles.findingSummary}>
                    <span className={styles.findingNum}>{pad(i + 1)}</span>
                    <span className={styles.findingTitle}>{f.title}</span>
                    <span className={styles.status} data-status={f.status}>
                      {STATUS_LABEL[f.status]}
                    </span>
                    <span className={styles.chevron} aria-hidden="true" />
                  </summary>
                  <dl className={styles.findingBody}>
                    <div>
                      <dt className="label">Observation</dt>
                      <dd>{f.observation}</dd>
                    </div>
                    <div>
                      <dt className="label">Recommendation</dt>
                      <dd>{f.recommendation}</dd>
                    </div>
                    <div>
                      <dt className="label">Development response</dt>
                      <dd>{f.response}</dd>
                    </div>
                    {f.excerpt && (
                      <div className={styles.excerpt}>
                        <dt className="label">From my playtest notes</dt>
                        <dd>
                          <blockquote>“{f.excerpt}”</blockquote>
                        </dd>
                      </div>
                    )}
                    <div className={styles.insight}>
                      <dt className="label">Design insight</dt>
                      <dd>{f.insight}</dd>
                    </div>
                  </dl>
                </details>
              </li>
            ))}
          </ol>
          {block.source && <p className={styles.caption}>{block.source}</p>}
        </div>
      );
  }
}

const STATUS_LABEL = { implemented: 'Implemented', discussed: 'Discussed', recommended: 'Recommendation' } as const;
