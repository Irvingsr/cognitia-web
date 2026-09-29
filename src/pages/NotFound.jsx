import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="t-hero t-sec-first">
      <div className="t-wrap t-hero-in t-hero-solo" style={{ textAlign: 'center', margin: '0 auto' }}>
        <p className="t-404-code">404</p>
        <p className="t-eyebrow" style={{ justifyContent: 'center' }}>Página no encontrada</p>
        <h1>Esta ruta se automatizó… y desapareció.</h1>
        <p className="t-lead" style={{ margin: '0 auto' }}>
          La página que buscas no existe o cambió de lugar. Pero tranquilo,
          lo importante sigue aquí: tu negocio puede trabajar sin que tú estés presente.
        </p>

        <div className="t-actions" style={{ justifyContent: 'center' }}>
          <Link to="/" className="t-btn">Volver al inicio →</Link>
          <Link to="/servicios" className="t-btn-ghost">Ver servicios</Link>
        </div>

        <p className="t-micro" style={{ margin: '40px auto 0', textTransform: 'uppercase', letterSpacing: '.06em', fontSize: 12.5 }}>
          ¿Buscabas algo en específico?
        </p>
        <div className="t-actions" style={{ justifyContent: 'center', marginTop: 14 }}>
          <Link to="/diagnostico" className="t-btn-ghost t-btn-sm">Diagnóstico Estratégico</Link>
          <Link to="/calculadora" className="t-btn-ghost t-btn-sm">Calculadora de ROI</Link>
          <Link to="/blog" className="t-btn-ghost t-btn-sm">Blog</Link>
          <Link to="/contacto" className="t-btn-ghost t-btn-sm">Contacto</Link>
        </div>
      </div>
    </section>
  )
}
