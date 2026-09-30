export default function MarqueeBanner({ text = "INGENIERÍA DE CALIDAD — DINASTÍA ARIAS — ESTÁNDARES INTERNACIONALES — AITECH — " }) {
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        <span className="marquee-text">{text}</span>
        <span className="marquee-text">{text}</span>
        <span className="marquee-text">{text}</span>
        <span className="marquee-text">{text}</span>
      </div>
    </div>
  );
}
