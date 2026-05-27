import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const TERMINAL_LINES = [
  { cmd: '> ', text: 'diagnosticating_workflow.py' },
  { cmd: '> ', text: 'bottleneck detected: WhatsApp manual response' },
  { cmd: '> ', text: 'suggestion: Deploy LLM hybrid system + CRM integration' },
  { cmd: '> ', text: 'estimated time saved: 18h/week ✓' },
]

const STEPS = [
  { title: 'Diagnóstico', desc: 'Analizamos tus procesos, cuellos de botella y dónde la IA tiene mayor impacto en tu negocio.' },
  { title: 'Diseño del Agente', desc: 'Diseñamos el stack de agentes exacto para tu operación. Sin soluciones genéricas.' },
  { title: 'Construcción', desc: 'Construimos e integramos el agente a tus sistemas actuales: WhatsApp, CRM, e-commerce.' },
  { title: 'Activación', desc: 'Onboarding para tu equipo y seguimiento mensual. El agente evoluciona con tu negocio.' },
]

const s = {
  hero: { padding: '100px 0 80px' },
  heroInner: {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: 64, alignItems: 'center',
  },
  heroLeft: { display: 'flex', flexDirection: 'column', gap: 0 },
  heroSub: { color: 'var(--muted)', fontSize: 17, lineHeight: 1.7, margin: '20px 0 32px', maxWidth: 500 },
  heroBtns: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  heroStats: { display: 'flex', gap: 32, marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)' },
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
  chartLegend: { display: 'flex', flexDirection: 'column', gap: 2 },
  steps: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24,
  },
  step: { position: 'relative' },
  stepNum: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: '3.5rem', letterSpacing: 2,
    color: 'rgba(123,92,245,0.2)', lineHeight: 1, marginBottom: 12,
  },
  stepTitle: { fontSize: '1.3rem', marginBottom: 10 },
  stepDesc: { fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 },
  ctaBand: {
    background: 'linear-gradient(135deg, rgba(123,92,245,0.25), rgba(0,219,130,0.15))',
    borderTop: '1px solid rgba(123,92,245,0.3)',
    borderBottom: '1px solid rgba(0,219,130,0.2)',
    padding: '64px 0',
  },
  ctaBandInner: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: 32, flexWrap: 'wrap',
  },
}

function TerminalMockup() {
  const [lines, setLines] = useState([])

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < TERMINAL_LINES.length) {
        setLines(prev => [...prev, TERMINAL_LINES[i]])
        i++
      } else {
        clearInterval(interval)
      }
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={s.mockupWrap}>
      {/* Stats row */}
      <div style={s.statsRow}>
        <div style={s.statCard}>
          <p style={s.statLabel}>Conversión de Leads</p>
          <p style={{ ...s.statVal, color: 'var(--success)' }}>+40%</p>
          <p style={s.statSub}>Promedio con automatización IA · Salesforce 2024</p>
        </div>
        <div style={s.statCard}>
          <p style={s.statLabel}>Horas Recuperadas</p>
          <p style={{ ...s.statVal, color: 'var(--electric)' }}>15h/sem</p>
          <p style={s.statSub}>Promedio por agente implementado · McKinsey 2024</p>
        </div>
      </div>

      {/* Bar chart */}
      <div style={s.chartCard}>
        <div style={s.chartBars}>
          {[40, 55, 70, 100].map((h, i) => (
            <div key={i} style={s.barWrap}>
              <div style={{ ...s.bar, height: `${h}%`, background: i === 3 ? 'linear-gradient(to top, var(--purple), var(--electric))' : 'rgba(255,255,255,0.1)' }} />
              <span style={s.barLabel}>S{i + 1}</span>
            </div>
          ))}
        </div>
        <div style={s.chartLegend}>
          <span style={{ color: 'var(--text)', fontWeight: 600, fontSize: 13 }}>Eficiencia Operativa</span>
          <span style={{ color: 'var(--success)', fontSize: 11 }}>● Sistemas Optimizados</span>
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
          {lines.length < TERMINAL_LINES.length && (
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
        <div className="container" style={s.heroInner}>
          <div style={s.heroLeft}>
            <p className="label label-purple fade-up d1">Agentes de IA para PyMEs</p>
            <h1 className="fade-up d2">
              Hacemos que la IA sea{' '}
              <span className="grad-electric">simple y útil</span>{' '}
              para tu negocio
            </h1>
            <p style={s.heroSub} className="fade-up d3">
              No vendemos humo ni bots genéricos. Creamos roadmaps, automatizamos
              procesos reales y capacitamos a tus equipos para que tu negocio
              facture más y trabaje con claridad.
            </p>
            <div style={s.heroBtns} className="fade-up d4">
              <Link to="/diagnostico" className="btn-primary">
                Iniciar Diagnóstico Gratis →
              </Link>
              <Link to="/servicios" className="btn-secondary">
                Ver Qué Hacemos
              </Link>
            </div>
            <div style={s.heroStats} className="fade-up d4">
              {[
                { val: '68%',  desc: 'PyMEs pierden ventas por falta de seguimiento · AMIPCI 2023' },
                { val: '3x',   desc: 'Más productividad con procesos automatizados · McKinsey 2024' },
                { val: '83%',  desc: 'Clientes esperan respuesta inmediata · Salesforce 2024' },
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

      {/* CÓMO FUNCIONA */}
      <section className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div className="section-header">
            <p className="label label-electric">Proceso</p>
            <h2>De tu problema al agente activo en días</h2>
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
            <h2 style={{ color: '#fff' }}>¿Tu negocio opera de forma manual?</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>Descubre en 2 minutos qué procesos puedes automatizar hoy.</p>
          </div>
          <Link to="/diagnostico" className="btn-success" style={{ flexShrink: 0 }}>
            Hacer el Diagnóstico Gratis →
          </Link>
        </div>
      </section>
    </div>
  )
}
