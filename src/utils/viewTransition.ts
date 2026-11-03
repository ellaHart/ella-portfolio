/**
 * Runs a state change inside a View Transition so the whole page can animate
 * between the old and new look. `kind` is mirrored to <html data-vt> for the
 * length of the transition so CSS can give each switch its own animation
 * (see "View transitions" in global.css). Falls back to an instant swap when
 * the API is unavailable or the visitor prefers reduced motion.
 */
export function withViewTransition(kind: 'mode' | 'theme', apply: () => void, origin?: HTMLElement | null, direction?: 'in' | 'out') {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('startViewTransition' in document)) {
    apply();
    return;
  }

  const root = document.documentElement;
  const rect = origin?.getBoundingClientRect();
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
  const y = rect ? rect.top + rect.height / 2 : 32;
  // Radius that reaches the farthest viewport corner from the origin.
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  root.style.setProperty('--vt-x', `${x}px`);
  root.style.setProperty('--vt-y', `${y}px`);
  root.style.setProperty('--vt-r', `${r}px`);
  root.dataset.vt = kind;
  if (direction) root.dataset.vtDir = direction;

  const transition = document.startViewTransition(apply);
  // A transition is skipped if another starts first (e.g. a quick double click); that's expected.
  transition.ready.catch(() => {});
  transition.finished.finally(() => {
    delete root.dataset.vt;
    delete root.dataset.vtDir;
  });
}
