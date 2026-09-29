import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { WHATSAPP_URL, TELEFONO_DISPLAY, TELEFONO_E164 } from '../data/contacto'

export default function TallerNav() {
  const [menu, setMenu] = useState(false)

  return (
    <header className="t-nav">
      <div className="t-wrap t-nav-in">
        <Link to="/" className="t-logo" aria-label="Cognitia — inicio">
          <Logo size={28} id="taller-logo" tone="oscuro" />
        </Link>

        <nav className="t-links" data-tlinks="">
          <Link to="/servicios">Servicios</Link>
          <Link to="/diagnostico">Diagnóstico</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>

        <div className="t-navcta">
          <a href={`tel:${TELEFONO_E164}`} className="t-tel">{TELEFONO_DISPLAY}</a>
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
          <a href={`tel:${TELEFONO_E164}`}>{TELEFONO_DISPLAY}</a>
          <Link to="/contacto" className="t-btn" onClick={() => setMenu(false)}>Cuéntame sobre tu negocio</Link>
        </div>
      )}
    </header>
  )
}
