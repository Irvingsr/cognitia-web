import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Calculadora() {
  const [hours, setHours]     = useState(15)   // hrs semanales por persona
  const [rate, setRate]       = useState(250)   // costo hora en MXN
  const [team, setTeam]       = useState(3)     // personas en el equipo

  // Cálculos (modelo Cognitia — 75% eficiencia, de Antigravity)
  const totalHorasM  = Math.round(hours * 4.33 * team)
  const totalCostoM  = Math.round(totalHorasM * rate)
  const horasAhorradasM = Math.round(totalHorasM * 0.75)
  const costoAhorradoM  = Math.round(totalCostoM * 0.75)
  const costoAhorradoY  = costoAhorradoM * 12
  const costoConIA      = Math.round(totalCostoM * 0.25)

  const fmt = n => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n)

  return (
    <div className="page-bg">
      {/* Header */}
      <section style={s.header}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="label label-success animate-fade-in-up d1">Calculadora Interactiva</span>
          <h1 className="animate-fade-in-up d2">¿Cuánto vale automatizar<br />tu operación?</h1>
          <p style={s.sub} className="animate-fade-in-up d3">
            Estima cuánto tiempo y dinero está perdiendo tu negocio en tareas repetitivas<br />
            que la IA podría resolver en piloto automático.
          </p>
        </div>
      </section>

      <section style={s.body}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="glass-panel animate-fade-in-up" style={s.grid}>

            {/* ── SLIDERS ── */}
            <div style={s.inputs}>
              <h3 style={s.cardTitle}>1. Configura tus datos</h3>
              <p style={s.cardDesc}>Ajusta los valores para aproximarlos a la realidad de tu empresa:</p>

              <SliderField
                label="Horas semanales por persona en tareas manuales"
                helper="Respuesta a WhatsApp, copiar datos, reportes, correos rutinarios, facturación..."
                value={hours} min={2} max={40} step={1}
                display={`${hours} hrs`}
                onChange={setHours}
                minLabel="2h" maxLabel="40h"
              />
              <SliderField
                label="Costo estimado de la hora laboral"
                helper="Sueldo por hora promedio de los colaboradores que realizan tareas manuales."
                value={rate} min={80} max={800} step={10}
                display={`$${rate} MXN`}
                onChange={setRate}
                minLabel="$80 MXN" maxLabel="$800 MXN"
              />
              <SliderField
                label="Número de personas en el equipo"
                helper="Cantidad de colaboradores que realizan estas tareas repetitivas."
                value={team} min={1} max={30} step={1}
                display={`${team} ${team === 1 ? 'persona' : 'personas'}`}
                onChange={setTeam}
                minLabel="1" maxLabel="30"
              />
            </div>

            {/* ── RESULTADOS ── */}
            <div style={s.results}>
              <h3 style={{ ...s.cardTitle, textAlign: 'center' }}>2. Impacto con Cognitia</h3>
              <p style={{ ...s.cardDesc, textAlign: 'center' }}>Al automatizar el 75% de estas actividades rutinarias:</p>

              <div style={s.metrics}>
                <div style={s.metricCard}>
                  <div style={s.metricHead}>
                    <span style={s.metricTitle}>Tiempo Recuperado</span>
                    <span style={{ ...s.metricBadge, ...s.badgePurple }}>Eficiencia</span>
                  </div>
                  <div style={s.metricVal}>{horasAhorradasM} hrs</div>
                  <div style={s.metricSub}>ahorradas al mes para el equipo</div>
                </div>

                <div style={s.metricCard}>
                  <div style={s.metricHead}>
                    <span style={s.metricTitle}>Retorno de Inversión Anual</span>
                    <span style={{ ...s.metricBadge, ...s.badgeGreen }}>Ahorro</span>
                  </div>
                  <div style={{ ...s.metricVal, ...s.valGreen }}>{fmt(costoAhorradoY)}</div>
                  <div style={s.metricSub}>recuperados por año en fugas operativas</div>
                </div>
              </div>

              {/* Comparativa */}
              <div style={s.comparison}>
                <div style={s.compRow}>
                  <span style={s.compLabel}>Costo operativo manual actual:</span>
                  <span style={s.valRed}>{fmt(totalCostoM)} / mes</span>
                </div>
                <div style={{ ...s.compRow, marginTop: 8 }}>
                  <span style={s.compLabel}>Costo con automatización IA:</span>
                  <span style={{ ...s.valGreen, fontWeight: 700 }}>{fmt(costoConIA)} / mes</span>
                </div>
              </div>

              <Link to="/diagnostico" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                Quiero automatizar mi negocio →
              </Link>

              <p style={s.disclaimer}>
                * Basado en un factor de eficiencia del 75% — promedio documentado por McKinsey para automatización de tareas repetitivas en PyMEs (2024).
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

function SliderField({ label, helper, value, min, max, step, display, onChange, minLabel, maxLabel }) {
  return (
    <div style={sf.wrap}>
      <div style={sf.row}>
        <span style={sf.label}>{label}</span>
        <span style={sf.val}>{display}</span>
      </div>
      <p style={sf.helper}>{helper}</p>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="range-slider"
      />
      <div style={sf.limits}>
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}

const sf = {
  wrap: { display: 'flex', flexDirection: 'column', gap: 8, marginTop: 24 },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
  label: { fontSize: 15, fontWeight: 700, color: 'var(--text)', flex: 1, paddingRight: 12 },
  val: { fontSize: 18, fontWeight: 800, color: 'var(--success)', flexShrink: 0 },
  helper: { fontSize: 12, color: 'var(--muted)', lineHeight: 1.4, marginBottom: 4 },
  limits: { display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: 11, color: 'var(--muted)', marginTop: 4 },
}

const s = {
  header: { padding: '100px 0 48px' },
  sub: { color: 'var(--muted)', fontSize: 16, marginTop: 14, lineHeight: 1.7 },
  body: { padding: '40px 0 96px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'stretch', padding: 48, background: 'rgba(10,10,12,0.5)' },
  inputs: { textAlign: 'left' },
  cardTitle: { fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.8rem', letterSpacing: 1.5, marginBottom: 8, color: 'var(--text)' },
  cardDesc: { fontSize: 14, color: 'var(--muted)', marginBottom: 8 },
  results: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--glass-border)', borderRadius: 20, padding: 32 },
  metrics: { display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 },
  metricCard: { background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '18px 20px' },
  metricHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  metricTitle: { fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 },
  metricBadge: { fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10 },
  badgePurple: { background: 'rgba(123,92,245,0.12)', color: '#c084fc' },
  badgeGreen: { background: 'rgba(0,219,130,0.12)', color: '#34d399' },
  metricVal: { fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', letterSpacing: 1, lineHeight: 1.1, color: 'var(--text)' },
  metricSub: { fontSize: 12, color: 'var(--muted)', marginTop: 4 },
  valGreen: { background: 'linear-gradient(135deg,#00db82,#34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
  comparison: { background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: 16 },
  compRow: { display: 'flex', justifyContent: 'space-between', fontSize: 13 },
  compLabel: { color: 'var(--muted)' },
  valRed: { color: '#f87171', fontWeight: 700 },
  disclaimer: { fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, marginTop: 12, opacity: 0.7 },
}
