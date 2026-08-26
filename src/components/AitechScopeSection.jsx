import React from 'react';
import { aitechAreas } from '../data/aitechData';
import { CoverflowCarousel } from './ui/coverflow-carousel';

export default function AitechScopeSection() {
  const slides = aitechAreas.map((area) => ({
    id: area.id,
    src: area.image,
    alt: `Vertical ${area.title} - AITECH Core`,
    title: area.title,
    iconKey: area.iconKey,
    isPrimary: area.isPrimary,
    subtitle: area.description,
    meta: area.meta,
  }));

  return (
    <section id="alcance" className="light-section" style={{ borderTop: '1px solid rgba(34, 47, 48, 0.08)', paddingBottom: '6rem' }}>
      <div className="section-badge">
        <span className="badge-dot" />
        <span>COBERTURA TOTAL AITECH</span>
      </div>

      <h2 className="section-heading-xl">
        Aseguramiento de Calidad en las 7 Verticales Tecnológicas.
      </h2>

      <p className="section-desc-lead" style={{ marginBottom: '2.5rem' }}>
        El Área de Calidad supervisa y garantiza la excelencia operativa y técnica en cada una de las 7 áreas clave de la compañía. Arrastra con el ratón o táctil, usa los controles o haz clic en cualquier vertical para explorar.
      </p>

      {/* Interactive 3D Coverflow Carousel in Pure JSX */}
      <CoverflowCarousel
        slides={slides}
        initialIndex={3} // Calidad Global (Posición 4, centro)
        cardWidth="clamp(240px, 28vw, 360px)"
        showCaption={true}
        showPagination={true}
        showNavigation={true}
        showPills={true}
        rotate={42}
        depth={0.65}
        perspective={1000}
        gap={0.72}
        loop={true}
      />
    </section>
  );
}
