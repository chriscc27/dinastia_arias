import ToolPageLayout, { ToolSection } from '../components/tools/ToolPageLayout';
import QualityDashboard from '../components/tools/QualityDashboard';
import TableauGallery from '../components/tools/TableauGallery';
import { fmt } from '../components/charts/Charts';
import { useHubResource } from '../lib/qaHub';
import { tableauData } from '../data/tools/tableauData';
import { relatedVideosData } from '../data/relatedVideosData';
import kpisSnapshot from '../data/generated/datasetKpis.json';

const BASE = import.meta.env.BASE_URL;

export default function TableauPage() {
  const recurso = useHubResource('/api/dataset/kpis', kpisSnapshot);
  const d = recurso.data;
  const { kpis } = d;
  const peor = d.por_herramienta[0];
  const mejor = d.por_herramienta[d.por_herramienta.length - 1];

  const hallazgos = [
    { cifra: `${fmt(kpis.sin_revision_vigente_pct, 1)} %`, titulo: 'del inventario sin revisión vigente', texto: `${fmt(kpis.sin_revision_vigente)} de ${fmt(kpis.total_herramientas)} herramientas no tienen una revisión en los últimos 12 meses o nunca la tuvieron. Es el hallazgo más grave frente a ISO 13485 §7.4.` },
    { cifra: fmt(kpis.criticas_no_conformes_en_uso), titulo: 'herramientas Críticas en uso y No conformes', texto: 'Siguen validando software médico pese a haber fallado su revisión. Van a la tabla de acción inmediata y disparan el trigger de severidad Desastre en Zabbix.' },
    { cifra: `${fmt(kpis.tasa_conformidad, 1)} %`, titulo: 'de conformidad, bajo la meta del 75 %', texto: `${fmt(kpis.tasa_no_conformidad, 1)} % de las revisiones termina No conforme. ${peor.nombre} supera el doble del promedio (${fmt(peor.tasa_no_conformidad, 1)} %), mientras ${mejor.nombre} casi no registra hallazgos (${fmt(mejor.tasa_no_conformidad, 1)} %).` },
    { cifra: `${fmt(kpis.categoria_inconsistente_pct, 1)} %`, titulo: 'de registros con categoría equivocada', texto: 'Una misma herramienta aparece en las cuatro categorías (k6, por ejemplo, figura como «Análisis de Código»). Sin un catálogo maestro, cualquier filtro por categoría da resultados engañosos.' },
    { cifra: d.por_trimestre.at(-2).trimestre, titulo: 'último trimestre completo: el ritmo de revisión cae', texto: 'Las revisiones por trimestre bajan desde 2025-T4. Sin un calendario obligatorio, el atraso seguirá creciendo.' },
  ];

  return (
    <ToolPageLayout data={tableauData} videos={relatedVideosData.tableau}>
      <ToolSection
        badge="EL DATASET DEL ÁREA DE CALIDAD"
        title="Inventario de herramientas de QA"
        lead={`Dataset_Gestion_Calidad.xlsx: ${fmt(d.meta.registros)} instancias de 15 herramientas (SonarQube, Tosca, JMeter, Selenium, Jira…) con su responsable, criticidad, estado de gestión y resultado de la última revisión. Nuestro ETL agrega campos derivados (vigencia de la revisión, riesgo operativo, categoría esperada) y lo exporta a CSV para Tableau y a ARFF para Weka.`}
      >
        <div className="tl-downloads">
          <a className="tl-btn" href={`${BASE}data/dataset_calidad.csv`} download>Descargar CSV para Tableau</a>
          <a className="tl-btn ghost" href={`${BASE}data/dataset_calidad.arff`} download>Descargar ARFF para Weka</a>
        </div>
        <div className="viz-table-wrap">
          <table className="viz-table">
            <thead><tr><th>Campo</th><th>Rol en Tableau</th><th>Uso en el libro de trabajo</th></tr></thead>
            <tbody>
              {tableauData.fields.map((f) => (
                <tr key={f.campo}><td><code>{f.campo}</code></td><td>{f.rol}</td><td>{f.uso}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </ToolSection>

      <ToolSection
        badge="DEMOSTRACIÓN · DASHBOARDS EN TABLEAU"
        title="Dashboards creados con el dataset"
        lead="Cinco dashboards construidos en Tableau Public 2025.1 con dataset_calidad.csv. Cada uno responde una pregunta de la Jefatura de Calidad; junto a cada captura se explica cómo se armó, qué muestra y qué decisión sugiere. Haz clic en una captura para verla en tamaño completo."
        id="dashboards"
      >
        <div className="tl-downloads">
          <a className="tl-btn" href={`${BASE}docs/AITECH_Calidad_Dashboards.twbx`} download>Descargar el libro de Tableau (.twbx)</a>
        </div>
        <TableauGallery dashboards={tableauData.dashboards} />
      </ToolSection>

      <ToolSection
        badge="COMPLEMENTO · TABLERO INTERACTIVO"
        title="Tablero interactivo de métricas de calidad"
        lead="Réplica interactiva de los indicadores clave construidos a partir del dataset. Pasa el cursor sobre cualquier marca para ver el detalle o usa «Ver tabla»."
        id="tablero"
      >
        <QualityDashboard data={d} />
      </ToolSection>

      <ToolSection badge="LECTURA DEL TABLERO" title="Lo más rescatable del dataset" lead="Lo que la Jefatura de Calidad debería llevar al comité a partir del tablero:">
        <div className="tl-findings">
          {hallazgos.map((h) => (
            <article key={h.titulo} className="tl-finding">
              <span className="tl-finding-num">{h.cifra}</span>
              <h4>{h.titulo}</h4>
              <p>{h.texto}</p>
            </article>
          ))}
        </div>
      </ToolSection>
    </ToolPageLayout>
  );
}
