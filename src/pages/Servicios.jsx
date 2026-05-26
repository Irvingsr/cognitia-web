import { Link } from 'react-router-dom'

const SERVICES = [
  {
    icon: '🎓',
    label: 'Capacitación Práctica',
    labelColor: 'var(--purple)',
    title: 'Educación en IA',
    desc: 'Talleres dinámicos diseñados para dueños de negocio, emprendedores y equipos operativos. Aprendizaje interactivo y 100% práctico desde el primer día.',
    items: [
      'Aprende a usar IA real aplicada a tu negocio',
      'Talleres personalizados para tu equipo de trabajo',
      'Material y herramientas incluidas',
      'Seguimiento post-taller',
    ],
    cta: '/contacto',
    ctaLabel: 'Agendar Taller',
  },
  {
    icon: '📈',
    label: 'Crecimiento Comercial',
    labelColor: 'var(--electric)',
    title: 'Marketing con IA',
    desc: 'Estrategias completas de captación digital. Diseñamos tus embudos comerciales y contenido optimizados con herramientas de inteligencia artificial.',
    items: [
      'Definición de Buyer Persona y propuesta de valor con IA',
      'Estrategias de contenido y SEO automatizado',
      'Campañas de captación con IA predictiva',
      'Reportes de rendimiento automatizados',
    ],
    cta: '/contacto',
    ctaLabel: 'Solicitar Estrategia',
  },
  {
    icon: '🎯',
    label: 'Roadmap a Medida',
    labelColor: 'var(--success)',
    title: 'Consultoría con IA',
    desc: 'Diagnosticamos tu operación para identificar cuellos de botella y diseñamos un plan tecnológico claro, enfocado en eficiencia y rentabilidad.',
    items: [
      'Auditoría operativa y mapeo de procesos internos',
      'Creación de Roadmap de implementación personalizado',
      'Selección de herramientas de IA adecuadas',
      'Implementación acompañada paso a paso',
    ],
    cta: '/diagnostico',
    ctaLabel: 'Iniciar Diagnóstico',
  },
]

const AGENTS = [
  { icon: '💬', title: 'Agente de Ventas', desc: 'Califica leads, responde preguntas y agenda citas automáticamente, 24/7.' },
  { icon: '🎧', title: 'Atención al Cliente', desc: 'Atiende por WhatsApp y email sin intervención humana para consultas frecuentes.' },
  { icon: '👥', title: 'Agente de RH', desc: 'Filtra candidatos y responde FAQs laborales de forma automatizada.' },
  { icon: '📊', title: 'Agente Contable', desc: 'Organiza gastos y genera reportes básicos conectado a tu operación.' },
]

export default function Servicios() {
  return (
    <div className="page-bg">
      {/* Header */}
      <section style={s.header}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <p className="label label-electric">Qué hacemos</p>
            <h1>Cómo ayudamos<br />a tu negocio</h1>
            <p>No vendemos herramientas aisladas. Creamos soluciones integrales combinando estrategia comercial, tecnología de vanguardia y acompañamiento humano.</p>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="section">
        <div className="container">
          <div style={s.grid}>
            {SERVICES.map((sv, i) => (
              <div key={i} className="card" style={s.card}>
                <div style={s.cardIcon}>{sv.icon}</div>
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
            <p className="label label-purple">Catálogo AaaS</p>
            <h2>Agentes que trabajarán en tu operación</h2>
            <p>Modelo de suscripción mensual — el agente vive en tu negocio y evoluciona contigo.</p>
          </div>
          <div style={s.agentGrid}>
            {AGENTS.map((ag, i) => (
              <div key={i} className="card" style={s.agentCard}>
                <span style={s.agentIcon}>{ag.icon}</span>
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
          <p style={{ color: 'var(--muted)', marginTop: 10 }}>Haz el diagnóstico gratuito y te decimos exactamente qué agente necesitas.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/diagnostico" className="btn-primary">Hacer Diagnóstico Gratis →</Link>
            <a href="https://wa.me/529841798638" target="_blank" rel="noreferrer" className="btn-secondary">WhatsApp directo</a>
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
  cardIcon: { fontSize: 32, marginBottom: 12 },
  cardTitle: { fontSize: '1.5rem', margin: '4px 0 12px' },
  cardDesc: { fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 },
  agentGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 },
  agentCard: { textAlign: 'center' },
  agentIcon: { fontSize: 36, display: 'block', marginBottom: 14 },
  agentTitle: { fontSize: '1.2rem', marginBottom: 10 },
  agentDesc: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 },
  cta: { padding: '80px 0' },
  ctaInner: { textAlign: 'center' },
}
