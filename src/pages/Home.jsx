import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const TERMINAL_LINES = [
  { cmd: '> ', text: 'midiendo_friccion_operativa.py' },
  { cmd: '> ', text: 'zona 1: lead sin respuesta detectado (3h 42min)' },
  { cmd: '> ', text: 'desplegando agente: respuesta < 1 min, 24/7' },
  { cmd: '> ', text: 'fricción eliminada. seguimiento activo ✓' },
]

const ZONAS = [
  {
    num: 'Zona 1',
    title: 'Primer Contacto',
    desc: 'Un prospecto que no recibe respuesta personalizada en los primeros 5 minutos tiene 78% más probabilidad de irse con tu competencia. ¿Qué tan rápido respondes hoy?',
  },
  {
    num: 'Zona 2',
    title: 'Seguimiento',
    desc: 'La mayoría de las ventas ocurren entre el contacto 5 y el 12. La mayoría de los equipos se rinde en el 2. Ahí se queda el dinero.',
  },
  {
    num: 'Zona 3',
    title: 'Cliente Activo',
    desc: '¿Tu cliente siente que lo anticipas o que solo lo buscas cuando te conviene? Un cliente anticipado tiene 4X más probabilidad de referirte.',
  },
  {
    num: 'Zona 4',
    title: 'Visibilidad Operativa',
    desc: '¿Sabes en tiempo real cuántos prospectos activos tienes y en qué etapa están? Sin visibilidad, tu operación vive en reacción permanente.',
  },
]

const SECTORES = [
  {
    icon: '✚',
    title: 'Clínicas Estéticas y Dentales',
    desc: 'Agenda llena sin perder pacientes en WhatsApp. Confirmaciones, recordatorios y seguimiento post-consulta automáticos, con el tono de tu clínica.',
  },
  {
    icon: '⌂',
    title: 'Inmobiliarias y Real Estate',
    desc: 'Leads de portales atendidos y calificados en menos de 1 minuto, 24/7. Seguimiento que no se rinde y pipeline visible en tiempo real.',
  },
  {
    icon: '◆',
    title: 'Empresas y Servicios B2B',
    desc: 'Operación, cotizaciones y atención sin cuellos de botella. Menos horas de administración, más control y reportes claros para dirección.',
  },
]

const STEPS = [
  { title: 'Auditoría IFC™', desc: 'Medimos la fricción en tus 4 zonas de contacto y la traducimos a dinero: cuántos prospectos y cuántas ventas estás perdiendo hoy. Sin costo.' },
  { title: 'Diseño del Sistema', desc: 'Diseñamos los agentes de IA exactos para eliminar la fricción detectada. Con el tono y la personalidad de tu negocio. Sin soluciones genéricas.' },
  { title: 'Implementación', desc: 'Activamos los agentes en tu operación real: WhatsApp, portales, CRM. Tu equipo aprende a operarlos sin curva técnica.' },
  { title: 'Evolución Mensual', desc: 'El sistema se mide, se ajusta y mejora cada mes. La fricción no regresa: tu operación se vuelve más fina con el tiempo.' },
]

