import { useState } from 'react'
import { Link } from 'react-router-dom'
import { WHATSAPP_URL, TELEFONO_DISPLAY, EMAIL } from '../data/contacto'

export default function Contacto() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', negocio: '', mensaje: '' })

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.nombre || !form.email) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Error al enviar. Escríbenos por WhatsApp.'); return }
      setSent(true)
    } catch {
      setError('Error de conexión. Escríbenos directamente por WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="t-hero t-sec-first">
        <div className="t-wrap t-hero-in t-hero-solo" style={{ textAlign: 'center', margin: '0 auto' }}>
          <p className="t-eyebrow" style={{ justifyContent: 'center' }}>Hablemos</p>
          <h1>Hablemos sobre lo que quieres mejorar en tu negocio</h1>
          <p className="t-lead" style={{ margin: '0 auto' }}>
            Cuéntanos qué te está frenando. Si podemos ayudarte, te decimos cómo; si no,
            también te lo decimos.
          </p>
        </div>
      </section>

      <section className="t-sec t-sec-first">
        <div className="t-wrap t-contact-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="t-quickcard">
              <span className="t-quickrule" />
              <div>
                <p className="t-quicktitle">WhatsApp directo</p>
                <p className="t-quicksub">La vía más rápida para una primera conversación</p>
                <p className="t-quicklink">{TELEFONO_DISPLAY} →</p>
              </div>
            </a>

            <a href="https://calendly.com/irvingsr-cognitiamx/llamada-de-consultoria-cognitia-30-min" target="_blank" rel="noreferrer" className="t-quickcard">
              <span className="t-quickrule" />
              <div>
                <p className="t-quicktitle">Agendar llamada</p>
                <p className="t-quicksub">30 minutos con Irving para entender tu caso</p>
                <p className="t-quicklink">Ver disponibilidad →</p>
              </div>
            </a>

            <a href={`mailto:${EMAIL}`} className="t-quickcard">
              <span className="t-quickrule" />
              <div>
                <p className="t-quicktitle">Correo</p>
                <p className="t-quicksub">Para propuestas formales y proyectos de mayor alcance</p>
                <p className="t-quicklink">{EMAIL} →</p>
              </div>
            </a>

            <div className="t-infobox">
              <p>Ubicación</p>
              <p>Playa del Carmen, Quintana Roo · México</p>
              <p>Atendemos la Riviera Maya de forma presencial, y el resto del país en remoto</p>
            </div>
          </div>

          <div className="t-card">
            {sent ? (
              <div className="t-thanks">
                <div className="t-thanks-badge">✓</div>
                <h3>¡Mensaje recibido!</h3>
                <p className="t-cardtxt">
                  Te contactaremos en menos de 24 horas. También puedes escribirnos por
                  WhatsApp para una respuesta más rápida.
                </p>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="t-btn" style={{ marginTop: 8 }}>
                  Ir a WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="t-form">
                <h3>Envíanos un mensaje</h3>
                <div className="t-form-row2">
                  <div className="t-field">
                    <label>Nombre *</label>
                    <input className="t-input" placeholder="Tu nombre" value={form.nombre} onChange={set('nombre')} required />
                  </div>
                  <div className="t-field">
                    <label>Email *</label>
                    <input className="t-input" type="email" placeholder="correo@empresa.com" value={form.email} onChange={set('email')} required />
                  </div>
                </div>
                <div className="t-form-row2">
                  <div className="t-field">
                    <label>Teléfono</label>
                    <input className="t-input" placeholder="+52 984 000 0000" value={form.telefono} onChange={set('telefono')} />
                  </div>
                  <div className="t-field">
                    <label>Nombre del negocio</label>
                    <input className="t-input" placeholder="Mi Empresa S.A." value={form.negocio} onChange={set('negocio')} />
                  </div>
                </div>
                <div className="t-field">
                  <label>¿En qué podemos ayudarte?</label>
                  <textarea
                    className="t-input"
                    placeholder="Cuéntanos brevemente qué procesos quieres automatizar o qué problema tienes..."
                    value={form.mensaje} onChange={set('mensaje')}
                    rows={4}
                  />
                </div>
                {/* Honeypot anti-bot — oculto para humanos */}
                <input name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                {error && <p className="t-error">{error}</p>}
                <button type="submit" className="t-btn" disabled={loading}>
                  {loading ? 'Enviando…' : 'Enviar mensaje →'}
                </button>
                <p className="t-form-legal">
                  Al enviar aceptas que usemos tus datos para responderte, según nuestro{' '}
                  <Link to="/privacidad">Aviso de Privacidad</Link>.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
