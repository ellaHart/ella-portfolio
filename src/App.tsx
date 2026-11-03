import { lazy, Suspense, useEffect } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import { useDocumentTitle } from './hooks/useDocumentTitle';
import page from './pages/Page.module.css';

// Interior pages are split out so the homepage ships the smallest bundle.
const Work = lazy(() => import('./pages/Work'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Dance = lazy(() => import('./pages/Dance'));

function NotFound() {
  useDocumentTitle('Page not found');
  // The SPA rewrite answers unknown URLs with 200, so keep them out of search results.
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <div className={`container ${page.page}`}>
      <h1 className={page.pageTitle}>
        Lost the <em>thread.</em>
      </h1>
      <p className={page.lede}>
        That page doesn’t exist. <Link to="/">Head home →</Link>
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<CaseStudy />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="dance" element={<Dance />} />
          {/* Old Playground URL */}
          <Route path="creative" element={<Navigate to="/dance" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