const s = {
  hero: { padding: '100px 0 80px' },
  heroLeft: { display: 'flex', flexDirection: 'column', gap: 0 },
  heroSub: { color: 'var(--muted)', fontSize: 17, lineHeight: 1.7, margin: '20px 0 32px', maxWidth: 500 },
  heroBtns: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  heroStats: { display: 'flex', gap: 32, flexWrap: 'wrap', marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)' },
  heroStat: { display: 'flex', flexDirection: 'column', gap: 4 },
  heroStatVal: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 1, color: 'var(--text)' },
  heroStatDesc: { fontSize: 12, color: 'var(--muted)' },
  heroRight: {},
  mockupWrap: { display: 'flex', flexDirection: 'column', gap: 12 },
  statsRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  statCard: {
    background: 'var(--dark3)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '18px 20px',
  },
  statLabel: { fontSize: 12, color: 'var(--muted)', marginBottom: 4 },
  statVal: { fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem', letterSpacing: 1 },
  statSub: { fontSize: 11, color: 'var(--muted)', marginTop: 4 },
  chartCard: {
    background: 'var(--dark3)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '16px 20px',
  },
  chartBars: { display: 'flex', alignItems: 'flex-end', gap: 8, height: 80, marginBottom: 8 },
  barWrap: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%' },
  bar: { width: '100%', borderRadius: '4px 4px 0 0', transition: 'height 0.5s' },
  barLabel: { fontSize: 10, color: 'var(--muted)' },
  sectoresGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24,
  },
  sectorIcon: {
    fontSize: 28, color: 'var(--electric)', marginBottom: 16,
    width: 56, height: 56, borderRadius: 14,
    background: 'rgba(110,159,212,0.08)', border: '1px solid rgba(110,159,212,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  zonas: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24,
  },
  zonaNum: {
    fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
    color: 'var(--purple)', marginBottom: 10,
    background: 'rgba(139,30,45,0.12)', border: '1px solid rgba(139,30,45,0.3)',
    borderRadius: 100, padding: '4px 12px', display: 'inline-block',
  },
  steps: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24,
  },
  step: { position: 'relative' },
  stepNum: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: '3.5rem', letterSpacing: 2,
    color: 'rgba(110,159,212,0.22)', lineHeight: 1, marginBottom: 12,
  },
  stepTitle: { fontSize: '1.3rem', marginBottom: 10 },
  stepDesc: { fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 },
  origen: {
    maxWidth: 760, margin: '56px auto 0', textAlign: 'center',
    padding: '28px 32px', borderRadius: 16,
    background: 'rgba(30,58,95,0.25)', border: '1px solid rgba(110,159,212,0.15)',
    fontSize: 15, color: 'var(--muted)', lineHeight: 1.8,
  },
  ctaBand: {
    background: 'linear-gradient(135deg, rgba(30,58,95,0.45), rgba(139,30,45,0.25))',
    borderTop: '1px solid rgba(110,159,212,0.25)',
    borderBottom: '1px solid rgba(139,30,45,0.2)',
    padding: '64px 0',
  },
  ctaBandInner: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: 32, flexWrap: 'wrap',
  },
}

