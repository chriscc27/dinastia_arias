import { Sparkles, Brain, Cpu, Rocket } from 'lucide-react';

export default function CienciaInnovacion() {
  return (
    <div className="animate-fade-in-up pb-12">
      <div className="text-center mb-16 relative">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6 inline-block">
          Ciencia e Innovación
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          En Dinastía Arias no solo probamos software; investigamos y desarrollamos el futuro del 
          aseguramiento de calidad. Combinamos ciencia de datos, inteligencia artificial y 
          metodologías disruptivas para revolucionar la salud digital en IATech.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="glass-card p-10 flex flex-col items-start relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
          <Brain className="w-12 h-12 text-primary mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">IA Aplicada al Testing</h2>
          <p className="text-slate-400 leading-relaxed">
            Hemos implementado modelos de Machine Learning predictivos que analizan el código fuente 
            para identificar las áreas de mayor riesgo antes de compilar. Esto nos permite dirigir 
            nuestras pruebas automatizadas de manera inteligente (Smart Test Execution), reduciendo 
            el tiempo de ejecución en un 40% y encontrando defectos críticos de manera temprana.
          </p>
        </div>

        <div className="glass-card p-10 flex flex-col items-start relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
          <Cpu className="w-12 h-12 text-secondary mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Shift-Left y Shift-Right Testing</h2>
          <p className="text-slate-400 leading-relaxed">
            Innovamos expandiendo la calidad hacia ambos extremos del ciclo de vida. Con "Shift-Left" 
            integramos análisis estático avanzado desde el primer commit del desarrollador. Con 
            "Shift-Right" monitoreamos la telemetría en producción usando observabilidad sintética, 
            detectando anomalías de rendimiento antes de que los usuarios reales las experimenten.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12 glass-card p-12 text-center bg-gradient-to-b from-white/5 to-transparent border-t-primary/30">
        <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-6">Investigación Continua</h2>
        <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed text-lg mb-8">
          Destinamos el 15% de nuestro tiempo operativo a la investigación de nuevas arquitecturas de 
          pruebas (como Chaos Engineering) y validación de algoritmos médicos. Nuestro laboratorio 
          interno experimenta constantemente con herramientas de próxima generación.
        </p>
        <button className="px-8 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white hover:text-slate-900 transition-colors inline-flex items-center gap-2">
          <Rocket className="w-5 h-5" />
          Conocer nuestro Laboratorio
        </button>
      </div>
    </div>
  );
}
