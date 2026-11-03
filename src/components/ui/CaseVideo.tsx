import { useEffect, useRef, useState } from 'react';
import type { CaseVideoAsset } from '../../content/types';
import { useReducedMotion } from '../../hooks/useMediaQuery';
import styles from './CaseVideo.module.css';

type Props = { video: CaseVideoAsset; eager?: boolean; className?: string };

/**
 * Case study footage. Plays muted and looping while on screen (paused when
 * scrolled away, to save battery). Under reduced motion it waits on its
 * poster until the visitor presses play. Real buttons for play/pause and,
 * when the clip has audio, sound; both are keyboard reachable and labelled.
 */
export function CaseVideo({ video, eager = false, className = '' }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  // Once the visitor pauses or plays by hand, scrolling no longer overrides them.
  const userChoice = useRef<'play' | 'pause' | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          el.pause();
        } else if (userChoice.current === 'play' || (!reduce && userChoice.current !== 'pause')) {
          el.play().catch(() => {});
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    // Start straight away if it's already on screen (e.g. the hero), without
    // waiting for the observer's first callback.
    const r = el.getBoundingClientRect();
    if (!reduce && r.top < window.innerHeight && r.bottom > 0) el.play().catch(() => {});
    return () => io.disconnect();
  }, [reduce]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      userChoice.current = 'play';
      el.play().catch(() => {});
    } else {
      userChoice.current = 'pause';
      el.pause();
    }
  };

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (!el.muted && el.paused) {
      userChoice.current = 'play';
      el.play().catch(() => {});
    }
  };

  return (
    <figure className={`${styles.frame} ${className}`} style={{ aspectRatio: `${video.width} / ${video.height}` }}>
      <video
        ref={ref}
        className={styles.video}
        src={video.src}
        poster={video.poster}
        width={video.width}
        height={video.height}
        muted
        loop
        playsInline
        preload={eager ? 'auto' : 'metadata'}
        aria-label={video.label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={toggle}
      />
      <div className={styles.controls}>
        <button type="button" className={styles.button} onClick={toggle} aria-label={playing ? 'Pause video' : 'Play video'}>
          {playing ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14M16 5v14" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 5l12 7-12 7z" className={styles.fill} />
            </svg>
          )}
        </button>
        {video.hasAudio && (
          <button type="button" className={styles.button} onClick={toggleSound} aria-pressed={!muted} aria-label={muted ? 'Turn sound on' : 'Turn sound off'}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 9h4l5-4v14l-5-4H4z" className={styles.fill} />
              {muted ? <path d="M17 9l4 6M21 9l-4 6" /> : <path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" />}
            </svg>
          </button>
        )}
      </div>
    </figure>
  );
}
