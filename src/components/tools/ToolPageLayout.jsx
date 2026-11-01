import { NavLink } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import RelatedVideosBlock from '../RelatedVideosBlock';
import { toolsNav } from '../../data/tools/toolsNav';
import '../../styles/tools.css';

// Estructura común de las páginas de herramientas: header con navegación general de 2 filas, hero,
// citas, marco teórico, el contenido propio de cada página, referencias y videos.
export default function ToolPageLayout({ data, videos, children }) {
  const { hero, quotes, theory, references } = data;

  return (
    <div className="subpage-wrapper tl-page">
      <Header />

      <section className="tl-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(16, 25, 26, 0.82) 0%, rgba(18, 27, 28, 0.95) 100%), url('${import.meta.env.BASE_URL}assets/verticals/calidad.jpg')` }}>
        <div className="tl-hero-inner">
          <div className="section-badge tl-hero-badge">
            <span className="badge-dot" />
            <span>{hero.badge}</span>
          </div>
          <h1 className="tl-hero-title">
            {hero.title} <span>{hero.highlight}</span>
          </h1>
          <p className="tl-hero-sub">{hero.subtitle}</p>
          <div className="tl-chip-row">
            {hero.chips.map((c) => (
              <span key={c} className="tl-chip">{c}</span>
            ))}
          </div>
        </div>
      </section>

      <main className="tl-main">
        <section className="tl-block">
          <div className="section-badge">
            <span className="badge-dot" />
            <span>CITAS DE REFERENCIA</span>
          </div>
          <div className="split-grid tl-quotes">
            {quotes.map((q) => (
              <figure className="mv-card-interactive dark-theme tl-quote" key={q.author}>
                <blockquote>«{q.text}»</blockquote>
                <figcaption>
                  <strong>{q.author}</strong>
                  <span>{q.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="tl-block">
          <div className="section-badge">
            <span className="badge-dot" />
            <span>MARCO TEÓRICO</span>
          </div>
          <h2 className="tl-h2">Fundamentos</h2>
          <div className="tl-theory-grid">
            {theory.map((t, i) => (
              <article key={t.heading} className="tl-theory-card">
                <span className="tl-theory-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{t.heading}</h3>
                <p>{t.content}</p>
              </article>
            ))}
          </div>
        </section>

        {children}

        <section className="tl-block">
          <div className="section-badge">
            <span className="badge-dot" />
            <span>REFERENCIAS BIBLIOGRÁFICAS (APA 7)</span>
          </div>
          <h2 className="tl-h2">Fuentes consultadas</h2>
          <ol className="tl-refs">
            {references.map((r) => (
              <li key={r.apa}>
                <span className="tl-ref-type">{r.tipo}</span>
                <span className="tl-ref-text">{r.apa}</span>
                <a href={r.url} target="_blank" rel="noopener noreferrer">{r.url.replace(/^https?:\/\//, '')} ↗</a>
              </li>
            ))}
          </ol>
        </section>

        <section className="tl-block">
          <RelatedVideosBlock data={videos} />
        </section>

        <nav className="tl-next" aria-label="Otras herramientas del área">
          {toolsNav.map((t) => (
            <NavLink key={t.id} to={t.to} className={({ isActive }) => `tl-next-card ${isActive ? 'is-current' : ''}`}>
              <span>{t.tag}</span>
              <strong>{t.title}</strong>
            </NavLink>
          ))}
        </nav>
      </main>

      <Footer />
    </div>
  );
}

// Encabezado de sección reutilizado dentro de cada página
export function ToolSection({ badge, title, lead, children, id }) {
  return (
    <section className="tl-block" id={id}>
      <div className="section-badge">
        <span className="badge-dot" />
        <span>{badge}</span>
      </div>
      <h2 className="tl-h2">{title}</h2>
      {lead && <p className="tl-lead">{lead}</p>}
      {children}
    </section>
  );
}
