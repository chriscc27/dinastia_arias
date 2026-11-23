import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navRow1, navRow2, navRow3 } from '../data/siteNav';

export default function Header({ headerRef }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const { pathname, hash } = useLocation();

  useEffect(() => { setMenuOpen(false); }, [pathname, hash]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event) => {
      if (!panelRef.current?.contains(event.target) && !toggleRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  const renderLink = (item) => (
    <NavLink
      key={item.id}
      to={item.to}
      end
      onClick={() => setMenuOpen(false)}
      className={({ isActive }) => `nav-item-link${isActive && item.id !== 'presupuesto' ? ' active' : ''}${item.id === 'contacto' ? ' nav-contact-link' : ''}`}
      title={item.desc || item.title}
    >
      {item.label}
    </NavLink>
  );

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-left">
        <Link to="/" className="logo-link" aria-label="AITECH Calidad — Inicio" onClick={() => setMenuOpen(false)}>
          <span className="logo-text">AITECH <span>| CALIDAD</span></span>
        </Link>
      </div>

      <div className="header-right">
        <button
          ref={toggleRef}
          className="nav-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          <span>20 Secciones</span>
        </button>

        <div
          id="site-navigation"
          ref={panelRef}
          className={`nav-pill-container nav-three-rows${menuOpen ? ' is-open' : ''}`}
        >
          <nav className="nav-row nav-row-1" aria-label="Estrategia y Organización (1–7)">
            {navRow1.map(renderLink)}
          </nav>
          <div className="nav-row-divider" aria-hidden="true" />
          <nav className="nav-row nav-row-2" aria-label="Metodología y Procesos (8–14)">
            {navRow2.map(renderLink)}
          </nav>
          <div className="nav-row-divider" aria-hidden="true" />
          <nav className="nav-row nav-row-3" aria-label="Operación y Cierre (15–20)">
            {navRow3.map(renderLink)}
          </nav>
        </div>
      </div>
    </header>
  );
}
