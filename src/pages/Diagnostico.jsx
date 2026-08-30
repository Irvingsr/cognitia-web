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
  'Qué procesos podrían beneficiarse de tecnología o IA',
  'Qué NO conviene automatizar todavía',
  'Prioridades recomendadas',
  'Plan de acción a 30, 60 y 90 días',
  'Estimación de impacto potencial',
]

const PARA_QUIEN = [
  'Tu negocio ya está funcionando y quieres mejorarlo, no arrancarlo.',
  'Sabes que algo te está frenando, pero no tienes claro qué atacar primero.',
  'Escuchas hablar de IA todos los días y no sabes qué aplica a tu caso.',
  'Prefieres entender antes de invertir.',
]

const NO_ES_PARA = [
  'Buscas que alguien te instale una herramienta específica que ya decidiste.',
  'Quieres implementar IA sin revisar antes cómo opera tu negocio.',
  'Esperas un resultado garantizado antes de que exista un análisis.',
]

const NO_INCLUYE = [
  { t: 'No es la implementación', d: 'El diagnóstico define qué hacer y en qué orden. Construir lo priorizado es una etapa aparte.' },
  { t: 'No es una auditoría técnica de sistemas', d: 'Analizamos la operación y sus procesos, no una revisión de infraestructura o de código.' },
  { t: 'No es el Scorecard gratuito', d: 'El Scorecard es una evaluación inicial de dos minutos. El Diagnóstico Estratégico es una intervención con entregable.' },
]

