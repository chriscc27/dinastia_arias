import { Link, Navigate, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Hero from '../components/Hero';
import { getSiteTopic, homeGroups, legacyHomeRoutes, siteNav } from '../data/siteNav';
import { toolsNav } from '../data/tools/toolsNav';
import { aitechAreas } from '../data/aitechData';
import snapshot from '../data/generated/datasetKpis.json';

function SummaryCard({ item, index }) {
  return (
    <Link to={item.to} className="summary-card">
      <div className="summary-card-top"><span>{String(index + 1).padStart(2, '0')}</span><ArrowUpRight size={23} aria-hidden="true" /></div>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
      <span className="summary-card-action">Ver {item.label}<span aria-hidden="true"> →</span></span>
    </Link>
  );
}

export default function HomePage() {
  const { hash } = useLocation();
  const legacyTarget = Object.hasOwn(legacyHomeRoutes, hash.slice(1)) ? legacyHomeRoutes[hash.slice(1)] : null;
  if (legacyTarget) return <Navigate to={legacyTarget} replace />;

  const { kpis, meta } = snapshot;
  const cutOff = new Intl.DateTimeFormat('es-BO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${meta.fecha_corte}T00:00:00Z`));

  return (
    <>
      <Hero />
      <section className="home-overview light-section" aria-labelledby="resumen-titulo">
        <div className="section-badge"><span className="badge-dot" /><span>EL PROYECTO EN UN VISTAZO</span></div>
        <div className="summary-section-heading">
          <h2 id="resumen-titulo" className="section-heading-xl">Calidad que conecta todo AITECH.</h2>
          <p className="section-desc-lead">Desarrollamos frameworks de calidad integral y automatización para las siete verticales tecnológicas. Aplicamos estándares internacionales ISO/IEEE y metodología científica para prevenir fallos, optimizar procesos y convertir datos en decisiones.</p>
        </div>
        <div className="home-kpi-grid">
          <div><strong>{meta.registros.toLocaleString('es-BO')}</strong><span>herramientas en el inventario</span></div>
          <div><strong>{kpis.sin_revision_vigente_pct.toLocaleString('es-BO')} %</strong><span>sin revisión vigente</span></div>
          <div><strong>{kpis.criticas_no_conformes_en_uso}</strong><span>herramientas críticas no conformes en uso</span></div>
        </div>
        <div className="home-data-note"><p>Resumen del dataset · Corte: <time dateTime={meta.fecha_corte}>{cutOff}</time>.</p><Link to={getSiteTopic('tableau').to} className="summary-text-link">Ver indicadores en Tableau <span aria-hidden="true">↗</span></Link></div>
      </section>

      {homeGroups.map((group) => (
        <section key={group.id} className="home-summary-section light-section" aria-labelledby={`resumen-${group.id}`}>
          <div className="section-badge"><span className="badge-dot" /><span>{group.badge}</span></div>
          <div className="summary-section-heading">
            <h2 id={`resumen-${group.id}`} className="section-heading-xl">{group.title}</h2>
            <p className="section-desc-lead">{group.desc}</p>
          </div>
          <div className="home-summary-grid">{siteNav.filter((item) => item.group === group.id).map((item, index) => <SummaryCard key={item.id} item={item} index={index} />)}</div>
        </section>
      ))}

      <section className="home-summary-section home-tools-summary light-section" aria-labelledby="resumen-herramientas">
        <div className="section-badge"><span className="badge-dot" /><span>HERRAMIENTAS Y RESULTADOS</span></div>
        <div className="summary-section-heading">
          <h2 id="resumen-herramientas" className="section-heading-xl">Del dato a la decisión.</h2>
          <p className="section-desc-lead">Un mismo inventario conecta el análisis en Tableau y Weka, el monitoreo con Zabbix, el presupuesto y los contratos de soporte del área.</p>
        </div>
        <div className="home-tools-grid">{toolsNav.map((item, index) => <SummaryCard key={item.id} item={item} index={index} />)}</div>
        <Link to={getSiteTopic('herramientas').to} className="summary-text-link">Ver todas las herramientas y su contexto <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="home-summary-section home-scope-summary light-section" aria-labelledby="resumen-alcance">
        <div className="section-badge"><span className="badge-dot" /><span>COBERTURA TOTAL AITECH</span></div>
        <div className="summary-section-heading">
          <h2 id="resumen-alcance" className="section-heading-xl">Siete verticales. Un compromiso con la calidad.</h2>
          <p className="section-desc-lead">Garantizamos la excelencia técnica y operativa en Software, Hardware, Redes, Seguridad, Cloud, Big Data y Calidad. Conoce el enfoque, las métricas y los estándares de cada vertical.</p>
        </div>
        <div className="home-vertical-list">{aitechAreas.map((area) => <span key={area.id}>{area.title}</span>)}</div>
        <Link to={getSiteTopic('alcance').to} className="summary-text-link">Explorar el alcance de Calidad <span aria-hidden="true">↗</span></Link>
      </section>
    </>
  );
}
