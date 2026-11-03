import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import { useNavigate } from 'react-router';
import { StickyVideoStack } from '../components/dance/StickyVideoStack';
import { Lightbox } from '../components/ui/Lightbox';
import { dancePhotos, danceVideos, type DancePhoto } from '../content/dance';
import { useCreativeMode } from '../context/CreativeMode';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import styles from './Dance.module.css';

/*
 * Dance: an introduction, a pinned stack of performance videos ("On the
 * field"), then a wall of draggable polaroids ("Behind the scenes"). On
 * larger screens the polaroids drift and can be dragged (mouse, touch, or
 * arrow keys); clicking one opens it larger. On phones they settle into a
 * loose, scattered column.
 */

// x/y are % of the canvas; rotate is degrees.
const LAYOUT = [
  { x: 3, y: 4, rotate: -6 },
  { x: 26, y: 0, rotate: 4 },
  { x: 51, y: 6, rotate: -3 },
  { x: 75, y: 1, rotate: 5 },
  { x: 10, y: 50, rotate: 3 },
  { x: 34, y: 54, rotate: -5 },
  { x: 57, y: 48, rotate: 2 },
  { x: 80, y: 53, rotate: -4 },
];

const STEP = 2; // % moved per arrow-key press

export default function Dance() {
  const { isCreative, setMode } = useCreativeMode();
  const navigate = useNavigate();
  const canvas = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; dx: number; dy: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [positions, setPositions] = useState(() =>
    Object.fromEntries(dancePhotos.map((p, i) => [p.id, { x: LAYOUT[i].x, y: LAYOUT[i].y }])),
  );
  const [order, setOrder] = useState(() => dancePhotos.map((p) => p.id));
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState<DancePhoto | null>(null);
  const settled = useRef(false);
  useDocumentTitle('Dance');

  // Arriving here switches Creative Mode on once. If the visitor later turns it
  // off, this Creative-only page hands them back to the homepage.
  useEffect(() => {
    if (isCreative) settled.current = true;
    else if (!settled.current) setMode('creative');
    else navigate('/');
  }, [isCreative, setMode, navigate]);

  // The page sits on the sandy "desk" background while open.
  useEffect(() => {
    document.documentElement.dataset.page = 'dance';
    return () => {
      delete document.documentElement.dataset.page;
    };
  }, []);

  const bringToFront = (id: string) => setOrder((o) => [...o.filter((x) => x !== id), id]);

  const clampPos = (x: number, y: number) => ({ x: Math.min(84, Math.max(0, x)), y: Math.min(70, Math.max(0, y)) });

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>, id: string) => {
    const box = canvas.current?.getBoundingClientRect();
    if (!box || !window.matchMedia('(min-width: 48rem)').matches) return;
    const pos = positions[id];
    drag.current = {
      id,
      dx: e.clientX - (box.left + (pos.x / 100) * box.width),
      dy: e.clientY - (box.top + (pos.y / 100) * box.height),
      moved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    bringToFront(id);
    setActive(id);
  };

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    const box = canvas.current?.getBoundingClientRect();
    if (!d || !box) return;
    d.moved = true;
    const x = ((e.clientX - d.dx - box.left) / box.width) * 100;
    const y = ((e.clientY - d.dy - box.top) / box.height) * 100;
    setPositions((p) => ({ ...p, [d.id]: clampPos(x, y) }));
  };

  const onPointerUp = () => {
    // A drag shouldn't also count as a click that opens the photo.
    suppressClick.current = !!drag.current?.moved;
    drag.current = null;
    setActive(null);
  };

  const onClick = (p: DancePhoto) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    setOpen(p);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, id: string) => {
    const delta = { ArrowLeft: [-STEP, 0], ArrowRight: [STEP, 0], ArrowUp: [0, -STEP], ArrowDown: [0, STEP] }[e.key];
    if (!delta) return;
    e.preventDefault();
    bringToFront(id);
    setPositions((p) => ({ ...p, [id]: clampPos(p[id].x + delta[0], p[id].y + delta[1]) }));
  };

  return (
    <div className={styles.page}>
      {/* ---------- Introduction ---------- */}
      <header className={`container ${styles.header}`}>
        <h1 className={styles.title}>Dance</h1>
        <p className={styles.subtitle}>
          On the field, <em>beyond the screen.</em>
        </p>
        <p className={styles.lede}>
          Dance is where my creativity gets to move. Performing with the University of Miami Hurricanettes is one of my favorite ways to
          express myself, and it carries over into my design work too, from the team’s visual branding to its merchandise. Here’s a
          little of what that looks like.
        </p>
      </header>

      {/* ---------- On the field: video stack ---------- */}
      <section className={styles.videos} aria-labelledby="field-heading">
        <div className={`container ${styles.sectionHead}`}>
          <p className="label">01</p>
          <h2 id="field-heading" className={styles.sectionTitle}>
            On the <em>field</em>
          </h2>
        </div>
        <StickyVideoStack videos={danceVideos} />
      </section>

      {/* ---------- Behind the scenes: polaroids ---------- */}
      <section className={styles.photos} aria-labelledby="bts-heading">
        <div className={`container ${styles.sectionHead}`}>
          <p className="label">02</p>
          <h2 id="bts-heading" className={styles.sectionTitle}>
            Behind the <em>scenes</em>
          </h2>
          <p className={styles.sectionLede}>The moments between the performances.</p>
        </div>

        <div ref={canvas} className={styles.canvas}>
          <p id="polaroid-hint" className={`hand-note ${styles.hint}`}>
            drag them around ✦
          </p>
          <ul className={styles.wall} aria-label="Photos">
            {dancePhotos.map((p, i) => (
              <li
                key={p.id}
                className={styles.slot}
                style={
                  {
                    '--x': `${positions[p.id].x}%`,
                    '--y': `${positions[p.id].y}%`,
                    '--r': `${LAYOUT[i].rotate}deg`,
                    '--float-delay': `${-i * 1.3}s`,
                    zIndex: order.indexOf(p.id) + 1,
                  } as CSSProperties
                }
              >
                <button
                  type="button"
                  className={styles.polaroid}
                  data-dragging={active === p.id || undefined}
                  aria-describedby="polaroid-hint"
                  aria-haspopup="dialog"
                  aria-label={`${p.image.alt}. Press Enter to view larger; arrow keys move it.`}
                  onPointerDown={(e) => onPointerDown(e, p.id)}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  onKeyDown={(e) => onKeyDown(e, p.id)}
                  onFocus={() => bringToFront(p.id)}
                  onClick={() => onClick(p)}
                >
                  <span className={styles.photo} aria-hidden="true">
                    <img src={p.image.src} alt="" width={p.image.width} height={p.image.height} loading="lazy" decoding="async" draggable={false} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Lightbox image={open?.image ?? null} caption={open?.image.alt} onClose={() => setOpen(null)} />
    </div>
  );
}
