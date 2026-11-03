/**
 * Sticky video card stack, adapted from Skiper UI's StickyCard002 (Skiper 17).
 *
 * Changes from the original: real <video> cards instead of images, scoped
 * refs instead of the global `.sticky-cards` selector, cleanup that reverts
 * only this component's ScrollTriggers (the original kills all of them), no
 * Lenis or Next.js imports (this site uses native scroll), only the active
 * card plays, and a non-pinned list for reduced motion or if the animation
 * can't run.
 *
 * Original credit and license, kept as required for the free version:
 *
 * Skiper 17 StickyCard_002 — React + Gsap + scrollTrigger
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { DanceVideo } from '../../content/dance';
import styles from './StickyVideoStack.module.css';

gsap.registerPlugin(ScrollTrigger);

type Props = { videos: DanceVideo[] };

const pad = (n: number) => String(n).padStart(2, '0');

export function StickyVideoStack({ videos }: Props) {
  const section = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const trigger = useRef<ScrollTrigger | null>(null);
  /** Cards the visitor paused themselves; they don't auto-resume. */
  const userPaused = useRef(new Set<number>());
  const [stacked, setStacked] = useState(false);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);

  /* ---------- Scroll animation (motion-safe only) ---------- */
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const els = cards.current.filter(Boolean) as HTMLElement[];
      if (els.length < 2) return;
      setStacked(true);

      gsap.set(els[0], { yPercent: 0, scale: 1, rotation: 0 });
      gsap.set(els.slice(1), { yPercent: 115, scale: 1, rotation: 0 });

      const steps = els.length - 1;
      const tl = gsap.timeline({
        defaults: { ease: 'none', duration: 1 },
        scrollTrigger: {
          trigger: section.current,
          pin: stage.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * steps * 0.85}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.min(steps, Math.round(self.progress * steps))),
        },
      });
      // Current card shrinks to ~70% and tilts ~5° while the next slides up over it.
      for (let i = 0; i < steps; i++) {
        tl.to(els[i], { scale: 0.7, rotation: i % 2 ? -5 : 5 }, i).to(els[i + 1], { yPercent: 0 }, i);
      }
      trigger.current = tl.scrollTrigger ?? null;

      // Pause everything once the stack has scrolled away (either direction).
      ScrollTrigger.create({
        trigger: section.current,
        start: 'top 60%',
        end: 'bottom 40%',
        onToggle: (self) => setInView(self.isActive),
      });

      return () => {
        // Reverting the context kills only this timeline and its ScrollTrigger.
        trigger.current = null;
        setStacked(false);
      };
    });
    return () => mm.revert();
  }, [videos.length]);

  // Re-measure once posters/fonts settle or the layout changes size.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ---------- Only play while the stack is on screen ---------- */
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ---------- Playback: one video at a time ---------- */
  useEffect(() => {
    vids.current.forEach((v, i) => {
      if (!v) return;
      const shouldAutoplay = stacked && inView && i === active && !userPaused.current.has(i);
      if (shouldAutoplay) {
        if (v.preload !== 'auto') v.preload = 'auto';
        v.play().catch(() => {});
      } else if (stacked || !inView) {
        v.pause();
      }
    });
  }, [active, inView, stacked]);

  const onPlay = (i: number) => {
    setPlaying(i);
    userPaused.current.delete(i);
    // Starting one video pauses any other.
    vids.current.forEach((v, j) => j !== i && v && !v.paused && v.pause());
  };

  const toggle = (i: number) => {
    const v = vids.current[i];
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      userPaused.current.add(i);
      v.pause();
    }
  };

  const replay = (i: number) => {
    const v = vids.current[i];
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };

  /** Keyboard users tabbing into a card that's off-stage: scroll it into place. */
  const onCardFocus = (i: number) => {
    const st = trigger.current;
    if (!st || i === active) return;
    const steps = videos.length - 1;
    window.scrollTo({ top: st.start + ((st.end - st.start) * i) / steps, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <div ref={section} className={styles.section} data-stacked={stacked || undefined}>
      <div ref={stage} className={styles.stage}>
        <ol className={styles.stack} aria-label="Dance videos">
          {videos.map((v, i) => (
            <li
              key={v.id}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className={styles.card}
              style={{ zIndex: i + 1 }}
              aria-current={stacked && i === active ? 'true' : undefined}
              onFocus={() => onCardFocus(i)}
            >
              <figure className={styles.figure}>
                <div className={styles.frame} style={{ aspectRatio: `${v.width} / ${v.height}` }}>
                  <video
                    ref={(el) => {
                      vids.current[i] = el;
                    }}
                    className={styles.video}
                    src={v.src}
                    poster={v.poster}
                    width={v.width}
                    height={v.height}
                    muted
                    loop
                    playsInline
                    preload={i === 0 ? 'metadata' : 'none'}
                    aria-label={v.label}
                    onPlay={() => onPlay(i)}
                    onPause={() => setPlaying((p) => (p === i ? null : p))}
                  />
                </div>
                <figcaption className={styles.bar}>
                  <span className={styles.count}>
                    {pad(i + 1)} <span aria-hidden="true">/</span>
                    <span className="visually-hidden"> of </span> {pad(videos.length)}
                  </span>
                  <span className={styles.caption}>{v.caption}</span>
                  <span className={styles.controls}>
                    <button type="button" className={styles.btn} onClick={() => toggle(i)} aria-label={`${playing === i ? 'Pause' : 'Play'} video: ${v.caption}`}>
                      {playing === i ? (
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path d="M8 5v14M16 5v14" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path d="M7 4.5v15l12-7.5z" />
                        </svg>
                      )}
                    </button>
                    <button type="button" className={styles.btn} onClick={() => replay(i)} aria-label={`Replay video: ${v.caption}`}>
                      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4.5h4.5" />
                      </svg>
                    </button>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
