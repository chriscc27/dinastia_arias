import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { legacyHomeRoutes, siteNav } from '../data/siteNav';

export default function ScrollHandler() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (pathname === '/' && Object.hasOwn(legacyHomeRoutes, hash.slice(1))) return undefined;
    const topic = siteNav.find((item) => item.to === (pathname.replace(/\/+$/, '') || '/'));
    document.title = `${topic?.title || 'Página no encontrada'} | AITECH Calidad`;

    const frame = requestAnimationFrame(() => {
      let id = hash.slice(1);
      try { id = decodeURIComponent(id); } catch { /* Conservar fragmentos mal codificados. */ }
      const target = id ? document.getElementById(id) : null;
      document.getElementById('contenido')?.focus({ preventScroll: true });
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}
