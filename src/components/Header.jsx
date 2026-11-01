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
  'scrum': 'scrum',
  'idef-0': 'idef-0',
  'bpmn': 'bpmn',
  'herramientas': 'herramientas',
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
  'scrum',
  'idef-0',
  'bpmn',
  'herramientas',
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
    if (pathname === '/tableau') {
      setActiveSection('tableau');
      return;
    }
    if (pathname === '/weka') {
      setActiveSection('weka');
      return;
    }
    if (pathname === '/monitoreo') {
      setActiveSection('monitoreo');
      return;
    }
    if (pathname === '/presupuesto') {
      setActiveSection('presupuesto');
      return;
    }
    if (pathname === '/soporte-externo') {
      setActiveSection('soporte-externo');
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

  const row1Items = [
    { to: '/#inicio', id: 'inicio', label: 'Inicio' },
    { to: '/#gestion-tecnologias', id: 'gestion-tecnologias', label: 'Gestión' },
    { to: '/#ciencia-tecnologia', id: 'ciencia-tecnologia', label: 'Ciencia & Innovación' },
    { to: '/#mision-vision', id: 'mision-vision', label: 'Misión & Visión' },
    { to: '/#organizacion', id: 'organizacion', label: 'Organización' },
    { to: '/#mbti', id: 'mbti', label: 'MBTI' },
    { to: '/#scrum', id: 'scrum', label: 'SCRUM' },
    { to: '/#idef-0', id: 'idef-0', label: 'IDEF-0' },
    { to: '/#bpmn', id: 'bpmn', label: 'BPMN' },
  ];

  const row2Items = [
    { to: '/#herramientas', id: 'herramientas', label: 'Herramientas' },
    { to: '/tableau', id: 'tableau', label: 'Tableau' },
    { to: '/weka', id: 'weka', label: 'Weka' },
    { to: '/monitoreo', id: 'monitoreo', label: 'Monitoreo' },
    { to: '/presupuesto', id: 'presupuesto', label: 'Presupuesto' },
    { to: '/soporte-externo', id: 'soporte-externo', label: 'Soporte' },
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
        <div className="nav-pill-container nav-two-rows">
          <nav className="nav-row nav-row-top" aria-label="Navegación general">
            {row1Items.map((item) => {
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
          </nav>
          <div className="nav-row-divider" aria-hidden="true" />
          <nav className="nav-row nav-row-bottom" aria-label="Área de calidad y herramientas">
            {row2Items.map((item) => {
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
            <Link
              to="/#contacto"
              onClick={() => setActiveSection('contacto')}
              className={`nav-item-link nav-cta-btn ${activeSection === 'contacto' ? 'active' : ''}`}
            >
              <span>Más</span>
              <span className="nav-cta-icon">+</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
