import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react';
import { footerGroups, getSiteTopic } from '../data/siteNav';
import { teamMembers } from '../data/teamData';

export default function Footer() {
  const backToTop = () => {
    document.getElementById('contenido')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return (
    <div className="footer-wrapper" id="contacto">
      <footer className="c-footer-xl site-footer">
        <div className="footer-top">
          <div className="footer-invitation">
            <span className="footer-eyebrow"><span />SIGAMOS CONSTRUYENDO CALIDAD</span>
            <h2 className="footer-heading">El siguiente paso hacia la excelencia empieza con una conversación.</h2>
            <p>Conoce a quienes impulsan la calidad en AITECH y conecta con nuestro equipo.</p>
            <Link className="footer-contact-action" to="/trabaja-con-nosotros">Hablemos con el equipo <ArrowUpRight size={21} aria-hidden="true" /></Link>
          </div>
          <Link to="/organizacion#equipo" className="footer-team-card">
            <span className="footer-team-label">DINASTÍA ARIAS <ArrowUpRight size={20} aria-hidden="true" /></span>
            <div className="footer-team-avatars" aria-hidden="true">{teamMembers.map((member) => <span key={member.initials}>{member.initials}</span>)}</div>
            <strong>{teamMembers.length} especialistas.<br />Un compromiso compartido.</strong>
            <span className="footer-team-description">Explora nuestro equipo, sus responsabilidades y su visión de la calidad.</span>
            <span className="footer-team-link">Conoce al equipo <span aria-hidden="true">→</span></span>
          </Link>
        </div>

        <div className="footer-directory">
          {footerGroups.map((group) => (
            <nav key={group.title} className="footer-directory-group" aria-label={`Pie de página: ${group.title}`}>
              <h3>{group.title}</h3>
              <ul>{group.ids.map((id) => {
                const item = getSiteTopic(id);
                return <li key={id}><Link to={item.to}>{item.label}</Link></li>;
              })}</ul>
            </nav>
          ))}
          <div className="footer-directory-group footer-people">
            <h3>Contacto directo</h3>
            <ul>{teamMembers.map((member) => (
              <li key={member.initials}>
                <a href={`mailto:${member.email}`} aria-label={`Enviar correo a ${member.name}`}>
                  <span>{member.name}<small>{member.email}</small></span><Mail size={16} aria-hidden="true" />
                </a>
              </li>
            ))}</ul>
          </div>
        </div>

        <div className="footer-utility">
          <div className="footer-external-links">
            <span>Conectar</span>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12} aria-hidden="true" /></a>
            <a href="https://x.com" target="_blank" rel="noreferrer">X <ArrowUpRight size={12} aria-hidden="true" /></a>
          </div>
          <button type="button" className="footer-back-top" onClick={backToTop}>Volver arriba <ArrowUp size={16} aria-hidden="true" /></button>
        </div>
        <div className="footer-watermark" aria-hidden="true"><div className="footer-watermark-text">AITECH CALIDAD</div></div>
        <div className="footer-copyright"><span>© 2026 AITECH · Dirección de Calidad</span><span>Equipo Dinastía Arias</span></div>
      </footer>
    </div>
  );
}
