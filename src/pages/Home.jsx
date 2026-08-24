import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center animate-fade-in-up">
      <section className="text-center py-16 md:py-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-indigo-300">
          Dinastía Arias
        </h1>
        <h2 className="text-2xl md:text-3xl text-primary font-semibold mb-8">
          Grupo de Calidad - IATech
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
          Impulsando la excelencia y la innovación a través de metodologías ágiles, pruebas automatizadas
          y un sólido compromiso con la calidad intrínseca en cada entrega.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <Link to="/mision-vision" className="px-8 py-3 rounded-full bg-primary text-slate-900 font-bold hover:bg-white transition-colors flex items-center gap-2 group">
            Conoce nuestra Misión
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/organizacion" className="px-8 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10">
            Ver Estructura
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mt-12 w-full max-w-5xl">
        <div className="glass-card p-8 flex flex-col items-center text-center group hover:border-primary/50 transition-colors cursor-pointer">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Calidad Innegociable</h3>
          <p className="text-slate-400 leading-relaxed">
            Aplicamos estándares rigurosos y metodologías de testing avanzado para garantizar 
            la fiabilidad y seguridad de nuestros productos en salud digital.
          </p>
        </div>

        <div className="glass-card p-8 flex flex-col items-center text-center group hover:border-primary/50 transition-colors cursor-pointer">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform">
            <Zap size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Automatización</h3>
          <p className="text-slate-400 leading-relaxed">
            Reducimos el time-to-market e incrementamos la cobertura de pruebas integrando automatización 
            en nuestros pipelines de CI/CD.
          </p>
        </div>

        <div className="glass-card p-8 flex flex-col items-center text-center group hover:border-primary/50 transition-colors cursor-pointer">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Rendimiento</h3>
          <p className="text-slate-400 leading-relaxed">
            Aseguramos la escalabilidad de nuestras aplicaciones bajo presión, monitorizando métricas clave 
            y previniendo cuellos de botella.
          </p>
        </div>
      </section>
    </div>
  );
}
