import { Link } from 'react-router-dom'
import { WHATSAPP_URL } from '../data/contacto'

const SERVICES = [
  {
    label: 'Diagnóstico y claridad',
    labelColor: 'var(--electric)',
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
    labelColor: 'var(--purple)',
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
    labelColor: 'var(--success)',
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
    <div className="page-bg">
      {/* Header */}
      <section style={s.header}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <p className="label label-electric">Qué hacemos</p>
            <h1>Consultoría, estrategia e implementación para tu negocio</h1>
            <p>No empezamos por la herramienta. Primero entendemos qué frena tus resultados, después decidimos dónde tiene sentido aplicar tecnología — y dónde no.</p>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="section">
        <div className="container">
          <div style={s.grid}>
            {SERVICES.map((sv, i) => (
              <div key={i} className="card" style={s.card}>
                <span style={{ ...s.cardStep, color: sv.labelColor }}>{String(i + 1).padStart(2, '0')}</span>
                <p className="label" style={{ color: sv.labelColor }}>{sv.label}</p>
                <h3 style={s.cardTitle}>{sv.title}</h3>
                <p style={s.cardDesc}>{sv.desc}</p>
                <ul className="checklist">
                  {sv.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
                <Link to={sv.cta} className="btn-primary" style={{ marginTop: 28, alignSelf: 'flex-start' }}>
                  {sv.ctaLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agentes */}
      <section className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div className="section-header">
            <p className="label label-purple">Capacidades</p>
            <h2>Qué podemos implementar después del diagnóstico</h2>
            <p>Ejemplos de lo que suele salir priorizado. Lo que aplique a tu caso lo define el análisis, no un catálogo.</p>
          </div>
          <div style={s.agentGrid}>
            {CAPACIDADES.map((ag, i) => (
              <div key={i} className="card" style={s.agentCard}>
                <h3 style={s.agentTitle}>{ag.title}</h3>
                <p style={s.agentDesc}>{ag.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={s.cta}>
        <div className="container" style={s.ctaInner}>
          <h2>¿No sabes por dónde empezar?</h2>
          <p style={{ color: 'var(--muted)', marginTop: 10 }}>Empezamos por entender tu operación y de ahí sale el plan.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/diagnostico" className="btn-primary">Solicitar Diagnóstico Estratégico →</Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-secondary">WhatsApp directo</a>
          </div>
        </div>
      </section>
    </div>
  )
}

const s = {
  header: { padding: '100px 0 64px', textAlign: 'center' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 },
  card: { display: 'flex', flexDirection: 'column' },
  cardStep: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: 1.5,
    lineHeight: 1, display: 'block', marginBottom: 14, opacity: 0.9,
  },
  cardTitle: { fontSize: '1.5rem', margin: '4px 0 12px' },
  cardDesc: { fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 },
  agentGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 },
  agentCard: { textAlign: 'center' },
  agentTitle: { fontSize: '1.2rem', marginBottom: 10 },
  agentDesc: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 },
  cta: { padding: '80px 0' },
  ctaInner: { textAlign: 'center' },
}
