import { Link } from 'react-router-dom';
import { Users, Server, TestTube, Zap, Link as LinkIcon } from 'lucide-react';

export default function Posiciones() {
  return (
    <div className="animate-fade-in-up pb-12">
      <div className="text-center mb-16 relative">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6 inline-block">
          Organización y Posiciones
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Conoce nuestra estructura organizativa. Selecciona cualquier rol en el organigrama 
          para ver su descripción detallada, responsabilidades y competencias requeridas.
        </p>
      </div>

      <div className="flex flex-col items-center max-w-5xl mx-auto mt-8 relative">
        
        {/* QA Lead */}
        <Link 
          to="/posiciones/qa-lead"
          className="glass-card p-6 w-72 text-center relative z-10 hover:-translate-y-2 transition-all hover:border-primary/50 shadow-[0_0_30px_rgba(0,242,254,0.15)] block group"
        >
          <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
            <Users size={32} />
          </div>
          <h2 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">QA Lead</h2>
          <p className="text-sm text-primary">Jefatura de Calidad</p>
        </Link>

        {/* Vertical Line */}
        <div className="w-0.5 h-12 bg-gradient-to-b from-primary/50 to-white/20"></div>

        {/* Horizontal Line Connector */}
        <div className="w-full max-w-3xl h-0.5 bg-white/20 relative hidden md:block">
          <div className="absolute left-[12.5%] top-0 w-0.5 h-8 bg-white/20"></div>
          <div className="absolute left-[37.5%] top-0 w-0.5 h-8 bg-white/20"></div>
          <div className="absolute right-[37.5%] top-0 w-0.5 h-8 bg-white/20"></div>
          <div className="absolute right-[12.5%] top-0 w-0.5 h-8 bg-white/20"></div>
        </div>
        {/* Fallback connection for mobile */}
        <div className="w-0.5 h-8 bg-white/20 block md:hidden"></div>

        {/* Specialists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full max-w-4xl gap-4 md:pt-8 px-4">
          
          <Link to="/posiciones/automatizacion" className="glass-card p-6 w-full text-center hover:-translate-y-2 transition-all hover:border-blue-400/50 block group">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl mx-auto flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
              <Server size={24} />
            </div>
            <h3 className="text-md font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">Automatización</h3>
            <p className="text-xs text-slate-400">Especialista QA</p>
          </Link>

          <Link to="/posiciones/funcional" className="glass-card p-6 w-full text-center hover:-translate-y-2 transition-all hover:border-green-400/50 block group">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl mx-auto flex items-center justify-center mb-4 text-green-400 group-hover:scale-110 transition-transform">
              <TestTube size={24} />
            </div>
            <h3 className="text-md font-bold text-white mb-1 group-hover:text-green-400 transition-colors">Calidad Funcional</h3>
            <p className="text-xs text-slate-400">Especialista QA</p>
          </Link>

          <Link to="/posiciones/rendimiento" className="glass-card p-6 w-full text-center hover:-translate-y-2 transition-all hover:border-orange-400/50 block group">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl mx-auto flex items-center justify-center mb-4 text-orange-400 group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="text-md font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">Rendimiento</h3>
            <p className="text-xs text-slate-400">Especialista QA</p>
          </Link>

          <Link to="/posiciones/integracion" className="glass-card p-6 w-full text-center hover:-translate-y-2 transition-all hover:border-purple-400/50 block group">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl mx-auto flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
              <LinkIcon size={24} />
            </div>
            <h3 className="text-md font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">Integración</h3>
            <p className="text-xs text-slate-400">Especialista QA</p>
          </Link>

        </div>
      </div>
    </div>
  );
}
