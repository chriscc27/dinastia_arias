import { useState } from 'react';

const RUTA = `${import.meta.env.BASE_URL}assets/tableau/`;

// Captura de un dashboard hecho en Tableau; si la imagen todavía no se exportó, indica cuál falta.
function Captura({ imagen, titulo }) {
  const [falta, setFalta] = useState(false);
  if (falta) {
    return (
      <div className="tl-shot-missing">
        <strong>Captura pendiente</strong>
        <span>Exportar desde Tableau (Dashboard → Exportar imagen) y guardar como</span>
        <code>public/assets/tableau/{imagen}</code>
      </div>
    );
  }
  return (
    <a href={RUTA + imagen} target="_blank" rel="noopener noreferrer" className="tl-shot-link">
      <img src={RUTA + imagen} alt={`Dashboard de Tableau: ${titulo}`} loading="lazy" onError={() => setFalta(true)} />
    </a>
  );
}

export default function TableauGallery({ dashboards }) {
  return (
    <div className="tl-gallery">
      {dashboards.map((d, i) => (
        <article key={d.imagen} className="tl-shot">
          <Captura imagen={d.imagen} titulo={d.titulo} />
          <div className="tl-shot-body">
            <span className="tl-shot-num">Dashboard {i + 1}</span>
            <h3>{d.titulo}</h3>
            <p className="tl-shot-q">{d.pregunta}</p>
            <dl>
              <div><dt>Cómo se construyó</dt><dd>{d.construccion}</dd></div>
              <div><dt>Qué muestra</dt><dd>{d.lectura}</dd></div>
              <div><dt>Decisión para el área</dt><dd>{d.decision}</dd></div>
            </dl>
          </div>
        </article>
      ))}
    </div>
  );
}
