import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const navRef = useRef(null);

  // Permite desplazar horizontalmente el menú con la rueda del ratón en desktop
  const handleWheel = (e) => {
    if (navRef.current) {
      if (e.deltaY !== 0) {
        navRef.current.scrollLeft += e.deltaY * 0.8;
      }
    }
  };

  return (
    <header>
      <div className="logo">
        <Link to="/#inicio" style={{ textDecoration: 'none', color: 'inherit' }}>
          AITECH <span>| Calidad</span>
        </Link>
      </div>
      <nav ref={navRef} onWheel={handleWheel} className="nav-scrollable">
        <ul>
          <li><Link to="/#inicio">Inicio</Link></li>
          <li><Link to="/#gestion-tecnologias">Gestión de Tecnologías</Link></li>
          <li><Link to="/#ciencia-tecnologia">Ciencia y Tecnología</Link></li>
          <li><Link to="/#mision-vision">Misión y Visión</Link></li>
          <li><Link to="/#organigrama">Organización</Link></li>
        </ul>
      </nav>
    </header>
  );
}
