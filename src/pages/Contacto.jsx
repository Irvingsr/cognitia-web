import { useState } from 'react'

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
    <div className="page-bg">
      {/* Header */}
      <section style={s.header}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="label label-electric">Hablemos</p>
          <h1>¿Listo para automatizar<br />tu negocio?</h1>
          <p style={s.headerSub}>Sin compromisos. Una conversación de 30 minutos puede cambiar cómo opera tu negocio para siempre.</p>
        </div>
      </section>

      <section style={s.main}>
        <div className="container" style={s.grid}>
          {/* Quick CTAs */}
          <div style={s.ctaCol}>
            <a href="https://wa.me/529841798638" target="_blank" rel="noreferrer" style={s.ctaCard}>
              <div style={{ ...s.ctaIcon, background: 'rgba(0,219,130,0.1)', border: '1px solid rgba(0,219,130,0.25)' }}>
                <span style={{ fontSize: 28 }}>💬</span>
              </div>
              <div>
                <p style={s.ctaTitle}>WhatsApp directo</p>
                <p style={s.ctaSub}>Respuesta en menos de 2 horas en horario de negocios</p>
                <p style={s.ctaLink}>+52 984 179 8638 →</p>
              </div>
            </a>

            <a href="https://calendly.com/irvingsr-cognitiamx/llamada-de-consultoria-cognitia-30-min" target="_blank" rel="noreferrer" style={s.ctaCard}>
              <div style={{ ...s.ctaIcon, background: 'rgba(123,92,245,0.1)', border: '1px solid rgba(123,92,245,0.25)' }}>
                <span style={{ fontSize: 28 }}>📅</span>
              </div>
              <div>
                <p style={s.ctaTitle}>Agendar llamada</p>
                <p style={s.ctaSub}>Sesión de diagnóstico gratuita de 30 minutos con Irving</p>
                <p style={{ ...s.ctaLink, color: 'var(--purple)' }}>Ver disponibilidad →</p>
              </div>
            </a>

            <a href="mailto:irvingsr@cognitiamx.com" style={s.ctaCard}>
              <div style={{ ...s.ctaIcon, background: 'rgba(0,194,255,0.1)', border: '1px solid rgba(0,194,255,0.25)' }}>
                <span style={{ fontSize: 28 }}>✉️</span>
              </div>
              <div>
                <p style={s.ctaTitle}>Email</p>
                <p style={s.ctaSub}>Para propuestas formales y proyectos enterprise</p>
                <p style={{ ...s.ctaLink, color: 'var(--electric)' }}>irvingsr@cognitiamx.com →</p>
              </div>
            </a>

            <div style={s.infoBox}>
              <p style={s.infoTitle}>📍 Ubicación</p>
              <p style={s.infoText}>Playa del Carmen, Quintana Roo · México</p>
              <p style={s.infoText}>También atendemos Tabasco y proyectos remotos</p>
            </div>
          </div>

          {/* Form */}
          <div className="card" style={s.formCard}>
            {sent ? (
              <div style={s.thanks}>
                <div style={s.thanksBadge}>✓</div>
                <h3>¡Mensaje recibido!</h3>
                <p style={{ color: 'var(--muted)', marginTop: 10 }}>Te contactaremos en menos de 24 horas. También puedes escribirnos por WhatsApp para una respuesta más rápida.</p>
                <a href="https://wa.me/529841798638" target="_blank" rel="noreferrer" className="btn-success" style={{ marginTop: 20, alignSelf: 'center' }}>
                  Ir a WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={s.form}>
                <h3 style={{ marginBottom: 24 }}>Envíanos un mensaje</h3>
                <div style={s.row}>
                  <div className="form-field">
                    <label>Nombre *</label>
                    <input className="form-input" placeholder="Tu nombre" value={form.nombre} onChange={set('nombre')} required />
                  </div>
                  <div className="form-field">
                    <label>Email *</label>
                    <input className="form-input" type="email" placeholder="correo@empresa.com" value={form.email} onChange={set('email')} required />
                  </div>
                </div>
                <div style={s.row}>
                  <div className="form-field">
                    <label>Teléfono</label>
                    <input className="form-input" placeholder="+52 984 000 0000" value={form.telefono} onChange={set('telefono')} />
                  </div>
                  <div className="form-field">
                    <label>Nombre del negocio</label>
                    <input className="form-input" placeholder="Mi Empresa S.A." value={form.negocio} onChange={set('negocio')} />
                  </div>
                </div>
                <div className="form-field">
                  <label>¿En qué podemos ayudarte?</label>
                  <textarea
                    className="form-input"
                    placeholder="Cuéntanos brevemente qué procesos quieres automatizar o qué problema tienes..."
                    value={form.mensaje} onChange={set('mensaje')}
                    rows={4} style={{ resize: 'vertical' }}
                  />
                </div>
                {/* Honeypot anti-bot — oculto para humanos */}
                <input name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                {error && <p style={{ color: '#ff5f57', fontSize: 13 }}>{error}</p>}
                <button type="submit" className="btn-primary" style={{ marginTop: 8 }} disabled={loading}>
                  {loading ? 'Enviando…' : 'Enviar mensaje →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

const s = {
  header: { padding: '100px 0 48px' },
  headerSub: { color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, marginTop: 14, maxWidth: 520, margin: '14px auto 0' },
  main: { padding: '40px 0 96px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' },
  ctaCol: { display: 'flex', flexDirection: 'column', gap: 16 },
  ctaCard: {
    display: 'flex', alignItems: 'flex-start', gap: 16,
    background: 'var(--dark3)', border: '1px solid var(--border)',
    borderRadius: 14, padding: '20px 22px', textDecoration: 'none',
    transition: 'border-color 0.2s, transform 0.2s',
  },
  ctaIcon: { width: 52, height: 52, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  ctaTitle: { fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--text)' },
  ctaSub: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 },
  ctaLink: { fontSize: 13, color: 'var(--success)', marginTop: 6, fontWeight: 600 },
  infoBox: {
    background: 'var(--dark4)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '16px 20px',
  },
  infoTitle: { fontSize: 14, fontWeight: 600, marginBottom: 8 },
  infoText: { fontSize: 13, color: 'var(--muted)', marginBottom: 4 },
  formCard: { padding: 36 },
  form: { display: 'flex', flexDirection: 'column', gap: 18 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  thanks: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px 0', gap: 12 },
  thanksBadge: {
    width: 64, height: 64, borderRadius: 20,
    background: 'linear-gradient(135deg, var(--success), #00a865)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 28, color: '#000', fontWeight: 700,
  },
}
