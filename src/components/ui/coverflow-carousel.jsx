import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  Network,
  Crown,
  ShieldCheck,
  Cloud,
  Database,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function renderAreaIcon(iconKey, size = 18, className = '') {
  switch (iconKey) {
    case 'code':
      return <Code2 size={size} className={className} />;
    case 'cpu':
      return <Cpu size={size} className={className} />;
    case 'network':
      return <Network size={size} className={className} />;
    case 'crown':
      return <Crown size={size} className={className} />;
    case 'shield':
      return <ShieldCheck size={size} className={className} />;
    case 'cloud':
      return <Cloud size={size} className={className} />;
    case 'database':
      return <Database size={size} className={className} />;
    default:
      return <Sparkles size={size} className={className} />;
  }
}

export function CoverflowCarousel({
  slides = [],
  initialIndex = 3, // Default to index 3 (Position 4: Calidad Global)
  rotate = 42,
  depth = 0.65,
  perspective = 1000,
  falloff = 0.65,
  fade = 0.15,
  cardWidth = 'clamp(220px, 26vw, 340px)',
  gap = 0.72,
  loop = true,
  showCaption = true,
  showPagination = true,
  showNavigation = true,
  showPills = true,
  label = 'AITECH 3D Coverflow Carousel',
  className = '',
}) {
  const count = slides.length;
  const initialPos = initialIndex >= 0 && initialIndex < count ? initialIndex : 0;

  const frameRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const posRef = useRef(initialPos);
  const targetRef = useRef(initialPos);
  const widthRef = useRef(300);
  const rafRef = useRef(null);
  const dragRef = useRef(null);

  const [selected, setSelected] = useState(initialPos);

  const indexAt = useCallback(
    (pos) => {
      if (!count) return 0;
      return ((Math.round(pos) % count) + count) % count;
    },
    [count]
  );

  const paint = useCallback(() => {
    if (!count) return;
    const stageWidth = widthRef.current || 300;
    const pitch = stageWidth * gap;
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 78) * Math.sign(offset);

      const tx = offset * pitch;
      const tz = -depth * stageWidth * ramp;
      const ry = -tilt;

      card.style.transform = `translate3d(${tx}px, 0px, ${tz}px) rotateY(${ry}deg)`;
      
      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance + 0.3)) : 1;
      const op = Math.max(0, 1 - fade * distance) * edge;
      card.style.opacity = String(op);
      card.style.zIndex = String(100 - Math.round(distance * 10));
      card.style.pointerEvents = distance > 2.5 ? 'none' : 'auto';

      if (Math.abs(offset) < 0.3) {
        card.classList.add('is-active');
      } else {
        card.classList.remove('is-active');
      }
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const settle = useCallback(
    (target) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      setSelected(indexAt(target));

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0005) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        posRef.current += remaining * 0.18;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint]
  );

  const clamp = useCallback(
    (pos) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop]
  );

  const goTo = useCallback(
    (index) => {
      if (!count) return;
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle]
  );

  const nudge = useCallback(
    (by) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle]
  );

  const onPointerDown = (event) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (event.currentTarget.setPointerCapture) {
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch (e) {}
    }
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    };
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = (widthRef.current || 300) * gap;
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
  };

  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    const stage = stageRef.current;
    if (!frame || !stage) return;

    const measure = () => {
      const stageWidth = stage.offsetWidth || 300;
      widthRef.current = stageWidth;
      paint();
    };

    measure();
    const timeout = setTimeout(measure, 50);

    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [paint]);

  useEffect(() => {
    paint();
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [paint]);

  // Global Arrow Left / Arrow Right Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid intercepting if the user is typing in a form input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const frame = frameRef.current;
        if (!frame) return;
        const rect = frame.getBoundingClientRect();
        // Check if the carousel is in the viewport
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
          e.preventDefault();
          if (e.key === 'ArrowLeft') {
            nudge(-1);
          } else if (e.key === 'ArrowRight') {
            nudge(1);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nudge]);

  const active = slides[selected] || slides[0];


  return (
    <div className={`cf-wrapper ${className}`} role="region" aria-roledescription="carousel" aria-label={label}>
      {/* Quick selection category pills with Calidad at position 4 (center) featuring neon aura and crown */}
      {showPills && (
        <div className="cf-pills-bar">
          {slides.map((slide, idx) => {
            const isCalidad = slide.isPrimary || slide.id === 'calidad';
            const isSelected = idx === selected;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => goTo(idx)}
                className={`cf-pill-btn ${isSelected ? 'active' : ''} ${isCalidad ? 'cf-pill-featured' : ''}`}
              >
                {isCalidad ? (
                  <Crown size={15} className="cf-crown-icon" />
                ) : (
                  <span className="cf-pill-icon-wrap">
                    {renderAreaIcon(slide.iconKey, 14)}
                  </span>
                )}
                <span>{slide.title}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 3D Viewport Stage */}
      <div className="cf-stage-container">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === 'ArrowRight') {
              event.preventDefault();
              nudge(1);
            }
          }}
          className="cf-viewport"
          style={{
            perspective: `${perspective}px`,
          }}
        >
          <div
            ref={stageRef}
            className="cf-stage"
            style={{
              width: cardWidth,
              height: cardWidth,
            }}
          >
            {slides.map((slide, index) => {
              const isCalidad = slide.isPrimary || slide.id === 'calidad';
              return (
                <div
                  key={index}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}`}
                  onClick={() => goTo(index)}
                  className={`cf-card ${isCalidad ? 'cf-card-featured-border' : ''}`}
                >
                  {/* Clash Royale Legendary Card Animated Glowing Border */}
                  <div className="cf-card-glow-wrap">
                    <div className="cf-card-glow-spinner" />
                  </div>

                  <div className="cf-card-inner">
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      draggable={false}
                      className="cf-card-img"
                    />
                    
                    {/* Animated Holographic Surface Shimmer (Legendary Card Ray) */}
                    <div className="cf-card-shimmer" />

                    <div className="cf-card-glass-overlay">
                      <div className="cf-card-badge-label">
                        <span className="cf-card-icon-tag">
                          {renderAreaIcon(slide.iconKey, 16)}
                        </span>
                        <span>{slide.title}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Vertical anterior"
              onClick={() => nudge(-1)}
              className="cf-nav-btn cf-nav-prev"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              aria-label="Vertical siguiente"
              onClick={() => nudge(1)}
              className="cf-nav-btn cf-nav-next"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* Pagination indicators */}
      {showPagination && (
        <div className="cf-pagination">
          {slides.map((slide, index) => {
            const isCalidad = slide.isPrimary || slide.id === 'calidad';
            return (
              <button
                key={index}
                type="button"
                aria-label={`Ir a la vertical ${index + 1}`}
                onClick={() => goTo(index)}
                className={`cf-dot ${index === selected ? 'active' : ''} ${isCalidad ? 'cf-dot-featured' : ''}`}
              />
            );
          })}
        </div>
      )}

      {/* Synchronized Detail Card for the active vertical */}
      {showCaption && active && (
        <div className={`cf-active-detail-panel ${active.isPrimary || active.id === 'calidad' ? 'is-focus-calidad' : ''}`} key={selected}>
          <div className="cf-detail-header">
            <div className="cf-detail-badge-group">
              <span className="cf-detail-badge">
                {active.isPrimary || active.id === 'calidad' ? (
                  <>
                    <Crown size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: '-1px' }} />
                    ÁREA CENTRAL AITECH
                  </>
                ) : (
                  'AITECH CORE 7X'
                )}
              </span>
              <span className="cf-detail-scope-tag">VERTICAL {selected + 1} DE {count}</span>
            </div>
            <span className="cf-detail-index">
              {renderAreaIcon(active.iconKey, 16, 'text-emerald-500')}
            </span>
          </div>

          <h3 className="cf-detail-title">
            <span className="cf-title-icon-box">
              {renderAreaIcon(active.iconKey, 24)}
            </span>
            {active.title}
          </h3>

          {active.subtitle && (
            <p className="cf-detail-desc">
              {active.subtitle}
            </p>
          )}

          {active.meta && active.meta.length > 0 && (
            <div className="cf-meta-grid">
              {active.meta.map((item, i) => (
                <div key={i} className="cf-meta-item">
                  <span className="cf-meta-label">{item.label}</span>
                  <span className="cf-meta-val">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CoverflowCarousel;