function TerminalMockup() {
  const [lineCount, setLineCount] = useState(0)

  useEffect(() => {
    if (lineCount >= TERMINAL_LINES.length) return
    const timer = setTimeout(() => {
      setLineCount(c => c + 1)
    }, 900)
    return () => clearTimeout(timer)
  }, [lineCount])

  const lines = TERMINAL_LINES.slice(0, lineCount)

  return (
    <div style={s.mockupWrap}>
      {/* Stats row */}
      <div style={s.statsRow}>
        <div style={s.statCard}>
          <p style={s.statLabel}>Velocidad de Respuesta</p>
          <p style={{ ...s.statVal, color: 'var(--electric)' }}>&lt; 1 min</p>
          <p style={s.statSub}>Con agente activo · 24/7, sin descansos ni vacaciones</p>
        </div>
        <div style={s.statCard}>
          <p style={s.statLabel}>Seguimiento por Prospecto</p>
          <p style={{ ...s.statVal, color: 'var(--text)' }}>5–12</p>
          <p style={s.statSub}>Contactos donde ocurre la venta · el agente nunca se rinde</p>
        </div>
      </div>

      {/* Bar chart */}
      <div style={s.chartCard}>
        <div style={s.chartBars}>
          {[100, 70, 45, 20].map((h, i) => (
            <div key={i} style={s.barWrap}>
              <div style={{ ...s.bar, height: `${h}%`, background: i === 3 ? 'linear-gradient(to top, var(--blue-mid), var(--electric))' : 'rgba(139,30,45,0.35)' }} />
              <span style={s.barLabel}>{['Hoy', 'Mes 1', 'Mes 2', 'Mes 3'][i]}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ color: 'var(--text)', fontWeight: 600, fontSize: 13 }}>Índice de Fricción Cognitiva™</span>
          <span style={{ color: 'var(--electric)', fontSize: 11 }}>● Fricción bajando = ventas subiendo</span>
        </div>
      </div>

      {/* Terminal */}
      <div className="terminal">
        <div className="terminal-bar">
          <div className="dot dot-red" />
          <div className="dot dot-yellow" />
          <div className="dot dot-green" />
          <span>cognitia-engine v2.1</span>
        </div>
        <div className="terminal-body">
          {lines.map((l, i) => (
            <p key={i} className="terminal-line">
              <span className="cmd">{l.cmd}</span>{l.text}
            </p>
          ))}
          {lineCount < TERMINAL_LINES.length && (
            <p className="terminal-line"><span className="cmd">&gt; </span><span className="cursor">▋</span></p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="page-bg">
      {/* HERO */}
      <section style={s.hero}>
        <div className="container hero-grid">
          <div style={s.heroLeft}>
            <p className="label label-purple fade-up d1">Índice de Fricción Cognitiva™</p>
            <h1 className="fade-up d2">
              La fricción invisible de tu operación{' '}
              <span className="grad-electric">te está costando ventas</span>
            </h1>
            <p style={s.heroSub} className="fade-up d3">
              Cada lead sin respuesta, cada seguimiento abandonado y cada cliente
              que no se siente esperado es dinero que se va. Lo medimos con el
              IFC™ y lo eliminamos con agentes de IA que trabajan 24/7 en tu
              negocio — con tu tono, sin curva técnica para ti.
            </p>
            <div style={s.heroBtns} className="fade-up d4">
              <Link to="/diagnostico" className="btn-primary">
                Mide tu fricción gratis →
              </Link>
              <Link to="/contacto" className="btn-secondary">
                Agenda 30 min con Irving
              </Link>
            </div>
            <div style={s.heroStats} className="fade-up d4">
              {[
                { val: '78%',  desc: 'de los prospectos se van con la competencia si no respondes en 5 minutos' },
                { val: '5–12', desc: 'contactos donde ocurre la venta. La mayoría de los equipos se rinde en el 2' },
                { val: '4x',   desc: 'más referidos cuando el cliente siente que lo anticipas' },
              ].map(st => (
                <div key={st.val} style={s.heroStat}>
                  <span style={s.heroStatVal}>{st.val}</span>
                  <span style={s.heroStatDesc}>{st.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={s.heroRight} className="fade-up d3">
            <TerminalMockup />
          </div>
        </div>
      </section>

      {/* SECTORES */}
      <section className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div className="section-header">
            <p className="label label-electric">Dónde implementamos</p>
            <h2>Sectores donde la fricción cuesta más caro</h2>
            <p>Negocios donde cada prospecto vale mucho — y cada uno que se pierde, duele.</p>
          </div>
          <div style={s.sectoresGrid}>
            {SECTORES.map((sec, i) => (
              <div key={i} className="glass-card">
                <div style={s.sectorIcon}>{sec.icon}</div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: 10 }}>{sec.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAS 4 ZONAS DE FRICCIÓN */}
      <section className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div className="section-header">
            <p className="label label-purple">La metodología</p>
            <h2>Las 4 zonas donde tu negocio pierde dinero</h2>
            <p>El IFC™ mide el esfuerzo invisible que le cuesta a tus clientes hacer negocios contigo — y lo traduce a pesos.</p>
          </div>
          <div style={s.zonas}>
            {ZONAS.map((z, i) => (
              <div key={i} className="glass-card">
                <span style={s.zonaNum}>{z.num}</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: 10 }}>{z.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{z.desc}</p>
              </div>
            ))}
          </div>
          <div style={s.origen}>
            La metodología IFC™ nació en 9 años de hospitalidad de ultra-lujo en la
            Riviera Maya, donde el estándar es uno solo: <strong style={{ color: 'var(--text)' }}>el
            cliente nunca espera, nunca repite información y nunca siente que no era
            esperado.</strong> Hoy aplicamos ese estándar a tu operación con inteligencia artificial.
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div className="section-header">
            <p className="label label-electric">El proceso</p>
            <h2>De la fricción medida al agente activo</h2>
            <p>Sin curva de aprendizaje para ti. Nosotros construimos, tú operas.</p>
          </div>
          <div style={s.steps}>
            {STEPS.map((step, i) => (
              <div key={i} style={s.step} className="card">
                <div style={s.stepNum}>{String(i + 1).padStart(2, '0')}</div>
                <h3 style={s.stepTitle}>{step.title}</h3>
                <p style={s.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={s.ctaBand}>
        <div className="container" style={s.ctaBandInner}>
          <div>
            <h2 style={{ color: '#fff' }}>¿Cuánto te está costando la fricción hoy?</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>
              Calcula tu Índice de Fricción Cognitiva™ gratis. 2 minutos, sin compromiso.
            </p>
          </div>
          <Link to="/diagnostico" className="btn-success" style={{ flexShrink: 0 }}>
            Calcular mi IFC™ gratis →
          </Link>
        </div>
      </section>
    </div>
  )
}
