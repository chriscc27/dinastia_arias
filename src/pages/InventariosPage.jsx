import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, Download, ExternalLink, Search, Filter, AlertTriangle, 
  CheckCircle2, Clock, ShieldAlert, ArrowUpRight, BarChart3, ChevronLeft, ChevronRight 
} from 'lucide-react';
import TopicPage from '../components/TopicPage';
import toolsData from '../data/generated/inventarioTools.json';
import snapshot from '../data/generated/datasetKpis.json';

const ITEMS_PER_PAGE_OPTIONS = [15, 25, 50];

export default function InventariosPage() {
  const { kpis, meta } = snapshot;

  const [searchTerm, setSearchTerm] = useState('');
  const [criticalityFilter, setCriticalityFilter] = useState('Todas');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [resultFilter, setResultFilter] = useState('Todos');
  const [vigenciaFilter, setVigenciaFilter] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const filteredTools = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return toolsData.filter((tool) => {
      const matchesSearch = !q || 
        tool.nombre.toLowerCase().includes(q) ||
        tool.responsable.toLowerCase().includes(q) ||
        tool.categoria.toLowerCase().includes(q) ||
        String(tool.id).includes(q);

      const matchesCriticality = criticalityFilter === 'Todas' || tool.criticidad === criticalityFilter;
      const matchesStatus = statusFilter === 'Todos' || tool.estado === statusFilter;
      const matchesResult = resultFilter === 'Todos' || tool.resultado === resultFilter;
      const matchesVigencia = vigenciaFilter === 'Todos' || tool.vigente === vigenciaFilter;

      return matchesSearch && matchesCriticality && matchesStatus && matchesResult && matchesVigencia;
    });
  }, [searchTerm, criticalityFilter, statusFilter, resultFilter, vigenciaFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredTools.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedTools = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;
    return filteredTools.slice(start, start + itemsPerPage);
  }, [filteredTools, safePage, itemsPerPage]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setCriticalityFilter('Todas');
    setStatusFilter('Todos');
    setResultFilter('Todos');
    setVigenciaFilter('Todos');
    setCurrentPage(1);
  };

  return (
    <TopicPage topicId="inventarios" related={['tableau', 'weka', 'monitoreo', 'presupuesto', 'soporte-externo']}>
      <section className="light-section" style={{ paddingBottom: '3rem' }}>
        <div className="section-badge">
          <span className="badge-dot" />
          <span>INVENTARIO GENERAL DE ACTIVOS TECNOLÓGICOS</span>
        </div>

        <div className="summary-section-heading">
          <h2 className="section-heading-xl">
            Inventario de Herramientas de QA:{' '}
            <span className="text-muted-accent">1.200 activos, auditoría de vigencia y calidad del dato.</span>
          </h2>
          <p className="section-desc-lead">
            El inventario maestro centraliza todas las herramientas de pruebas, análisis de código, gestión de bugs y rendimiento de AITECH. 
            Es la fuente de verdad única que alimenta los tableros de Tableau, los modelos de minería en Weka, las alertas en Zabbix y el presupuesto anual del área.
          </p>
        </div>

        {/* Resumen Ejecutivo de KPIs del Inventario */}
        <div className="home-kpi-grid" style={{ marginBottom: '2.5rem' }}>
          <div>
            <strong>{meta.registros.toLocaleString('es-BO')}</strong>
            <span>Herramientas totales en inventario</span>
          </div>
          <div style={{ background: '#fcf1f1', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
            <strong style={{ color: '#b91c1c' }}>{kpis.sin_revision_vigente_pct.toLocaleString('es-BO')} %</strong>
            <span style={{ color: '#7f1d1d' }}>Sin revisión vigente en 12 meses ({kpis.sin_revision_vigente} ítems)</span>
          </div>
          <div style={{ background: '#fcf1f1', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
            <strong style={{ color: '#b91c1c' }}>{kpis.criticas_no_conformes_en_uso}</strong>
            <span style={{ color: '#7f1d1d' }}>Herramientas críticas en uso No conformes</span>
          </div>
        </div>

        {/* Barra de Descargas y Acceso al Sistema de Inventario Oficial */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          padding: '1.75rem 2rem',
          borderRadius: '22px',
          background: 'linear-gradient(135deg, rgba(34, 47, 48, 0.96) 0%, rgba(34, 47, 48, 0.84) 100%)',
          color: '#ffffff',
          border: '1px solid rgba(206, 247, 158, 0.25)',
          boxShadow: '0 12px 36px rgba(0,0,0,0.12)',
          marginBottom: '3rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Database size={20} color="var(--color-lime)" />
              <strong style={{ fontSize: '1.15rem' }}>Acceso al Sistema Oficial y Descarga del Dataset</strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#c9d2c7' }}>
              Corte oficial al 30 de abril de 2026. Disponible en formatos Excel (.xlsx), CSV delimitado y ARFF para análisis computacional.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <a
              href="https://iatech-co-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="home-primary-action"
              style={{ padding: '10px 18px', fontSize: '0.88rem' }}
            >
              <ExternalLink size={16} /> Sistema en vivo <ArrowUpRight size={15} />
            </a>
            <a
              href={`${import.meta.env.BASE_URL}docs/Dataset_Gestion_Calidad.xlsx`}
              download="Dataset_Gestion_Calidad.xlsx"
              className="home-secondary-action"
              style={{ padding: '10px 18px', fontSize: '0.88rem' }}
            >
              <Download size={16} /> Excel (.xlsx)
            </a>
            <a
              href={`${import.meta.env.BASE_URL}data/dataset_calidad.csv`}
              download="dataset_calidad.csv"
              className="home-secondary-action"
              style={{ padding: '10px 18px', fontSize: '0.88rem' }}
            >
              <Download size={16} /> CSV (.csv)
            </a>
            <a
              href={`${import.meta.env.BASE_URL}data/dataset_calidad.arff`}
              download="dataset_calidad.arff"
              className="home-secondary-action"
              style={{ padding: '10px 18px', fontSize: '0.88rem' }}
            >
              <Download size={16} /> Weka (.arff)
            </a>
          </div>
        </div>

        {/* Panel de Filtros y Búsqueda Interactiva */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid rgba(34, 47, 48, 0.1)',
          padding: '24px',
          marginBottom: '2rem',
          boxShadow: '0 6px 22px rgba(34,47,48,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} color="var(--color-slate)" />
              <strong style={{ fontSize: '1rem', color: 'var(--color-charcoal)' }}>Filtros de Auditoría del Inventario</strong>
            </div>
            {(searchTerm || criticalityFilter !== 'Todas' || statusFilter !== 'Todos' || resultFilter !== 'Todos' || vigenciaFilter !== 'Todos') && (
              <button
                type="button"
                onClick={handleResetFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#b91c1c',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Limpiar filtros
              </button>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            alignItems: 'end'
          }}>
            {/* Buscador de texto */}
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-slate)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Buscar por Nombre, Responsable o ID
              </label>
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-slate)' }} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  placeholder="Ej. SonarQube, JMeter, Sofía Cardozo..."
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    borderRadius: '12px',
                    border: '1px solid rgba(34, 47, 48, 0.18)',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Filtro Criticidad */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-slate)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Criticidad
              </label>
              <select
                value={criticalityFilter}
                onChange={(e) => { setCriticalityFilter(e.target.value); setCurrentPage(1); }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(34, 47, 48, 0.18)',
                  fontSize: '0.92rem',
                  background: '#ffffff',
                  outline: 'none'
                }}
              >
                <option value="Todas">Todas</option>
                <option value="Crítica">Crítica</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>

            {/* Filtro Estado */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-slate)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Estado de Gestión
              </label>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(34, 47, 48, 0.18)',
                  fontSize: '0.92rem',
                  background: '#ffffff',
                  outline: 'none'
                }}
              >
                <option value="Todos">Todos</option>
                <option value="En uso">En uso</option>
                <option value="En revisión">En revisión</option>
                <option value="Suspendido">Suspendido</option>
              </select>
            </div>

            {/* Filtro Resultado */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-slate)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Resultado Revisión
              </label>
              <select
                value={resultFilter}
                onChange={(e) => { setResultFilter(e.target.value); setCurrentPage(1); }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(34, 47, 48, 0.18)',
                  fontSize: '0.92rem',
                  background: '#ffffff',
                  outline: 'none'
                }}
              >
                <option value="Todos">Todos</option>
                <option value="Conforme">Conforme</option>
                <option value="Con observaciones">Con observaciones</option>
                <option value="No conforme">No conforme</option>
                <option value="Sin revisión">Sin revisión</option>
              </select>
            </div>

            {/* Filtro Vigencia */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-slate)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Revisión Vigente (≤ 12 m)
              </label>
              <select
                value={vigenciaFilter}
                onChange={(e) => { setVigenciaFilter(e.target.value); setCurrentPage(1); }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(34, 47, 48, 0.18)',
                  fontSize: '0.92rem',
                  background: '#ffffff',
                  outline: 'none'
                }}
              >
                <option value="Todos">Todos</option>
                <option value="Sí">Vigente (Sí)</option>
                <option value="No">No vigente (No)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla de Herramientas */}
        <div style={{
          background: '#ffffff',
          borderRadius: '22px',
          border: '1px solid rgba(34, 47, 48, 0.12)',
          overflow: 'hidden',
          boxShadow: '0 8px 30px rgba(34,47,48,0.05)',
          marginBottom: '2rem'
        }}>
          {/* Header de la Tabla con Contador y Paginación */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '18px 24px',
            borderBottom: '1px solid rgba(34, 47, 48, 0.08)',
            background: '#fafbf9'
          }}>
            <div>
              <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                Mostrando {filteredTools.length > 0 ? (safePage - 1) * itemsPerPage + 1 : 0}–{Math.min(safePage * itemsPerPage, filteredTools.length)} de {filteredTools.length.toLocaleString('es-BO')} herramientas
              </span>
              {filteredTools.length !== toolsData.length && (
                <span style={{ fontSize: '0.82rem', color: 'var(--color-slate)', marginLeft: '8px' }}>
                  (filtradas de {toolsData.length.toLocaleString('es-BO')} en total)
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-slate)' }}>
                <span>Por página:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '8px',
                    border: '1px solid rgba(34,47,48,0.18)',
                    fontSize: '0.85rem'
                  }}
                >
                  {ITEMS_PER_PAGE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  disabled={safePage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: '1px solid rgba(34,47,48,0.15)',
                    background: safePage <= 1 ? '#edf0e7' : '#ffffff',
                    cursor: safePage <= 1 ? 'not-allowed' : 'pointer'
                  }}
                  aria-label="Página anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', minWidth: '60px', textAlign: 'center' }}>
                  {safePage} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={safePage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: '1px solid rgba(34,47,48,0.15)',
                    background: safePage >= totalPages ? '#edf0e7' : '#ffffff',
                    cursor: safePage >= totalPages ? 'not-allowed' : 'pointer'
                  }}
                  aria-label="Página siguiente"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Tabla Desplazable */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f4f6f0', borderBottom: '1px solid rgba(34, 47, 48, 0.1)', color: 'var(--color-charcoal)' }}>
                  <th style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>ID</th>
                  <th style={{ padding: '12px 16px', minWidth: '220px' }}>Herramienta de QA</th>
                  <th style={{ padding: '12px 16px', minWidth: '160px' }}>Categoría</th>
                  <th style={{ padding: '12px 16px', minWidth: '160px' }}>Responsable</th>
                  <th style={{ padding: '12px 16px' }}>Criticidad</th>
                  <th style={{ padding: '12px 16px' }}>Estado</th>
                  <th style={{ padding: '12px 16px' }}>Última Revisión</th>
                  <th style={{ padding: '12px 16px' }}>Resultado</th>
                  <th style={{ padding: '12px 16px' }}>Vigente</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTools.map((tool) => {
                  const isCriticaNoConforme = tool.criticidad === 'Crítica' && tool.resultado === 'No conforme' && tool.estado === 'En uso';
                  return (
                    <tr 
                      key={tool.id} 
                      style={{ 
                        borderBottom: '1px solid rgba(34, 47, 48, 0.06)',
                        background: isCriticaNoConforme ? '#fff7f7' : 'transparent'
                      }}
                    >
                      <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', color: 'var(--color-slate)' }}>
                        #{tool.id}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                        {tool.nombre}
                        {isCriticaNoConforme && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', marginLeft: '6px', color: '#b91c1c', fontSize: '0.72rem', verticalAlign: 'middle' }}>
                            <AlertTriangle size={13} /> Riesgo Crítico
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--color-slate)' }}>
                        {tool.categoria}
                        {tool.categoria_consistente === 'No' && (
                          <span style={{ display: 'block', fontSize: '0.72rem', color: '#92400e' }}>
                            Taxonomía: {tool.categoria_esperada}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--color-charcoal)' }}>
                        {tool.responsable}
                        <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-slate)' }}>
                          {tool.rol}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          background: tool.criticidad === 'Crítica' ? '#fee2e2' : tool.criticidad === 'Alta' ? '#ffedd5' : tool.criticidad === 'Media' ? '#fef3c7' : '#ecfdf5',
                          color: tool.criticidad === 'Crítica' ? '#b91c1c' : tool.criticidad === 'Alta' ? '#c2410c' : tool.criticidad === 'Media' ? '#b45309' : '#047857'
                        }}>
                          {tool.criticidad}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--color-slate)', fontSize: '0.85rem' }}>
                        {tool.estado}
                      </td>
                      <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-slate)' }}>
                        {tool.fecha_revision || '—'}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          background: tool.resultado === 'Conforme' ? '#e2ecd9' : tool.resultado === 'Con observaciones' ? '#fef3c7' : tool.resultado === 'No conforme' ? '#fee2e2' : '#f3f4f6',
                          color: tool.resultado === 'Conforme' ? '#257a41' : tool.resultado === 'Con observaciones' ? '#b45309' : tool.resultado === 'No conforme' ? '#b91c1c' : '#4b5563'
                        }}>
                          {tool.resultado}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          background: tool.vigente === 'Sí' ? '#e2ecd9' : '#fee2e2',
                          color: tool.vigente === 'Sí' ? '#257a41' : '#b91c1c'
                        }}>
                          {tool.vigente}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {paginatedTools.length === 0 && (
                  <tr>
                    <td colSpan={9} style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-slate)' }}>
                      No se encontraron herramientas con los filtros seleccionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer de Paginación */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            borderTop: '1px solid rgba(34, 47, 48, 0.08)',
            background: '#fafbf9'
          }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-slate)' }}>
              Página {safePage} de {totalPages}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="home-secondary-action"
                style={{ padding: '6px 14px', fontSize: '0.82rem' }}
              >
                ← Anterior
              </button>
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="home-secondary-action"
                style={{ padding: '6px 14px', fontSize: '0.82rem' }}
              >
                Siguiente →
              </button>
            </div>
          </div>
        </div>

        {/* Ecosistema Analítico que Conecta el Inventario */}
        <div className="section-badge" style={{ marginTop: '3.5rem' }}>
          <span className="badge-dot" />
          <span>ECOSISTEMA ANALÍTICO INTEGRADO</span>
        </div>
        <h3 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '1.5rem' }}>
          Módulos Analíticos Alimentados por el Inventario
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          <Link to="/tableau" className="tl-home-card" style={{ padding: '22px' }}>
            <span className="tl-home-tag">VISUALIZACIÓN</span>
            <h4 style={{ fontSize: '1.2rem', margin: '8px 0' }}>Datos Tableau</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-slate)' }}>
              Cinco tableros ejecutivos con KPIs de conformidad, vigencia y riesgo operativo.
            </p>
            <span className="tl-home-go">Explorar Tableau →</span>
          </Link>

          <Link to="/weka" className="tl-home-card" style={{ padding: '22px' }}>
            <span className="tl-home-tag">MINERÍA DE DATOS</span>
            <h4 style={{ fontSize: '1.2rem', margin: '8px 0' }}>Patrones Weka</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-slate)' }}>
              Algoritmos J48, K-Means y reglas de asociación para diagnosticar causas de fallos.
            </p>
            <span className="tl-home-go">Ejecutar Weka →</span>
          </Link>

          <Link to="/monitoreo" className="tl-home-card" style={{ padding: '22px' }}>
            <span className="tl-home-tag">OBSERVABILIDAD</span>
            <h4 style={{ fontSize: '1.2rem', margin: '8px 0' }}>Monitoreo Zabbix</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-slate)' }}>
              Triggers automáticos según criticidad y problemas activos en tiempo real.
            </p>
            <span className="tl-home-go">Ver Triggers →</span>
          </Link>

          <Link to="/presupuesto" className="tl-home-card" style={{ padding: '22px' }}>
            <span className="tl-home-tag">FINANZAS</span>
            <h4 style={{ fontSize: '1.2rem', margin: '8px 0' }}>Presupuesto</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-slate)' }}>
              Estructura presupuestaria, licencias de software y costo de la no calidad.
            </p>
            <span className="tl-home-go">Consultar Presupuesto →</span>
          </Link>

          <Link to="/soporte-externo" className="tl-home-card" style={{ padding: '22px' }}>
            <span className="tl-home-tag">PROVEEDORES</span>
            <h4 style={{ fontSize: '1.2rem', margin: '8px 0' }}>Soporte Externo</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-slate)' }}>
              Matriz de escalamiento y acuerdos de nivel de servicio (SLA) según criticidad.
            </p>
            <span className="tl-home-go">Ver Proveedores →</span>
          </Link>
        </div>
      </section>
    </TopicPage>
  );
}
