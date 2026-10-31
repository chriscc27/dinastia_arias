import { Link } from 'react-router-dom';
import { toolsNav } from '../data/tools/toolsNav';
import kpisSnapshot from '../data/generated/datasetKpis.json';
import '../styles/tools.css';

// Sección del home que presenta las cinco herramientas de gestión del área y enlaza a sus páginas.
export default function HerramientasSection() {
  const { kpis, meta } = kpisSnapshot;
  return (
    <section id="herramientas" className="light-section tl-home">
      <div className="section-badge">
        <span className="badge-dot" />
        <span>HERRAMIENTAS DE GESTIÓN DEL ÁREA</span>
      </div>
      <h2 className="section-heading-xl">
        Del dato a la decisión:{' '}
        <span className="text-muted-accent">Tableau, Weka, Zabbix, presupuesto y proveedores.</span>
      </h2>
      <p className="section-desc-lead">
        Todo parte de un mismo dataset: el inventario de {meta.registros.toLocaleString('es-BO')} herramientas de QA de AITECH. Hoy el {kpis.sin_revision_vigente_pct.toLocaleString('es-BO')} % no tiene una revisión vigente y {kpis.criticas_no_conformes_en_uso} herramientas críticas siguen en uso pese a quedar No conformes. Así lo analizamos, lo vigilamos y lo financiamos.
      </p>
      <div className="tl-home-grid">
        {toolsNav.map((t, i) => (
          <Link key={t.id} to={t.to} className="tl-home-card">
            <span className="tl-home-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="tl-home-tag">{t.tag}</span>
            <h3>{t.title}</h3>
            <p>{t.desc}</p>
            <span className="tl-home-go">Abrir página →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
