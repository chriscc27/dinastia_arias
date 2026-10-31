import { useLayoutEffect, useRef, useState } from 'react';

// Colores de estado (fijos): el resultado de una revisión es un estado, no una serie.
export const RESULT_COLORS = {
  Conforme: '#0ca30c',
  'Con observaciones': '#fab219',
  'No conforme': '#d03b3b',
  'Sin revisión': '#bdbcb4',
};
export const RESULT_ICONS = { Conforme: '✓', 'Con observaciones': '!', 'No conforme': '✕', 'Sin revisión': '○' };

// Rampa secuencial azul (magnitud) — de casi nada a máximo
const BLUE_RAMP = ['#cde2fb', '#b7d3f6', '#9ec5f4', '#86b6ef', '#6da7ec', '#5598e7', '#3987e5', '#2a78d6', '#256abf', '#1c5cab', '#184f95', '#104281', '#0d366b'];

export const fmt = (n, dec = 0) => (n === null || n === undefined || Number.isNaN(n) ? '—' : Number(n).toLocaleString('es-BO', { minimumFractionDigits: dec, maximumFractionDigits: dec }));

function useWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(640);
  useLayoutEffect(() => {
    if (!ref.current) return undefined;
    setWidth(Math.max(280, ref.current.clientWidth));
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(280, e.contentRect.width)));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, width];
}

function useTip() {
  const [tip, setTip] = useState(null);
  const contRef = useRef(null);
  const show = (e, contenido) => {
    const caja = contRef.current.getBoundingClientRect();
    const x = (e.touches?.[0]?.clientX ?? e.clientX) - caja.left;
    const y = (e.touches?.[0]?.clientY ?? e.clientY) - caja.top;
    setTip({ x: Math.min(Math.max(x, 90), caja.width - 90), y, contenido });
  };
  return { tip, show, hide: () => setTip(null), contRef };
}

function Tip({ tip }) {
  if (!tip) return null;
  return (
    <div className="viz-tip" style={{ left: tip.x, top: tip.y }} role="status">
      {tip.contenido}
    </div>
  );
}

