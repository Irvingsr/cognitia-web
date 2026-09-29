import { Link } from 'react-router-dom'
import { WHATSAPP_URL } from '../data/contacto'

const SERVICES = [
  {
    label: 'Diagnóstico y claridad',
    title: 'Consultoría e identificación de oportunidades',
    desc: 'Analizamos cómo opera tu negocio hoy para identificar qué está frenando los resultados, dónde hay oportunidades reales y qué conviene atender primero.',
    items: [
      'Mapeo de procesos y puntos de fricción',
      'Identificación de los problemas prioritarios',
      'Qué conviene resolver con tecnología y qué no',
      'Plan de acción priorizado a 30, 60 y 90 días',
    ],
    cta: '/diagnostico',
    ctaLabel: 'Solicitar Diagnóstico Estratégico',
  },
  {
    label: 'Implementación',
    title: 'Automatización e integración de sistemas',
    desc: 'Después del diagnóstico, construimos lo que la prioridad justifique: automatizaciones, asistentes y sistemas de seguimiento integrados a tu operación real.',
    items: [
      'Automatización de tareas repetitivas',
      'Asistentes de atención y seguimiento comercial',
      'Organización de información y reportes',
      'Integración con las herramientas que ya usas',
    ],
    cta: '/contacto',
    ctaLabel: 'Hablar de implementación',
  },
  {
    label: 'Adopción y productividad',
    title: 'Capacitación del equipo',
    desc: 'Aprende a utilizar Claude, ChatGPT y Gemini en tareas reales de tu trabajo, para ganar tiempo y usarlas con criterio — no por moda.',
    items: [
      'Uso aplicado de Claude, ChatGPT y Gemini en el día a día',
      'Talleres sobre las tareas concretas de tu equipo',
      'Criterio para saber cuándo conviene usarlas y cuándo no',
      'Acompañamiento posterior para sostener la adopción',
    ],
    cta: '/contacto',
    ctaLabel: 'Agendar capacitación',
  },
]

const CAPACIDADES = [
  { title: 'Atención y seguimiento', desc: 'Respuesta y seguimiento de prospectos por los canales que ya usa tu negocio.' },
  { title: 'Automatización de procesos', desc: 'Tareas repetitivas y de alto volumen que hoy consumen horas de tu equipo.' },
  { title: 'Organización de información', desc: 'Datos y documentos accesibles y ordenados para decidir con menos fricción.' },
  { title: 'Adopción en el equipo', desc: 'Capacitación para que las herramientas se usen de verdad, no solo se contraten.' },
]

export default function Servicios() {
  return (
    <>
      <section className="t-hero t-sec-first">
        <div className="t-wrap t-hero-in t-hero-solo" style={{ textAlign: 'center', margin: '0 auto' }}>
          <p className="t-eyebrow" style={{ justifyContent: 'center' }}>Qué hacemos</p>
          <h1>Consultoría, estrategia e implementación para tu negocio</h1>
          <p className="t-lead" style={{ margin: '0 auto' }}>
            No empezamos por la herramienta. Primero entendemos qué frena tus resultados,
            después decidimos dónde tiene sentido aplicar tecnología — y dónde no.
          </p>
        </div>
      </section>

      <section className="t-sec t-sec-first">
        <div className="t-wrap">
          <div className="t-grid3">
            {SERVICES.map((sv, i) => (
              <article key={sv.title} className="t-card">
                <p className="t-quote">
                  {String(i + 1).padStart(2, '0')} · {sv.label}
                </p>
                <h3>{sv.title}</h3>
                <p className="t-cardtxt">{sv.desc}</p>
                <ul className="t-checklist" style={{ marginTop: 18 }}>
                  {sv.items.map(item => <li key={item}>{item}</li>)}
                </ul>
                <Link to={sv.cta} className="t-btn t-btn-sm" style={{ marginTop: 24, alignSelf: 'flex-start' }}>
                  {sv.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="t-metodo">
        <div className="t-wrap">
          <div className="t-head">
            <p className="t-eyebrow t-eyebrow-verde">Capacidades</p>
            <h2>Qué podemos implementar después del diagnóstico</h2>
            <p className="t-sub">
              Ejemplos de lo que suele salir priorizado. Lo que aplique a tu caso lo
              define el análisis, no un catálogo.
            </p>
          </div>
          <div className="t-grid4">
            {CAPACIDADES.map(ag => (
              <div key={ag.title} className="t-area t-card-center">
                <h3>{ag.title}</h3>
                <p className="t-aread">{ag.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="t-cta">
        <div className="t-wrap t-cta-in">
          <h2>¿No sabes por dónde empezar?</h2>
          <p>Empezamos por entender tu operación y de ahí sale el plan.</p>
          <div className="t-actions">
            <Link to="/diagnostico" className="t-btn t-btn-claro">Solicitar Diagnóstico Estratégico →</Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="t-btn-ghost t-ghost-claro">
              WhatsApp directo
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
