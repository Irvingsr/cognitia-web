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
  { id: 'team',         text: 'Nuestro equipo trabaja de forma 100% manual y tradicional', cat: 'Educación y Cultura' },
  { id: 'saturated',    text: 'El dueño del negocio está saturado operativamente y sin tiempo', cat: 'Consultoría de Procesos' },
  { id: 'no_tools',     text: 'No sabemos qué herramientas usar ni por dónde empezar', cat: 'Educación y Estrategia' },
]

function getRoadmap(selected, businessName, industry) {
  const score = Math.max(16, 100 - selected.length * 12)
  const maturity = score > 75
    ? 'Intermedio-Alto'
    : score > 45
    ? 'Intermedio-Inicial'
    : 'Nivel de Improvisación Operativa'
  const description = score > 75
    ? 'Tu negocio tiene bases sólidas, pero sus sistemas no están conectados entre sí. Estás listo para automatizar de punta a punta.'
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
    phase1.push('Taller práctico para nivelar al equipo con las herramientas que ya usa el negocio.')
    phase2.push('Crear una guía interna de uso de herramientas y criterios para el equipo.')
    tools.push('Talleres Cognitia', 'ChatGPT Teams')
  }
  if (phase1.length === 0) {
    phase1.push('Taller de Diagnóstico Inicial con Cognitia.')
    phase2.push('Definición de los primeros procesos a automatizar.')
    tools.push('ChatGPT', 'Make.com')
  }

  return { score, maturity, description, phase1, phase2, tools: [...new Set(tools)] }
}

