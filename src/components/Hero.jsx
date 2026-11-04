import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { teamMembers } from '../data/teamData';
import { aitechAreas } from '../data/aitechData';

export default function Hero() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      if (preference.matches) videoRef.current?.pause();
      else videoRef.current?.play().catch(() => {});
    };
    syncMotion();
    preference.addEventListener('change', syncMotion);
    return () => preference.removeEventListener('change', syncMotion);
  }, []);

  const toggleVideo = () => {
    if (playing) videoRef.current?.pause();
    else videoRef.current?.play().catch(() => {});
  };

  return (
    <section className="c-hero-xl home-hero" id="inicio">
      <div className="hero_background" aria-hidden="true">
        <video
          ref={videoRef}
          className="background_video"
          loop muted playsInline preload="metadata"
          poster={`${import.meta.env.BASE_URL}assets/gestion_hero_art.jpg`}
          src={`${import.meta.env.BASE_URL}assets/integrated-loop.mp4`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>
      <div className="hero_main">
        <div className="hero-tag"><span className="hero-tag-dot" /><span>DIRECCIÓN DE CALIDAD AITECH</span></div>
        <h1 className="main_heading">Ingeniería de Calidad para el Futuro de AITECH.</h1>
        <div className="main_bottom">
          <p className="main_text">Aseguramiento de calidad multidisciplinario, observabilidad y estándares de excelencia aplicados a todo el ecosistema tecnológico.</p>
          <div className="home-hero-actions">
            <Link className="home-primary-action" to="/gestion-tecnologias">Ver Gestión <ArrowUpRight size={19} aria-hidden="true" /></Link>
            <a className="home-secondary-action" href="https://iatech-co-frontend.vercel.app" target="_blank" rel="noopener noreferrer">Sistema de inventario <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <div className="home-hero-footer">
        <div className="home-hero-facts"><span>{aitechAreas.length} verticales tecnológicas</span><span>{teamMembers.length} especialistas</span><span>Estándares ISO / IEEE</span></div>
        <button type="button" className="hero-motion-toggle" onClick={toggleVideo} aria-label={playing ? 'Pausar video de fondo' : 'Reproducir video de fondo'}>
          {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
          <span>{playing ? 'Pausar fondo' : 'Reproducir fondo'}</span>
        </button>
      </div>
    </section>
  );
}
