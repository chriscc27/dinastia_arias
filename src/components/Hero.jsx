import { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const pinWrapperRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollerItems = [
    "Desarrollamos frameworks de calidad integral y automatización para las 7 verticales tecnológicas de AITECH.",
    "Garantizamos la excelencia técnica y operativa en Software, Hardware, Redes, Seguridad, Cloud, Big Data y Calidad.",
    "Aplicamos estándares internacionales ISO/IEEE y metodología científica para la prevención de fallos y optimización continua."
  ];

  useEffect(() => {
    let animId;

    const handleScroll = () => {
      if (pinWrapperRef.current) {
        const rect = pinWrapperRef.current.getBoundingClientRect();
        const totalDistance = pinWrapperRef.current.offsetHeight - window.innerHeight;

        if (totalDistance > 0) {
          const currentScroll = -rect.top;
          const rawProgress = currentScroll / totalDistance;
          const clamped = Math.max(0, Math.min(1, rawProgress));
          setScrollProgress(clamped);
        }
      }
    };

    const onScroll = () => {
      animId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  // 1. Fase de expansión a pantalla completa (0.0 -> 0.12 del recorrido)
  const expansionProgress = Math.min(1, scrollProgress / 0.12);
  const heroPadding = 16 * (1 - expansionProgress);
  const heroBorderRadius = 28 * (1 - expansionProgress);

  // 2. Fase de texto letra por letra (0.08 -> 1.0 del recorrido)
  const textProgressRange = Math.max(0, (scrollProgress - 0.06) / (1 - 0.06));
  const numItems = scrollerItems.length;

  // Índice del mensaje activo (0, 1 o 2)
  const activeIndex = Math.min(numItems - 1, Math.floor(textProgressRange * numItems));

  // Progreso individual dentro del mensaje activo (0.0 -> 1.0)
  const itemSegment = 1 / numItems;
  const itemProgress = Math.min(1, Math.max(0, (textProgressRange - activeIndex * itemSegment) / itemSegment));

  // Barra de progreso global
  const progressBarScale = Math.max(0.08, Math.min(1, 0.1 + scrollProgress * 0.9));

  return (
    <div className="hero-pin-wrapper" ref={pinWrapperRef} id="inicio">
      <div
        className="hero-sticky-container"
        style={{
          padding: `${heroPadding}px`,
        }}
      >
        <section
          className="c-hero-xl"
          style={{
            borderRadius: `${heroBorderRadius}px`,
          }}
        >
          {/* Video en bucle de fondo */}
          <div className="hero_background">
            <video
              className="background_video"
              autoPlay
              loop
              muted
              playsInline
              src="/assets/integrated-loop.mp4"
            />
          </div>

          {/* Bloque Superior del Hero */}
          <div className="hero_main">
            <div className="hero-tag">
              <span className="hero-tag-dot" />
              <span>DIRECCIÓN DE CALIDAD AITECH</span>
            </div>

            {scrollProgress < 0.05 ? (
              <div className="hero_initial_block">
                <h1 className="main_heading">
                  Ingeniería de Calidad para el Futuro de AITECH.
                </h1>

                <div className="main_bottom">
                  <p className="main_text">
                    Aseguramiento de calidad multidisciplinario, observabilidad y estándares de excelencia aplicados a todo el ecosistema tecnológico.
                  </p>

                  <div>
                    <a className="u-btn--1" href="#gestion-tecnologias">
                      <span className="btn_label">
                        Descubrir Nuestra Área
                        <div className="label_corner">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="48" fill="none" viewBox="0 0 18 48">
                            <path fill="#222F30" d="M0 0h5.63c7.808 0 13.536 7.337 11.642 14.91l-6.09 24.359A11.527 11.527 0 0 1 0 48V0Z" />
                          </svg>
                        </div>
                      </span>
                      <i className="btn_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="51" height="48" fill="none" viewBox="0 0 51 48">
                          <path fill="currentColor" d="M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z" />
                        </svg>
                      </i>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hero_scroller_prominent">
                <div className="scroller_content_grid">
                  <div className="content_index">
                    <div className="index_inner">
                      <span className="index_current">0{activeIndex + 1}</span>
                      <span className="index_divider">/</span>
                      <span className="index_total">0{scrollerItems.length}</span>
                    </div>
                  </div>

                  <div className="content_main_prominent">
                    {scrollerItems.map((itemText, itemIdx) => {
                      const isActive = itemIdx === activeIndex;
                      const words = itemText.split(' ');
                      const totalChars = itemText.length;
                      const revealedCharCount = Math.ceil(itemProgress * totalChars);

                      let cumulativeCharIndex = 0;

                      return (
                        <div
                          key={itemIdx}
                          className={`scroller_item ${isActive ? 'active' : ''}`}
                        >
                          <h2 className="scroller_prominent_heading">
                            {words.map((word, wordIdx) => {
                              const cleanWord = word.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '');
                              const isHighlight = ['Software', 'Hardware', 'Redes', 'Seguridad', 'Cloud', 'Big', 'Data', 'Calidad', 'AITECH', 'ISO/IEEE'].some(
                                term => cleanWord.toLowerCase() === term.toLowerCase()
                              );

                              const wordChars = Array.from(word);
                              const wordStartIndex = cumulativeCharIndex;
                              cumulativeCharIndex += word.length + 1;

                              return (
                                <span key={wordIdx} className="word_group">
                                  {wordChars.map((char, cIdx) => {
                                    const globalCharIdx = wordStartIndex + cIdx;
                                    const isRevealed = itemIdx < activeIndex || (isActive && globalCharIdx < revealedCharCount);

                                    return (
                                      <span
                                        key={cIdx}
                                        className={`char_reveal ${isRevealed ? 'revealed' : ''} ${isHighlight ? 'highlight' : ''}`}
                                      >
                                        {char}
                                      </span>
                                    );
                                  })}
                                  <span className="word_space">&nbsp;</span>
                                </span>
                              );
                            })}
                          </h2>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Barra de progreso inferior */}
          <div className="hero_scroller_footer">
            <div className="scroller_progress">
              <div
                className="progress_bar"
                style={{ transform: `scaleX(${progressBarScale})` }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
