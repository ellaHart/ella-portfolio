import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredProjects } from '../../content/projects';
import { ArrowLink } from '../ui/ArrowLink';
import { Pending } from '../ui/Pending';
import { ProjectCover, mediaFrameProps } from '../ui/ProjectCover';
import { Tags } from '../ui/Tags';
import styles from './SelectedWork.module.css';

gsap.registerPlugin(ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Selected Work: a pinned, scroll-driven horizontal gallery.
 *
 * Why this approach:
 * - Native vertical scroll still drives everything (no wheel hijacking), so
 *   trackpads, scrollbars, keyboard paging and screen readers behave normally.
 * - The pin length equals the horizontal overflow, so the gallery releases
 *   exactly when the last panel lands. Users can't get "stuck".
 * - The same markup becomes a vertical editorial stack on small screens or
 *   with reduced motion: one component, no duplicated content.
 */
export function SelectedWork() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const total = featuredProjects.length;

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 60rem) and (prefers-reduced-motion: no-preference)', () => {
      const trackEl = track.current!;
      const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);
      const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', trackEl);

      const tween = gsap.to(trackEl, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          pin: pin.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            if (counter.current) {
              counter.current.textContent = pad(Math.min(total, Math.floor(self.progress * total * 0.999) + 1));
            }
          },
        },
      });

      panels.forEach((panel) => {
        const media = panel.querySelector('[data-parallax]');
        if (media) {
          gsap.fromTo(
            media,
            { xPercent: -7 },
            {
              xPercent: 7,
              ease: 'none',
              scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
            },
          );
        }
        const lines = panel.querySelectorAll('[data-rise]');
        gsap.from(lines, {
          yPercent: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.07,
          ease: 'expo.out',
          scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left 75%', toggleActions: 'play none none reverse' },
        });
      });

      // Keyboard support: when focus lands in an off-screen panel, scroll the
      // page to the position where that panel is centred.
      const onFocusIn = (e: FocusEvent) => {
        const panel = (e.target as Element).closest<HTMLElement>('[data-panel]');
        const st = tween.scrollTrigger;
        if (!panel || !st) return;
        const max = distance();
        // Visual width, since video panels may be scaled down to fit.
        const width = panel.getBoundingClientRect().width;
        const x = gsap.utils.clamp(0, max, panel.offsetLeft - (window.innerWidth - width) / 2);
        const y = st.start + (max ? x / max : 0) * (st.end - st.start);
        window.scrollTo({ top: y, behavior: 'instant' });
      };
      trackEl.addEventListener('focusin', onFocusIn);

      // Video panels: match the video's height to the description beside it.
      // The info column has a fixed width, so its height doesn't depend on the
      // video's size (no feedback loop). Widths change, so re-measure the track.
      // A height-matched 16:9 video can make a panel wider than the screen, so
      // the whole panel (video + description together) is then scaled down to
      // fit. It's a transform, so the measured heights above aren't affected
      // and the video stays exactly as tall as the text; a negative margin
      // gives back the layout space the scaling frees up.
      const videoPanels = gsap.utils.toArray<HTMLElement>('[data-video-panel]', trackEl);
      const MIN_SCALE = 0.75; // keep body copy readable
      const fitPanels = () => {
        const available = window.innerWidth - 2 * parseFloat(getComputedStyle(trackEl).paddingLeft);
        videoPanels.forEach((p) => {
          const width = p.offsetWidth; // layout width, unaffected by transforms
          const content = width - parseFloat(getComputedStyle(p).paddingRight);
          const scale = gsap.utils.clamp(MIN_SCALE, 1, available / content);
          p.style.transformOrigin = 'left center';
          p.style.transform = scale < 1 ? `scale(${scale})` : '';
          p.style.marginRight = scale < 1 ? `${(scale - 1) * width}px` : '';
        });
      };

      let refreshFrame = 0;
      const scheduleRefresh = () => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
          fitPanels();
          ScrollTrigger.refresh();
        });
      };
      const sizeVideos = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const panel = (entry.target as HTMLElement).closest<HTMLElement>('[data-video-panel]');
          panel?.style.setProperty('--info-h', `${Math.round(entry.borderBoxSize[0].blockSize)}px`);
        });
        scheduleRefresh();
      });
      trackEl.querySelectorAll('[data-video-panel] [data-info]').forEach((el) => sizeVideos.observe(el));
      window.addEventListener('resize', scheduleRefresh);

      return () => {
        trackEl.removeEventListener('focusin', onFocusIn);
        window.removeEventListener('resize', scheduleRefresh);
        sizeVideos.disconnect();
        cancelAnimationFrame(refreshFrame);
        videoPanels.forEach((p) => {
          p.style.removeProperty('--info-h');
          p.style.transform = '';
          p.style.marginRight = '';
        });
      };
    });

    // Fonts and images change widths; recompute once everything has loaded.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      mm.revert();
    };
  }, [total]);

  return (
    <section ref={section} id="selected-work" className={styles.section} aria-labelledby="work-heading">
      <div ref={pin} className={styles.pin}>
        <a href="#after-work" className={styles.skip}>
          Skip project gallery
        </a>

        <div ref={track} className={styles.track}>
          <header className={styles.intro} data-panel>
            <p className="label">
              Selected Work <span className={styles.count}>({pad(total)})</span>
            </p>
            <h2 id="work-heading" className={styles.introHeading}>
              Problems worth <em>solving.</em>
            </h2>
            <p className={styles.introCopy}>Selected projects exploring the intersection of design, technology, and human experience.</p>
            <ArrowLink to="/work">All projects</ArrowLink>
            <p className={`hand-note creative-only ${styles.introNote}`} aria-hidden="true">
              keep scrolling →
            </p>
          </header>

          {featuredProjects.map((project, i) => (
            <article
              key={project.slug}
              className={styles.panel}
              data-panel
              data-video-panel={project.video ? true : undefined}
              aria-labelledby={`p-${project.slug}`}
            >
              <Link to={`/work/${project.slug}`} className={styles.media} {...mediaFrameProps(project)} data-cursor="View" tabIndex={-1} aria-hidden="true">
                <ProjectCover project={project} parallax allowVideo sizes="(min-width: 60rem) 45vw, 100vw" />
              </Link>

              <div className={styles.info} data-info>
                <p className={styles.index} data-rise>
                  <span>{pad(i + 1)}</span>
                  <span className={styles.indexRule} />
                  <span>{pad(total)}</span>
                </p>
                <h3 id={`p-${project.slug}`} className={styles.title} data-rise>
                  {project.title}
                </h3>
                <p className={styles.headline} data-rise>
                  <Pending text={project.headline} />
                </p>
                <p className={styles.summary} data-rise>
                  <Pending text={project.summary} />
                </p>

                <dl className={styles.facts} data-rise>
                  <div>
                    <dt className="label">Role</dt>
                    <dd>
                      <Pending text={project.role} />
                    </dd>
                  </div>
                  <div>
                    <dt className="label">{project.category ? 'Category' : 'Industry'}</dt>
                    <dd>
                      <Pending text={project.category ?? project.industry} />
                    </dd>
                  </div>
                  {project.duration && (
                    <div>
                      <dt className="label">Duration</dt>
                      <dd>{project.duration}</dd>
                    </div>
                  )}
                </dl>

                <div data-rise>
                  <Tags items={project.tags} />
                </div>
                <div className={styles.cta} data-rise>
                  <ArrowLink to={`/work/${project.slug}`}>
                    View case study<span className="visually-hidden">: {project.title}</span>
                  </ArrowLink>
                </div>
              </div>
            </article>
          ))}

          <div className={styles.outro} data-panel>
            <Link to="/work" className={styles.outroLink} data-cursor="Open">
              <span className="label">Archive</span>
              <span className={styles.outroText}>
                See all <em>work</em>
              </span>
              <span className={styles.outroArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span className={styles.counter}>
            <span ref={counter}>01</span> / {pad(total)}
          </span>
          <span className={styles.rail}>
            <span ref={bar} className={styles.bar} />
          </span>
          <span className={styles.hint}>Scroll</span>
        </div>
      </div>
      <div id="after-work" tabIndex={-1} />
    </section>
  );
}
