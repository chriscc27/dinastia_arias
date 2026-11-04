import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import { teamMembers } from '../data/teamData';
import { aitechAreas } from '../data/aitechData';
import HeroScrollText from './HeroScrollText';

export default function Hero() {
  const videoRef = useRef(null);
  const pinRef = useRef(null);
  const stickyRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) videoRef.current?.pause();
      else videoRef.current?.play().catch(() => {});
    };
    syncMotion();
    preference.addEventListener('change', syncMotion);
    return () => preference.removeEventListener('change', syncMotion);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(0);
      return undefined;
    }
    let frame;
    const update = () => {
      const distance = pinRef.current.offsetHeight - stickyRef.current.offsetHeight;
      const next = distance > 0 ? -pinRef.current.getBoundingClientRect().top / distance : 0;
      setProgress(Math.max(0, Math.min(1, next)));
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [reducedMotion]);

  const toggleVideo = () => {
    if (playing) videoRef.current?.pause();
    else videoRef.current?.play().catch(() => {});
  };

  const expansion = reducedMotion ? 0 : Math.min(1, progress / .12);
  const showIntro = reducedMotion || progress < .05;

  return (
    <div id="inicio" ref={pinRef} className={`hero-pin-wrapper home-hero-pin${reducedMotion ? ' is-reduced-motion' : ''}`}>
      <div ref={stickyRef} className="hero-sticky-container" style={{ padding: `${16 * (1 - expansion)}px` }}>
        <section className="c-hero-xl home-hero" style={{ borderRadius: `${28 * (1 - expansion)}px` }}>
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
            <h1 className={showIntro ? 'main_heading' : 'visually-hidden'}>Ingeniería de Calidad para el Futuro de AITECH.</h1>
            {showIntro ? (
              <div className="main_bottom">
                <p className="main_text">Aseguramiento de calidad multidisciplinario, observabilidad y estándares de excelencia aplicados a todo el ecosistema tecnológico.</p>
                <div className="home-hero-actions">
                  <Link className="home-primary-action" to="/gestion-tecnologias">Ver Gestión <ArrowUpRight size={19} aria-hidden="true" /></Link>
                  <a className="home-secondary-action" href="https://iatech-co-frontend.vercel.app" target="_blank" rel="noopener noreferrer">Sistema de inventario <ArrowUpRight size={18} aria-hidden="true" /></a>
                </div>
              </div>
            ) : <HeroScrollText progress={progress} />}
          </div>
          <div className="hero-scroll-footer">
            {!reducedMotion && <div className="scroller_progress" aria-hidden="true"><div className="progress_bar" style={{ transform: `scaleX(${Math.max(.08, progress)})` }} /></div>}
            <div className="home-hero-footer">
              <div className="home-hero-facts"><span>{aitechAreas.length} verticales tecnológicas</span><span>{teamMembers.length} especialistas</span><span>Estándares ISO / IEEE</span></div>
              <div className="hero-footer-actions">
                <Link to="/#resumen-proyecto" className="hero-summary-link">Ver resumen <ArrowDown size={16} aria-hidden="true" /></Link>
                <button type="button" className="hero-motion-toggle" onClick={toggleVideo} aria-label={playing ? 'Pausar video de fondo' : 'Reproducir video de fondo'}>
                  {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
                  <span>{playing ? 'Pausar fondo' : 'Reproducir fondo'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
