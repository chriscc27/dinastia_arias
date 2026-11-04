import { Suspense, useLayoutEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollHandler from './ScrollHandler';

export default function SiteLayout() {
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty('--site-header-height', `${entry.target.getBoundingClientRect().height}px`);
    });
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header headerRef={headerRef} />
      <main id="contenido" className="site-main" tabIndex={-1}>
        <Suspense fallback={<div className="page-loading" role="status">Cargando contenido…</div>}>
          <Outlet />
          <ScrollHandler />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