export default function Scorecard() {
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
    <>
      <section className="t-hero t-sec-first">
        <div className="t-wrap t-hero-in t-hero-solo" style={{ textAlign: 'center', margin: '0 auto' }}>
          <p className="t-eyebrow" style={{ justifyContent: 'center' }}>Gratis · 2 minutos</p>
          <h1>Evaluación de tus procesos</h1>
          <p className="t-lead" style={{ margin: '0 auto' }}>
            Responde unas preguntas y obtén una primera lectura de en qué punto está tu
            negocio y qué procesos podrían automatizarse.
          </p>
          <p className="t-micro" style={{ margin: '20px auto 0', maxWidth: 620, borderTop: '1px solid var(--borde)', paddingTop: 16 }}>
            Es una evaluación inicial y automática. <strong>No sustituye al{' '}
            <Link to="/diagnostico" style={{ color: 'var(--verde)' }}>Diagnóstico Estratégico Cognitia</Link></strong>,
            que analiza tu operación a fondo y entrega un dashboard con prioridades y un plan
            de acción.
          </p>
        </div>
      </section>

      <section className="t-sec t-sec-first">
        <div className="t-wrap" style={{ maxWidth: 900 }}>

          {/* ── STEP 1: FORMULARIO ── */}
          {step === 1 && (
            <form onSubmit={startAnalysis} className="t-card">
              <h3>Paso 1: Cuéntanos de tu negocio</h3>
              <div className="t-form-row2" style={{ marginTop: 18 }}>
                <div className="t-field">
                  <label>Nombre del Negocio / Empresa</label>
                  <input className="t-input" placeholder="Ej. Restaurante El Sabor" value={nombre} onChange={e => setNombre(e.target.value)} required />
                </div>
                <div className="t-field">
                  <label>Sector o Industria</label>
                  <select className="t-select" value={sector} onChange={e => setSector(e.target.value)} required>
                    <option value="">Selecciona una opción</option>
                    {SECTORS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              <h3 style={{ marginTop: 32 }}>Paso 2: ¿Con qué problemas lidias a diario?</h3>
              <p className="t-sub" style={{ margin: '6px 0 16px', fontSize: 14.5 }}>Selecciona todos los que apliquen:</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {BOTTLENECKS.map(b => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => toggle(b.id)}
                    className={`t-option${selected.includes(b.id) ? ' t-option-selected' : ''}`}
                  >
                    <span style={{ display: 'block', fontWeight: 500 }}>{b.text}</span>
                    <span style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--tinta-2)', marginTop: 4 }}>
                      {b.cat}
                    </span>
                  </button>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <button type="submit" className="t-btn" style={{ padding: '16px 40px', fontSize: 16 }}>
                  Analizar mi negocio →
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 2: CARGANDO ── */}
          {step === 2 && (
            <div className="t-card t-card-center" style={{ padding: '60px 40px', gap: 20 }}>
              <div style={{ position: 'relative', width: 100, height: 100 }}>
                <div style={{
                  width: '100%', height: '100%', border: '4px solid var(--salvia)',
                  borderTop: '4px solid var(--verde)', borderRadius: '50%',
                  animation: 'spin 1.2s linear infinite',
                }} />
                <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 20, fontWeight: 800 }}>
                  {progress}%
                </span>
              </div>
              <h3>Analizando la estructura de tu negocio...</h3>
              <p className="t-cardtxt" style={{ maxWidth: 500 }}>
                Procesando tus cuellos de botella e identificando qué conviene automatizar primero...
              </p>
              <div className="t-infobox" style={{ maxWidth: 560, textAlign: 'left', width: '100%' }}>
                {progress > 10 && <p>› Mapeando procesos para: {nombre || 'Empresa'}</p>}
                {progress > 30 && <p>› Identificando cuellos de botella: {sector || 'General'}</p>}
                {progress > 50 && <p>› Detectados {selected.length} cuellos de botella operativos.</p>}
                {progress > 70 && <p>› Diseñando Roadmap de 2 Fases...</p>}
                {progress > 90 && <p>› Generando sugerencias de herramientas y ROI... ✓</p>}
              </div>
            </div>
          )}

          {/* ── STEP 3: RESULTADOS ── */}
          {step === 3 && (
            <div className="t-grid2" style={{ gridTemplateColumns: '1fr 1.5fr', alignItems: 'start' }}>
              <div className="t-card t-card-center">
                <span className="t-blog-cat">Resultado del Diagnóstico</span>
                <h3 style={{ marginTop: 16 }}>{nombre || 'Tu Empresa'}</h3>
                <span className="t-cardtxt" style={{ marginBottom: 24 }}>{sector}</span>

                <div style={{ width: 140, height: 140, margin: '8px 0 24px' }}>
                  <div style={{
                    width: '100%', height: '100%', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8,
                    background: `conic-gradient(var(--verde) ${roadmap.score}%, var(--salvia) ${roadmap.score}%)`,
                  }}>
                    <div style={{
                      background: 'var(--blanco)', width: '100%', height: '100%', borderRadius: '50%',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 32, fontWeight: 800, lineHeight: 1 }}>{roadmap.score}%</span>
                      <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', color: 'var(--tinta-2)' }}>Eficiencia</span>
                    </div>
                  </div>
                </div>

                <p className="t-eyebrow" style={{ marginBottom: 2 }}>Nivel de Madurez Operativa</p>
                <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--verde)', marginBottom: 12 }}>
                  {roadmap.maturity}
                </p>
                <p className="t-cardtxt" style={{ marginBottom: 24 }}>{roadmap.description}</p>
                <button onClick={reset} className="t-btn-ghost" style={{ width: '100%' }}>
                  ↺ Realizar nuevo test
                </button>
              </div>

              <div className="t-card">
                <h3>Roadmap sugerido</h3>
                <p className="t-cardtxt" style={{ marginBottom: 24, flex: 'none' }}>
                  Acciones diseñadas por Cognitia para resolver tus cuellos de botella específicos:
                </p>

                <div className="t-area">
                  <span className="t-blog-cat">Fase 1: Quick Wins (0 – 30 días)</span>
                  <ul className="t-checklist" style={{ marginTop: 14 }}>
                    {roadmap.phase1.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>

                <div className="t-area" style={{ marginTop: 20 }}>
                  <span className="t-blog-cat">Fase 2: Automatización Core (30 – 90 días)</span>
                  <ul className="t-checklist" style={{ marginTop: 14 }}>
                    {roadmap.phase2.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>

                <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--borde)' }}>
                  <span className="t-eyebrow" style={{ display: 'block' }}>Herramientas Recomendadas</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
                    {roadmap.tools.map(t => (
                      <span key={t} style={{
                        fontSize: 13, fontWeight: 600, background: 'var(--salvia)',
                        color: 'var(--tinta)', padding: '6px 14px', borderRadius: 100,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>

                <div className="t-infobox" style={{ marginTop: 28 }}>
                  <p>¿Quieres implementar este Roadmap?</p>
                  <p style={{ marginBottom: 16 }}>
                    En Cognitia no solo te damos el plan — te acompañamos en el diseño, desarrollo
                    e integración para garantizar resultados reales.
                  </p>
                  <a
                    href="https://calendly.com/irvingsr-cognitiamx/llamada-de-consultoria-cognitia-30-min"
                    target="_blank" rel="noreferrer" className="t-btn" style={{ width: '100%' }}
                  >
                    Agendar Sesión de Diagnóstico Gratis →
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
