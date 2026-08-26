import { Link } from 'react-router-dom';

export default function MissionVisionSection() {
  return (
    <section id="mision-vision" className="mv-section">
      <h2 className="section-title" style={{ marginBottom: '3rem' }}>Misión y Visión</h2>

      {/* Nuestra Misión y Visión */}
      <div className="mv-grid">
        <div className="mv-card">
          <h2>Nuestra Misión</h2>
          <p>
            Garantizar la excelencia operativa de la empresa mediante la integración de calidad intrínseca en
            cada proceso y resultado entregado. Actuamos como administradores diligentes de los recursos de
            salud, asegurando que cada una de nuestras soluciones sea plenamente apta para su uso y cumpla con
            los estándares de aceptación más rigurosos para generar valor real y proteger la seguridad de los
            pacientes.
          </p>
        </div>
        <div className="mv-card">
          <h2>Nuestra Visión</h2>
          <p>
            Ser el referente global de precisión y confiabilidad en tecnología médica, donde la calidad
            innegociable sea el motor fundamental de la confianza en la salud digital. Aspiramos a consolidar
            una cultura de mejora continua y resiliencia que nos permita superar constantemente las expectativas
            de todos nuestros interesados, transformando el futuro de la medicina a través de la perfección
            técnica y el bienestar sostenible.
          </p>
        </div>
      </div>

      {/* Botón hacia la página dedicada */}
      <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
        <Link to="/mision-vision" className="btn">
          Explorar Página Completa →
        </Link>
      </div>
    </section>
  );
}
