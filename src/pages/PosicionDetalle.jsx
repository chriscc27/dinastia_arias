import { useParams, Link, useNavigate } from 'react-router-dom';
import { posicionesData } from '../data/posicionesData';
import { ArrowLeft, CheckCircle2, AlertTriangle, Briefcase, Activity } from 'lucide-react';

export default function PosicionDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const posicion = posicionesData.find(p => p.id === id);

  if (!posicion) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-white mb-4">Posición no encontrada</h2>
        <button onClick={() => navigate('/posiciones')} className="text-primary hover:underline">
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up pb-12 max-w-4xl mx-auto">
      <Link to="/posiciones" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-8">
        <ArrowLeft size={20} />
        Volver a posiciones
      </Link>

      <div className="glass-card p-8 md:p-12">
        <div className="border-b border-white/10 pb-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{posicion.title}</h1>
          <div className="flex flex-wrap gap-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold flex items-center gap-2">
              <Briefcase size={16} /> {posicion.category}
            </span>
            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold flex items-center gap-2">
              <Activity size={16} /> Dept: {posicion.department}
            </span>
          </div>
        </div>

        <div className="space-y-10">
          <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              Finalidad o Misión
            </h3>
            <p className="text-slate-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
              {posicion.mission}
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-primary mb-4">Responsabilidades y Funciones</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              {posicion.responsibilities}
            </p>
            <p className="text-slate-400 text-sm">
              <strong className="text-slate-300">Condiciones:</strong> {posicion.workConditions}
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <section>
              <h3 className="text-xl font-bold text-primary mb-4">Requerimientos</h3>
              <ul className="space-y-3">
                {posicion.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 size={20} className="text-green-400 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-primary mb-4">Competencias</h3>
              <ul className="space-y-3">
                {posicion.competencies.map((comp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 size={20} className="text-blue-400 shrink-0 mt-0.5" />
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
              <AlertTriangle size={24} /> Riesgos Potenciales
            </h3>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              {posicion.risks.map((risk, idx) => (
                <li key={idx}>{risk}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
