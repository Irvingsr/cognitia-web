import { useState } from 'react'

const PILLARS = [
  {
    icon: '🧘',
    title: 'La IA al servicio de las personas, no al revés',
    sub: 'Reducir estrés y facilitar el trabajo humano',
    body: 'Creemos firmemente que la tecnología debe adaptarse a tu equipo y no obligar a tu gente a cambiar su esencia para complacer a una máquina. La IA debe ser una herramienta invisible que elimine la carga mental, automatice lo aburrido y te devuelva el recurso más valioso: el tiempo.',
  },
  {
    icon: '🤝',
    title: 'Estrategia + Tecnología + Acompañamiento Humano',
    sub: 'No vendemos software, entregamos resultados',
    body: 'La implementación de IA falla cuando es solo tecnología. Nosotros combinamos diagnóstico estratégico, herramientas de vanguardia y acompañamiento real para que el cambio funcione en la realidad de tu negocio, no solo en papel.',
  },
  {
    icon: '⚡',
    title: 'Simplicidad sobre Complejidad',
    sub: 'Si necesita un manual de 200 páginas, está mal diseñado',
    body: 'Un agente de IA bien construido debe sentirse natural desde el primer día. Diseñamos flujos simples, intuitivos y focalizados en el problema real. Sin tecnicismos, sin promesas vacías, sin complejidad innecesaria.',
  },
]

function AccordionItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`accordion-item${open ? ' open' : ''}`}>
      <div className="accordion-header" onClick={() => setOpen(o => !o)}>
        <span className="acc-icon">{item.icon}</span>
        <div style={{ flex: 1 }}>
          <h4>{item.title}</h4>
          {open && <p style={{ fontSize: 12, color: 'var(--purple)', marginTop: 4 }}>{item.sub}</p>}
        </div>
        <span className="acc-chevron">⌄</span>
      </div>
      {open && <div className="accordion-body">{item.body}</div>}
    </div>
  )
}

export default function Manifiesto() {
  return (
    <div className="page-bg">
      {/* Header */}
      <section style={s.header}>
        <div className="container">
          <p className="label label-purple">Nuestro Manifiesto</p>
          <h1 style={{ maxWidth: 700 }}>
            Inteligencia Artificial diseñada para{' '}
            <span className="grad-success">humanos</span>
          </h1>
        </div>
      </section>

      {/* Main */}
      <section className="section">
        <div className="container" style={s.grid}>
          {/* Left */}
          <div style={s.left}>
            <p style={s.intro}>
              No somos una agencia tradicional que te vende plantillas. Creemos en un futuro donde la IA reduce la frustración, ayuda a los negocios a operar con claridad y permite a las personas enfocarse en lo que mejor saben hacer: crear valor.
            </p>
            <blockquote style={s.quote}>
              <span style={s.quoteMark}>"</span>
              La IA debe facilitar el trabajo humano, reducir estrés y mejorar la toma de decisiones, no imponer tecnología por moda.
            </blockquote>
            <div style={s.stats}>
              {[
                { val: '4.1M', label: 'PyMEs en México sin automatización · INEGI 2024' },
                { val: '60%',  label: 'reducción de tiempo en tareas repetitivas · Deloitte 2023' },
                { val: '$3.7T', label: 'valor global generado por IA en empresas · McKinsey 2024' },
              ].map((st, i) => (
                <div key={i} style={s.stat}>
                  <span style={s.statVal}>{st.val}</span>
                  <span style={s.statLabel}>{st.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — accordion */}
          <div style={s.right}>
            <p style={s.pillarsTitle}>Nuestros Pilares Operativos</p>
            <div style={s.accordion}>
              {PILLARS.map((p, i) => <AccordionItem key={i} item={p} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Irving card */}
      <section className="section-sm" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={s.founderCard} className="card">
            <div style={s.founderAvatar}>IS</div>
            <div>
              <p style={s.founderName}>Irving de los Santos</p>
              <p style={s.founderRole}>Fundador · Cognitia</p>
              <p style={s.founderBio}>
                Estratega de IA aplicada a negocios reales. Desde Playa del Carmen construyendo el modelo de automatización que las PyMEs mexicanas merecen: práctico, humano y medible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const s = {
  header: { padding: '100px 0 48px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' },
  left: { display: 'flex', flexDirection: 'column', gap: 28 },
  intro: { fontSize: 16, color: 'var(--muted)', lineHeight: 1.8 },
  quote: {
    borderLeft: '3px solid var(--purple)',
    paddingLeft: 20, position: 'relative',
    fontSize: 16, fontWeight: 600, lineHeight: 1.7, color: 'var(--text)',
    fontStyle: 'italic',
  },
  quoteMark: { fontSize: 40, color: 'var(--purple)', lineHeight: 0, verticalAlign: -10, marginRight: 4 },
  stats: { display: 'flex', gap: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' },
  stat: { display: 'flex', flexDirection: 'column', gap: 4 },
  statVal: { fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', color: 'var(--electric)' },
  statLabel: { fontSize: 12, color: 'var(--muted)' },
  pillarsTitle: { fontSize: 13, fontWeight: 700, letterSpacing: 1, color: 'var(--muted)', marginBottom: 16, textTransform: 'uppercase' },
  accordion: { display: 'flex', flexDirection: 'column', gap: 12 },
  right: {},
  founderCard: { display: 'flex', gap: 24, alignItems: 'flex-start', maxWidth: 640 },
  founderAvatar: {
    width: 64, height: 64, borderRadius: 16,
    background: 'linear-gradient(135deg, var(--purple), var(--electric))',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#fff', flexShrink: 0,
  },
  founderName: { fontSize: 17, fontWeight: 700, marginBottom: 2 },
  founderRole: { fontSize: 12, color: 'var(--purple)', marginBottom: 10 },
  founderBio: { fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 },
}
