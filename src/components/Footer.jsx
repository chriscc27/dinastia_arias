import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer-wrapper" id="contacto">
      <footer className="c-footer-xl">
        <div className="footer-top">
          <div>
            <h2 className="footer-heading">
              Impulsando los más altos estándares tecnológicos para el futuro de AITECH.
            </h2>

            <a className="u-btn--1" href="mailto:calidad@aitech.com">
              <span className="btn_label">
                Trabaja con Nosotros
                <div className="label_corner">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="48" fill="none" viewBox="0 0 18 48">
                    <path fill="#222F30" d="M0 0h5.63c7.808 0 13.536 7.337 11.642 14.91l-6.09 24.359A11.527 11.527 0 0 1 0 48V0Z" />
                  </svg>
                </div>
              </span>
              <i className="btn_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="51" height="48" fill="none" viewBox="0 0 51 48">
                  <path fill="currentColor" d="M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z" />
                </svg>
              </i>
            </a>
          </div>

          <div className="footer-columns">
            <div className="footer-col">
              <h5>Navegación</h5>
              <ul>
                <li><Link to="/#inicio">Inicio</Link></li>
                <li><Link to="/gestion-tecnologias">Gestión de Tecnologías</Link></li>
                <li><Link to="/ciencia-tecnologia-innovacion">Ciencia e Innovación</Link></li>
                <li><Link to="/mision-vision">Misión y Visión</Link></li>
                <li><Link to="/#organizacion">Organización</Link></li>
                <li><Link to="/#mbti">MBTI</Link></li>
                <li><Link to="/#scrum">SCRUM</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Conectar</h5>
              <ul>
                <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href="https://x.com" target="_blank" rel="noreferrer">X (Twitter)</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Marca de agua tipográfica gigante estilo Integrated Bio */}
        <div className="footer-watermark">
          <div className="footer-watermark-text">
            AITECH CALIDAD
          </div>
        </div>

        <div className="footer-copyright">
          <span>&copy; 2026 AITECH. Dirección de Calidad — Equipo Dinastía Arias.</span>
          <span>Todos los derechos reservados.</span>
        </div>
      </footer>
    </div>
  );
}
