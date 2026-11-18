import { useState } from 'react';
import { Check, ClipboardCheck, Database, MapPin, Wifi, Zap } from 'lucide-react';
import { recoveryRunbooks } from '../data/planContingencia';

const icons = { energia: Zap, conexion: Wifi, datos: Database, sede: MapPin };

export default function RecoveryPlaybook() {
  const [activeId, setActiveId] = useState('energia');
  const active = recoveryRunbooks.find((item) => item.id === activeId);

  return (
    <div className="pc-playbook">
      <div className="pc-playbook-heading"><span className="pc-eyebrow">GUÍAS DE ACTUACIÓN</span><h3>¿Qué necesitas recuperar?</h3><p>Elige un incidente para consultar la secuencia de recuperación y las condiciones de retorno.</p></div>
      <div className="pc-incident-picker" role="group" aria-label="Tipo de incidente">
        {recoveryRunbooks.map((item) => {
          const Icon = icons[item.id];
          return <button key={item.id} type="button" aria-pressed={activeId === item.id} aria-controls="pc-recovery-guide" onClick={() => setActiveId(item.id)}><Icon size={20} aria-hidden="true" />{item.label}</button>;
        })}
      </div>
      <div id="pc-recovery-guide" className="pc-recovery-guide" role="region" aria-label="Procedimiento de recuperación" aria-live="polite" aria-atomic="true">
        <div className="pc-guide-intro"><span className="pc-eyebrow">{active.label}</span><h4>{active.title}</h4><p>{active.lead}</p><span className="pc-guide-owner">Responsable: {active.owner}</span></div>
        <div className="pc-guide-columns">
          <div><h5>Secuencia de recuperación</h5><ol className="pc-guide-actions">{active.actions.map((action, index) => <li key={action}><span aria-hidden="true">{index + 1}</span><p>{action}</p></li>)}</ol></div>
          <div className="pc-guide-validation"><ClipboardCheck size={26} aria-hidden="true" /><h5>Antes de volver a operar</h5><ul>{active.checks.map((check) => <li key={check}><Check size={17} aria-hidden="true" /><span>{check}</span></li>)}</ul><div className="pc-guide-evidence"><strong>Evidencia que debes conservar</strong><p>{active.evidence}</p></div></div>
        </div>
      </div>
    </div>
  );
}
