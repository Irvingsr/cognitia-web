import { useState } from 'react'

const PILLARS = [
  {
    title: 'La tecnología al servicio de las personas, no al revés',
    sub: 'Reducir estrés y facilitar el trabajo humano',
    body: 'Creemos firmemente que la tecnología debe adaptarse a tu equipo y no obligar a tu gente a cambiar su esencia para complacer a una máquina. Debe ser invisible: eliminar la carga mental, automatizar lo aburrido y devolverte el recurso más valioso, que es el tiempo.',
  },
  {
    title: 'Estrategia + Tecnología + Acompañamiento Humano',
    sub: 'No vendemos software, entregamos resultados',
    body: 'Automatizar falla cuando es solo tecnología. Nosotros combinamos diagnóstico estratégico, herramientas adecuadas y acompañamiento real para que el cambio funcione en la realidad de tu negocio, no solo en papel.',
  },
  {
    title: 'Simplicidad sobre Complejidad',
    sub: 'Si necesita un manual de 200 páginas, está mal diseñado',
    body: 'Un sistema bien construido debe sentirse natural desde el primer día. Diseñamos flujos simples, intuitivos y focalizados en el problema real. Sin tecnicismos, sin promesas vacías, sin complejidad innecesaria.',
  },
]

function AccordionItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`accordion-item${open ? ' open' : ''}`}>
      <div className="accordion-header" onClick={() => setOpen(o => !o)}>
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
            Procesos diseñados para{' '}
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
              No somos una agencia tradicional que te vende plantillas. Creemos en negocios que operan con claridad, donde la tecnología reduce la frustración y permite a las personas enfocarse en lo que mejor saben hacer: crear valor.
            </p>
            <blockquote style={s.quote}>
              <span style={s.quoteMark}>"</span>
              La tecnología debe facilitar el trabajo humano, reducir estrés y mejorar la toma de decisiones, no imponerse por moda.
            </blockquote>
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
                Consultor en automatización de procesos para negocios reales. Desde Playa del Carmen construyendo el modelo que las PyMEs mexicanas merecen: práctico, humano y medible.
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
