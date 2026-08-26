import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="logo">
        <Link to="/#inicio" style={{ textDecoration: 'none', color: 'inherit' }}>
          AITECH <span>| Calidad</span>
        </Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/#inicio">Inicio</Link></li>
          <li><Link to="/#gestion-tecnologias">Gestión de Tecnologías</Link></li>
          <li><Link to="/#ciencia-tecnologia">Ciencia y Tecnología</Link></li>
          <li><Link to="/#mision-vision">Misión y Visión</Link></li>
          <li><Link to="/#equipo">El Equipo</Link></li>
          <li><Link to="/#organigrama">Organización</Link></li>
          <li><Link to="/#alcance">Alcance AITECH</Link></li>
        </ul>
      </nav>
    </header>
  );
}
