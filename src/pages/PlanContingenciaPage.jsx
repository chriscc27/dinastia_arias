import { Fragment, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, CheckCircle2, ChevronDown, Cloud, Database, Download, HardDrive, LockKeyhole, MapPin, Network, Server, ShieldCheck, Zap } from 'lucide-react';
import TopicPage from '../components/TopicPage';
import RecoveryPlaybook from '../components/RecoveryPlaybook';
import originalDocument from '../data/plan-contingencia-original.txt?raw';
import originalDocumentUrl from '../data/plan-contingencia-original.txt?url';
import { contingencyRoles, contingencySources, localScenarios, recoveryExamples, responseSteps } from '../data/planContingencia';
import { parseContingencyDocument } from '../lib/contingencyDocument';
import '../styles/contingencia.css';

const documentBlocks = parseContingencyDocument(originalDocument);
const previewEnd = documentBlocks.findIndex((block) => block.text === '¿Qué es un Plan de Contingencia?');

function DocumentBlocks({ blocks }) {
  return blocks.map((block, index) => {
    let content;
    if (block.type === 'title') content = <h3 className="pc-document-title">{block.text}</h3>;
    else if (block.type === 'meta') content = <p className="pc-document-meta">{block.text}</p>;
    else if (block.type === 'heading') content = <h4 className="pc-document-heading">{block.text}</h4>;
    else if (block.type === 'subheading') content = <h5 className={`pc-document-subheading${block.text.startsWith('ETAPA ') ? ' is-stage' : ''}`}>{block.text}</h5>;
    else if (block.type === 'item') content = <p className="pc-document-item"><span aria-hidden="true">{block.marker} </span><span>{block.text}</span></p>;
    else content = <p>{block.text}</p>;
    return <Fragment key={index}>{content}{'\n\n'}</Fragment>;
  });
}

function SourceLink({ source }) {
  const item = contingencySources[source];
  return <a className="pc-source-link" href={item.url} target="_blank" rel="noreferrer">{item.label} ↗</a>;
}

