import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="not-found-page">
      <div className="section-badge"><span className="badge-dot" /><span>404 · AITECH CALIDAD</span></div>
      <h1 className="section-heading-xl">No encontramos esta página.</h1>
      <p className="section-desc-lead">Puedes volver al resumen del proyecto o elegir un tema en el menú.</p>
      <Link to="/" className="summary-text-link">Volver al inicio <span aria-hidden="true">→</span></Link>
    </section>
  );
}
