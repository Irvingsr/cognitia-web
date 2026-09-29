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
    <div className={`t-acc-item${open ? ' t-acc-open' : ''}`}>
      <div className="t-acc-head" onClick={() => setOpen(o => !o)}>
        <div style={{ flex: 1 }}>
          <h3>{item.title}</h3>
          {open && <p className="t-acc-sub">{item.sub}</p>}
        </div>
        <span className="t-acc-chevron">⌄</span>
      </div>
      {open && <div className="t-acc-body">{item.body}</div>}
    </div>
  )
}

export default function Manifiesto() {
  return (
    <>
      <section className="t-hero t-sec-first">
        <div className="t-wrap t-hero-in t-hero-solo">
          <p className="t-eyebrow">Nuestro Manifiesto</p>
          <h1>Procesos diseñados para humanos</h1>
        </div>
      </section>

      <section className="t-sec t-sec-first">
        <div className="t-wrap t-grid2">
          <div>
            <p className="t-lead" style={{ maxWidth: 'none' }}>
              No somos una agencia tradicional que te vende plantillas. Creemos en negocios
              que operan con claridad, donde la tecnología reduce la frustración y permite a
              las personas enfocarse en lo que mejor saben hacer: crear valor.
            </p>
            <blockquote className="t-pregunta" style={{ marginTop: 28 }}>
              La tecnología debe facilitar el trabajo humano, reducir estrés y mejorar la
              toma de decisiones, no imponerse por moda.
            </blockquote>
          </div>

          <div>
            <p className="t-eyebrow t-eyebrow-verde">Nuestros pilares operativos</p>
            <div className="t-accordion">
              {PILLARS.map(p => <AccordionItem key={p.title} item={p} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="t-sec">
        <div className="t-wrap">
          <div className="t-card" style={{ flexDirection: 'row', gap: 24, alignItems: 'flex-start', maxWidth: 640 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16, background: 'var(--verde)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>IS</div>
            <div>
              <p style={{ fontSize: 17, fontWeight: 600 }}>Irving de los Santos</p>
              <p className="t-eyebrow t-eyebrow-verde" style={{ marginBottom: 8 }}>Fundador · Cognitia</p>
              <p className="t-cardtxt">
                Consultor en automatización de procesos para negocios reales. Desde Playa
                del Carmen, acompañando dueños de negocio con un modelo práctico, humano
                y medible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
