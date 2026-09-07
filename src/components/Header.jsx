import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SECTION_MAP = {
  'inicio': 'inicio',
  'gestion-tecnologias': 'gestion-tecnologias',
  'ciencia-tecnologia': 'ciencia-tecnologia',
  'mision-vision': 'mision-vision',
  'equipo': null,       // Sección sin botón en header -> desmarca todo
  'organizacion': 'organizacion',
  'mbti': 'mbti',
  'alcance': null,      // Sección sin botón en header -> desmarca todo
  'contacto': 'contacto',
};

const ALL_SECTIONS = [
  'inicio',
  'gestion-tecnologias',
  'ciencia-tecnologia',
  'mision-vision',
  'equipo',
  'organizacion',
  'mbti',
  'alcance',
  'contacto'
];

export default function Header() {
  const navScrollRef = useRef(null);
  const { pathname, hash } = useLocation();
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    // 1. Manejo de subpáginas específicas fuera del home
    if (pathname === '/mision-vision') {
      setActiveSection('mision-vision');
      return;
    }
    if (pathname === '/gestion-tecnologias') {
      setActiveSection('gestion-tecnologias');
      return;
    }
    if (pathname === '/ciencia-tecnologia-innovacion') {
      setActiveSection('ciencia-tecnologia');
      return;
    }

    // 2. Detección dinámica y precisa mediante viewport (getBoundingClientRect)
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.38; // Punto focal en la pantalla (38%)
      let currentActive = null;
      let sectionFound = false;

      for (const id of ALL_SECTIONS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
            currentActive = SECTION_MAP[id];
            sectionFound = true;
            break;
          }
        }
      }

      // Si se está al inicio de la página, por defecto resalta Inicio
      if (!sectionFound && window.scrollY < 120) {
        currentActive = 'inicio';
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, hash]);

  const handleWheel = (e) => {
    if (navScrollRef.current) {
      navScrollRef.current.scrollLeft += e.deltaY * 0.8;
    }
  };

  const navItems = [
    { to: '/#inicio', id: 'inicio', label: 'Inicio' },
    { to: '/#gestion-tecnologias', id: 'gestion-tecnologias', label: 'Gestión' },
    { to: '/#ciencia-tecnologia', id: 'ciencia-tecnologia', label: 'Ciencia & Innovación' },
    { to: '/#mision-vision', id: 'mision-vision', label: 'Misión & Visión' },
    { to: '/#organizacion', id: 'organizacion', label: 'Organización' },
    { to: '/#mbti', id: 'mbti', label: 'MBTI' },
  ];

  return (
    <header className="site-header">
      <div className="header-left">
        <Link to="/" className="logo-link">
          <span className="logo-text">
            AITECH <span>| CALIDAD</span>
          </span>
        </Link>
      </div>

      <div className="header-right">
        <div className="nav-pill-container">
          <nav className="nav-scrollable-inner" ref={navScrollRef} onWheel={handleWheel}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  onClick={() => setActiveSection(item.id)}
                  className={`nav-item-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="#contacto"
              onClick={() => setActiveSection('contacto')}
              className={`nav-item-link nav-cta-btn ${activeSection === 'contacto' ? 'active' : ''}`}
            >
              <span>Más</span>
              <span className="nav-cta-icon">+</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
