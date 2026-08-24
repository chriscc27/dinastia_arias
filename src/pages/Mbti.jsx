import { Compass } from 'lucide-react';

export default function Mbti() {
  return (
    <div className="animate-fade-in-up pb-12 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6 inline-block">
          Personalidades MBTI
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Descubre cómo las distintas personalidades enriquecen la dinámica de trabajo y potencian 
          la innovación dentro del equipo de calidad.
        </p>
      </div>

      <div className="glass-card p-12 text-center max-w-2xl w-full">
        <Compass className="w-16 h-16 text-primary mx-auto mb-6 opacity-50" />
        <h2 className="text-2xl font-bold text-white mb-4">Próximamente</h2>
        <p className="text-slate-400">
          Esta sección está en construcción. Pronto publicaremos el mapa de personalidades 
          y perfiles de nuestro equipo.
        </p>
      </div>
    </div>
  );
}
