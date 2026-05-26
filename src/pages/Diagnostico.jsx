import { useState } from 'react'
import { Link } from 'react-router-dom'

const SECTORS = [
  { value: 'Servicios Profesionales', label: 'Servicios Profesionales / Consultoría' },
  { value: 'E-commerce', label: 'E-commerce / Tienda Online' },
  { value: 'Educación', label: 'Educación / Cursos' },
  { value: 'Salud y Bienestar', label: 'Salud y Bienestar' },
  { value: 'Tecnología', label: 'Tecnología / Software' },
  { value: 'Bienes Raíces', label: 'Bienes Raíces' },
  { value: 'Turismo', label: 'Turismo y Hospitalidad' },
  { value: 'Construcción', label: 'Construcción' },
  { value: 'Legal y Contable', label: 'Legal y Contable' },
  { value: 'Otro', label: 'Otro sector' },
]

const BOTTLENECKS = [
  { id: 'whatsapp',     text: 'Respondemos mensajes de WhatsApp y redes de forma manual todo el día', cat: 'Marketing/Conversacional' },
  { id: 'no_icp',       text: 'No tenemos claridad de nuestro cliente ideal o propuesta de valor', cat: 'Marketing Estratégico' },
  { id: 'no_content',   text: 'Publicamos contenido sin estrategia ni consistencia', cat: 'Marketing Digital' },
  { id: 'no_processes', text: 'Las ventas e interacciones se cierran con total improvisación', cat: 'Procesos Comerciales' },
  { id: 'no_followup',  text: 'Perdemos ventas porque olvidamos dar seguimiento a los prospectos', cat: 'Sistemas Comerciales' },
  { id: 'team',         text: 'Nuestro equipo no usa IA y opera de forma 100% tradicional', cat: 'Educación y Cultura' },
  { id: 'saturated',    text: 'El dueño del negocio está saturado operativamente y sin tiempo', cat: 'Consultoría de Procesos' },
  { id: 'no_tools',     text: 'No sabemos qué herramientas de IA usar ni por dónde empezar', cat: 'Educación y Estrategia' },
]

function getRoadmap(selected, businessName, industry) {
  const score = Math.max(16, 100 - selected.length * 12)
  const maturity = score > 75
    ? 'Intermedio-Alto'
    : score > 45
    ? 'Intermedio-Inicial'
    : 'Nivel de Improvisación Operativa'
  const description = score > 75
    ? 'Tu negocio tiene bases sólidas, pero carece de sistemas unificados de IA. Estás listo para automatizaciones end-to-end.'
    : score > 45
    ? 'Tienes procesos funcionando, pero gran parte de la operación depende del esfuerzo manual. Hay alto riesgo de pérdida de ventas.'
    : 'Gran carga operativa manual. Tu negocio depende de respuestas inmediatas del dueño o equipo, perdiendo escalabilidad y ventas.'

  const phase1 = [], phase2 = [], tools = []

  if (selected.includes('whatsapp') || selected.includes('no_followup')) {
    phase1.push('Configurar un sistema de Marketing Conversacional (chatbot híbrido en WhatsApp).')
    phase2.push('Integrar WhatsApp con un CRM y automatizar el flujo de seguimiento post-venta.')
    tools.push('ManyChat', 'Make.com', 'Kommo CRM')
  }
  if (selected.includes('no_icp') || selected.includes('no_content')) {
    phase1.push('Estructurar el Avatar de Cliente Ideal (Buyer Persona) con prompts de ingeniería avanzados.')
    phase2.push('Crear un sistema de contenido generativo recurrente para programar posts mensuales.')
    tools.push('Claude.ai', 'ChatGPT Plus', 'Buffer / Metricool')
  }
  if (selected.includes('no_processes') || selected.includes('saturated') || selected.includes('no_tools')) {
    phase1.push('Auditar y documentar el proceso más repetitivo de la empresa para delegarlo a un agente digital.')
    phase2.push('Implementar automatización de tareas administrativas: correo, reportes, facturación.')
    tools.push('Make.com', 'Zapier', 'Agentes Cognitia')
  }
  if (selected.includes('team') || selected.includes('no_tools')) {
    phase1.push('Taller de IA Práctica para nivelar al equipo con herramientas generativas reales.')
    phase2.push('Crear una biblioteca interna de prompts y políticas de uso de IA para la empresa.')
    tools.push('Talleres Cognitia', 'ChatGPT Teams')
  }
  if (phase1.length === 0) {
    phase1.push('Taller de Diagnóstico Inicial con Cognitia.')
    phase2.push('Definición de primeros casos de uso de IA.')
    tools.push('ChatGPT', 'Make.com')
  }

  return { score, maturity, description, phase1, phase2, tools: [...new Set(tools)] }
}

