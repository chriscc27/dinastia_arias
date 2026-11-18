import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Compass } from 'lucide-react';
import { conclusionesRecomendacionesData } from '../data/conclusionesRecomendacionesData';
import { getSiteTopic } from '../data/siteNav';

export default function ClosingSummarySection() {
  const { preview, conclusiones, recomendaciones } = conclusionesRecomendacionesData;
  const topic = getSiteTopic('conclusiones-recomendaciones');

  return (
    <section
      id="cierre-proyecto"
      className="home-summary-section home-closing-summary light-section"
      aria-labelledby="resumen-cierre"
    >
      <div className="section-badge">
        <span className="badge-dot" />
        <span>{preview.badge}</span>
      </div>

      <div className="summary-section-heading">
        <h2 id="resumen-cierre" className="section-heading-xl">{preview.title}</h2>
        <p className="section-desc-lead">{preview.desc}</p>
      </div>

      <div className="home-closing-grid">
        <article className="home-closing-card is-conclusions">
          <div className="home-closing-card-head">
            <span className="home-closing-pill">
              <CheckCircle2 size={15} aria-hidden="true" />
              <span>{conclusiones.tag.toUpperCase()}</span>
            </span>
            <Link
              to={`${topic.to}#conclusiones`}
              className="home-closing-icon-link"
              aria-label="Ver conclusiones completas"
            >
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <h3>Conclusiones</h3>

          <ul className="home-closing-list">
            {conclusiones.items.map((item) => (
              <li key={item.id}>
                <div className="home-closing-item-meta">
                  <strong>{item.tipo}</strong>
                  <span>{item.enfoque}</span>
                </div>
                <p>{item.shortSummary}</p>
              </li>
            ))}
          </ul>

          <Link to={`${topic.to}#conclusiones`} className="home-closing-action">
            Ver detalle de conclusiones <span aria-hidden="true">→</span>
          </Link>
        </article>

        <article className="home-closing-card is-recommendations">
          <div className="home-closing-card-head">
            <span className="home-closing-pill is-lime">
              <Compass size={15} aria-hidden="true" />
              <span>{recomendaciones.tag.toUpperCase()}</span>
            </span>
            <Link
              to={`${topic.to}#recomendaciones`}
              className="home-closing-icon-link"
              aria-label="Ver recomendaciones completas"
            >
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <h3>Recomendaciones</h3>

          <ul className="home-closing-list">
            {recomendaciones.items.map((item) => (
              <li key={item.id}>
                <div className="home-closing-item-meta">
                  <strong>{item.tipo}</strong>
                  <span>{item.enfoque}</span>
                </div>
                <p>{item.shortSummary}</p>
              </li>
            ))}
          </ul>

          <Link to={`${topic.to}#recomendaciones`} className="home-closing-action">
            Ver detalle de recomendaciones <span aria-hidden="true">→</span>
          </Link>
        </article>
      </div>

      <Link to={topic.to} className="summary-text-link">
        Explorar pantalla completa de conclusiones y recomendaciones <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
