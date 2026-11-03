import { useEffect, useRef, type CSSProperties } from 'react';
import type { Project } from '../../content/types';
import { useReducedMotion } from '../../hooks/useMediaQuery';
import styles from './ProjectCover.module.css';

type Props = {
  project: Project;
  sizes?: string;
  className?: string;
  /** Attribute hook for scroll-driven parallax on the inner image. */
  parallax?: boolean;
  eager?: boolean;
  /** Allow the project's looping preview video (Selected Work cards and the case study hero). */
  allowVideo?: boolean;
};

/**
 * Props for a card's media frame. Projects with a preview video get a frame
 * locked to the video's own aspect ratio, so it fills edge to edge with no
 * letterboxing above or below.
 */
export function mediaFrameProps(project: Project) {
  if (!project.video) return {};
  return {
    'data-video': true,
    style: { '--media-ratio': `${project.video.width} / ${project.video.height}` } as CSSProperties,
  };
}

/**
 * Project imagery with a designed fallback: until a cover exists, the panel
 * shows a typographic cover, clearly labelled as pending. Projects with a
 * preview video loop it muted on the cards; under reduced motion the cover
 * image is shown instead.
 */
export function ProjectCover({ project, sizes = '60vw', className = '', parallax = false, eager = false, allowVideo = false }: Props) {
  const { cover, video } = project;
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideo = allowVideo && video && !reduce;

  // Only play while on screen: saves battery and keeps scrolling smooth. There is
  // deliberately no autoPlay attribute, so off-screen previews never start downloading.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [showVideo]);

  return (
    <div className={`${styles.cover} ${className}`} style={{ '--accent': project.accent ?? 'var(--charcoal)' } as CSSProperties}>
      {showVideo ? (
        <video
          ref={videoRef}
          className={`${styles.img} ${styles.video}`}
          src={video.src}
          poster={cover?.src}
          width={video.width}
          height={video.height}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${project.title}: prototype preview`}
        />
      ) : cover ? (
        <img
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={styles.img}
          data-parallax={parallax || undefined}
        />
      ) : (
        <div className={styles.fallback} data-parallax={parallax || undefined} role="img" aria-label={`${project.title}: cover image pending`}>
          <span className={styles.fallbackTitle}>{project.title}</span>
          <span className={styles.fallbackNote}>Cover image pending</span>
        </div>
      )}
    </div>
  );
}
