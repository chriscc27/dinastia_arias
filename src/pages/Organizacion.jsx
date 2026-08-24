import { Users, Server, TestTube, Zap, Link as LinkIcon } from 'lucide-react';

export default function Organizacion() {
  return (
    <div className="animate-fade-in-up pb-12">
      <div className="text-center mb-16 relative">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6 inline-block">
          Estructura Organizacional
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          El equipo de Dinastía Arias está organizado para cubrir todas las dimensiones de la 
          calidad de software, desde la funcionalidad pura hasta el rendimiento bajo estrés.
        </p>
      </div>

      <div className="flex flex-col items-center max-w-5xl mx-auto mt-8">
        {/* QA Lead */}
        <div className="glass-card p-6 w-72 text-center relative z-10 border-primary/50 shadow-[0_0_30px_rgba(0,242,254,0.15)]">
          <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center mb-4 text-primary">
            <Users size={32} />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">QA Lead</h2>
          <p className="text-sm text-primary">Jefatura de Calidad</p>
        </div>

        {/* Vertical Line */}
        <div className="w-0.5 h-12 bg-gradient-to-b from-primary/50 to-white/20"></div>

        {/* Horizontal Line Connector */}
        <div className="w-full max-w-3xl h-0.5 bg-white/20 relative">
          <div className="absolute left-0 top-0 w-0.5 h-8 bg-white/20"></div>
          <div className="absolute left-1/3 top-0 w-0.5 h-8 bg-white/20 -translate-x-1/2"></div>
          <div className="absolute right-1/3 top-0 w-0.5 h-8 bg-white/20 translate-x-1/2"></div>
          <div className="absolute right-0 top-0 w-0.5 h-8 bg-white/20"></div>
        </div>

        {/* Specialists Grid */}
        <div className="flex flex-wrap justify-between w-full max-w-4xl gap-4 pt-8 px-4">
          
          <div className="glass-card p-6 w-full sm:w-48 text-center hover:-translate-y-2 transition-transform hover:border-blue-400/50">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl mx-auto flex items-center justify-center mb-4 text-blue-400">
              <Server size={24} />
            </div>
            <h3 className="text-md font-bold text-white mb-1">Automatización</h3>
            <p className="text-xs text-slate-400">Especialista QA</p>
          </div>

          <div className="glass-card p-6 w-full sm:w-48 text-center hover:-translate-y-2 transition-transform hover:border-green-400/50">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl mx-auto flex items-center justify-center mb-4 text-green-400">
              <TestTube size={24} />
            </div>
            <h3 className="text-md font-bold text-white mb-1">Calidad Funcional</h3>
            <p className="text-xs text-slate-400">Especialista QA</p>
          </div>

          <div className="glass-card p-6 w-full sm:w-48 text-center hover:-translate-y-2 transition-transform hover:border-orange-400/50">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl mx-auto flex items-center justify-center mb-4 text-orange-400">
              <Zap size={24} />
            </div>
            <h3 className="text-md font-bold text-white mb-1">Rendimiento</h3>
            <p className="text-xs text-slate-400">Especialista QA</p>
          </div>

          <div className="glass-card p-6 w-full sm:w-48 text-center hover:-translate-y-2 transition-transform hover:border-purple-400/50">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl mx-auto flex items-center justify-center mb-4 text-purple-400">
              <LinkIcon size={24} />
            </div>
            <h3 className="text-md font-bold text-white mb-1">Integración</h3>
            <p className="text-xs text-slate-400">Especialista QA</p>
          </div>

        </div>
      </div>
    </div>
  );
}