export default function Diagnostico() {
  const [step, setStep] = useState(1)
  const [nombre, setNombre] = useState('')
  const [sector, setSector] = useState('')
  const [selected, setSelected] = useState([])
  const [progress, setProgress] = useState(0)

  const toggle = id => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  const startAnalysis = e => {
    e.preventDefault()
    if (selected.length === 0) { alert('Selecciona al menos un cuello de botella.'); return }
    setStep(2)
    setProgress(0)
    let p = 0
    const iv = setInterval(() => {
      p += 5
      setProgress(p)
      if (p >= 100) { clearInterval(iv); setStep(3) }
    }, 120)
  }

  const reset = () => { setStep(1); setSelected([]); setProgress(0); setNombre(''); setSector('') }

  const roadmap = getRoadmap(selected, nombre, sector)

  return (
    <div className="page-bg">
      {/* Header */}
      <section style={s.header}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="label label-electric animate-fade-in-up d1">Gratis · 2 minutos</span>
          <h1 className="animate-fade-in-up d2">Diagnóstico de Madurez de IA</h1>
          <p style={s.headerSub} className="animate-fade-in-up d3">
            Descubre qué procesos de tu negocio están listos para ser potenciados con IA<br />
            y obtén un Roadmap de acción personalizado.
          </p>
        </div>
      </section>

      <section style={s.body}>
        <div className="container" style={{ maxWidth: 900 }}>

          {/* ── STEP 1: FORMULARIO ── */}
          {step === 1 && (
            <form onSubmit={startAnalysis} className="glass-panel animate-fade-in-up">
              <h3 style={s.stepTitle}><span style={s.stepBar} />Paso 1: Cuéntanos de tu negocio</h3>
              <div style={s.row2}>
                <div style={s.field}>
                  <label style={s.fieldLabel}>Nombre del Negocio / Empresa</label>
                  <input className="form-input" placeholder="Ej. Restaurante El Sabor" value={nombre} onChange={e => setNombre(e.target.value)} required />
                </div>
                <div style={s.field}>
                  <label style={s.fieldLabel}>Sector o Industria</label>
                  <select className="form-input" value={sector} onChange={e => setSector(e.target.value)} required>
                    <option value="">Selecciona una opción</option>
                    {SECTORS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              <h3 style={{ ...s.stepTitle, marginTop: 32 }}><span style={s.stepBar} />Paso 2: ¿Con qué problemas lidias a diario?</h3>
              <p style={s.helper}>Selecciona todos los que apliquen:</p>

              <div style={s.checks}>
                {BOTTLENECKS.map(b => (
                  <label key={b.id} className="custom-checkbox" style={s.checkRow}>
                    <input type="checkbox" checked={selected.includes(b.id)} onChange={() => toggle(b.id)} />
                    <span className="checkmark" />
                    <div>
                      <span style={s.checkText}>{b.text}</span>
                      <span style={s.checkCat}>{b.cat}</span>
                    </div>
                  </label>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: 40 }}>
                <button type="submit" className="btn-primary" style={{ padding: '16px 40px', fontSize: 16 }}>
                  Analizar mi Negocio con IA →
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 2: CARGANDO ── */}
          {step === 2 && (
            <div className="glass-panel animate-fade-in-up" style={s.loading}>
              <div style={s.spinnerWrap}>
                <div style={s.spinner} />
                <span style={s.spinnerPct}>{progress}%</span>
              </div>
              <h3 style={s.loadTitle}>Analizando la estructura de tu negocio...</h3>
              <p style={s.loadSub}>Nuestros algoritmos están procesando tus cuellos de botella e identificando integraciones óptimas de IA...</p>
              <div className="terminal" style={{ maxWidth: 560, margin: '0 auto' }}>
                <div className="terminal-bar">
                  <div className="dot dot-red" /><div className="dot dot-yellow" /><div className="dot dot-green" />
                  <span>cognitia-engine v2.1</span>
                </div>
                <div className="terminal-body">
                  {progress > 10 && <p className="terminal-line"><span className="cmd">&gt; </span>Mapeando procesos para: {nombre || 'Empresa'}</p>}
                  {progress > 30 && <p className="terminal-line"><span className="cmd">&gt; </span>Identificando cuellos de botella: {sector || 'General'}</p>}
                  {progress > 50 && <p className="terminal-line warn"><span className="cmd">&gt; </span>Detectados {selected.length} cuellos de botella operativos.</p>}
                  {progress > 70 && <p className="terminal-line suc"><span className="cmd">&gt; </span>Diseñando Roadmap de 2 Fases...</p>}
                  {progress > 90 && <p className="terminal-line suc"><span className="cmd">&gt; </span>Generando sugerencias de herramientas y ROI... ✓</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: RESULTADOS ── */}
          {step === 3 && (
            <div className="animate-fade-in-up" style={s.resultsGrid}>
              {/* Score card */}
              <div className="glass-panel" style={s.scoreCard}>
                <span style={s.resultsBadge}>Resultado del Diagnóstico</span>
                <h3 style={s.companyName}>{nombre || 'Tu Empresa'}</h3>
                <span style={s.industryTag}>{sector}</span>

                <div style={s.scoreWrap}>
                  <div style={{
                    ...s.scoreCircle,
                    background: `conic-gradient(var(--success) ${roadmap.score}%, rgba(255,255,255,0.05) ${roadmap.score}%)`
                  }}>
                    <div style={s.scoreInner}>
                      <span style={s.scoreNum}>{roadmap.score}%</span>
                      <span style={s.scoreLbl}>Eficiencia IA</span>
                    </div>
                  </div>
                </div>

                <div style={s.maturityBox}>
                  <span style={s.matLabel}>Nivel de Madurez Operativa</span>
                  <span style={{ ...s.matVal, color: roadmap.score > 60 ? 'var(--success)' : '#f59e0b' }}>
                    {roadmap.maturity}
                  </span>
                </div>
                <p style={s.matDesc}>{roadmap.description}</p>
                <button onClick={reset} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: 14 }}>
                  ↺ Realizar nuevo test
                </button>
              </div>

              {/* Roadmap card */}
              <div className="glass-panel" style={{ textAlign: 'left' }}>
                <h3 style={{ marginBottom: 8 }}>Roadmap Sugerido de IA Práctica</h3>
                <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>
                  Acciones diseñadas por Cognitia para resolver tus cuellos de botella específicos:
                </p>

                <div style={s.phase}>
                  <span style={{ ...s.phaseBadge, ...s.phase1Badge }}>Fase 1: Quick Wins (0 – 30 días)</span>
                  <ul style={s.phaseList}>
                    {roadmap.phase1.map((item, i) => <li key={i} style={s.phaseItem}>{item}</li>)}
                  </ul>
                </div>

                <div style={{ ...s.phase, marginTop: 20 }}>
                  <span style={{ ...s.phaseBadge, ...s.phase2Badge }}>Fase 2: Automatización Core (30 – 90 días)</span>
                  <ul style={s.phaseList}>
                    {roadmap.phase2.map((item, i) => <li key={i} style={{ ...s.phaseItem, color: 'var(--success)' }}>{item}</li>)}
                  </ul>
                </div>

                <div style={s.toolsWrap}>
                  <span style={s.toolsLabel}>Herramientas Recomendadas</span>
                  <div style={s.toolsTags}>
                    {roadmap.tools.map((t, i) => <span key={i} style={s.toolTag}>{t}</span>)}
                  </div>
                </div>

                <div style={s.ctaBox}>
                  <h4 style={{ marginBottom: 8, fontSize: 16 }}>¿Quieres implementar este Roadmap?</h4>
                  <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
                    En Cognitia no solo te damos el plan — te acompañamos en el diseño, desarrollo e integración para garantizar resultados reales.
                  </p>
                  <a href="https://calendly.com/irvingsr-cognitiamx/llamada-de-consultoria-cognitia-30-min" target="_blank" rel="noreferrer" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Agendar Sesión de Diagnóstico Gratis →
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  )
}

const s = {
  header: { padding: '100px 0 48px' },
  headerSub: { color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, marginTop: 14 },
  body: { padding: '40px 0 96px' },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 },
  field: { display: 'flex', flexDirection: 'column', gap: 8 },
  fieldLabel: { fontSize: 14, fontWeight: 600, color: 'var(--muted)' },
  stepTitle: { fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text)' },
  stepBar: { width: 3, height: 20, background: 'var(--purple)', borderRadius: 2, display: 'inline-block', flexShrink: 0 },
  helper: { color: 'var(--muted)', fontSize: 14, margin: '8px 0 16px' },
  checks: { display: 'flex', flexDirection: 'column', gap: 10 },
  checkRow: {
    background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)',
    borderRadius: 12, padding: '16px 16px 16px 48px',
    display: 'flex', flexDirection: 'column', gap: 4,
    transition: 'background 0.2s, border-color 0.2s',
  },
  checkText: { fontSize: 15, fontWeight: 500, color: 'var(--text)', lineHeight: 1.4 },
  checkCat: { fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)' },
  // Step 2
  loading: { textAlign: 'center', padding: '60px 40px', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' },
  spinnerWrap: { position: 'relative', width: 100, height: 100 },
  spinner: {
    width: '100%', height: '100%',
    border: '4px solid rgba(123,92,245,0.1)', borderTop: '4px solid var(--purple)',
    borderRadius: '50%', animation: 'spin 1.2s linear infinite',
  },
  spinnerPct: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 20, fontWeight: 800 },
  loadTitle: { fontSize: 22, fontWeight: 700 },
  loadSub: { color: 'var(--muted)', fontSize: 15, maxWidth: 500 },
  // Step 3
  resultsGrid: { display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 32, alignItems: 'start' },
  scoreCard: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  resultsBadge: {
    background: 'rgba(0,219,130,0.1)', border: '1px solid rgba(0,219,130,0.2)',
    color: '#34d399', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
    padding: '4px 12px', borderRadius: 20, marginBottom: 16,
  },
  companyName: { fontSize: 26, fontWeight: 800, marginBottom: 4 },
  industryTag: { fontSize: 14, color: 'var(--muted)', marginBottom: 24, display: 'block' },
  scoreWrap: { width: 140, height: 140, marginBottom: 24 },
  scoreCircle: { width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 },
  scoreInner: { background: '#0A0A0C', width: '100%', height: '100%', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  scoreNum: { fontSize: 32, fontWeight: 900, color: 'var(--text)', lineHeight: 1 },
  scoreLbl: { fontSize: 10, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase' },
  maturityBox: { display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 },
  matLabel: { fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' },
  matVal: { fontSize: 18, fontWeight: 800 },
  matDesc: { fontSize: 14, lineHeight: 1.6, marginBottom: 24, color: 'var(--muted)' },
  phase: { background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', borderRadius: 14, padding: 20 },
  phaseBadge: { display: 'inline-block', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20, marginBottom: 14 },
  phase1Badge: { background: 'rgba(123,92,245,0.1)', color: '#c084fc', border: '1px solid rgba(123,92,245,0.2)' },
  phase2Badge: { background: 'rgba(0,219,130,0.1)', color: '#34d399', border: '1px solid rgba(0,219,130,0.2)' },
  phaseList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 },
  phaseItem: { fontSize: 14, paddingLeft: 20, position: 'relative', lineHeight: 1.5, color: 'var(--text)' },
  toolsWrap: { marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--glass-border)' },
  toolsLabel: { display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 10, color: 'var(--muted)' },
  toolsTags: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  toolTag: { fontSize: 13, fontWeight: 600, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: 'var(--text)', padding: '6px 14px', borderRadius: 20 },
  ctaBox: { background: 'linear-gradient(135deg,rgba(123,92,245,0.08),rgba(0,219,130,0.03))', border: '1px solid rgba(123,92,245,0.2)', borderRadius: 16, padding: 24, marginTop: 28 },
}
