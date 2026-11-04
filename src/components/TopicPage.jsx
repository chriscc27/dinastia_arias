import { Link } from 'react-router-dom';
import { getSiteTopic } from '../data/siteNav';

export default function TopicPage({ topicId, related = [], children }) {
  const topic = getSiteTopic(topicId);
  return (
    <div className="topic-page">
      <section className="topic-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(16, 25, 26, .85), rgba(18, 27, 28, .95)), url('${import.meta.env.BASE_URL}assets/verticals/calidad.jpg')` }}>
        <nav className="page-breadcrumb" aria-label="Ubicación"><Link to="/">Inicio</Link><span aria-hidden="true">/</span><span>{topic.label}</span></nav>
        <div className="section-badge"><span className="badge-dot" /><span>AITECH · ÁREA DE CALIDAD</span></div>
        <h1>{topic.title}</h1>
        <p>{topic.desc}</p>
      </section>
      {children}
      {related.length > 0 && (
        <nav className="topic-related" aria-label="Temas relacionados">
          <span className="topic-related-label">Continúa explorando</span>
          {related.map((id) => {
            const item = getSiteTopic(id);
            return <Link key={id} to={item.to}>{item.label}<span aria-hidden="true"> ↗</span></Link>;
          })}
        </nav>
      )}
    </div>
  );
}