export function ChartCard({ title, subtitle, children, table, wide = false }) {
  const [verTabla, setVerTabla] = useState(false);
  return (
    <figure className={`viz-card ${wide ? 'wide' : ''}`}>
      <figcaption className="viz-card-head">
        <div>
          <h4>{title}</h4>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {table && (
          <button type="button" className="viz-table-toggle" onClick={() => setVerTabla(!verTabla)} aria-pressed={verTabla}>
            {verTabla ? 'Ver gráfico' : 'Ver tabla'}
          </button>
        )}
      </figcaption>
      {verTabla && table ? (
        <div className="viz-table-wrap">
          <table className="viz-table">
            <thead><tr>{table.columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
            <tbody>{table.rows.map((r, i) => <tr key={i}>{r.map((v, j) => <td key={j}>{v}</td>)}</tr>)}</tbody>
          </table>
        </div>
      ) : children}
    </figure>
  );
}

export function StatTile({ label, value, sub, status }) {
  return (
    <div className="viz-stat">
      <span className="viz-stat-label">{label}</span>
      <span className="viz-stat-value">{value}</span>
      {sub && (
        <span className="viz-stat-sub">
          {status && <span className={`viz-status-dot ${status}`} aria-hidden="true" />}
          {sub}
        </span>
      )}
    </div>
  );
}

export function Legend({ items }) {
  return (
    <ul className="viz-legend">
      {items.map((i) => (
        <li key={i.label}>
          <span className="viz-swatch" style={{ background: i.color }} aria-hidden="true">{i.icon}</span>
          {i.label}
          {i.value !== undefined && <strong>{i.value}</strong>}
        </li>
      ))}
    </ul>
  );
}

// Una sola barra dividida en partes (el todo = 100 %)
export function SegmentedBar({ parts }) {
  const total = parts.reduce((s, p) => s + p.value, 0);
  const { tip, show, hide, contRef } = useTip();
  return (
    <div className="viz-rel" ref={contRef}>
      <div className="viz-seg" onMouseLeave={hide}>
        {parts.map((p) => (
          <div
            key={p.label}
            className="viz-seg-part"
            style={{ flexGrow: p.value, background: p.color }}
            onMouseMove={(e) => show(e, <><strong>{p.label}</strong><span>{fmt(p.value)} herramientas · {fmt((p.value / total) * 100, 1)} %</span></>)}
          />
        ))}
      </div>
      <Legend items={parts.map((p) => ({ label: p.label, color: p.color, icon: RESULT_ICONS[p.label], value: `${fmt((p.value / total) * 100, 1)} %` }))} />
      <Tip tip={tip} />
    </div>
  );
}

// Barras horizontales ordenadas con línea de referencia opcional
export function HBarChart({ rows, format = (v) => fmt(v, 1), reference, max, highlight, legend }) {
  const tope = max || Math.max(...rows.map((r) => r.value), reference?.value || 0) * 1.08;
  const { tip, show, hide, contRef } = useTip();
  return (
    <div className="viz-rel" ref={contRef} onMouseLeave={hide}>
      <div className="viz-hbars">
        {rows.map((r) => {
          const alto = highlight?.(r);
          return (
            <div
              key={r.label}
              className="viz-hbar-row"
              onMouseMove={(e) => show(e, <><strong>{r.label}</strong><span>{format(r.value)}</span>{r.detail && <span>{r.detail}</span>}</>)}
            >
              <span className="viz-hbar-label">{r.label}</span>
              <div className="viz-hbar-track">
                <div className={`viz-hbar ${alto ? 'is-high' : ''}`} style={{ width: `${(r.value / tope) * 100}%` }} />
                {reference && <div className="viz-ref-line" style={{ left: `${(reference.value / tope) * 100}%` }} />}
              </div>
              <span className="viz-hbar-value">{format(r.value)}</span>
            </div>
          );
        })}
      </div>
      {(reference || legend) && (
        <div className="viz-hbar-foot">
          {legend && <Legend items={legend} />}
          {reference && <span className="viz-ref-key"><span aria-hidden="true" />{reference.label}: {format(reference.value)}</span>}
        </div>
      )}
      <Tip tip={tip} />
    </div>
  );
}

// Columnas apiladas en el tiempo
export function StackedColumns({ data, keys, xKey }) {
  const [ref, width] = useWidth();
  const { tip, show, hide, contRef } = useTip();
  const alto = 240;
  const m = { t: 12, r: 8, b: 30, l: 34 };
  const totales = data.map((d) => keys.reduce((s, k) => s + d[k.key], 0));
  const maxY = Math.ceil(Math.max(...totales) / 20) * 20;
  const ancho = width - m.l - m.r;
  const banda = ancho / data.length;
  const col = Math.min(24, banda * 0.62);
  const y = (v) => m.t + (alto - m.t - m.b) * (1 - v / maxY);
  const ticks = [0, maxY / 2, maxY];
  const cadaN = Math.ceil(data.length / Math.max(1, Math.floor(ancho / 56)));

  return (
    <div className="viz-rel" ref={(n) => { ref.current = n; contRef.current = n; }} onMouseLeave={hide}>
      <svg width={width} height={alto} role="img" aria-label="Revisiones por trimestre según resultado">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={m.l} x2={width - m.r} y1={y(t)} y2={y(t)} className="viz-grid" />
            <text x={m.l - 6} y={y(t) + 4} textAnchor="end" className="viz-axis-text">{t}</text>
          </g>
        ))}
        {data.map((d, i) => {
          const cx = m.l + banda * i + banda / 2;
          let acumulado = 0;
          const visibles = keys.filter((k) => d[k.key] > 0);
          return (
            <g key={d[xKey]}
              onMouseMove={(e) => show(e, <><strong>{d[xKey]}</strong>{keys.map((k) => <span key={k.key}>{RESULT_ICONS[k.key]} {k.key}: {d[k.key]}</span>)}<span>Total: {totales[i]}</span></>)}>
              <rect x={m.l + banda * i} y={m.t} width={banda} height={alto - m.t - m.b} fill="transparent" />
              {visibles.map((k, j) => {
                const y0 = y(acumulado);
                acumulado += d[k.key];
                const y1 = y(acumulado);
                const esTope = j === visibles.length - 1;
                const h = Math.max(0, y0 - y1 - (esTope ? 0 : 2));
                return esTope ? (
                  <path key={k.key} fill={k.color} d={`M${cx - col / 2},${y0} V${y1 + 4} Q${cx - col / 2},${y1} ${cx - col / 2 + 4},${y1} H${cx + col / 2 - 4} Q${cx + col / 2},${y1} ${cx + col / 2},${y1 + 4} V${y0} Z`} />
                ) : (
                  <rect key={k.key} x={cx - col / 2} y={y1 + 2} width={col} height={h} fill={k.color} />
                );
              })}
              {i % cadaN === 0 && <text x={cx} y={alto - 10} textAnchor="middle" className="viz-axis-text">{d[xKey]}</text>}
            </g>
          );
        })}
        <line x1={m.l} x2={width - m.r} y1={y(0)} y2={y(0)} className="viz-baseline" />
      </svg>
      <Legend items={keys.map((k) => ({ label: k.key, color: k.color, icon: RESULT_ICONS[k.key] }))} />
      <Tip tip={tip} />
    </div>
  );
}

