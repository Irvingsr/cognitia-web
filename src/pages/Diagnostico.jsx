import { Link } from 'react-router-dom'

const ANALIZAMOS = [
  { t: 'Objetivos', d: 'Qué quieres conseguir en los próximos meses y qué te está frenando para lograrlo.' },
  { t: 'Situación actual', d: 'Cómo opera hoy tu negocio de verdad, no cómo debería operar en el papel.' },
  { t: 'Procesos', d: 'Cómo entra un cliente, cómo se le da seguimiento y dónde se cae la información.' },
  { t: 'Cuellos de botella', d: 'Qué punto concreto limita al resto del sistema y por qué.' },
  { t: 'Oportunidades', d: 'Dónde hay margen real de mejora, con o sin tecnología de por medio.' },
]

const DASHBOARD = [
  'Resumen ejecutivo',
  'Situación actual del negocio',
  'Tres problemas prioritarios detectados',
  'Principales oportunidades de mejora',
  'Cuellos de botella y puntos de fricción',
  'Qué procesos podrían beneficiarse de automatización',
  'Qué NO conviene automatizar todavía',
  'Prioridades recomendadas',
  'Plan de acción a 30, 60 y 90 días',
  'Estimación de impacto potencial',
]

const PARA_QUIEN = [
  'Tu negocio ya está funcionando y quieres mejorarlo, no arrancarlo.',
  'Sabes que algo te está frenando, pero no tienes claro qué atacar primero.',
  'Escuchas hablar de automatizar todo y no sabes qué aplica a tu caso.',
  'Prefieres entender antes de invertir.',
]

const NO_ES_PARA = [
  'Buscas que alguien te instale una herramienta específica que ya decidiste.',
  'Quieres implementar herramientas sin revisar antes cómo opera tu negocio.',
  'Esperas un resultado garantizado antes de que exista un análisis.',
]

const NO_INCLUYE = [
  { t: 'No es la implementación', d: 'El diagnóstico define qué hacer y en qué orden. Construir lo priorizado es una etapa aparte.' },
  { t: 'No es una auditoría técnica de sistemas', d: 'Analizamos la operación y sus procesos, no una revisión de infraestructura o de código.' },
  { t: 'No es el Scorecard gratuito', d: 'El Scorecard es una evaluación inicial de dos minutos. El Diagnóstico Estratégico es una intervención con entregable.' },
]