function SectionHeading({ number, title, children }) {
  return (
    <div className="pc-section-heading">
      <span className="pc-eyebrow">{number}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export default function PlanContingenciaPage() {
  const [documentExpanded, setDocumentExpanded] = useState(false);
  const documentRef = useRef(null);
  const toggleDocument = () => {
    const shouldScroll = documentExpanded && documentRef.current.getBoundingClientRect().top < 0;
    setDocumentExpanded((expanded) => !expanded);
    if (shouldScroll) requestAnimationFrame(() => documentRef.current.scrollIntoView({ behavior: 'instant', block: 'start' }));
  };

  return (
    <TopicPage topicId="plan-contingencia" related={['monitoreo', 'soporte-externo', 'presupuesto']}>
      <div className="pc-intro">
        <div className="pc-overview">
          <div className="pc-overview-copy"><span className="pc-eyebrow">CONTINUIDAD OPERATIVA · LA PAZ</span><h2>Preparados para seguir adelante.</h2><p>Proteger a las personas. Mantener los servicios esenciales. Recuperar la información y volver a operar con confianza.</p><div className="pc-overview-phases"><span><ShieldCheck size={18} aria-hidden="true" />Prevenir</span><ArrowRight size={16} aria-hidden="true" /><span><Server size={18} aria-hidden="true" />Responder</span><ArrowRight size={16} aria-hidden="true" /><span><CheckCircle2 size={18} aria-hidden="true" />Recuperar</span></div></div>
          <figure className="pc-overview-art"><img src={`${import.meta.env.BASE_URL}assets/verticals/seguridad.jpg`} alt="Escudo de vidrio verde que representa la protección de la información." width="1024" height="1024" decoding="async" /><figcaption>Protección de la información y continuidad del servicio.</figcaption></figure>
        </div>
        <nav className="pc-index" aria-label="Contenido del plan de contingencia">
          <Link to="#documento-original">01 · Fundamentos del plan <ArrowDown size={15} aria-hidden="true" /></Link>
          <Link to="#aplicacion-la-paz">02 · Aplicación en La Paz</Link>
          <Link to="#prioridades-recuperacion">03 · Prioridades y recuperación</Link>
          <Link to="#respuesta-contingencia">04 · Respuesta y responsables</Link>
          <Link to="#recursos-la-paz">05 · Recursos y contactos</Link>
        </nav>
      </div>

      <section ref={documentRef} id="documento-original" className="pc-section" aria-labelledby="pc-original-title">
        <div className="pc-document-header">
          <div><span className="pc-eyebrow">01 / FUNDAMENTOS Y METODOLOGÍA</span><h2 id="pc-original-title">Plan de contingencia para centros TIC</h2></div>
          <a className="pc-button" href={originalDocumentUrl} download="plan-contingencia-original.txt"><Download size={18} aria-hidden="true" /> Descargar original (.txt)</a>
        </div>
        <article className={`pc-document${documentExpanded ? ' is-expanded' : ''}`} aria-label="Fundamentos del plan de contingencia">
          <div className="pc-document-status"><span className="badge-dot" aria-hidden="true" />{documentExpanded ? 'DOCUMENTO COMPLETO' : 'VISTA PREVIA · INTRODUCCIÓN'}</div>
          <div className="pc-document-body" data-testid="documento-original-texto">
            <DocumentBlocks blocks={documentBlocks.slice(0, previewEnd)} />
            <div id="pc-document-rest" className="pc-document-rest" hidden={!documentExpanded}><DocumentBlocks blocks={documentBlocks.slice(previewEnd)} /></div>
          </div>
          <div className="pc-document-actions">
            <p>{documentExpanded ? 'Has llegado al final del documento.' : 'Continúa con los objetivos, la seguridad física y las diez etapas del plan.'}</p>
            <button type="button" className="pc-button pc-document-toggle" aria-expanded={documentExpanded} aria-controls="pc-document-rest" onClick={toggleDocument}>
              {documentExpanded ? 'Mostrar menos' : 'Leer documento completo'}<ChevronDown size={18} aria-hidden="true" />
            </button>
          </div>
        </article>
      </section>

      <section id="aplicacion-la-paz" className="pc-section pc-local" aria-labelledby="pc-local-title">
        <div className="pc-local-heading"><MapPin size={23} aria-hidden="true" /><span>LA PAZ, BOLIVIA</span></div>
        <SectionHeading number="02 / RIESGOS Y PREVENCIÓN" title={<span id="pc-local-title">Continuidad en La Paz: anticipar los riesgos.</span>}>
          Propuesta práctica para adaptar el plan a una sede TIC. El municipio contempla la prevención de riesgos por precipitaciones y deslizamientos; los demás escenarios permiten revisar las dependencias de cada institución.
        </SectionHeading>
        <SourceLink source="municipio" />
        <p className="pc-note">Estos escenarios son una guía de planificación. La probabilidad y el impacto deben evaluarse para el edificio, los servicios y los proveedores concretos. Consulta los avisos vigentes de <a href={contingencySources.senamhi.url} target="_blank" rel="noreferrer">SENAMHI</a> y del municipio.</p>
        <div className="pc-scenarios">
          {localScenarios.map((scenario, index) => (
            <article className="pc-scenario" key={scenario.id}>
              <div className="pc-card-meta"><span>{String(index + 1).padStart(2, '0')}</span><span>{scenario.tag}</span></div>
              <h3>{scenario.title}</h3><p>{scenario.impact}</p>
              <dl>{[['Antes', scenario.before], ['Durante', scenario.during], ['Después', scenario.after]].map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl>
              {scenario.source && <SourceLink source={scenario.source} />}
            </article>
          ))}
        </div>
      </section>

      <section id="prioridades-recuperacion" className="pc-section" aria-labelledby="pc-priorities-title">
        <SectionHeading number="03 / PLAN DE RECUPERACIÓN" title={<span id="pc-priorities-title">Restablecer lo esencial. Volver con seguridad.</span>}>
          El plan de recuperación define cómo restaurar infraestructura, datos y aplicaciones. El análisis de impacto en el negocio (BIA) determina las prioridades: qué servicio debe volver, qué necesita para funcionar y cuánto tiempo puede estar detenido.
        </SectionHeading>
        <div className="pc-recovery-feature">
          <figure><img src={`${import.meta.env.BASE_URL}assets/verticals/cloud.jpg`} alt="Nodos y servidores conectados en una estructura de nube de vidrio verde." width="1024" height="1024" loading="lazy" decoding="async" /></figure>
          <div><span className="pc-eyebrow">DE LA INTERRUPCIÓN AL RETORNO</span><h3>La recuperación sigue las dependencias de cada servicio.</h3><p>Una aplicación necesita más que un respaldo: también requiere infraestructura disponible, acceso seguro y datos comprobados. Valida cada capa antes de abrir el servicio a los usuarios.</p><ul><li><CheckCircle2 size={18} aria-hidden="true" />Entorno seguro y recursos disponibles.</li><li><CheckCircle2 size={18} aria-hidden="true" />Información íntegra y accesos verificados.</li><li><CheckCircle2 size={18} aria-hidden="true" />Aprobación del responsable del proceso.</li></ul><SourceLink source="nist" /></div>
        </div>
        <div className="pc-dependency-map"><h3>Orden de referencia para restablecer servicios</h3><p>Adapta esta secuencia al mapa de dependencias de la institución.</p><ol aria-label="Capas de recuperación">{[[Zap, 'Entorno y energía'], [Network, 'Red y conectividad'], [LockKeyhole, 'Identidad y acceso'], [Database, 'Datos y aplicaciones'], [CheckCircle2, 'Validación usuaria']].map(([Icon, label], index) => <li key={label}><Icon size={23} aria-hidden="true" /><span className="pc-dependency-number">0{index + 1}</span><strong>{label}</strong>{index < 4 && <ArrowRight className="pc-dependency-arrow" size={18} aria-hidden="true" />}</li>)}</ol></div>
        <div className="pc-definitions">
          <div><strong>RTO</strong><h3>Tiempo objetivo de recuperación</h3><p>Tiempo previsto para restablecer un servicio después de una interrupción. Debe permitir volver antes del límite tolerable del proceso.</p></div>
          <div><strong>RPO</strong><h3>Punto objetivo de recuperación</h3><p>Antigüedad máxima aceptable de los datos recuperados. Un RPO de una hora admite perder, como máximo, los cambios de esa última hora.</p></div>
        </div>
        <p className="pc-note"><strong>Ejemplo educativo:</strong> estos tiempos ilustran una matriz de recuperación; no representan SLA contratados ni capacidades verificadas de AITECH. Deben aprobarse tras el análisis de impacto y las pruebas.</p>
        <div className="pc-table-scroll" role="region" aria-label="Matriz de recuperación de ejemplo" tabIndex={0}>
          <table className="pc-table"><caption>Objetivos propuestos para un Departamento de Calidad</caption><thead><tr><th scope="col">Servicio</th><th scope="col">Impacto</th><th scope="col">RTO</th><th scope="col">RPO</th><th scope="col">Operación alternativa</th></tr></thead>
            <tbody>{recoveryExamples.map((row) => <tr key={row.service}><th scope="row">{row.service}</th><td>{row.impact}</td><td>{row.rto}</td><td>{row.rpo}</td><td>{row.alternative}</td></tr>)}</tbody>
          </table>
        </div>
        <RecoveryPlaybook />
        <div className="pc-backup-plan"><div><span className="pc-eyebrow">RESPALDOS Y RESTAURACIÓN</span><h3>Una copia útil es una copia que puedes recuperar.</h3><p>Define frecuencia, retención, cifrado, permisos y responsables. Guarda el procedimiento y las credenciales de emergencia bajo control, accesibles para el personal autorizado aunque falle la sede.</p></div><div className="pc-backup-cards">{[[HardDrive, 'Copia operativa', 'Recuperación rápida ante errores o fallas locales.'], [Cloud, 'Copia externa', 'Una ubicación que no comparta el riesgo físico de la sede.'], [ShieldCheck, 'Copia protegida', 'Aislada o inmutable, con accesos independientes y controlados.']].map(([Icon, title, text]) => <div key={title}><Icon size={25} aria-hidden="true" /><h4>{title}</h4><p>{text}</p></div>)}</div><div className="pc-backup-test"><CheckCircle2 size={22} aria-hidden="true" /><p><strong>Prueba de restauración:</strong> selecciona una copia, restaura en un entorno aislado, comprueba integridad con el área usuaria y registra los tiempos reales frente a RTO y RPO.</p></div><SourceLink source="nist" /></div>
      </section>

      <section id="respuesta-contingencia" className="pc-section pc-response" aria-labelledby="pc-response-title">
        <SectionHeading number="04 / ACTIVACIÓN Y RECUPERACIÓN" title={<span id="pc-response-title">Una respuesta organizada, paso a paso.</span>}>
          Define un titular y un suplente para cada función. La activación debe considerar la seguridad de las personas, los servicios afectados y la posibilidad de superar el tiempo tolerable de interrupción.
        </SectionHeading>
        <ol className="pc-response-steps">{responseSteps.map((step, index) => <li key={step.title}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
        <h3 className="pc-subtitle">Responsabilidades del comité</h3>
        <dl className="pc-roles">{contingencyRoles.map(([role, responsibility]) => <div key={role}><dt>{role}</dt><dd>{responsibility}</dd></div>)}</dl>
        <div className="pc-callout"><h3>Pruebas, evidencias y revisión</h3><p>Realiza ejercicios de escritorio, restauraciones en un entorno aislado y pruebas del enlace alternativo con un alcance aprobado. Registra escenario, participantes, tiempos reales, datos recuperados, fallos y acciones de mejora. Comprueba RTO y RPO y revisa el plan semestralmente, como indica el documento original, y después de cambios relevantes o incidentes.</p><p><strong>Bitácora mínima:</strong> hora local, servicio afectado, decisión, responsable, acción, evidencia, resultado y próxima actualización.</p></div>
      </section>

      <section id="recursos-la-paz" className="pc-section" aria-labelledby="pc-resources-title">
        <SectionHeading number="05 / DIRECTORIO Y FUENTES" title={<span id="pc-resources-title">Recursos para preparar el plan en La Paz.</span>}>
          Conserva el directorio también fuera de línea. Añade responsables y suplentes internos, proveedor eléctrico, internet, nube, mantenimiento y seguros; registra números de contrato, canales alternativos y fecha de verificación.
        </SectionHeading>
        <div className="pc-contact-grid">
          <article className="pc-contact-card"><span className="pc-eyebrow">EMERGENCIAS MUNICIPALES · LA PAZ</span><h3>Red de Emergencia <a href="tel:114">114</a></h3><p>Canal municipal para reportar situaciones de riesgo. Para fallas informáticas internas, contacta al equipo TIC y a los proveedores del servicio afectado.</p><SourceLink source="municipio" /></article>
          <article className="pc-contact-card"><span className="pc-eyebrow">INCIDENTES INFORMÁTICOS · BOLIVIA</span><h3>CSIRT de AGETIC / CGII</h3><p>Canal nacional de coordinación de incidentes de seguridad. Su sitio oficial publica el alcance del servicio y el procedimiento de reporte.</p><a href="mailto:csirt@agetic.gob.bo">csirt@agetic.gob.bo</a><SourceLink source="csirt" /></article>
        </div>
        <div className="pc-sources">{Object.entries(contingencySources).map(([key, source]) => <article key={key}><SourceLink source={key} /><p>{source.detail}</p></article>)}</div>
        <p className="pc-note">Fuentes consultadas el <time dateTime="2026-11-17">17 de noviembre de 2026</time>. Los contactos y avisos pueden cambiar: comprueba su vigencia al revisar el plan. Esta sección complementa el texto original con una propuesta de aplicación; no comunica una alerta activa.</p>
      </section>
    </TopicPage>
  );
}