function rampa(pct) {
  const i = Math.min(BLUE_RAMP.length - 1, Math.max(0, Math.round((pct / 100) * (BLUE_RAMP.length - 1))));
  return { bg: BLUE_RAMP[i], fg: i >= 6 ? '#ffffff' : '#0b0b0b' };
}

// Mapa de calor: filas × columnas, intensidad = porcentaje
export function Heatmap({ rows, cols, cell, rowLabel, legendLabel }) {
  const { tip, show, hide, contRef } = useTip();
  return (
    <div className="viz-rel" ref={contRef} onMouseLeave={hide}>
      <div className="viz-heat" style={{ gridTemplateColumns: `minmax(64px, auto) repeat(${cols.length}, minmax(0, 1fr))` }}>
        <span className="viz-heat-corner">{rowLabel}</span>
        {cols.map((c) => <span key={c} className="viz-heat-col">{c}</span>)}
        {rows.map((r) => (
          <div key={r} className="viz-heat-rowwrap" style={{ display: 'contents' }}>
            <span className="viz-heat-row">{r}</span>
            {cols.map((c) => {
              const v = cell(r, c);
              const color = rampa(v.pct);
              return (
                <div key={c} className="viz-heat-cell" style={{ background: color.bg, color: color.fg }}
                  onMouseMove={(e) => show(e, <><strong>{r} · {c}</strong><span>{v.sin_vigente} de {v.total} sin revisión vigente</span><span>{fmt(v.pct, 1)} %</span></>)}>
                  {v.total ? `${fmt(v.pct, 0)} %` : '—'}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="viz-heat-scale">
        <span>0 %</span>
        <div style={{ background: `linear-gradient(90deg, ${BLUE_RAMP.join(',')})` }} />
        <span>100 %</span>
        <em>{legendLabel}</em>
      </div>
      <Tip tip={tip} />
    </div>
  );
}

// Línea con área para series temporales cortas (CPU del servidor)
export function LineArea({ points, unit = '%', color = '#2a78d6' }) {
  const [ref, width] = useWidth();
  const { tip, show, hide, contRef } = useTip();
  const [hover, setHover] = useState(null);
  const alto = 150;
  const m = { t: 10, r: 10, b: 22, l: 34 };
  if (!points || points.length < 2) return <p className="viz-empty">Zabbix todavía está acumulando historial de este ítem.</p>;
  const t0 = points[0].t;
  const t1 = points[points.length - 1].t;
  const maxV = Math.max(10, Math.ceil(Math.max(...points.map((p) => p.v)) / 10) * 10);
  const x = (t) => m.l + ((t - t0) / Math.max(1, t1 - t0)) * (width - m.l - m.r);
  const y = (v) => m.t + (alto - m.t - m.b) * (1 - v / maxV);
  const linea = points.map((p, i) => `${i ? 'L' : 'M'}${x(p.t)},${y(p.v)}`).join(' ');
  const hora = (t) => new Date(t).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' });

  const mover = (e) => {
    const caja = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - caja.left;
    const cercano = points.reduce((a, p) => (Math.abs(x(p.t) - px) < Math.abs(x(a.t) - px) ? p : a), points[0]);
    setHover(cercano);
    show(e, <><strong>{hora(cercano.t)}</strong><span>{fmt(cercano.v, 1)} {unit}</span></>);
  };

  return (
    <div className="viz-rel" ref={(n) => { ref.current = n; contRef.current = n; }}>
      <svg width={width} height={alto} onMouseMove={mover} onMouseLeave={() => { setHover(null); hide(); }} role="img" aria-label="Uso de CPU del servidor QA Hub">
        {[0, maxV / 2, maxV].map((t) => (
          <g key={t}>
            <line x1={m.l} x2={width - m.r} y1={y(t)} y2={y(t)} className="viz-grid" />
            <text x={m.l - 6} y={y(t) + 4} textAnchor="end" className="viz-axis-text">{t}</text>
          </g>
        ))}
        <path d={`${linea} L${x(t1)},${y(0)} L${x(t0)},${y(0)} Z`} fill={color} opacity="0.1" />
        <path d={linea} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {hover && <line x1={x(hover.t)} x2={x(hover.t)} y1={m.t} y2={alto - m.b} className="viz-crosshair" />}
        {hover && <circle cx={x(hover.t)} cy={y(hover.v)} r="4.5" fill={color} stroke="#fcfcfb" strokeWidth="2" />}
        <circle cx={x(t1)} cy={y(points[points.length - 1].v)} r="4" fill={color} stroke="#fcfcfb" strokeWidth="2" />
        <text x={m.l} y={alto - 6} className="viz-axis-text">{hora(t0)}</text>
        <text x={width - m.r} y={alto - 6} textAnchor="end" className="viz-axis-text">{hora(t1)}</text>
      </svg>
      <Tip tip={tip} />
    </div>
  );
}
