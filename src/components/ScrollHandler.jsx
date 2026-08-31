import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const jumpToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 70;
          const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({ top: targetPosition, behavior: 'instant' });
        }
      };

      // Ejecución instantánea sin animación
      jumpToElement();
      // Pequeño respaldo por si la vista tarda un instante en renderizar
      const timer = setTimeout(jumpToElement, 10);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}
