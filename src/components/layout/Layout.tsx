import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { CursorFollower } from '../ui/CursorFollower';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

/** Scroll to top on route change, or to the #hash target when one is present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section has rendered.
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

export function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollManager />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
      <CursorFollower />
    </>
  );
}
