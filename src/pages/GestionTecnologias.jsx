export default function GestionTecnologias() {
  const technologies = [
    {
      category: "Automatización E2E y UI",
      tools: [
        { name: "Cypress", desc: "Pruebas end-to-end modernas para aplicaciones web, ejecutadas directamente en el navegador." },
        { name: "Playwright", desc: "Automatización cross-browser confiable impulsada por Microsoft para pruebas rápidas y estables." },
        { name: "Selenium", desc: "El estándar clásico de la industria para automatizar navegadores con soporte multi-lenguaje." }
      ]
    },
    {
      category: "Pruebas de APIs e Integración",
      tools: [
        { name: "Postman", desc: "Plataforma colaborativa para el diseño, testing y documentación de APIs REST y GraphQL." },
        { name: "RestAssured", desc: "Librería basada en Java para probar de manera eficiente servicios web RESTful." },
        { name: "SoapUI", desc: "Herramienta especializada para pruebas funcionales y de seguridad de servicios web SOAP y REST." }
      ]
    },
    {
      category: "Pruebas de Rendimiento y Carga",
      tools: [
        { name: "JMeter", desc: "Herramienta open-source de Apache diseñada para cargar y medir el rendimiento de sistemas." },
        { name: "k6", desc: "Herramienta de pruebas de carga moderna y amigable para desarrolladores, escrita en Go y JavaScript." },
        { name: "Gatling", desc: "Framework de pruebas de carga de alto rendimiento basado en Scala y Akka." }
      ]
    },
    {
      category: "Gestión y Calidad de Código",
      tools: [
        { name: "Jira & TestRail", desc: "Ecosistema para la gestión ágil de proyectos, seguimiento de bugs y planificación de casos de prueba." },
        { name: "SonarQube", desc: "Plataforma de inspección continua que evalúa la calidad del código y detecta vulnerabilidades de seguridad." },
        { name: "Jenkins / GitLab CI", desc: "Servidores de automatización para orquestar los pipelines de Integración y Entrega Continua (CI/CD)." }
      ]
    }
  ];

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6 inline-block">
          Gestión de Tecnologías
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          En Dinastía Arias empleamos un stack tecnológico de vanguardia diseñado específicamente 
          para asegurar la calidad del software en cada etapa del ciclo de vida del desarrollo.
        </p>
      </div>

      <div className="flex flex-col gap-12 max-w-5xl mx-auto">
        {technologies.map((tech, idx) => (
          <div key={idx} className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
              {tech.category}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {tech.tools.map((tool, i) => (
                <div key={i} className="bg-slate-900/50 rounded-xl p-6 border border-white/5 hover:border-primary/30 transition-colors">
                  <h3 className="text-xl font-semibold text-primary mb-3">{tool.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
