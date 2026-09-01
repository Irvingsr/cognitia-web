import { Link } from 'react-router-dom'
import Logo from './Logo'
import { WHATSAPP_URL, TELEFONO_DISPLAY, TELEFONO_E164, EMAIL, UBICACION } from '../data/contacto'

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div className="container" style={s.grid}>
        {/* Brand */}
        <div>
          <div style={s.logo}>
            <Logo size={28} id="footer-logo" />
          </div>
          <p style={s.tagline}>Claridad sobre qué mejorar y dónde aplicar la tecnología.</p>
          <div style={s.socials}>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={s.badge}>
              WhatsApp
            </a>
            <a href={`mailto:${EMAIL}`} style={s.badge}>
              Email
            </a>
          </div>
        </div>

        {/* Nav */}
        <div>
          <p style={s.colTitle}>Navegación</p>
          <div style={s.col}>
            <Link to="/servicios" style={s.link}>Servicios</Link>
            <Link to="/manifiesto" style={s.link}>Manifiesto</Link>
            <Link to="/diagnostico" style={s.link}>Diagnóstico Estratégico</Link>
            <Link to="/scorecard" style={s.link}>Evaluación gratuita</Link>
            <Link to="/calculadora" style={s.link}>Calculadora ROI</Link>
            <Link to="/contacto" style={s.link}>Contacto</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p style={s.colTitle}>Contacto</p>
          <div style={s.col}>
            <a href={`tel:${TELEFONO_E164}`} style={s.link}>{TELEFONO_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`} style={s.link}>{EMAIL}</a>
            <span style={s.link}>{UBICACION}</span>
          </div>
        </div>
      </div>

      <div style={s.bottom}>
        <span>© {new Date().getFullYear()} Cognitia — EstrategIA Consulting. Todos los derechos reservados.</span>
        <span>cognitiamx.com</span>
      </div>
    </footer>
  )
}

const s = {
  footer: {
    background: 'var(--dark2)',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    padding: '64px 0 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 48,
    paddingBottom: 48,
  },
  logo: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 },
  tagline: { fontSize: 13, color: '#7A8FAD', lineHeight: 1.6, maxWidth: 240, marginBottom: 20 },
  socials: { display: 'flex', gap: 10 },
  badge: {
    padding: '6px 14px', borderRadius: 100,
    border: '1px solid rgba(255,255,255,0.13)',
    fontSize: 12, color: '#7A8FAD', transition: 'color 0.2s',
    textDecoration: 'none',
  },
  colTitle: { fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#7A8FAD', marginBottom: 16 },
  col: { display: 'flex', flexDirection: 'column', gap: 10 },
  link: { fontSize: 14, color: '#7A8FAD', textDecoration: 'none', transition: 'color 0.2s' },
  bottom: {
    borderTop: '1px solid rgba(255,255,255,0.07)',
    padding: '20px 24px',
    display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
    maxWidth: 1200, margin: '0 auto',
    fontSize: 12, color: '#7A8FAD',
  },
}
