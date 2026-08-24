import { Target, Eye } from 'lucide-react';

export default function MisionVision() {
  return (
    <div className="animate-fade-in-up pb-12 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center mb-16 relative">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6 inline-block">
          Identidad Corporativa
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Los pilares fundamentales que guían las acciones y el propósito del grupo 
          de Calidad Dinastía Arias en IATech.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full mx-auto">
        {/* Misión */}
        <div className="glass-card p-10 relative overflow-hidden group hover:border-primary/50 transition-colors">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
            <div className="p-4 bg-primary/10 rounded-2xl text-primary">
              <Target size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white">Nuestra Misión</h2>
          </div>
          <p className="text-lg text-slate-300 leading-relaxed">
            Garantizar la <strong className="text-white">excelencia operativa</strong> de la empresa mediante la integración de 
            calidad intrínseca en cada proceso y resultado entregado.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed mt-4">
            Actuamos como administradores diligentes de los recursos de salud, asegurando que cada una 
            de nuestras soluciones sea plenamente apta para su uso y cumpla con los estándares de aceptación 
            más rigurosos para generar valor real y proteger la seguridad de los pacientes.
          </p>
        </div>

        {/* Visión */}
        <div className="glass-card p-10 relative overflow-hidden group hover:border-secondary/50 transition-colors">
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/20 transition-colors"></div>
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
            <div className="p-4 bg-secondary/10 rounded-2xl text-secondary">
              <Eye size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white">Nuestra Visión</h2>
          </div>
          <p className="text-lg text-slate-300 leading-relaxed">
            Ser el <strong className="text-white">referente global de precisión y confiabilidad</strong> en tecnología médica, 
            donde la calidad innegociable sea el motor fundamental de la confianza en la salud digital.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed mt-4">
            Aspiramos a consolidar una cultura de mejora continua y resiliencia que nos permita superar 
            constantemente las expectativas de todos nuestros interesados, transformando el futuro de la 
            medicina a través de la perfección técnica y el bienestar sostenible.
          </p>
        </div>
      </div>
    </div>
  );
}
