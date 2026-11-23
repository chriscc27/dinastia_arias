import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Download, CheckCircle2, AlertTriangle, ShieldCheck, 
  Workflow, ArrowUpRight, ChevronRight, UserCheck, Briefcase, Award 
} from 'lucide-react';
import TopicPage from '../components/TopicPage';
import { positions } from '../data/positionsData';

export default function DescripcionPosicionesPage() {
  const [selectedId, setSelectedId] = useState(1);
  const activePosition = positions.find((p) => p.id === selectedId) || positions[0];

  return (
    <TopicPage topicId="descripcion-posiciones" related={['organizacion', 'mbti', 'scrum', 'goals']}>
      {/* Barra de Acciones y Descarga de Documento Oficial */}
      <section className="light-section" style={{ paddingBottom: '2rem' }}>
        <div className="section-badge">
          <span className="badge-dot" />
          <span>MANUAL DE ORGANIZACIÓN Y FUNCIONES (MOF)</span>
        </div>

        <div className="summary-section-heading">
          <h2 className="section-heading-xl">
            Descripción de Posiciones de QA:{' '}
            <span className="text-muted-accent">Roles, competencias y gobernanza técnica.</span>
          </h2>
          <p className="section-desc-lead">
            Estructura formal de cargos del Área de Calidad bajo normas ISO 9001, ISO/IEC 25010 e IEEE 829. 
            Define la división especializada del trabajo, líneas de reporte jerárquico y requisitos de competencia para asegurar la excelencia en las siete verticales tecnológicas de AITECH.
          </p>
        </div>

        {/* Banner de Descarga del Manual Oficial PDF */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          padding: '1.5rem 2rem',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(34, 47, 48, 0.95) 0%, rgba(34, 47, 48, 0.85) 100%)',
          color: '#ffffff',
          border: '1px solid rgba(206, 247, 158, 0.25)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
          marginBottom: '3rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '260px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(167, 226, 110, 0.15)',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--color-lime)',
              flexShrink: 0
            }}>
              <FileText size={24} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem', fontWeight: 600 }}>
                Manual Oficial de Descripción de Posiciones QA
              </strong>
              <span style={{ fontSize: '0.85rem', color: '#c9d2c7' }}>
                Documento normativo institucional completo (6 páginas, PDF oficial)
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={`${import.meta.env.BASE_URL}docs/Descripcion_Posiciones_QA.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="home-primary-action"
              style={{ padding: '10px 20px', fontSize: '0.9rem' }}
            >
              <Download size={16} /> Abrir PDF Completo <ArrowUpRight size={16} />
            </a>
            <Link
              to="/organizacion"
              className="home-secondary-action"
              style={{ padding: '10px 20px', fontSize: '0.9rem' }}
            >
              <Workflow size={16} /> Ver Organigrama General
            </Link>
          </div>
        </div>

        {/* Selector de Puestos (Tabs Horizontales) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
          marginBottom: '2.5rem'
        }}>
          {positions.map((p) => {
            const isSelected = p.id === selectedId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedId(p.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '16px 18px',
                  borderRadius: '16px',
                  border: isSelected ? '2px solid var(--color-slate)' : '1px solid rgba(34, 47, 48, 0.12)',
                  background: isSelected ? 'var(--color-charcoal)' : '#ffffff',
                  color: isSelected ? '#ffffff' : 'var(--color-charcoal)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? '0 10px 24px rgba(34,47,48,0.2)' : 'none',
                  transform: isSelected ? 'translateY(-2px)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: isSelected ? 'var(--color-lime)' : 'var(--color-slate)',
                    letterSpacing: '0.05em'
                  }}>
                    POSICIÓN {p.id}
                  </span>
                  {isSelected && (
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--color-lime)'
                    }} />
                  )}
                </div>
                <strong style={{ fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.3 }}>
                  {p.roleName}
                </strong>
                <span style={{
                  fontSize: '0.78rem',
                  color: isSelected ? '#c9d2c7' : 'var(--color-slate)'
                }}>
                  {p.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Ficha Detallada del Puesto Seleccionado */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          border: '1px solid rgba(34, 47, 48, 0.12)',
          padding: '2.5rem',
          boxShadow: '0 14px 40px rgba(34,47,48,0.06)',
          marginBottom: '3rem'
        }}>
          {/* Encabezado de la Ficha */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1.5rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid rgba(34, 47, 48, 0.08)',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                <span className="home-closing-pill is-lime">
                  POSICIÓN OFICIAL 0{activePosition.id}
                </span>
                <span className="home-closing-pill">
                  {activePosition.department}
                </span>
                <span className="home-closing-pill">
                  {activePosition.jornada}
                </span>
              </div>
              <h3 style={{ fontSize: '2.2rem', fontWeight: 400, color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                {activePosition.roleName}
              </h3>
              <p style={{ color: 'var(--color-slate)', fontSize: '1.05rem', margin: 0 }}>
                Titular actual: <strong>{activePosition.titulares}</strong>
              </p>
            </div>

            <a
              href={activePosition.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="home-secondary-action"
              style={{
                color: 'var(--color-charcoal)',
                borderColor: 'rgba(34, 47, 48, 0.2)',
                background: '#edf0e7'
              }}
            >
              <FileText size={18} /> Ver Página en PDF (Pág. {activePosition.pdfPage}) <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Grid de Secciones de la Ficha Técnica */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* 1. Misión y Finalidad */}
            <div style={{
              padding: '1.5rem',
              borderRadius: '18px',
              background: '#f8faf6',
              border: '1px solid rgba(34, 47, 48, 0.06)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--color-charcoal)' }}>
                <Briefcase size={20} color="var(--color-slate)" />
                <h4 style={{ margin: 0, fontSize: '1.15rem' }}>1. Finalidad y Misión del Cargo</h4>
              </div>
              <p style={{ color: 'var(--color-slate)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                {activePosition.mision}
              </p>
            </div>

            {/* 2. Responsabilidad General */}
            <div style={{
              padding: '1.5rem',
              borderRadius: '18px',
              background: '#f8faf6',
              border: '1px solid rgba(34, 47, 48, 0.06)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--color-charcoal)' }}>
                <ShieldCheck size={20} color="var(--color-slate)" />
                <h4 style={{ margin: 0, fontSize: '1.15rem' }}>2. Ámbito de Responsabilidad</h4>
              </div>
              <p style={{ color: 'var(--color-slate)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                {activePosition.responsabilidades}
              </p>
            </div>
          </div>

          {/* 3. Relaciones Jerárquicas y Organigrama */}
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            borderRadius: '18px',
            background: 'linear-gradient(145deg, #f4f6f0 0%, #ffffff 100%)',
            border: '1px solid rgba(34, 47, 48, 0.08)'
          }}>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--color-charcoal)' }}>
              3. Relaciones Jerárquicas y Funcionales
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-slate)', textTransform: 'uppercase' }}>
                  Línea de Mando (Reporta a):
                </span>
                <p style={{ margin: '4px 0 0', fontWeight: 600, color: 'var(--color-charcoal)', fontSize: '0.95rem' }}>
                  {activePosition.organigramaRelaciones.reportaA}
                </p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-slate)', textTransform: 'uppercase' }}>
                  Personal a Cargo:
                </span>
                <p style={{ margin: '4px 0 0', fontWeight: 600, color: 'var(--color-charcoal)', fontSize: '0.95rem' }}>
                  {activePosition.organigramaRelaciones.supervisaA}
                </p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-slate)', textTransform: 'uppercase' }}>
                  Coordinación Funcional:
                </span>
                <p style={{ margin: '4px 0 0', fontWeight: 600, color: 'var(--color-charcoal)', fontSize: '0.95rem' }}>
                  {activePosition.organigramaRelaciones.coordinaCon}
                </p>
              </div>
            </div>
          </div>

          {/* 4. Funciones y Actividades Detalladas */}
          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-charcoal)' }}>
              4. Funciones, Actividades y Tareas Operativas
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '12px' }}>
              {activePosition.funcionesDetalladas.map((fn, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '14px 16px',
                    borderRadius: '14px',
                    background: '#f4f6f0',
                    border: '1px solid rgba(34, 47, 48, 0.06)'
                  }}
                >
                  <CheckCircle2 size={18} color="#257a41" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.92rem', color: 'var(--color-charcoal)', lineHeight: 1.5 }}>
                    {fn}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Requerimientos vs Competencias */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
            {/* Requerimientos */}
            <div style={{
              padding: '1.75rem',
              borderRadius: '20px',
              border: '1px solid rgba(34, 47, 48, 0.1)',
              background: '#ffffff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <Award size={20} color="var(--color-slate)" />
                <h4 style={{ margin: 0, fontSize: '1.15rem' }}>5. Requerimientos del Puesto</h4>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activePosition.requerimientos.map((req, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--color-slate)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--color-slate)', fontWeight: 'bold' }}>•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Competencias */}
            <div style={{
              padding: '1.75rem',
              borderRadius: '20px',
              border: '1px solid rgba(34, 47, 48, 0.1)',
              background: '#ffffff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <UserCheck size={20} color="var(--color-slate)" />
                <h4 style={{ margin: 0, fontSize: '1.15rem' }}>6. Competencias Profesionales</h4>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activePosition.competencias.map((comp, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--color-slate)', lineHeight: 1.5 }}>
                    <span style={{ color: '#257a41', fontWeight: 'bold' }}>✓</span>
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 6. Condiciones de Trabajo & Riesgos Potenciales */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            <div style={{ padding: '1.5rem', borderRadius: '16px', background: '#f8faf6', border: '1px solid rgba(34, 47, 48, 0.08)' }}>
              <strong style={{ display: 'block', fontSize: '0.95rem', marginBottom: '8px', color: 'var(--color-charcoal)' }}>
                Condiciones de Trabajo:
              </strong>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-slate)', lineHeight: 1.6 }}>
                {activePosition.condicionesTrabajo}
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              borderRadius: '16px',
              background: 'rgba(239, 68, 68, 0.04)',
              border: '1px solid rgba(239, 68, 68, 0.18)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#b91c1c' }}>
                <AlertTriangle size={18} />
                <strong style={{ fontSize: '0.95rem' }}>Riesgos Potenciales Asociados:</strong>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {activePosition.riesgosPotenciales.map((r, i) => (
                  <li key={i} style={{ fontSize: '0.88rem', color: '#7f1d1d', lineHeight: 1.5 }}>
                    • {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Galería de las 5 Posiciones (Vista General) */}
        <div className="section-badge" style={{ marginTop: '3rem' }}>
          <span className="badge-dot" />
          <span>CATÁLOGO GENERAL DE POSICIONES</span>
        </div>
        <h3 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '2rem' }}>
          Las Cinco Especialidades de Dinastía Arias
        </h3>

        <div className="cutout-grid">
          {positions.map((pos) => {
            const isSelected = selectedId === pos.id;
            return (
              <div
                className={`cutout-card-wrapper ${pos.themeClass} ${isSelected ? 'active-highlight' : ''}`}
                key={pos.id}
                onClick={() => setSelectedId(pos.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="cutout-card-inner">
                  <div className="cutout-card-content">
                    <div className="card-meta">
                      <span className="card-meta-badge">POSICIÓN {pos.id}</span>
                      <span className="meta-date">CALIDAD AITECH</span>
                    </div>
                    <h4 className="pos-title">{pos.title}</h4>
                    <p className="pos-mision"><strong>Misión:</strong> {pos.mision}</p>
                    <p className="pos-funciones"><strong>Funciones:</strong> {pos.funciones}</p>
                    <div className="cutout-action-row">
                      <span className="cutout-link-text">
                        {isSelected ? 'FICHA ABIERTA ARRIBA ↑' : 'VER FICHA DETALLADA →'}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={pos.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cutout-pocket-arrow-btn"
                  aria-label={`Abrir descripción de ${pos.title} en PDF`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                    <path fill="currentColor" d="M7.703 5.8H.398V4.6h7.305l-3.36-3.36.855-.84 4.8 4.8-4.8 4.8-.855-.84 3.36-3.36Z" />
                  </svg>
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </TopicPage>
  );
}