export default function Diagnostico() {
  return (
    <div className="page-bg">
      {/* Header */}
      <section style={s.header}>
        <div className="container">
          <p className="label label-electric">Diagnóstico Estratégico Cognitia</p>
          <h1 style={{ maxWidth: 860 }}>
            Descubre qué mejorar, qué automatizar y qué priorizar{' '}
            <span className="grad-success">antes de invertir</span> en inteligencia artificial
          </h1>
          <p style={s.sub}>
            Analizamos cómo opera tu negocio hoy, identificamos qué está frenando tus resultados
            y te entregamos un plan priorizado. Con eso en la mano decides qué hacer — con
            nosotros o por tu cuenta.
          </p>
          <div style={s.actions}>
            <Link to="/contacto" className="btn-primary">Solicitar Diagnóstico Estratégico →</Link>
          </div>
        </div>
      </section>

      {/* Qué problema resuelve */}
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <p className="label label-purple">Qué problema resuelve</p>
          <h2>La falta de claridad cuesta más que la tecnología</h2>
          <p style={s.body}>
            La mayoría de los negocios que se acercan a la inteligencia artificial no tienen un
            problema de herramientas: tienen un problema de prioridades. Se invierte en lo que
            está de moda en lugar de en lo que realmente limita la operación, y el resultado es
            gasto sin cambio real.
          </p>
          <p style={s.body}>
            El Diagnóstico Estratégico existe para evitar exactamente eso: primero entender el
            negocio, después decidir dónde tiene sentido aplicar tecnología — y dónde no.
          </p>
        </div>
      </section>

      {/* Para quién es */}
      <section className="section-sm">
        <div className="container" style={s.twoCol}>
          <div className="card" style={s.col}>
            <p style={s.colTitle}>Para quién es</p>
            <ul style={s.list}>
              {PARA_QUIEN.map((t, i) => (
                <li key={i} style={s.listItem}><span style={s.bulletYes}>✓</span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="card" style={s.col}>
            <p style={s.colTitle}>Para quién no es</p>
            <ul style={s.list}>
              {NO_ES_PARA.map((t, i) => (
                <li key={i} style={s.listItem}><span style={s.bulletNo}>—</span>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Qué analizamos */}
      <section className="section">
        <div className="container">
          <p className="label label-electric">Qué analizamos</p>
          <h2 style={{ maxWidth: 620 }}>Cinco frentes, en el orden en que importan</h2>
          <div style={s.grid}>
            {ANALIZAMOS.map((item, i) => (
              <div key={i} className="card" style={s.item}>
                <span style={s.itemNum}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p style={s.itemTitle}>{item.t}</p>
                  <p style={s.itemBody}>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={s.note}>
            Para el análisis usamos el <strong>Índice de Fricción Cognitiva™ (IFC™)</strong>, la
            metodología de diagnóstico que desarrollamos en Cognitia para localizar dónde un
            negocio pierde ventas, tiempo o capacidad de atención. No necesitas conocerla para
            recibir el resultado.
          </p>
        </div>
      </section>

      {/* Dashboard */}
      <section className="section" style={s.dashSection}>
        <div className="container">
          <p className="label label-purple">Qué obtienes</p>
          <h2 style={{ maxWidth: 640 }}>Dashboard Estratégico Cognitia</h2>
          <p style={s.body}>
            El resultado no es una llamada ni un correo con recomendaciones sueltas. Es un
            documento visual, tuyo, con el análisis completo y el plan que sale de él.
          </p>
          <ol style={s.dashList}>
            {DASHBOARD.map((t, i) => (
              <li key={i} style={s.dashItem}>
                <span style={s.dashNum}>{String(i + 1).padStart(2, '0')}</span>
                {t}
              </li>
            ))}
          </ol>
          <p style={s.disclaimer}>
            La estimación de impacto distingue siempre entre dato comprobado, estimación e
            hipótesis. No prometemos cifras de retorno que no podamos sostener.
          </p>
        </div>
      </section>

      {/* Qué ocurre después */}
      <section className="section-sm">
        <div className="container" style={{ maxWidth: 760 }}>
          <p className="label label-electric">Qué ocurre después</p>
          <h2>Tú decides el siguiente paso</h2>
          <p style={s.body}>
            Con el dashboard y el roadmap en la mano tienes tres caminos: ejecutarlo por tu
            cuenta, ejecutarlo con tu equipo, o que lo implementemos contigo. El diagnóstico se
            entrega completo en cualquiera de los tres casos — no es un documento que solo sirva
            si nos contratas después.
          </p>
          <Link to="/servicios" style={s.inlineLink}>Ver cómo trabajamos las etapas siguientes →</Link>
        </div>
      </section>

      {/* Qué no incluye */}
      <section className="section-sm">
        <div className="container">
          <p className="label label-purple">Qué no incluye</p>
          <h2 style={{ maxWidth: 560 }}>Para que no haya malentendidos</h2>
          <div style={s.grid}>
            {NO_INCLUYE.map((item, i) => (
              <div key={i} className="card" style={s.item}>
                <div>
                  <p style={s.itemTitle}>{item.t}</p>
                  <p style={s.itemBody}>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container" style={s.cta}>
          <h2 style={{ maxWidth: 560 }}>¿Empezamos por entender tu negocio?</h2>
          <p style={s.body}>
            Cuéntanos qué quieres mejorar. Si el diagnóstico no es lo que necesitas, te lo
            decimos.
          </p>
          <div style={s.actions}>
            <Link to="/contacto" className="btn-primary">Solicitar Diagnóstico Estratégico →</Link>
            <Link to="/scorecard" className="btn-secondary">Hacer primero la evaluación gratuita</Link>
          </div>
          <p style={s.disclaimer}>
            La evaluación gratuita es un punto de partida de dos minutos. No sustituye al
            Diagnóstico Estratégico.
          </p>
        </div>
      </section>
    </div>
  )
}

const s = {
  header: { padding: '100px 0 48px' },
  sub: { fontSize: 17, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 680, marginTop: 20 },
  actions: { display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 },
  body: { fontSize: 16, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 680, marginTop: 16 },
  note: {
    fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 700, marginTop: 28,
    borderLeft: '3px solid var(--electric)', paddingLeft: 18,
  },
  disclaimer: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 620, marginTop: 20, opacity: 0.85 },
  twoCol: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 },
  col: { padding: 26 },
  colTitle: { fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 },
  list: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 },
  listItem: { display: 'flex', gap: 10, fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.65 },
  bulletYes: { color: 'var(--electric)', flexShrink: 0 },
  bulletNo: { color: 'var(--muted)', flexShrink: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18, marginTop: 28 },
  item: { display: 'flex', gap: 16, padding: 24, alignItems: 'flex-start' },
  itemNum: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: 'var(--electric)', lineHeight: 1, flexShrink: 0 },
  itemTitle: { fontSize: 16, fontWeight: 700, marginBottom: 6 },
  itemBody: { fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 },
  dashSection: { borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  dashList: { listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12, marginTop: 28 },
  dashItem: { display: 'flex', gap: 12, fontSize: 15, color: 'var(--muted)', lineHeight: 1.6, alignItems: 'baseline' },
  dashNum: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, color: 'var(--purple)', flexShrink: 0 },
  inlineLink: { display: 'inline-block', marginTop: 20, color: 'var(--electric)', fontSize: 14.5, fontWeight: 600 },
  cta: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
}
