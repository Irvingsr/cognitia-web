import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Calculadora() {
  const [hours, setHours] = useState(15)   // hrs semanales por persona
  const [rate, setRate]   = useState(250)  // costo hora en MXN
  const [team, setTeam]   = useState(3)    // personas en el equipo

  // Cálculos (modelo Cognitia — 75% eficiencia, de Antigravity)
  const totalHorasM  = Math.round(hours * 4.33 * team)
  const totalCostoM  = Math.round(totalHorasM * rate)
  const horasAhorradasM = Math.round(totalHorasM * 0.75)
  const costoAhorradoM  = Math.round(totalCostoM * 0.75)
  const costoAhorradoY  = costoAhorradoM * 12
  const costoConIA      = Math.round(totalCostoM * 0.25)

  const fmt = n => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n)

  return (
    <>
      <section className="t-hero t-sec-first">
        <div className="t-wrap t-hero-in t-hero-solo" style={{ textAlign: 'center', margin: '0 auto' }}>
          <p className="t-eyebrow" style={{ justifyContent: 'center' }}>Calculadora interactiva</p>
          <h1>¿Cuánto vale automatizar tu operación?</h1>
          <p className="t-lead" style={{ margin: '0 auto' }}>
            Estima cuánto tiempo y dinero está perdiendo tu negocio en tareas repetitivas
            que podrías resolver en piloto automático.
          </p>
        </div>
      </section>

      <section className="t-sec t-sec-first">
        <div className="t-wrap" style={{ maxWidth: 1100 }}>
          <div className="t-calc-grid">

            {/* ── SLIDERS ── */}
            <div className="t-card">
              <h3>1. Configura tus datos</h3>
              <p className="t-cardtxt" style={{ flex: 'none' }}>Ajusta los valores para aproximarlos a la realidad de tu empresa:</p>

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
            <div className="t-result-panel">
              <h3 style={{ textAlign: 'center' }}>2. Impacto con Cognitia</h3>
              <p className="t-cardtxt" style={{ textAlign: 'center', flex: 'none', marginBottom: 18 }}>
                Al automatizar el 75% de estas actividades rutinarias:
              </p>

              <div className="t-result-row">
                <span className="t-result-label">Tiempo recuperado al mes</span>
                <span className="t-result-val t-result-val-lg">{horasAhorradasM} hrs</span>
              </div>
              <div className="t-result-row">
                <span className="t-result-label">Costo operativo manual actual</span>
                <span className="t-result-label" style={{ fontWeight: 700, color: '#B3423C' }}>{fmt(totalCostoM)} / mes</span>
              </div>
              <div className="t-result-row">
                <span className="t-result-label">Costo con automatización</span>
                <span className="t-result-val">{fmt(costoConIA)} / mes</span>
              </div>

              <div className="t-result-highlight">
                <span className="t-result-label">Retorno de inversión anual</span>
                <div className="t-result-val t-result-val-lg" style={{ marginTop: 4 }}>{fmt(costoAhorradoY)}</div>
              </div>

              <Link to="/diagnostico" className="t-btn" style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                Quiero automatizar mi negocio →
              </Link>

              <p style={{ fontSize: 11, color: 'var(--tinta-2)', lineHeight: 1.5, marginTop: 12, opacity: .8 }}>
                * Basado en un factor de eficiencia del 75% — promedio documentado por McKinsey para automatización de tareas repetitivas en PyMEs (2024).
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

function SliderField({ label, helper, value, min, max, step, display, onChange, minLabel, maxLabel }) {
  return (
    <div className="t-slider-group">
      <div className="t-slider-label">
        <span>{label}</span>
        <span className="t-slider-val">{display}</span>
      </div>
      <p style={{ fontSize: 12, color: 'var(--tinta-2)', lineHeight: 1.4, marginBottom: 8 }}>{helper}</p>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="t-range"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--tinta-2)', marginTop: 4 }}>
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}
