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

const ORIGIN = 'https://ellahartsell.com';

/** Point the canonical and og:url tags at the current route, so each page is indexed as itself. */
function CanonicalUrl() {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = ORIGIN + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''));
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
  }, [pathname]);

  return null;
}

export function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollManager />
      <CanonicalUrl />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
      <CursorFollower />
    </>
  );
}
