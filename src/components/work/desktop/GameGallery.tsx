import { useState } from 'react';
import { games } from '../../../content/games';
import type { Game } from '../../../content/types';
import { Pending, isTodo } from '../../ui/Pending';
import { PixelIcon } from './PixelIcon';
import styles from './Desktop.module.css';

/** One pill per game, colour-coded by kind (award > jam > solo > other). */
function pillFor(g: Game): { label: string; tone: 'green' | 'orange' | 'gold' } | null {
  if (g.award) return { label: g.award, tone: 'green' };
  if (/jam/i.test(g.context)) return { label: 'Game jam', tone: 'orange' };
  if (/solo/i.test(g.context)) return { label: 'Solo', tone: 'gold' };
  if (!isTodo(g.context)) return { label: g.context, tone: 'gold' };
  return null;
}

/**
 * Grid of game icons with a preview pane. Click selects a game; double-click
 * opens it on itch.io, like launching an app.
 */
export function GameGallery() {
  const [selected, setSelected] = useState(games[0].slug);
  const game = games.find((g) => g.slug === selected) ?? games[0];
  const pill = pillFor(game);

  return (
    <div className={styles.explorer}>
      <ul className={styles.icons} aria-label="Games">
        {games.map((g) => (
          <li key={g.slug}>
            <button
              type="button"
              className={styles.icon}
              aria-pressed={g.slug === selected}
              aria-controls="game-preview"
              onClick={() => setSelected(g.slug)}
              onDoubleClick={() => window.open(g.link.href, '_blank', 'noreferrer')}
            >
              <span className={styles.thumb} data-art={g.icon ? '' : undefined} aria-hidden="true">
                {g.icon ? (
                  <>
                    <PixelIcon name="folder" size={72} />
                    <img src={g.icon.src} alt="" width={40} height={40} className={styles.folderArt} />
                  </>
                ) : (
                  g.title.slice(0, 1)
                )}
              </span>
              <span className={styles.iconName}>{g.title}</span>
            </button>
          </li>
        ))}
      </ul>

      <article id="game-preview" className={styles.preview} aria-live="polite" aria-labelledby="game-preview-title">
        <div className={styles.previewBar}>
          <span>preview</span>
          <span className={styles.mono}>{game.slug}.app</span>
        </div>
        <div className={styles.previewBody}>
          {game.cover ? (
            <div className={styles.cover} style={{ aspectRatio: `${game.cover.width} / ${game.cover.height}` }}>
              <img src={game.cover.src} alt={game.cover.alt} width={game.cover.width} height={game.cover.height} />
            </div>
          ) : (
            <div className={styles.cover} role="img" aria-label={`${game.title}: cover image pending`}>
              <span>Cover image pending</span>
            </div>
          )}
          <div className={styles.previewHead}>
            <h3 id="game-preview-title" className={styles.gameTitle}>
              {game.title}
            </h3>
            {pill && <span className={`${styles.pill} ${styles[pill.tone]}`}>{pill.label}</span>}
          </div>
          <p className={styles.gameDesc}>{game.description}</p>
          <dl className={styles.facts}>
            <div>
              <dt>Role</dt>
              <dd>
                <Pending text={game.role} />
              </dd>
            </div>
            <div>
              <dt>Made for</dt>
              <dd>
                <Pending text={game.context} />
              </dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd className={styles.mono}>{game.tools.join(' · ')}</dd>
            </div>
          </dl>
          <a href={game.link.href} target="_blank" rel="noreferrer" className={styles.cta}>
            {game.link.label} ↗<span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>
      </article>
    </div>
  );
}
