import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function TallerNav() {
  const [menu, setMenu] = useState(false)

  return (
    <header className="t-nav">
      <div className="t-wrap t-nav-in">
        <Link to="/" className="t-logo" aria-label="Cognitia — inicio">
          <Logo size={28} id="taller-logo" tone="oscuro" />
        </Link>

        <nav className="t-links" data-tlinks="">
          <div className="t-navitem">
            <Link to="/servicios" className="t-navlabel">
              Servicios <span className="t-navchev">⌄</span>
            </Link>
            <div className="t-navpanel">
              <Link to="/diagnostico" className="t-navpanel-item">
                <span className="t-navpanel-t">Consultoría y diagnóstico</span>
                <span className="t-navpanel-d">Identifico qué frena tus resultados y te entrego un plan priorizado.</span>
              </Link>
              <Link to="/contacto" className="t-navpanel-item">
                <span className="t-navpanel-t">Implementación y automatización</span>
                <span className="t-navpanel-d">Construyo lo que el diagnóstico justifique: sistemas funcionando de verdad.</span>
              </Link>
              <Link to="/contacto" className="t-navpanel-item">
                <span className="t-navpanel-t">Capacitación del equipo</span>
                <span className="t-navpanel-d">Talleres para usar Claude, ChatGPT y Gemini con criterio, no por moda.</span>
              </Link>
            </div>
          </div>

          <div className="t-navitem">
            <Link to="/diagnostico" className="t-navlabel">
              Diagnóstico <span className="t-navchev">⌄</span>
            </Link>
            <div className="t-navpanel t-navpanel-left">
              <Link to="/diagnostico" className="t-navpanel-item">
                <span className="t-navpanel-t">Diagnóstico Estratégico</span>
                <span className="t-navpanel-d">Análisis completo con dashboard y plan a 30, 60 y 90 días.</span>
              </Link>
              <Link to="/scorecard" className="t-navpanel-item">
                <span className="t-navpanel-t">Evaluación gratuita · 2 min</span>
                <span className="t-navpanel-d">Un primer vistazo automático a tus cuellos de botella.</span>
              </Link>
            </div>
          </div>

          <Link to="/blog">Blog</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>

        <div className="t-navcta">
          <Link to="/contacto" className="t-btn t-btn-sm">Cuéntame sobre tu negocio</Link>
        </div>

        <button
          className="t-burger"
          data-tburger=""
          onClick={() => setMenu(m => !m)}
          aria-label={menu ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menu}
        >
          <span /><span /><span />
        </button>
      </div>

      {menu && (
        <div className="t-mobile">
          <Link to="/servicios" onClick={() => setMenu(false)}>Servicios</Link>
          <Link to="/diagnostico" onClick={() => setMenu(false)}>Diagnóstico</Link>
          <Link to="/blog" onClick={() => setMenu(false)}>Blog</Link>
          <Link to="/contacto" onClick={() => setMenu(false)}>Contacto</Link>
          <Link to="/contacto" className="t-btn" onClick={() => setMenu(false)}>Cuéntame sobre tu negocio</Link>
        </div>
      )}
    </header>
  )
}