export default function Diagnostico() {
  return (
    <>
      <section className="t-hero t-sec-first">
        <div className="t-wrap t-hero-in t-hero-solo">
          <p className="t-eyebrow">Diagnóstico Estratégico Cognitia</p>
          <h1 style={{ maxWidth: 860 }}>
            Descubre qué mejorar, qué automatizar y qué priorizar antes de invertir en tecnología
          </h1>
          <p className="t-lead" style={{ maxWidth: 680 }}>
            Analizamos cómo opera tu negocio hoy, identificamos qué está frenando tus resultados
            y te entregamos un plan priorizado. Con eso en la mano decides qué hacer — con
            nosotros o por tu cuenta.
          </p>
          <div className="t-actions">
            <Link to="/contacto" className="t-btn">Solicitar Diagnóstico Estratégico →</Link>
          </div>
        </div>
      </section>

      <section className="t-sec t-sec-first">
        <div className="t-wrap" style={{ maxWidth: 760 }}>
          <p className="t-eyebrow t-eyebrow-verde">Qué problema resuelve</p>
          <h2>La falta de claridad cuesta más que la tecnología</h2>
          <p className="t-sub">
            La mayoría de los negocios que se acercan a automatizar no tienen un
            problema de herramientas: tienen un problema de prioridades. Se invierte en lo que
            está de moda en lugar de en lo que realmente limita la operación, y el resultado es
            gasto sin cambio real.
          </p>
          <p className="t-sub">
            El Diagnóstico Estratégico existe para evitar exactamente eso: primero entender el
            negocio, después decidir dónde tiene sentido aplicar tecnología — y dónde no.
          </p>
        </div>
      </section>

      <section className="t-sec t-sec-sm">
        <div className="t-wrap t-grid2">
          <div className="t-card">
            <p className="t-eyebrow t-eyebrow-verde">Para quién es</p>
            <ul className="t-checklist">
              {PARA_QUIEN.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div className="t-card">
            <p className="t-eyebrow" style={{ color: 'var(--tinta-2)' }}>Para quién no es</p>
            <ul className="t-checklist t-checklist-x">
              {NO_ES_PARA.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="t-sec">
        <div className="t-wrap">
          <p className="t-eyebrow">Qué analizamos</p>
          <h2 style={{ maxWidth: 620 }}>Cinco frentes, en el orden en que importan</h2>
          <div className="t-grid3" style={{ marginTop: 28 }}>
            {ANALIZAMOS.map((item, i) => (
              <div key={item.t} className="t-card">
                <p className="t-quote" style={{ fontStyle: 'normal', color: 'var(--verde)', fontWeight: 700 }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3>{item.t}</h3>
                <p className="t-cardtxt">{item.d}</p>
              </div>
            ))}
          </div>
          <p className="t-metodo-pie" style={{ borderLeft: '3px solid var(--verde)', paddingLeft: 18 }}>
            Para el análisis usamos el <strong>Índice de Fricción Cognitiva™ (IFC™)</strong>, la
            metodología de diagnóstico que desarrollamos en Cognitia para localizar dónde un
            negocio pierde ventas, tiempo o capacidad de atención. No necesitas conocerla para
            recibir el resultado.
          </p>
        </div>
      </section>

      <section className="t-metodo">
        <div className="t-wrap">
          <p className="t-eyebrow t-eyebrow-verde">Qué obtienes</p>
          <h2 style={{ maxWidth: 640 }}>Dashboard Estratégico Cognitia</h2>
          <p className="t-sub">
            El resultado no es una llamada ni un correo con recomendaciones sueltas. Es un
            documento visual, tuyo, con el análisis completo y el plan que sale de él.
          </p>
          <ol className="t-grid2" style={{ listStyle: 'none', margin: '28px 0 0', padding: 0 }}>
            {DASHBOARD.map((t, i) => (
              <li key={t} style={{ display: 'flex', gap: 12, fontSize: 15, alignItems: 'baseline' }}>
                <span style={{ color: 'var(--verde)', fontWeight: 700, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {t}
              </li>
            ))}
          </ol>
          <p className="t-metodo-pie">
            La estimación de impacto distingue siempre entre dato comprobado, estimación e
            hipótesis. No prometemos cifras de retorno que no podamos sostener.
          </p>
        </div>
      </section>

      <section className="t-sec t-sec-sm">
        <div className="t-wrap" style={{ maxWidth: 760 }}>
          <p className="t-eyebrow">Qué ocurre después</p>
          <h2>Tú decides el siguiente paso</h2>
          <p className="t-sub">
            Con el dashboard y el roadmap en la mano tienes tres caminos: ejecutarlo por tu
            cuenta, ejecutarlo con tu equipo, o que lo implementemos contigo. El diagnóstico se
            entrega completo en cualquiera de los tres casos — no es un documento que solo sirva
            si nos contratas después.
          </p>
          <Link to="/servicios" className="t-quicklink" style={{ display: 'inline-block', marginTop: 18 }}>
            Ver cómo trabajamos las etapas siguientes →
          </Link>
        </div>
      </section>

      <section className="t-sec t-sec-sm">
        <div className="t-wrap">
          <p className="t-eyebrow t-eyebrow-verde">Qué no incluye</p>
          <h2 style={{ maxWidth: 560 }}>Para que no haya malentendidos</h2>
          <div className="t-grid3" style={{ marginTop: 28 }}>
            {NO_INCLUYE.map(item => (
              <div key={item.t} className="t-card">
                <h3>{item.t}</h3>
                <p className="t-cardtxt">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="t-cta">
        <div className="t-wrap t-cta-in">
          <h2 style={{ maxWidth: 560 }}>¿Empezamos por entender tu negocio?</h2>
          <p>Cuéntanos qué quieres mejorar. Si el diagnóstico no es lo que necesitas, te lo decimos.</p>
          <div className="t-actions">
            <Link to="/contacto" className="t-btn t-btn-claro">Solicitar Diagnóstico Estratégico →</Link>
            <Link to="/scorecard" className="t-btn-ghost t-ghost-claro">Hacer primero la evaluación gratuita</Link>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', marginTop: 18 }}>
            La evaluación gratuita es un punto de partida de dos minutos. No sustituye al
            Diagnóstico Estratégico.
          </p>
        </div>
      </section>
    </>
  )
}
