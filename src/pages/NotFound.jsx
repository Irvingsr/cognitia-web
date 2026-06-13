import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page-bg">
      <section style={s.wrap}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={s.code}>404</p>
          <p className="label label-electric" style={{ justifyContent: 'center' }}>Página no encontrada</p>
          <h1 style={s.title}>Esta ruta se<br />automatizó… y desapareció.</h1>
          <p style={s.sub}>
            La página que buscas no existe o cambió de lugar. Pero tranquilo,
            lo importante sigue aquí: tu negocio puede trabajar sin que tú estés presente.
          </p>

          <div style={s.actions}>
            <Link to="/" className="btn-primary">Volver al inicio →</Link>
            <Link to="/servicios" className="btn-secondary">Ver servicios</Link>
          </div>

          <p style={s.helpLabel}>¿Buscabas algo en específico?</p>
          <div style={s.links}>
            <Link to="/diagnostico" style={s.quickLink}>Diagnóstico de IA</Link>
            <Link to="/calculadora" style={s.quickLink}>Calculadora de ROI</Link>
            <Link to="/blog" style={s.quickLink}>Blog</Link>
            <Link to="/contacto" style={s.quickLink}>Contacto</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const s = {
  wrap: { padding: '140px 0 120px', display: 'flex', alignItems: 'center', minHeight: '70vh' },
  code: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 'clamp(96px, 22vw, 200px)',
    lineHeight: 0.9,
    letterSpacing: '4px',
    background: 'linear-gradient(135deg, var(--electric), var(--purple))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: 8,
  },
  title: { marginTop: 8 },
  sub: {
    color: 'var(--muted)', fontSize: 16, lineHeight: 1.7,
    marginTop: 16, maxWidth: 520, margin: '16px auto 0',
  },
  actions: {
    display: 'flex', gap: 14, justifyContent: 'center',
    flexWrap: 'wrap', marginTop: 36,
  },
  helpLabel: {
    color: 'var(--muted)', fontSize: 13, marginTop: 48,
    textTransform: 'uppercase', letterSpacing: '1px',
  },
  links: {
    display: 'flex', gap: 20, justifyContent: 'center',
    flexWrap: 'wrap', marginTop: 14,
  },
  quickLink: {
    color: 'var(--electric)', fontSize: 14, fontWeight: 600,
    textDecoration: 'none',
  },
}
